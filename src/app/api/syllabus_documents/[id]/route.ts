import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { validateSyllabusType } from '@/lib/validation/accessValidation';
import { deleteFile } from '@/utils/file-upload';

// Validation schema for syllabus document update
const SyllabusDocumentUpdateSchema = z.object({
  title: z.string().min(5).max(255).optional(),
  description: z.string().optional().nullable(),
  file_url: z.string().url().optional().nullable(),
  type: z.string().min(1).optional(),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/).optional(),
  semester: z.string().optional().nullable(),
  regulation: z.string().optional().nullable(),
  is_active: z.boolean().optional(),
});

/**
 * API endpoints for a specific syllabus document
 * GET /api/syllabus_documents/[id]
 * PUT /api/syllabus_documents/[id]
 * DELETE /api/syllabus_documents/[id]
 */

/**
 * Get a specific syllabus document
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  try {
    // Get the document
    const [document] = await query(`
      SELECT 
        id, title, description, file_url, type, academic_year,
        semester, regulation, department, is_active,
        created_at, updated_at
      FROM syllabus_documents
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Syllabus document not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ document });
    
  } catch (error) {
    console.error('Error fetching syllabus document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch syllabus document' },
      { status: 500 }
    );
  }
}

/**
 * Update a syllabus document
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
    
    // Get the document to check ownership/permissions
    const [document] = await query<{
      id: number;
      department: string;
      type: string;
      file_url: string;
    }>(`
      SELECT id, department, type, file_url
      FROM syllabus_documents
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Syllabus document not found' },
        { status: 404 }
      );
    }
    
    // Check permissions (admin or department user)
    if (user.role !== 'admin' && user.department !== document.department) {
      return NextResponse.json(
        { error: 'You do not have permission to update this document' },
        { status: 403 }
      );
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validationResult = SyllabusDocumentUpdateSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Validate syllabus type if it's being changed
    if (data.type && data.type !== document.type) {
      const typeValidation = validateSyllabusType(data.type, user);
      if (!typeValidation.isValid) {
        return typeValidation.response;
      }
    }
    
    // Build update query parts
    const updates: string[] = [];
    const values: any[] = [];
    
    // Add each field to update
    Object.entries(data).forEach(([key, value]) => {
      updates.push(`${key} = ?`);
      values.push(value);
    });
    
    // Add updated_by and updated_at
    updates.push('updated_by = ?');
    values.push(user.id);
    
    updates.push('updated_at = NOW()');
    
    // Add document ID to values
    values.push(id);
    
    // Execute update
    await execute(`
      UPDATE syllabus_documents
      SET ${updates.join(', ')}
      WHERE id = ?
    `, values);
    
    // Get the updated document
    const [updatedDocument] = await query(`
      SELECT 
        id, title, description, file_url, type, academic_year,
        semester, regulation, department, is_active,
        created_at, updated_at
      FROM syllabus_documents
      WHERE id = ?
    `, [id]);
    
    return NextResponse.json({ 
      message: 'Syllabus document updated successfully',
      document: updatedDocument 
    });
    
  } catch (error) {
    console.error('Error updating syllabus document:', error);
    return NextResponse.json(
      { error: 'Failed to update syllabus document' },
      { status: 500 }
    );
  }
}

/**
 * Delete a syllabus document (soft delete)
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
    
    // Get the document to check ownership/permissions
    const [document] = await query<{
      id: number;
      department: string;
      file_url: string;
    }>(`
      SELECT id, department, file_url
      FROM syllabus_documents
      WHERE id = ? AND deleted_at IS NULL
    `, [id]);
    
    if (!document) {
      return NextResponse.json(
        { error: 'Syllabus document not found' },
        { status: 404 }
      );
    }
    
    // Check permissions (admin or department user)
    if (user.role !== 'admin' && user.department !== document.department) {
      return NextResponse.json(
        { error: 'You do not have permission to delete this document' },
        { status: 403 }
      );
    }
    
    // Soft delete the document
    await execute(`
      UPDATE syllabus_documents
      SET deleted_at = NOW(), deleted_by = ?
      WHERE id = ?
    `, [user.id, id]);
    
    // Optionally delete the file from disk (uncomment if needed)
    // if (document.file_url) {
    //   await deleteFile(document.file_url);
    // }
    
    return NextResponse.json({ 
      message: 'Syllabus document deleted successfully' 
    });
    
  } catch (error) {
    console.error('Error deleting syllabus document:', error);
    return NextResponse.json(
      { error: 'Failed to delete syllabus document' },
      { status: 500 }
    );
  }
}
