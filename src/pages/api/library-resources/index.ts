import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { LibraryResource, ResourceType } from '@/types/library-resources';

// Configure API to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Mock S3 implementation for local development
const mockS3 = {
  async uploadFile(file: formidable.File, key: string): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const fileName = `${Date.now()}-${path.basename(file.originalFilename || 'file')}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Copy the file to the uploads directory
    await fs.promises.copyFile(file.filepath, filePath);
    
    // Return public URL
    return `/uploads/${fileName}`;
  },
  
  async deleteFile(url: string): Promise<void> {
    if (!url.startsWith('/uploads/')) return;
    
    const fileName = url.split('/uploads/')[1];
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
};

async function parseFormData(req: NextApiRequest) {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// Mock database for library resources
let mockLibraryResources: LibraryResource[] = [
  {
    id: '1',
    dept: 'cse',
    resource_type: 'Book',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    year: 2009,
    inventory_no: 'CSE-B-1001',
    file_url: '/uploads/sample-book.pdf',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    dept: 'ece',
    resource_type: 'Journal',
    title: 'IEEE Transactions on Communications',
    author: 'IEEE',
    year: 2023,
    inventory_no: 'ECE-J-2001',
    file_url: '/uploads/sample-journal.pdf',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Database operations for library resources
const libraryResources = {
  async getAll(params: { dept?: string; type?: string; search?: string }) {
    try {
      let filteredResources = [...mockLibraryResources];
      
      if (params.dept && params.dept !== 'all') {
        filteredResources = filteredResources.filter(r => r.dept === params.dept);
      }
      
      if (params.type && params.type !== 'all') {
        filteredResources = filteredResources.filter(r => r.resource_type === params.type as ResourceType);
      }
      
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredResources = filteredResources.filter(
          r => r.title.toLowerCase().includes(searchLower) || 
               r.author.toLowerCase().includes(searchLower) ||
               r.inventory_no.toLowerCase().includes(searchLower)
        );
      }
      
      return filteredResources;
    } catch (error) {
      throw error;
    }
  },
  
  async getById(id: string) {
    try {
      return mockLibraryResources.find(r => r.id === id);
    } catch (error) {
      throw error;
    }
  },
  
  async create(data: any, file?: formidable.File) {
    try {
      // Check if inventory number is already in use
      if (mockLibraryResources.some(r => r.inventory_no === data.inventory_no)) {
        throw new Error('Inventory number is already in use');
      }
      
      const id = uuidv4();
      let file_url = '';
      
      if (file) {
        file_url = await mockS3.uploadFile(file, `library-resources/${id}`);
      }
      
      const newResource: LibraryResource = {
        id,
        dept: data.dept,
        resource_type: data.resource_type as ResourceType,
        title: data.title,
        author: data.author,
        year: parseInt(data.year),
        inventory_no: data.inventory_no,
        file_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      mockLibraryResources.push(newResource);
      return newResource;
    } catch (error) {
      throw error;
    }
  },
  
  async update(id: string, data: any, file?: formidable.File) {
    try {
      const resourceIndex = mockLibraryResources.findIndex(r => r.id === id);
      
      if (resourceIndex === -1) {
        throw new Error('Resource not found');
      }
      
      const resource = mockLibraryResources[resourceIndex];
      
      // Check if inventory number is already in use by another resource
      if (
        data.inventory_no !== resource.inventory_no && 
        mockLibraryResources.some(r => r.inventory_no === data.inventory_no)
      ) {
        throw new Error('Inventory number is already in use');
      }
      
      let file_url = data.file_url || resource.file_url;
      
      if (file) {
        // Delete old file if it exists
        if (resource.file_url) {
          await mockS3.deleteFile(resource.file_url);
        }
        
        // Upload new file
        file_url = await mockS3.uploadFile(file, `library-resources/${id}`);
      }
      
      const updatedResource: LibraryResource = {
        ...resource,
        dept: data.dept || resource.dept,
        resource_type: data.resource_type as ResourceType || resource.resource_type,
        title: data.title || resource.title,
        author: data.author || resource.author,
        year: data.year ? parseInt(data.year) : resource.year,
        inventory_no: data.inventory_no || resource.inventory_no,
        file_url,
        updated_at: new Date().toISOString(),
      };
      
      mockLibraryResources[resourceIndex] = updatedResource;
      return updatedResource;
    } catch (error) {
      throw error;
    }
  },
  
  async delete(id: string) {
    try {
      const resourceIndex = mockLibraryResources.findIndex(r => r.id === id);
      
      if (resourceIndex === -1) {
        throw new Error('Resource not found');
      }
      
      const resource = mockLibraryResources[resourceIndex];
      
      // Delete file if it exists
      if (resource.file_url) {
        await mockS3.deleteFile(resource.file_url);
      }
      
      // Remove from mock database
      mockLibraryResources = mockLibraryResources.filter(r => r.id !== id);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { dept, type, search } = req.query;
        const params = {
          dept: typeof dept === 'string' ? dept : undefined,
          type: typeof type === 'string' ? type : undefined,
          search: typeof search === 'string' ? search : undefined,
        };
        
        const resources = await libraryResources.getAll(params);
        res.status(200).json(resources);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch library resources' });
      }
      break;

    case 'POST':
      try {
        const { fields, files } = await parseFormData(req);
        const file = files.file as formidable.File | undefined;
        
        const resource = await libraryResources.create({
          dept: fields.dept?.[0],
          resource_type: fields.resource_type?.[0],
          title: fields.title?.[0],
          author: fields.author?.[0],
          year: fields.year?.[0],
          inventory_no: fields.inventory_no?.[0],
        }, file);
        
        res.status(201).json(resource);
      } catch (error: any) {
        res.status(400).json({ message: error.message || 'Failed to create resource' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
