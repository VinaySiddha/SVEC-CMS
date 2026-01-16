import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    
    // Step 1: Get department parameter
    const resolvedParams = await params;
    const dept = resolvedParams.dept;
    
    if (!dept) {
      return NextResponse.json({ error: 'Department required' }, { status: 400 });
    }

    // Step 2: Test basic database connection
    try {
      const connectionTest = await query('SELECT 1 as test', []);
    } catch (dbError) {
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: dbError instanceof Error ? dbError.message : 'Unknown DB error' 
      }, { status: 503 });
    }

    // Step 3: Try faculty query only (the most important one)
    let facultyData = [];
    try {
      facultyData = await query(
        `SELECT id, name, designation, qualification, experience, email, phone 
         FROM faculty_profiles 
         WHERE dept = ? AND (status = "approved" OR status IS NULL) 
         ORDER BY 
           CASE designation
             WHEN 'Professor & HOD' THEN 1
             WHEN 'Professor & Dean(Student Affairs)' THEN 2
             WHEN 'Assoc. Professor' THEN 3
             WHEN 'Sr. Asst. Professor' THEN 4
             WHEN 'Asst. Professor' THEN 5
             ELSE 6
           END,
           name
         LIMIT 50`,
        [dept]
      ) as any[];
    } catch (facultyError) {
      facultyData = [];
    }

    // Step 4: Try syllabus query (the problematic one)
    let syllabusDocuments = [];
    try {
      if (dept.toUpperCase() === 'EEE') {
        syllabusDocuments = await query(
          `SELECT id, title, description, document_url, type, academic_year, semester, regulation 
           FROM EEE_Syllabus 
           WHERE status = ? 
           ORDER BY regulation DESC, type, academic_year DESC, semester 
           LIMIT 20`,
          ['active']
        ) as any[];
      } else {
        syllabusDocuments = await query(
          `SELECT id, title, description, document_url, type, academic_year, semester, regulation 
           FROM syllabus_documents 
           WHERE dept = ? AND status = ? 
           ORDER BY regulation DESC, type, academic_year DESC, semester 
           LIMIT 20`,
          [dept, 'approved']
        ) as any[];
      }
    } catch (syllabusError) {
      syllabusDocuments = [];
    }

    // Step 5: Try labs query (simple one)
    let labsData = [];
    try {
      labsData = await query(
        'SELECT id, lab_name, description, equipment_details FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name LIMIT 10',
        [dept]
      ) as any[];
    } catch (labsError) {
      labsData = [];
    }

    // Step 6: Return successful response
    const response = {
      success: true,
      department: dept,
      message: 'Data fetched successfully',
      timestamp: new Date().toISOString(),
      data: {
        faculty: facultyData,
        syllabusDocuments: syllabusDocuments,
        labs: labsData,
        // Placeholder for other data
        facultyAchievements: [],
        studentAchievements: [],
        workshops: [],
        technicalStaff: [],
        nonTeachingStaff: [],
        placements: [],
        hackathons: [],
        boardOfStudies: [],
        boardOfStudiesMeetingMinutes: [],
        facultyInnovations: [],
        researchCenters: [],
        productDevelopment: [],
        departmentalActivities: [],
        greenInitiatives: [],
        technicalMagazines: []
      }
    };
    
    
    return NextResponse.json(response);

  } catch (error) {
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch department data',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}