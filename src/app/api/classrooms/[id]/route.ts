import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { parseMultipartForm, saveFile, deleteFile } from '@/utils/file-upload';
import { ClassroomType } from '../route';

// Validation schema for classroom update
const ClassroomUpdateSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }).optional(),
  type: z.enum(['seminar', 'timetable']).optional(),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }).optional(),
  document_url: z.string().nullable().optional(),
  seating_capacity: z.number().int().positive().nullable().optional(),
  projector: z.boolean().optional(),
  status: z.enum(['active', 'inactive', 'maintenance']).optional(),
});

/**
 * API endpoints for a specific classroom
 * GET /api/classrooms/[id]
 * PUT /api/classrooms/[id]
 * DELETE /api/classrooms/[id]
 */

/**
 * Get a specific classroom
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Get the classroom
    const [classroom] = await query<{
      id: number;
      dept: string;
      type: string;
      description: string;
      document_url: string | null;
      seating_capacity: number | null;
      projector: boolean;
      status: string;
      created_at: string;
      updated_at: string;
    }>(`
      SELECT 
        id, dept, type, description, document_url, seating_capacity,
        projector, status, created_at, updated_at
      FROM classrooms
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!classroom) {
      return NextResponse.json(
        { error: 'Classroom not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ classroom });
    
  } catch (error) {
    console.error('Error fetching classroom:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classroom' },
      { status: 500 }
    );
  }
}

/**
 * Update a classroom
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
    
    // Get the classroom to check ownership/permissions
    const [classroom] = await query<{
      id: number;
      dept: string;
      type: string;
      document_url: string | null;
    }>(`
      SELECT id, dept, type, document_url
      FROM classrooms
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!classroom) {
      return NextResponse.json(
        { error: 'Classroom not found' },
        { status: 404 }
      );
    }
    
    // Check if the request is multipart (with file) or JSON
    const contentType = req.headers.get('content-type') || '';
    
    let updateData: any = {};
    let file: File | null = null;
    
    if (contentType.includes('multipart/form-data')) {
      // Parse multipart form data (file upload)
      const { fields, files } = await parseMultipartForm(req);
      
      // Get the file
      file = files.file || null;
      
      // Convert capacity to number if provided
      if (fields.capacity && !isNaN(parseInt(fields.capacity))) {
        updateData.capacity = parseInt(fields.capacity);
      }
      
      // Add other fields
      if (fields.dept) updateData.dept = fields.dept;
      if (fields.type) updateData.type = fields.type as ClassroomType;
      if (fields.description) updateData.description = fields.description;
      if (fields.status) updateData.status = fields.status;
    } else {
      // Parse JSON request
      updateData = await req.json();
    }
    
    // Validate data
    const validationResult = ClassroomUpdateSchema.safeParse(updateData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Check type-specific validation
    const finalType = data.type || classroom.type;
    
    // For seminar type, seating_capacity is required
    if (finalType === 'seminar' && data.seating_capacity === undefined && data.seating_capacity === null) {
      // If changing to seminar type, seating_capacity is required
      if (classroom.type !== 'seminar') {
        return NextResponse.json(
          { error: 'Seating capacity is required for seminar type' },
          { status: 400 }
        );
      }
    }
    
    // If file was uploaded, save it
    if (file) {
      const result = await saveFile(file, `classrooms/${classroom.dept}`, {
        fileType: 'documents',
        fileName: `${finalType}_${Date.now()}_${file.name}`
      });
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      data.document_url = result.fileName;
      
      // Delete old file if exists
      if (classroom.document_url) {
        await deleteFile(classroom.document_url);
      }
    }
    
    // Build update query parts
    const updates: string[] = [];
    const values: any[] = [];
    
    // Add each field to update
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    // Add updated_by and updated_at
    updates.push('updated_by = ?');
    values.push(user.id);
    
    updates.push('updated_at = NOW()');
    
    // Add classroom ID to values
    values.push(id);
    
    // Execute update
    if (updates.length > 0) {
      await execute(`
        UPDATE classrooms
        SET ${updates.join(', ')}
        WHERE id = ?
      `, values);
    }
    
    // Get the updated classroom
    const [updatedClassroom] = await query(`
      SELECT 
        id, dept, type, description, document_url, capacity,
        status, created_at, updated_at
      FROM classrooms
      WHERE id = ?
    `, [id]);
    
    return NextResponse.json({ 
      message: 'Classroom updated successfully',
      classroom: updatedClassroom 
    });
    
  } catch (error) {
    console.error('Error updating classroom:', error);
    return NextResponse.json(
      { error: 'Failed to update classroom' },
      { status: 500 }
    );
  }
}

/**
 * Delete a classroom (soft delete)
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
    
    // Get the classroom to check ownership/permissions
    const [classroom] = await query<{
      id: number;
      document_url: string | null;
    }>(`
      SELECT id, document_url
      FROM classrooms
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!classroom) {
      return NextResponse.json(
        { error: 'Classroom not found' },
        { status: 404 }
      );
    }
    
    // Soft delete the classroom
    await execute(`
      UPDATE classrooms
      SET deleted_at = NOW(), deleted_by = ?
      WHERE id = ?
    `, [user.id, id]);
    
    // Optionally delete the file from disk
    if (classroom.document_url) {
      await deleteFile(classroom.document_url);
    }
    
    return NextResponse.json({ 
      message: 'Classroom deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting classroom:', error);
    return NextResponse.json(
      { error: 'Failed to delete classroom' },
      { status: 500 }
    );
  }
}
