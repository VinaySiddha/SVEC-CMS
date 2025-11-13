import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';
import { RowDataPacket, OkPacket } from 'mysql2';
import { deleteRecordFiles, deleteReplacedFiles } from '@/utils/file-management';

// Department modules mapping
const DEPARTMENT_MODULES: Record<string, Record<string, string>> = {
  'cse-ai': {
    'board-of-studies': 'cai_board_of_studies',
    'contact': 'cai_contact',
    'department-info': 'cai_department_info',
    'department-library': 'cai_department_library',
    'eresources': 'cai_eresources',
    'extracurricular-activities': 'cai_extracurricular_activities',
    'extra-curricular': 'cai_extra_curricular',
    'faculty-achievements': 'cai_faculty_achievements',
    'faculty-development-programs': 'cai_faculty_development_programs',
    'faculty': 'cai_faculty',
    'hackathons': 'cai_hackathons',
    'hackathon-gallery': 'cai_hackathon_gallery',
    'handbooks': 'cai_handbooks',
    'merit-scholarships': 'cai_merit_scholarships',
    'newsletters': 'cai_newsletters',
    'physical-facilities': 'cai_physical_facilities',
    'placement-batches': 'cai_placement_batches',
    'placement-gallery': 'cai_placement_gallery',
    'scud-activities': 'cai_scud_activities',
    'scud-gallery': 'cai_scud_gallery',
    'staff': 'cai_staff',
    'student-achievements': 'cai_student_achievements',
    'technical-association': 'cai_technical_association',
    'training-activities': 'cai_training_activities',
    'training-gallery': 'cai_training_gallery',
    'workshops': 'cai_workshops'
  },
  'ece': {
    'board-of-studies': 'ece_board_of_studies',
    'clubs': 'ece_clubs',
    'extracurricular-activities': 'ece_extracurricular_activities',
    'faculty-achievements': 'ece_faculty_achievements',
    'faculty-data': 'ece_faculty_data',
    'faculty-innovations': 'ece_faculty_innovations',
    'fdp': 'ece_fdp',
    'handbooks': 'ece_handbooks',
    'mous': 'ece_mous',
    'newsletters': 'ece_newletters',
    'ntfaculty': 'ece_nonteaching_faculty',
    'physical-facilities': 'ece_physical_facilities',
    'placements': 'ece_placements',
    'scholarships-toppers': 'ece_scholarships_toppers',
    'syllabus': 'ece_syllabus',
    'teaching-faculty': 'ece_teaching_faculty',
    'technical-association': 'ece_technicalAssociation_trainingActivities',
    'workshops': 'ece_worshops_gl'
  },
  'civil': {
    'board-of-studies': 'bos_civil_meeting_minutes',
    'consultancy': 'civil_consultancy',
    'extra-curricular': 'civil_extra_curricular_activities',
    'newsletters': 'civil_newsletters',
    'physical-facilities': 'civil_physical_facilities',
    'student-achievements': 'civil_student_achievements',
    'syllabus': 'civil_syllabus',
    'technical-association': 'civil_technical_association',
    'workshops': 'civil_workshops'
  },
  'mech': {
    'faculty': 'mech_faculty',
    'faculty-achievements': 'mech_facultyachievements',
    'faculty-methods': 'mech_facultyTLmethods',
    'laboratories': 'mech_laboratories',
    'library': 'mech_library',
    'magazines': 'mech_magazines',
    'mous': 'mech_mous',
    'newsletters': 'mech_newsletters',
    'placements': 'mech_placements',
    'project-research': 'mech_project_research',
    'student-achievements': 'mech_studentachievements',
    'syllabus': 'mech_syllabus',
    'technical-association': 'mech_technicalassociation',
    'workshops': 'mech_workshops'
  },
  'cse': {
    'department-library': 'cse_department_library',
    'eresources': 'cse_eresources',
    'faculty-achievements': 'cse_faculty_achievements',
    'student-achievements': 'cse_student_achievements',
    'syllabus': 'cse_syllabus'
  },
  'cst': {
    'bos-members': 'cst_bos_members',
    'bos-minutes': 'cst_bos_minutes',
    'department-library': 'cst_department_library',
    'department-overview': 'cst_department_overview',
    'eresources': 'cst_eresources',
    'extra-curricular': 'cst_extra_curricular',
    'faculty': 'cst_faculty',
    'faculty-achievements': 'cst_faculty_achievements',
    'faculty-development': 'cst_faculty_development',
    'hackathons': 'cst_hackathons',
    'handbooks': 'cst_handbooks',
    'industry-programs': 'cst_industry_programs',
    'merit-scholarships': 'cst_merit_scholarships',
    'mous': 'cst_mous',
    'newsletters': 'cst_newsletters',
    'non-teaching-faculty': 'cst_non_teaching_faculty',
    'physical-facilities': 'cst_physical_facilities',
    'placements': 'cst_placements',
    'sahaya-events': 'cst_sahaya_events',
    'scud-activities': 'cst_scud_activities',
    'student-achievements': 'cst_student_achievements',
    'syllabus': 'cst_syllabus',
    'technical-faculty': 'cst_technical_faculty',
    'training-activities': 'cst_training_activities'
  },
  'eee': {
    'syllabus': 'EEE_Syllabus'
  },
  'mba': {
    'faculty': 'faculty_profiles'
  },
  'bsh': {
    'activities': 'bsh_activities',
    'board-of-studies': 'bsh_board_of_studies',
    'department-documents': 'bsh_department_documents',
    'department-profile': 'bsh_department_profile',
    'faculty': 'bsh_faculty',
    'faculty-achievements': 'bsh_faculty_achievements',
    'faculty-paper-presentations': 'bsh_faculty_paper_presentations',
    'laboratories': 'bsh_laboratories',
    'results': 'bsh_results',
    'student-achievements': 'bsh_student_achievements',
    'non-teaching-faculty': 'non_teaching_bsh_faculty'
  },
  'ect': {
    'clubs': 'ect_clubs',
    'extracurricular-activities': 'ect_extracurricular_activities',
    'faculty': 'ect_faculty',
    'faculty-innovations': 'ect_facultyinnovations',
    'faculty-achievements': 'ect_faculty_achievements',
    'fdp': 'ect_fdp',
    'handbooks': 'ect_handbooks',
    'mous': 'ect_mous',
    'newsletters': 'ect_newsletters',
    'physical-facilities': 'ect_physical_facilities',
    'placements': 'ect_placements',
    'scholarships-toppers': 'ect_scholarships_toppers',
    'syllabus': 'ect_syllabus',
    'technical-association': 'ect_technical_association',
    'training-activities': 'ect_training_activities',
    'workshop': 'ect_workshop_gl'
  },
  'aiml': {
    'classrooms': 'aiml_classrooms',
    'class-time-tables': 'aiml_class_time_tables',
    'laboratories': 'aiml_laboratories',
    'other-laboratories': 'aiml_other_laboratories',
    'seminar-halls': 'aiml_seminar_halls',
    'student-achievements': 'aiml_student_achievements'
  },
  'cse-ds': {
    'board-of-studies': 'ds_board_of_studies',
    'bos-meeting-minutes': 'ds_bos_meeting_minutes',
    'contact': 'ds_contact',
    'department-library': 'ds_department_library',
    'department-profile': 'ds_department_profile',
    'eresources': 'ds_eresources',
    'extracurricular': 'ds_extracurricular',
    'faculty': 'ds_faculty',
    'faculty-achievements': 'ds_faculty_achievements',
    'faculty-development': 'ds_faculty_development',
    'hackathons': 'ds_hackathons',
    'handbooks': 'ds_handbooks',
    'merit-scholarships': 'ds_merit_scholarships',
    'mous': 'ds_mous',
    'newsletters': 'ds_newsletters',
    'non-teaching-staff': 'ds_non_teaching_staff',
    'physical-facilities': 'ds_physical_facilities',
    'placements': 'ds_placements',
    'student-achievements': 'ds_student_achievements',
    'syllabus': 'ds_syllabus',
    'technical-association': 'ds_technical_association',
    'training-activities': 'ds_training_activities',
    'workshops': 'ds_workshops'
  }
};

// Verify user authentication and department access
async function verifyDepartmentAccess(request: NextRequest, department: string) {
  const authHeader = request.headers.get('Authorization');
  // console.log('Auth Header:', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.substring(7);
  // console.log('Token:', token);
  const user = verifyToken(token);
  
  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  // Super admin can access all departments
  if (user.role === 'super_admin') {
    return { user };
  }

  // Allow any authenticated user access (remove department restriction)
  if (user.role === 'admin' || user.role === 'dept') {
    return { user };
  }

  return { error: 'Insufficient permissions', status: 403 };
}

// GET - Fetch records from a department module
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '1000');
    const search = searchParams.get('search') || '';

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    const offset = (page - 1) * limit;
    
    // Build search condition
    let searchCondition = '';
    let queryParams: any[] = [];
    if (search) {
      // Get table columns for search
      const columns = await query<RowDataPacket[]>(
        'SHOW COLUMNS FROM ??', [tableName]
      );
      
      const textColumns = columns
        .filter((col: any) => ['varchar', 'text', 'longtext'].some(type => 
          col.Type.toLowerCase().includes(type)
        ))
        .map((col: any) => col.Field);

      if (textColumns.length > 0) {
        searchCondition = ` WHERE ${textColumns.map(col => `${col} LIKE ?`).join(' OR ')}`;
        queryParams = textColumns.map(() => `%${search}%`);
      }
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM ${tableName}${searchCondition}`;
    const countResult = await query<RowDataPacket[]>(countQuery, queryParams);
    const total = (countResult[0] as any).total;

    // Get records
    const dataQuery = `SELECT * FROM ${tableName}${searchCondition} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
    const records = await query<RowDataPacket[]>(dataQuery, queryParams);

    return NextResponse.json({
      success: true,
      data: {
        records,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new record in department module
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const body = await request.json();

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Remove system fields
    delete body.id;
    delete body.created_at;
    delete body.updated_at;

    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Build insert query
    const columns = Object.keys(body);
    const values = Object.values(body);
    const placeholders = columns.map(() => '?').join(', ');

    const insertQuery = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
    const result = await query<OkPacket>(insertQuery, values);

    // Fetch the created record
    const newRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [(result as any).insertId]
    );

    return NextResponse.json({
      success: true,
      data: newRecord[0],
      message: 'Record created successfully'
    });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update existing record in department module
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Remove system fields
    delete body.id;
    delete body.created_at;
    delete body.updated_at;

    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Get existing record for file comparison
    const existingRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const oldRecordData = existingRecord[0];
    
    // Delete replaced files before updating
    try {
      await deleteReplacedFiles(oldRecordData, body);
      console.log(`🔄 Successfully cleaned up replaced files for ${dept}/${module} record ID: ${id}`);
    } catch (fileError) {
      console.error(`⚠️ Error cleaning up replaced files for ${dept}/${module} record ID: ${id}`, fileError);
      // Continue with database update even if file cleanup fails
    }

    // Build update query
    const columns = Object.keys(body);
    const values = Object.values(body);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    const updateQuery = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
    await query(updateQuery, [...values, id]);

    // Fetch the updated record
    const updatedRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (updatedRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedRecord[0],
      message: 'Record updated successfully'
    });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete record from department module
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Record ID is required' }, { status: 400 });
    }

    // Verify access
    const authResult = await verifyDepartmentAccess(request, dept);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    // Get table name
    const tableName = DEPARTMENT_MODULES[dept]?.[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid department or module' }, { status: 404 });
    }

    // Check if record exists and get current data
    const existingRecord = await query<RowDataPacket[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    if (existingRecord.length === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    const recordData = existingRecord[0];
    
    // Delete associated files before removing the record
    try {
      await deleteRecordFiles(recordData);
      console.log(`🗑️ Successfully cleaned up files for ${dept}/${module} record ID: ${id}`);
    } catch (fileError) {
      console.error(`⚠️ Error cleaning up files for ${dept}/${module} record ID: ${id}`, fileError);
      // Continue with database deletion even if file cleanup fails
    }

    // Delete the record from database
    await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);

    return NextResponse.json({
      success: true,
      message: 'Record and associated files deleted successfully'
    });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}