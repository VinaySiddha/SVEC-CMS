import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, AuthUser } from '@/lib/auth';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';
import { query } from '@/lib/db';
import { boardOfStudiesSchema } from '@/lib/entityConfig';
import { z } from 'zod';

// Validation schema for form input
const createSchema = z.object({
  dept: z.string().min(1, "Department is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  academic_year: z.string().max(16).optional()
});

/**
 * GET /api/board_of_studies
 * Lists all board of studies documents with filtering, pagination, and sorting
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 10;
    const dept = searchParams.get('dept');
    
    // Authenticate user (optional)
    const authHeader = req.headers.get('authorization');
    let user: AuthUser | null = null;
    
    if (authHeader) {
      // Use auth header if provided (for API calls)
      try {
        user = await requireAuth(req);
      } catch (e) {
        // Continue as public user if auth fails
      }
    }
    
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    let params: any[] = [];
    
    // Filter by department if specified
    if (dept) {
      conditions.push('dept = ?');
      params.push(dept);
    }
    
    // Public users can only see approved documents
    if (!user) {
      conditions.push('status = ?');
      params.push('approved');
    }
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Get total count
    const countResults = await query<{total: number}>(
      `SELECT COUNT(*) as total FROM board_of_studies WHERE ${conditions.join(' AND ')}`,
      params
    );
    const total = Array.isArray(countResults) && countResults.length > 0 
      ? (countResults[0] as {total: number}).total 
      : 0;
    
    // Get board of studies documents
    const documents = await query(
      `SELECT * FROM board_of_studies 
       WHERE ${conditions.join(' AND ')} 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    
    // Return response
    return NextResponse.json({
      data: documents,
      meta: {
        total,
        page,
        limit
      }
    });
  } catch (error: any) {
    console.error('Error getting board of studies documents:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve board of studies documents' },
      { status: error.status || 500 }
    );
  }
}

/**
 * POST /api/board_of_studies
 * Creates a new board of studies document
 */
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Parse multipart form data
    const { fields, files } = await parseMultipartForm(req);
    
    // Validate form fields
    const validationResult = createSchema.safeParse(fields);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors;
      return NextResponse.json({ 
        error: errors[0].message || 'Validation failed' 
      }, { status: 400 });
    }
    
    // Prepare data for insertion
    const documentData: {
      dept: string;
      description: string;
      academic_year: string | null;
      document_url: string | null;
      status: string;
    } = {
      dept: fields.dept,
      description: fields.description,
      academic_year: fields.academic_year || null,
      document_url: null,
      status: 'pending'
    };
    
    // Handle document upload if provided
    if (files.document) {
      // Validate file is a PDF
      if (files.document.type !== 'application/pdf') {
        return NextResponse.json({ 
          error: 'Only PDF documents are allowed' 
        }, { status: 400 });
      }
      
      // Validate file size (max 5MB)
      if (files.document.size > 5 * 1024 * 1024) {
        return NextResponse.json({ 
          error: 'Document size must be less than 5MB' 
        }, { status: 400 });
      }
      
      // Save file
      const result = await saveFile(files.document, 'board-of-studies', {
        fileType: 'documents'
      });
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      documentData.document_url = result.fileName;
    }
    
    // Insert into database
    const insertResult = await query<{insertId: number}>(
      `INSERT INTO board_of_studies 
       (dept, description, document_url, academic_year, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        documentData.dept,
        documentData.description,
        documentData.document_url,
        documentData.academic_year,
        documentData.status
      ]
    );
    
    // Get the inserted ID
    const insertId = Array.isArray(insertResult) && insertResult.length > 0 
      ? (insertResult[0] as {insertId: number}).insertId
      : 0;
      
    if (!insertId) {
      throw new Error('Failed to insert board of studies document');
    }
    
    // Get the inserted document
    const documents = await query(
      'SELECT * FROM board_of_studies WHERE id = ?', 
      [insertId]
    );
    
    const document = Array.isArray(documents) && documents.length > 0 
      ? documents[0] 
      : null;
    
    return NextResponse.json({ 
      message: 'Board of studies document created successfully',
      data: document
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating board of studies document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create board of studies document' },
      { status: error.status || 500 }
    );
  }
}

/**
 * PUT /api/board_of_studies?id=1
 * Updates an existing board of studies document
 */
export async function PUT(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Get document ID from query parameters
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }
    
    // Check if document exists
    const existingDocs = await query('SELECT * FROM board_of_studies WHERE id = ?', [id]);
    
    if (!Array.isArray(existingDocs) || existingDocs.length === 0) {
      return NextResponse.json({ error: 'Board of studies document not found' }, { status: 404 });
    }
    
    const existingDoc = existingDocs[0] as Record<string, any>;
    
    // Check if user has permission to update this document
    if (user.role !== 'admin' && user.department !== existingDoc.dept) {
      return NextResponse.json({ error: 'You do not have permission to update this document' }, { status: 403 });
    }
    
    // Parse multipart form data
    const { fields, files } = await parseMultipartForm(req);
    
    // Prepare update fields and values
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    // Only update fields that are provided
    if (fields.dept !== undefined) {
      updateFields.push('dept = ?');
      updateValues.push(fields.dept);
    }
    
    if (fields.description !== undefined && fields.description.length >= 10) {
      updateFields.push('description = ?');
      updateValues.push(fields.description);
    }
    
    if (fields.academic_year !== undefined) {
      updateFields.push('academic_year = ?');
      updateValues.push(fields.academic_year || null);
    }
    
    if (fields.status !== undefined && user.role === 'admin') {
      updateFields.push('status = ?');
      updateValues.push(fields.status);
    }
    
    // Handle document upload if provided
    if (files.document) {
      // Validate file is a PDF
      if (files.document.type !== 'application/pdf') {
        return NextResponse.json({ 
          error: 'Only PDF documents are allowed' 
        }, { status: 400 });
      }
      
      // Validate file size (max 5MB)
      if (files.document.size > 5 * 1024 * 1024) {
        return NextResponse.json({ 
          error: 'Document size must be less than 5MB' 
        }, { status: 400 });
      }
      
      // Save file
      const result = await saveFile(files.document, 'board-of-studies', {
        fileType: 'documents'
      });
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      updateFields.push('document_url = ?');
      updateValues.push(result.fileName);
    }
    
    // If no fields to update, return early
    if (updateFields.length === 0) {
      return NextResponse.json({ 
        message: 'No changes to update',
        data: existingDoc
      });
    }
    
    // Add updated_at timestamp
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    
    // Add ID to the end of values array
    updateValues.push(id);
    
    // Update database
    await query(
      `UPDATE board_of_studies 
       SET ${updateFields.join(', ')}
       WHERE id = ?`,
      updateValues
    );
    
    // Get the updated document
    const updatedDocs = await query('SELECT * FROM board_of_studies WHERE id = ?', [id]);
    const updatedDoc = Array.isArray(updatedDocs) && updatedDocs.length > 0 
      ? updatedDocs[0] 
      : null;
    
    return NextResponse.json({ 
      message: 'Board of studies document updated successfully',
      data: updatedDoc
    });
  } catch (error: any) {
    console.error('Error updating board of studies document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update board of studies document' },
      { status: error.status || 500 }
    );
  }
}

/**
 * DELETE /api/board_of_studies?id=1
 * Soft deletes an existing board of studies document
 */
export async function DELETE(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Get document ID from query parameters
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Document ID is required' }, { status: 400 });
    }
    
    // Check if document exists
    const existingDocs = await query('SELECT * FROM board_of_studies WHERE id = ?', [id]);
    
    if (!Array.isArray(existingDocs) || existingDocs.length === 0) {
      return NextResponse.json({ error: 'Board of studies document not found' }, { status: 404 });
    }
    
    const existingDoc = existingDocs[0] as Record<string, any>;
    
    // Check if user has permission to delete this document
    if (user.role !== 'admin' && user.department !== existingDoc.dept) {
      return NextResponse.json({ error: 'You do not have permission to delete this document' }, { status: 403 });
    }
    
    // Soft delete by setting deleted_at timestamp
    await query(
      'UPDATE board_of_studies SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ 
      message: 'Board of studies document deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting board of studies document:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete board of studies document' },
      { status: error.status || 500 }
    );
  }
}
