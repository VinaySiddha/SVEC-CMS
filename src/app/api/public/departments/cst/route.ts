import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Starting CST department data fetch...');

    // Fetch all CST-specific data in parallel
    console.log('📋 Starting CST database queries...');
    
    const [
      facultyData,
      technicalFacultyData,
      nonTeachingFacultyData,
      overviewData,
      studentAchievementsData,
      facultyAchievementsData,
      syllabusData,
      eresourcesData,
      departmentLibraryData,
      mousData,
      industryProgramsData,
      bosMembers,
      bosMinutes,
      handbooksData,
      physicalFacilitiesData,
      trainingActivitiesData,
      facultyDevelopmentData,
      meritScholarshipsData,
      extraCurricularData,
      sahayaEventsData,
      scudActivitiesData,
      newslettersData,
      hackathonsData,
      placementsData
    ] = await Promise.all([
      query('SELECT * FROM cst_faculty ORDER BY Qualification DESC'),
      query('SELECT * FROM cst_technical_faculty'),
      query('SELECT * FROM cst_non_teaching_faculty'),
      query('SELECT * FROM cst_department_overview LIMIT 1'),
      query('SELECT * FROM cst_student_achievements ORDER BY id DESC'),
      query('SELECT * FROM cst_faculty_achievements ORDER BY id DESC'),
      query('SELECT * FROM cst_syllabus ORDER BY id DESC'),
      query('SELECT * FROM cst_eresources ORDER BY id DESC'),
      query('SELECT * FROM cst_department_library LIMIT 1'),
      query('SELECT * FROM cst_mous ORDER BY id DESC'),
      query('SELECT * FROM cst_industry_programs ORDER BY id DESC'),
      query('SELECT * FROM cst_bos_members ORDER BY id'),
      query('SELECT * FROM cst_bos_minutes ORDER BY meeting_date DESC'),
      query('SELECT * FROM cst_handbooks ORDER BY id DESC'),
      query('SELECT * FROM cst_physical_facilities ORDER BY id DESC'),
      query('SELECT * FROM cst_training_activities ORDER BY id DESC'),
      query('SELECT * FROM cst_faculty_development ORDER BY id DESC'),
      query('SELECT * FROM cst_merit_scholarships ORDER BY id DESC'),
      query('SELECT * FROM cst_extra_curricular ORDER BY id DESC'),
      query('SELECT * FROM cst_sahaya_events ORDER BY id DESC'),
      query('SELECT * FROM cst_scud_activities ORDER BY id DESC'),
      query('SELECT * FROM cst_newsletters ORDER BY id DESC'),
      query('SELECT * FROM cst_hackathons ORDER BY id DESC'),
      query('SELECT * FROM cst_placements ORDER BY id DESC')
    ]);

    console.log(`✅ All CST queries completed successfully`);
    console.log(`📊 Faculty: ${Array.isArray(facultyData) ? facultyData.length : 0} records`);
    console.log(`📚 Student Achievements: ${Array.isArray(studentAchievementsData) ? studentAchievementsData.length : 0} records`);

    // Transform the data to match the expected interface
    const responseData = {
      faculty: facultyData || [],
      technicalStaff: technicalFacultyData || [],
      nonTeachingStaff: nonTeachingFacultyData || [],
      overview: Array.isArray(overviewData) && overviewData.length > 0 ? overviewData[0] : null,
      studentAchievements: studentAchievementsData || [],
      facultyAchievements: facultyAchievementsData || [],
      syllabusDocuments: syllabusData || [],
      eresources: eresourcesData || [],
      departmentLibrary: Array.isArray(departmentLibraryData) && departmentLibraryData.length > 0 ? departmentLibraryData[0] : null,
      mous: mousData || [],
      industryPrograms: industryProgramsData || [],
      boardOfStudies: bosMembers || [],
      boardOfStudiesMeetingMinutes: bosMinutes || [],
      handbooks: handbooksData || [],
      physicalFacilities: physicalFacilitiesData || [],
      labs: [], // CST might not have separate lab table
      trainingActivities: trainingActivitiesData || [],
      facultyDevelopment: facultyDevelopmentData || [],
      meritScholarships: meritScholarshipsData || [],
      extraCurricular: extraCurricularData || [],
      sahayaEvents: sahayaEventsData || [],
      scudActivities: scudActivitiesData || [],
      newsletters: newslettersData || [],
      hackathons: hackathonsData || [],
      placements: placementsData || []
    };

    return NextResponse.json({
      success: true,
      department: 'cst',
      data: responseData
    });

  } catch (error) {
    console.error('💥 Error in CST department data fetch:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch CST department data', 
        department: 'cst',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}