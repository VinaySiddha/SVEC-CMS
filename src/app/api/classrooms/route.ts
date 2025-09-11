import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';

// Define classroom types
export type ClassroomType = 'seminar' | 'timetable';

// Validation schema for classroom
const ClassroomSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }),
  type: z.enum(['seminar', 'timetable'], { 
    required_error: 'Type is required',
    invalid_type_error: 'Type must be either seminar or timetable'
  }),
  description: z.string().min(3, { message: 'Description must be at least 3 characters' }),
  document_url: z.string().nullable(),
  seating_capacity: z.number().int().positive().nullable().optional(),
  projector: z.boolean().optional().default(false),
  status: z.enum(['active', 'inactive', 'maintenance']).default('active'),
});

type ClassroomData = z.infer<typeof ClassroomSchema>;

/**
 * API endpoint for classrooms
 * GET /api/classrooms - List classrooms
 * POST /api/classrooms - Create a new classroom
 */

/**
 * List classrooms
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const department = url.searchParams.get('dept');
  const type = url.searchParams.get('type') as ClassroomType | null;
  const status = url.searchParams.get('status');
  
  try {
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    const params = [];
    
    if (department) {
      conditions.push('dept = ?');
      params.push(department);
    }
    
    if (type) {
      conditions.push('type = ?');
      params.push(type);
    }
    
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    
    // Get classrooms
    const classrooms = await query(`
      SELECT 
        id, dept, type, description, document_url, capacity,
        status, created_at, updated_at
      FROM classrooms
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `, params);
    
    return NextResponse.json({ classrooms });
    
  } catch (error) {
    console.error('Error fetching classrooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch classrooms' },
      { status: 500 }
    );
  }
}

/**
 * Create a new classroom
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
    
    let classroomData: ClassroomData;
    let file: File | null = null;
    
    if (contentType.includes('multipart/form-data')) {
      // Parse multipart form data (file upload)
      const { fields, files } = await parseMultipartForm(req);
      
      // Get the file
      file = files.file || null;
      
      // Convert seating capacity to number if provided
      let seatingCapacity = null;
      if (fields.seating_capacity && !isNaN(parseInt(fields.seating_capacity))) {
        seatingCapacity = parseInt(fields.seating_capacity);
      }
      
      // Handle projector checkbox
      const projector = fields.projector === 'true' || fields.projector === '1';
      
      // Create classroom data from fields
      classroomData = {
        dept: fields.dept || '',
        type: fields.type as ClassroomType,
        description: fields.description || '',
        document_url: null, // Will be set after file upload
        seating_capacity: seatingCapacity,
        projector: projector,
        status: (fields.status as any) || 'active',
      };
    } else {
      // Parse JSON request
      classroomData = await req.json();
    }
    
    // Validate data
    const validationResult = ClassroomSchema.safeParse(classroomData);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // For seminar type, seating capacity is required
    if (data.type === 'seminar' && (data.seating_capacity === null || data.seating_capacity === undefined)) {
      return NextResponse.json(
        { error: 'Seating capacity is required for seminar type' },
        { status: 400 }
      );
    }
    
    // For timetable type, document is required
    if (data.type === 'timetable' && !file && !data.document_url) {
      return NextResponse.json(
        { error: 'Document is required for timetable type' },
        { status: 400 }
      );
    }
    
    // If file was uploaded, save it
    if (file) {
      const result = await saveFile(file, `classrooms/${data.dept}`, {
        fileType: 'documents',
        fileName: `${data.type}_${Date.now()}_${file.name}`
      });
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      data.document_url = result.fileName;
    }
    
    // Insert into database
    const result = await execute<{ insertId: number }>(`
      INSERT INTO classrooms (
        dept, type, description, document_url, seating_capacity,
        projector, status, created_by
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?
      )
    `, [
      data.dept,
      data.type,
      data.description,
      data.document_url,
      data.seating_capacity,
      data.projector,
      data.status,
      user.id
    ]);
    
    // Fetch the created classroom
    const [classroom] = await query(`
      SELECT 
        id, dept, type, description, document_url, seating_capacity,
        projector, status, created_at, updated_at
      FROM classrooms
      WHERE id = ?
    `, [result.insertId]);
    
    return NextResponse.json({ 
      message: 'Classroom created successfully',
      classroom 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating classroom:', error);
    return NextResponse.json(
      { error: 'Failed to create classroom' },
      { status: 500 }
    );
  }
}
