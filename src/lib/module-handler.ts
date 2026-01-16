import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { adminApprovalsDb } from '@/lib/admin-approvals';
import { fileStorage } from '@/lib/file-storage';
import { createZodSchemaForModule, getModuleSchema } from '@/lib/module-schemas';

// Database interface for module data
export interface ModuleDataManager<T> {
  list(dept?: string): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

// Base entity type
export interface BaseEntity {
  id: string;
  dept: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

// Create a handler for module operations
export function createModuleHandler<T extends BaseEntity>(
  moduleName: string,
  db: ModuleDataManager<T>,
  options: {
    validateCreate?: (data: any) => z.SafeParseReturnType<any, any>;
    validateUpdate?: (data: any) => z.SafeParseReturnType<any, any>;
    normalizeOutput?: (entity: T) => any;
    processFileUploads?: (files: any, formData: any, dept: string) => Promise<Record<string, string>>;
  } = {}
) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    // Set up validation based on module schema if not provided
    if (!options.validateCreate) {
      const zodSchema = createZodSchemaForModule(moduleName);
      options.validateCreate = (data) => zodSchema.safeParse(data);
    }

    if (!options.validateUpdate) {
      const zodSchema = createZodSchemaForModule(moduleName);
      options.validateUpdate = (data) => zodSchema.safeParse(data);
    }

    // Default normalization function
    if (!options.normalizeOutput) {
      options.normalizeOutput = (entity: T) => {
        const schema = getModuleSchema(moduleName);
        
        // Get display title based on the first field or id if no fields
        const titleField = schema?.fields[0]?.name || 'id';
        const title = (entity as any)[titleField] || entity.id;
        
        // Convert all fields to a fields object
        const fields: Record<string, any> = {};
        const files: string[] = [];
        
        // Extract files and fields
        for (const [key, value] of Object.entries(entity)) {
          // Skip base properties
          if (['id', 'dept', 'status', 'created_at', 'updated_at'].includes(key)) {
            continue;
          }
          
          // Check if it's a file field
          const fieldSchema = schema?.fields.find(f => f.name === key);
          if (fieldSchema?.type === 'file' && typeof value === 'string' && value.startsWith('/uploads/')) {
            files.push(value);
          } else {
            fields[key] = value;
          }
        }
        
        return {
          id: entity.id,
          dept: entity.dept,
          module: moduleName,
          title,
          description: schema?.description || '',
          fields,
          files,
          status: entity.status || 'pending',
          created_at: entity.created_at,
        };
      };
    }

    // Handle different HTTP methods
    switch (method) {
      case 'GET': {
        const { id, dept } = req.query;
        
        // Get by ID
        if (id && typeof id === 'string') {
          try {
            const entity = await db.getById(id);
            
            if (!entity) {
              return res.status(404).json({ message: `${moduleName} not found` });
            }
            
            return res.status(200).json(options.normalizeOutput!(entity));
          } catch (error: any) {
            return res.status(500).json({ message: `Error fetching ${moduleName}`, error: error.message });
          }
        }
        
        // List all
        try {
          const entities = await db.list(dept && typeof dept === 'string' ? dept : undefined);
          return res.status(200).json(entities.map(e => options.normalizeOutput!(e)));
        } catch (error: any) {
          return res.status(500).json({ message: `Error fetching ${moduleName} list`, error: error.message });
        }
      }
      
      case 'POST': {
        try {
          const contentType = req.headers['content-type'];
          
          let data: any;
          let files: any = {};
          
          // Handle file uploads if content type is multipart form-data
          if (contentType?.includes('multipart/form-data')) {
            const { fields, files: uploadedFiles } = await fileStorage.parseFormData(req);
            
            // Convert FormidableFields to a plain object
            data = Object.keys(fields).reduce((acc, key) => {
              if (Array.isArray(fields[key]) && fields[key]!.length > 0) {
                acc[key] = fields[key]![0];
              }
              return acc;
            }, {} as Record<string, string>);
            
            files = uploadedFiles;
          } else {
            // Parse JSON data
            data = req.body;
          }
          
          // Validate data
          const validation = options.validateCreate!(data);
          
          if (!validation.success) {
            return res.status(400).json({ 
              message: 'Validation error', 
              errors: validation.error.errors 
            });
          }
          
          // Process file uploads if needed
          if (options.processFileUploads && Object.keys(files).length > 0) {
            const fileUrls = await options.processFileUploads(files, data, data.dept);
            data = { ...data, ...fileUrls };
          }
          
          // Create the entity
          const entity = await db.create({
            ...data,
            status: 'pending',
          } as any);
          
          // Create admin approval entry
          await adminApprovalsDb.create({
            entity_type: moduleName,
            entity_id: entity.id,
            dept: entity.dept,
            action: null,
          });
          
          return res.status(201).json(options.normalizeOutput!(entity));
        } catch (error: any) {
          return res.status(500).json({ message: `Error creating ${moduleName}`, error: error.message });
        }
      }
      
      case 'PUT': {
        try {
          const { id } = req.query;
          
          if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'ID is required' });
          }
          
          const contentType = req.headers['content-type'];
          
          let data: any;
          let files: any = {};
          
          // Handle file uploads if content type is multipart form-data
          if (contentType?.includes('multipart/form-data')) {
            const { fields, files: uploadedFiles } = await fileStorage.parseFormData(req);
            
            // Convert FormidableFields to a plain object
            data = Object.keys(fields).reduce((acc, key) => {
              if (Array.isArray(fields[key]) && fields[key]!.length > 0) {
                acc[key] = fields[key]![0];
              }
              return acc;
            }, {} as Record<string, string>);
            
            files = uploadedFiles;
          } else {
            // Parse JSON data
            data = req.body;
          }
          
          // Validate data
          const validation = options.validateUpdate!(data);
          
          if (!validation.success) {
            return res.status(400).json({ 
              message: 'Validation error', 
              errors: validation.error.errors 
            });
          }
          
          // Get the existing entity
          const existingEntity = await db.getById(id);
          
          if (!existingEntity) {
            return res.status(404).json({ message: `${moduleName} not found` });
          }
          
          // Process file uploads if needed
          if (options.processFileUploads && Object.keys(files).length > 0) {
            const fileUrls = await options.processFileUploads(files, data, existingEntity.dept);
            data = { ...data, ...fileUrls };
          }
          
          // Update the entity
          const entity = await db.update(id, data);
          
          if (!entity) {
            return res.status(404).json({ message: `${moduleName} not found` });
          }
          
          return res.status(200).json(options.normalizeOutput!(entity));
        } catch (error: any) {
          return res.status(500).json({ message: `Error updating ${moduleName}`, error: error.message });
        }
      }
      
      case 'DELETE': {
        try {
          const { id } = req.query;
          
          if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'ID is required' });
          }
          
          // Get the existing entity for files cleanup
          const existingEntity = await db.getById(id);
          
          if (!existingEntity) {
            return res.status(404).json({ message: `${moduleName} not found` });
          }
          
          // Delete the entity
          const success = await db.delete(id);
          
          if (!success) {
            return res.status(404).json({ message: `${moduleName} not found` });
          }
          
          // Clean up files if any
          const moduleSchema = getModuleSchema(moduleName);
          const fileFields = moduleSchema?.fields.filter(f => f.type === 'file').map(f => f.name) || [];
          
          for (const field of fileFields) {
            const fileUrl = (existingEntity as any)[field];
            if (fileUrl && typeof fileUrl === 'string' && fileUrl.startsWith('/uploads/')) {
              await fileStorage.deleteFile(fileUrl);
            }
          }
          
          return res.status(200).json({ success: true });
        } catch (error: any) {
          return res.status(500).json({ message: `Error deleting ${moduleName}`, error: error.message });
        }
      }
      
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  };
}
