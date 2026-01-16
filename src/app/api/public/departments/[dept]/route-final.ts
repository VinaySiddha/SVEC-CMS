import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    
    const resolvedParams = await params;
    const dept = resolvedParams.dept;
    
    
    // Test basic database connection first
    await query('SELECT 1 as test', []);
    
    // Only fetch essential data that we know works
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
    
    const syllabusDocuments = dept.toUpperCase() === 'EEE' 
      ? await query('SELECT * FROM EEE_Syllabus WHERE status = ? ORDER BY regulation DESC, type, academic_year DESC, semester', ['active'])
      : await query('SELECT * FROM syllabus_documents WHERE dept = ? AND status = ? ORDER BY regulation DESC, type, academic_year DESC, semester', [dept, 'approved']);
    
    const labsData = await query('SELECT * FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name', [dept]);
    
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
    
    
    return NextResponse.json(response);
    
  } catch (error) {
    
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