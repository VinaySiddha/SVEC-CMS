import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { validateSyllabusType } from '@/lib/validation/accessValidation';
import { MODULE_TYPES } from '@/lib/deptRules';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';
import { isValidSyllabusType } from '@/utils/syllabus-utils';

// Validation schema for syllabus document creation
const SyllabusDocumentSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().optional(),
  file_url: z.string().url().nullable(),
  document_url: z.string().nullable(),
  type: z.string().min(1),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/),
  semester: z.string().optional(),
  regulation: z.string().optional(),
  is_active: z.boolean().default(true),
});

type SyllabusDocument = z.infer<typeof SyllabusDocumentSchema>;

/**
 * API endpoint for syllabus documents
 * GET /api/syllabus_documents
 * POST /api/syllabus_documents
 */

/**
 * List syllabus documents
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const department = url.searchParams.get('dept');
  const type = url.searchParams.get('type');
  const year = url.searchParams.get('year');
  
  try {
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    const params = [];
    
    if (department) {
      conditions.push('department = ?');
      params.push(department);
    }
    
    if (type) {
      conditions.push('type = ?');
      params.push(type);
    }
    
    if (year) {
      conditions.push('academic_year = ?');
      params.push(year);
    }
    
    // Get syllabus documents
    const documents = await query(`
      SELECT 
        id, title, description, file_url, type, academic_year,
        semester, regulation, department, is_active,
        created_at, updated_at
      FROM syllabus_documents
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `, params);
    
    return NextResponse.json({ documents });
    
  } catch (error) {
    console.error('Error fetching syllabus documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch syllabus documents' },
      { status: 500 }
    );
  }
}

/**
 * Create a new syllabus document
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validationResult = SyllabusDocumentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Validate syllabus type based on department rules
    const typeValidation = validateSyllabusType(data.type, user);
    if (!typeValidation.isValid) {
      return typeValidation.response;
    }
    
    // Determine department (admin can specify department, dept users use their own)
    const department = user.role === 'admin' && body.department 
      ? body.department 
      : user.department;
      
    if (!department) {
      return NextResponse.json(
        { error: 'Department is required' },
        { status: 400 }
      );
    }
    
    // Insert into database
    const result = await execute<{ insertId: number }>(`
      INSERT INTO syllabus_documents (
        title, description, file_url, type, academic_year,
        semester, regulation, department, is_active,
        created_by
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?
      )
    `, [
      data.title,
      data.description || null,
      data.file_url,
      data.type,
      data.academic_year,
      data.semester || null,
      data.regulation || null,
      department,
      data.is_active,
      user.id
    ]);
    
    // Fetch the created document
    const [document] = await query(`
      SELECT 
        id, title, description, file_url, type, academic_year,
        semester, regulation, department, is_active,
        created_at, updated_at
      FROM syllabus_documents
      WHERE id = ?
    `, [result.insertId]);
    
    return NextResponse.json({ 
      message: 'Syllabus document created successfully',
      document 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating syllabus document:', error);
    return NextResponse.json(
      { error: 'Failed to create syllabus document' },
      { status: 500 }
    );
  }
}
