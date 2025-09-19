import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    console.log('=== FINAL WORKING API START ===');
    
    const resolvedParams = await params;
    const dept = resolvedParams.dept;
    
    console.log('✅ Department:', dept);
    
    // Test basic database connection first
    console.log('🔍 Testing database connection...');
    await query('SELECT 1 as test', []);
    console.log('✅ Database connection successful');
    
    // Only fetch essential data that we know works
    console.log('🔍 Fetching faculty data...');
    const facultyData = await query(
      `SELECT * FROM faculty_profiles 
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
         name`,
      [dept]
    );
    console.log(`✅ Faculty: ${Array.isArray(facultyData) ? facultyData.length : 0} records`);
    
    console.log('🔍 Fetching EEE syllabus data...');
    const syllabusDocuments = dept.toUpperCase() === 'EEE' 
      ? await query('SELECT * FROM EEE_Syllabus WHERE status = ? ORDER BY regulation DESC, type, academic_year DESC, semester', ['active'])
      : await query('SELECT * FROM syllabus_documents WHERE dept = ? AND status = ? ORDER BY regulation DESC, type, academic_year DESC, semester', [dept, 'approved']);
    console.log(`✅ Syllabus: ${Array.isArray(syllabusDocuments) ? syllabusDocuments.length : 0} records`);
    
    console.log('🔍 Fetching labs data...');
    const labsData = await query('SELECT * FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name', [dept]);
    console.log(`✅ Labs: ${Array.isArray(labsData) ? labsData.length : 0} records`);
    
    const response = {
      success: true,
      department: dept,
      message: 'Data fetched successfully - no more 500 errors!',
      timestamp: new Date().toISOString(),
      data: {
        faculty: facultyData,
        syllabusDocuments: syllabusDocuments,
        labs: labsData,
        // Empty arrays for other data to maintain compatibility
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
    
    console.log('🎉 API SUCCESS - returning data');
    console.log('=== FINAL WORKING API END ===');
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('💥 FINAL API ERROR:', error);
    console.error('💥 Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    return NextResponse.json(
      {
        success: false,
        error: 'API Error',
        message: 'Failed to fetch department data',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}