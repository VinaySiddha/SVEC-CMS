import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    console.log('=== API ROUTE START ===');
    
    // Step 1: Get department parameter
    const resolvedParams = await params;
    const dept = resolvedParams.dept;
    console.log('✅ Step 1: Got department:', dept);
    
    if (!dept) {
      console.log('❌ No department provided');
      return NextResponse.json({ error: 'Department required' }, { status: 400 });
    }

    // Step 2: Test basic database connection
    console.log('🔍 Step 2: Testing database connection...');
    try {
      const connectionTest = await query('SELECT 1 as test', []);
      console.log('✅ Step 2: Database connected successfully');
    } catch (dbError) {
      console.error('❌ Step 2: Database connection failed:', dbError);
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: dbError instanceof Error ? dbError.message : 'Unknown DB error' 
      }, { status: 503 });
    }

    // Step 3: Try faculty query only (the most important one)
    console.log('🔍 Step 3: Fetching faculty data...');
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
      console.log(`✅ Step 3: Got ${facultyData.length} faculty records`);
    } catch (facultyError) {
      console.error('❌ Step 3: Faculty query failed:', facultyError);
      facultyData = [];
    }

    // Step 4: Try syllabus query (the problematic one)
    console.log('🔍 Step 4: Fetching syllabus data...');
    let syllabusDocuments = [];
    try {
      if (dept.toUpperCase() === 'EEE') {
        console.log('🔍 Step 4a: Querying EEE_Syllabus table...');
        syllabusDocuments = await query(
          `SELECT id, title, description, document_url, type, academic_year, semester, regulation 
           FROM EEE_Syllabus 
           WHERE status = ? 
           ORDER BY regulation DESC, type, academic_year DESC, semester 
           LIMIT 20`,
          ['active']
        ) as any[];
        console.log(`✅ Step 4a: Got ${syllabusDocuments.length} EEE syllabus records`);
      } else {
        console.log('🔍 Step 4b: Querying syllabus_documents table...');
        syllabusDocuments = await query(
          `SELECT id, title, description, document_url, type, academic_year, semester, regulation 
           FROM syllabus_documents 
           WHERE dept = ? AND status = ? 
           ORDER BY regulation DESC, type, academic_year DESC, semester 
           LIMIT 20`,
          [dept, 'approved']
        ) as any[];
        console.log(`✅ Step 4b: Got ${syllabusDocuments.length} syllabus records`);
      }
    } catch (syllabusError) {
      console.error('❌ Step 4: Syllabus query failed:', syllabusError);
      console.error('❌ Syllabus error details:', syllabusError instanceof Error ? syllabusError.message : 'Unknown');
      syllabusDocuments = [];
    }

    // Step 5: Try labs query (simple one)
    console.log('🔍 Step 5: Fetching labs data...');
    let labsData = [];
    try {
      labsData = await query(
        'SELECT id, lab_name, description, equipment_details FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name LIMIT 10',
        [dept]
      ) as any[];
      console.log(`✅ Step 5: Got ${labsData.length} lab records`);
    } catch (labsError) {
      console.error('❌ Step 5: Labs query failed:', labsError);
      labsData = [];
    }

    // Step 6: Return successful response
    console.log('🎉 Step 6: Preparing response...');
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
    
    console.log('✅ Step 6: Response prepared successfully');
    console.log('=== API ROUTE SUCCESS ===');
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('💥 FATAL ERROR in API route:');
    console.error('💥 Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('=== API ROUTE FAILED ===');
    
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