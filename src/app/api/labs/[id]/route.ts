import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { parseMultipartForm, saveFile, deleteFile } from '@/utils/file-upload';
import { Configuration } from '../route';

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

/**
 * API endpoints for a specific lab
 * GET /api/labs/[id]
 * PUT /api/labs/[id]
 * DELETE /api/labs/[id]
 */

/**
 * Get a specific lab
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Get the lab
    const [lab] = await query<any>(`
      SELECT 
        id, dept, lab_name, configurations, usage, image_url,
        status, created_at, updated_at
      FROM labs
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!lab) {
      return NextResponse.json(
        { error: 'Lab not found' },
        { status: 404 }
      );
    }
    
    // Parse configurations JSON and image_url
    const parsedLab = {
      ...lab,
      configurations: JSON.parse(lab.configurations || '[]'),
      image_url: lab.image_url ? lab.image_url.split(',') : []
    };
    
    return NextResponse.json({ lab: parsedLab });
    
  } catch (error) {
    console.error('Error fetching lab:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lab' },
      { status: 500 }
    );
  }
}

/**
 * Update a lab
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the lab to check ownership/permissions
    const [lab] = await query<{
      id: number;
      dept: string;
      lab_name: string;
      configurations: string;
      image_url: string | null;
    }>(`
      SELECT id, dept, lab_name, configurations, image_url
      FROM labs
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!lab) {
      return NextResponse.json(
        { error: 'Lab not found' },
        { status: 404 }
      );
    }
    
    // Check if the request is multipart (with file) or JSON
    const contentType = req.headers.get('content-type') || '';
    
    let updateData: any = {};
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
      if (fields.configurations) {
        try {
          updateData.configurations = JSON.parse(fields.configurations);
        } catch (e) {
          return NextResponse.json(
            { error: 'Invalid configurations format' },
            { status: 400 }
          );
        }
      }
      
      // Add other fields
      if (fields.dept) updateData.dept = fields.dept;
      if (fields.lab_name) updateData.lab_name = fields.lab_name;
      if (fields.usage) updateData.usage = fields.usage;
      if (fields.status) updateData.status = fields.status;
    } else {
      // Parse JSON request
      updateData = await req.json();
    }
    
    // Validate data
    const validationResult = LabSchema.safeParse({
      ...updateData,
      // Add defaults from existing lab for optional fields
      dept: updateData.dept || lab.dept,
      lab_name: updateData.lab_name || lab.lab_name
    });
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Handle image uploads
    if (files.length > 0) {
      const currentImageUrls = lab.image_url ? lab.image_url.split(',') : [];
      const newImageUrls = [];
      
      for (const file of files) {
        // Validate file size (3MB limit)
        if (file.size > 3 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${file.name} exceeds 3MB limit` },
            { status: 400 }
          );
        }
        
        // Save file
        const result = await saveFile(file, `labs/${lab.dept}`, {
          fileType: 'images',
          fileName: `lab_${Date.now()}_${file.name}`
        });
        
        if (result.error) {
          return NextResponse.json({ error: result.error }, { status: 400 });
        }
        
        newImageUrls.push(result.fileName);
      }
      
      // Check if we need to replace or append
      const keepExistingImages = req.headers.get('x-keep-existing-images') === 'true';
      
      if (keepExistingImages) {
        // Append new images to existing ones
        data.image_url = [...currentImageUrls, ...newImageUrls];
      } else {
        // Replace old images with new ones
        // Delete old images
        for (const imageUrl of currentImageUrls) {
          await deleteFile(imageUrl);
        }
        data.image_url = newImageUrls;
      }
    } else if (updateData.image_url !== undefined) {
      // If image_url is explicitly provided in updateData
      data.image_url = updateData.image_url;
    } else {
      // Otherwise keep existing image URLs
      data.image_url = lab.image_url ? lab.image_url.split(',') : [];
    }
    
    // Convert configurations to JSON string
    let configurationsJson = lab.configurations;
    if (data.configurations) {
      configurationsJson = JSON.stringify(data.configurations);
    }
    
    // Convert image_url array to comma-separated string
    const imageUrlString = data.image_url ? data.image_url.join(',') : '';
    
    // Build update query parts
    const updates: string[] = [];
    const values: any[] = [];
    
    // Add fields to update
    if (data.dept !== undefined) {
      updates.push('dept = ?');
      values.push(data.dept);
    }
    
    if (data.lab_name !== undefined) {
      updates.push('lab_name = ?');
      values.push(data.lab_name);
    }
    
    if (data.configurations !== undefined) {
      updates.push('configurations = ?');
      values.push(configurationsJson);
    }
    
    if (data.usage !== undefined) {
      updates.push('usage = ?');
      values.push(data.usage);
    }
    
    if (imageUrlString !== undefined) {
      updates.push('image_url = ?');
      values.push(imageUrlString);
    }
    
    if (data.status !== undefined) {
      updates.push('status = ?');
      values.push(data.status);
    }
    
    // Add updated_by and updated_at
    updates.push('updated_by = ?');
    values.push(user.id);
    
    updates.push('updated_at = NOW()');
    
    // Add lab ID to values
    values.push(id);
    
    // Execute update
    if (updates.length > 0) {
      await execute(`
        UPDATE labs
        SET ${updates.join(', ')}
        WHERE id = ?
      `, values);
    }
    
    // Get the updated lab
    const [updatedLab] = await query<{
      id: number;
      dept: string;
      lab_name: string;
      configurations: string;
      usage: string;
      image_url: string | null;
      status: string;
      created_at: string;
      updated_at: string;
    }>(`
      SELECT 
        id, dept, lab_name, configurations, usage, image_url,
        status, created_at, updated_at
      FROM labs
      WHERE id = ?
    `, [id]);
    
    // Parse configurations JSON and image_url for response
    const parsedLab = {
      ...updatedLab,
      configurations: JSON.parse(updatedLab.configurations || '[]'),
      image_url: updatedLab.image_url ? updatedLab.image_url.split(',') : []
    };
    
    return NextResponse.json({ 
      message: 'Lab updated successfully',
      lab: parsedLab 
    });
    
  } catch (error) {
    console.error('Error updating lab:', error);
    return NextResponse.json(
      { error: 'Failed to update lab' },
      { status: 500 }
    );
  }
}

/**
 * Delete a lab (soft delete)
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get the lab to check ownership/permissions
    const [lab] = await query<{
      id: number;
      image_url: string | null;
    }>(`
      SELECT id, image_url
      FROM labs
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!lab) {
      return NextResponse.json(
        { error: 'Lab not found' },
        { status: 404 }
      );
    }
    
    // Soft delete the lab
    await execute(`
      UPDATE labs
      SET deleted_at = NOW(), deleted_by = ?
      WHERE id = ?
    `, [user.id, id]);
    
    // We could optionally delete associated images here
    // But for recovery purposes, we'll leave them intact
    
    return NextResponse.json({ 
      message: 'Lab deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting lab:', error);
    return NextResponse.json(
      { error: 'Failed to delete lab' },
      { status: 500 }
    );
  }
}
