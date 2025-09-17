import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const { dept } = await params;

    // Fetch only approved data for public display
    const [
      facultyData,
      labsData,
      facultyAchievements,
      studentAchievements,
      workshopsData,
      technicalStaff,
      nonTeachingStaff,
      placementsData,
      hackathonsData,
      boardOfStudiesData,
      boardOfStudiesMeetingMinutes,
      facultyInnovations,
      researchCenters,
      productDevelopment,
      departmentalActivities,
      greenInitiatives,
      technicalMagazines
    ] = await Promise.all([
      query(
        'SELECT * FROM faculty_profiles WHERE dept = ? AND (status = "approved" OR status IS NULL) ORDER BY name',
        [dept]
      ),
      query(
        'SELECT * FROM laboratories WHERE dept = ? AND status = "active" ORDER BY lab_name',
        [dept]
      ),
      query(
        'SELECT * FROM faculty_achievements WHERE dept = ? AND approved = 1 ORDER BY created_at DESC',
        [dept]
      ),
      query(
        'SELECT * FROM student_achievements WHERE department = ? ORDER BY created_at DESC',
        [dept]
      ),
      query(
        'SELECT * FROM workshops WHERE dept = ? ORDER BY date_from DESC',
        [dept]
      ),
      query(
        'SELECT * FROM technical_staff WHERE dept = ? ORDER BY name',
        [dept]
      ),
      query(
        'SELECT * FROM non_teaching_staff WHERE dept = ? ORDER BY name',
        [dept]
      ),
      query(
        'SELECT * FROM placements WHERE dept = ? ORDER BY academic_year DESC',
        [dept]
      ),
      query(
        'SELECT * FROM hackathons WHERE dept = ? ORDER BY start_date DESC',
        [dept]
      ),
      query(
        'SELECT * FROM board_of_studies WHERE dept = ? AND status = "approved" ORDER BY id',
        [dept]
      ),
      query(
        'SELECT * FROM bos_meeting_minutes WHERE dept = ? ORDER BY meeting_date DESC',
        [dept]
      ),
      
      // Faculty Innovations
      query('SELECT * FROM faculty_innovations WHERE dept = ? AND status = "active" ORDER BY implementation_date DESC', [dept]),
      
      // Research Centers
      query('SELECT * FROM research_centers WHERE dept = ? AND status = "active" ORDER BY established_year DESC', [dept]),
      
      // Product Development
      query('SELECT * FROM product_development WHERE dept = ? AND status IN ("active", "completed") ORDER BY created_at DESC', [dept]),
      
      // Departmental Activities
      query('SELECT * FROM departmental_activities WHERE dept = ? ORDER BY date_from DESC', [dept]),
      
      // Green Initiatives
      query('SELECT * FROM green_initiatives WHERE dept = ? AND status IN ("active", "completed") ORDER BY start_date DESC', [dept]),
      
      // Technical Magazines
      query('SELECT * FROM technical_magazines WHERE dept = ? AND status = "published" ORDER BY publication_date DESC', [dept])
    ]);

    return NextResponse.json({
      success: true,
      department: dept,
      data: {
        faculty: facultyData,
        labs: labsData,
        facultyAchievements: facultyAchievements,
        studentAchievements: studentAchievements,
        workshops: workshopsData,
        technicalStaff: technicalStaff,
        nonTeachingStaff: nonTeachingStaff,
        placements: placementsData,
        hackathons: hackathonsData,
        boardOfStudies: boardOfStudiesData,
        boardOfStudiesMeetingMinutes: boardOfStudiesMeetingMinutes,
        facultyInnovations: facultyInnovations,
        researchCenters: researchCenters,
        productDevelopment: productDevelopment,
        departmentalActivities: departmentalActivities,
        greenInitiatives: greenInitiatives,
        technicalMagazines: technicalMagazines
      }
    });

  } catch (error) {
    console.error('Error fetching public department data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch department data' },
      { status: 500 }
    );
  }
}
