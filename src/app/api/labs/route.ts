import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';

// Configuration schema for validation
const ConfigurationSchema = z.object({
  system: z.string().min(1, { message: 'System name is required' }),
  quantity: z.number().int().positive({ message: 'Quantity must be a positive number' }),
  details: z.string().optional(),
});

// Lab schema for validation
const LabSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }),
  lab_name: z.string().min(1, { message: 'Lab name is required' }),
  configurations: z.array(ConfigurationSchema).optional().default([]),
  usage: z.string().optional(),
  image_url: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

export type Configuration = z.infer<typeof ConfigurationSchema>;
export type Lab = z.infer<typeof LabSchema>;

/**
 * API endpoint for computer labs
 * GET /api/labs - List labs
 * POST /api/labs - Create a new lab
 */

/**
 * List labs
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const department = url.searchParams.get('dept');
  const status = url.searchParams.get('status');
  
  try {
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    const params = [];
    
    if (department) {
      conditions.push('dept = ?');
      params.push(department);
    }
    
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    
    // Execute query
    const labs = await query<any>(`
      SELECT 
        id, dept, lab_name, configurations, usage, image_url,
        status, created_at, updated_at
      FROM labs
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `, params);

    // Parse JSON for configurations
    const parsedLabs = labs.map(lab => ({
      ...lab,
      configurations: JSON.parse(lab.configurations || '[]'),
      image_url: lab.image_url ? lab.image_url.split(',') : []
    }));
    
    return NextResponse.json({ labs: parsedLabs });
    
  } catch (error) {
    console.error('Error fetching labs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch labs' },
      { status: 500 }
    );
  }
}

/**
 * Create a new lab
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if the request is multipart (with file) or JSON
    const contentType = req.headers.get('content-type') || '';
    
    let labData: any = {};
    let files: File[] = [];
    
    if (contentType.includes('multipart/form-data')) {
      // Parse multipart form data (file upload)
      const { fields, files: uploadedFiles } = await parseMultipartForm(req);
      
      // Get multiple files
      if (Array.isArray(uploadedFiles.files)) {
        files = uploadedFiles.files;
      } else if (uploadedFiles.files) {
        files = [uploadedFiles.files];
      }
      
      // Parse configurations JSON if provided
      let configurations = [];
      if (fields.configurations) {
        try {
          configurations = JSON.parse(fields.configurations);
        } catch (e) {
          return NextResponse.json(
            { error: 'Invalid configurations format' },
            { status: 400 }
          );
        }
      }
      
      // Create lab data from fields
      labData = {
        dept: fields.dept || '',
        lab_name: fields.lab_name || '',
        configurations,
        usage: fields.usage || '',
        image_url: [],
        status: (fields.status as any) || 'active',
      };
    } else {
      // Parse JSON request
      labData = await req.json();
    }
    
    // Validate data
    const validationResult = LabSchema.safeParse(labData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Handle image uploads
    if (files.length > 0) {
      const imageUrls = [];
      
      for (const file of files) {
        // Validate file size (3MB limit)
        if (file.size > 3 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${file.name} exceeds 3MB limit` },
            { status: 400 }
          );
        }
        
        // Save file
        const result = await saveFile(file, `labs/${data.dept}`, {
          fileType: 'images',
          fileName: `lab_${Date.now()}_${file.name}`
        });
        
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
        
        imageUrls.push(result.fileName);
      }
      
      data.image_url = imageUrls;
    }
    
    // Convert configurations to JSON string
    const configurationsJson = JSON.stringify(data.configurations);
    
    // Convert image_url array to comma-separated string
    const imageUrlString = data.image_url && data.image_url.length > 0 ? data.image_url.join(',') : '';
    
    // Insert into database
    const result = await execute<{ insertId: number }>(`
      INSERT INTO labs (
        dept, lab_name, configurations, usage, image_url,
        status, created_by
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?
      )
    `, [
      data.dept,
      data.lab_name,
      configurationsJson,
      data.usage,
      imageUrlString,
      data.status,
      user.id
    ]);
    
    // Fetch the created lab
    const [lab] = await query(`
      SELECT 
        id, dept, lab_name, configurations, usage, image_url,
        status, created_at, updated_at
      FROM labs
      WHERE id = ?
    `, [result.insertId]);
    
    // Parse JSON for response
    const parsedLab = lab ? {
      ...(lab as any),
      configurations: JSON.parse((lab as any).configurations || '[]'),
      image_url: (lab as any).image_url ? (lab as any).image_url.split(',') : []
    } : {};
    
    return NextResponse.json({ 
      message: 'Lab created successfully',
      lab: parsedLab 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating lab:', error);
    return NextResponse.json(
      { error: 'Failed to create lab' },
      { status: 500 }
    );
  }
}
