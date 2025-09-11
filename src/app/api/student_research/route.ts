import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { execute, query } from '@/lib/db';
import { validateResearchProgram, validateModuleAccess } from '@/lib/validation/accessValidation';
import { MODULE_TYPES } from '@/lib/deptRules';

// Validation schema for student research project
const StudentResearchSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string().min(10),
  students: z.array(z.string()).min(1),
  supervisor: z.string().optional(),
  research_type: z.string().min(1),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/),
  publication_link: z.string().url().optional().nullable(),
  thumbnail_url: z.string().url().optional().nullable(),
  status: z.enum(['ongoing', 'completed', 'published']).default('ongoing'),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

type StudentResearch = z.infer<typeof StudentResearchSchema>;

/**
 * API endpoint for student research projects
 * GET /api/student_research
 * POST /api/student_research
 */

/**
 * List student research projects
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const department = url.searchParams.get('dept');
  const type = url.searchParams.get('type');
  const year = url.searchParams.get('year');
  const status = url.searchParams.get('status');
  
  try {
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    const params = [];
    
    if (department) {
      conditions.push('department = ?');
      params.push(department);
    }
    
    if (type) {
      conditions.push('research_type = ?');
      params.push(type);
    }
    
    if (year) {
      conditions.push('academic_year = ?');
      params.push(year);
    }
    
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    
    // Get research projects
    const projects = await query(`
      SELECT 
        id, title, description, students, supervisor, 
        research_type, academic_year, publication_link,
        thumbnail_url, status, department, is_featured, is_active,
        created_at, updated_at
      FROM student_research
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
    `, params);
    
    return NextResponse.json({ projects });
    
  } catch (error) {
    console.error('Error fetching student research projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student research projects' },
      { status: 500 }
    );
  }
}

/**
 * Create a new student research project
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // First validate module access
    const moduleValidation = validateModuleAccess(MODULE_TYPES.STUDENT_RESEARCH, user);
    if (!moduleValidation.isValid) {
      return moduleValidation.response;
    }
    
    // Parse and validate request body
    const body = await req.json();
    const validationResult = StudentResearchSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const data = validationResult.data;
    
    // Validate research type based on department rules
    const typeValidation = validateResearchProgram(data.research_type, user);
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
      INSERT INTO student_research (
        title, description, students, supervisor, research_type,
        academic_year, publication_link, thumbnail_url, status,
        department, is_featured, is_active, created_by
      ) VALUES (
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?
      )
    `, [
      data.title,
      data.description,
      JSON.stringify(data.students),
      data.supervisor || null,
      data.research_type,
      data.academic_year,
      data.publication_link || null,
      data.thumbnail_url || null,
      data.status,
      department,
      data.is_featured,
      data.is_active,
      user.id
    ]);
    
    // Fetch the created project
    const [project] = await query<{
      id: number;
      title: string;
      description: string;
      students: string;
      supervisor?: string;
      research_type: string;
      academic_year: string;
      publication_link?: string;
      thumbnail_url?: string;
      status: string;
      department: string;
      is_featured: boolean;
      is_active: boolean;
      created_at: Date;
      updated_at: Date;
    }>(`
      SELECT 
        id, title, description, students, supervisor, 
        research_type, academic_year, publication_link,
        thumbnail_url, status, department, is_featured, is_active,
        created_at, updated_at
      FROM student_research
      WHERE id = ?
    `, [result.insertId]);
    
    // Parse students JSON string to array
    if (project && project.students) {
      project.students = JSON.parse(project.students);
    }
    
    return NextResponse.json({ 
      message: 'Student research project created successfully',
      project 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating student research project:', error);
    return NextResponse.json(
      { error: 'Failed to create student research project' },
      { status: 500 }
    );
  }
}
