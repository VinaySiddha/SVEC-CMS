import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { dept } = await params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch all department data
    const [
      departmentInfo,
      faculty,
      laboratories,
      facultyAchievements,
      studentAchievements,
      workshops,
      placements,
      syllabusDocuments,
      mous,
      classrooms,
      seminarHalls,
      fdpAttended,
      fdpConducted,
      boardOfStudiesMembers,
      boardOfStudiesMeetingMinutes,
      facultyInnovations,
      researchCenters,
      productDevelopment,
      departmentalActivities,
      greenInitiatives,
      technicalMagazines,
      technicalAssociations,
      newsletters,
      extracurriculars,
      handbooks
    ] = await Promise.all([
      // Department Info - will create this table if needed
      query('SELECT * FROM department_info WHERE department_code = ? LIMIT 1', [dept]).catch(() => []),
      
      // Faculty
      query('SELECT * FROM faculty_profiles WHERE dept = ? ORDER BY name', [dept]),
      
      // Laboratories
      query('SELECT * FROM laboratories WHERE dept = ? ORDER BY lab_name', [dept]),
      
      // Faculty Achievements
      query('SELECT * FROM faculty_achievements WHERE dept = ? ORDER BY created_at DESC', [dept]),
      
      // Student Achievements
      query('SELECT * FROM student_achievements WHERE dept = ? ORDER BY created_at DESC', [dept]),
      
      // Workshops
      query('SELECT * FROM workshops WHERE dept = ? ORDER BY start_date DESC', [dept]),
      
      // Placements
      query('SELECT * FROM placements WHERE dept = ? ORDER BY academic_year DESC', [dept]),
      
      // Syllabus Documents
      query('SELECT * FROM syllabus_documents WHERE dept = ? AND status = "approved" ORDER BY academic_year DESC', [dept]),
      
      // MoUs
      query('SELECT * FROM mous WHERE dept = ? AND status = "approved" ORDER BY start_date DESC', [dept]),
      
      // Classrooms
      query('SELECT * FROM classrooms WHERE dept = ? AND status = "approved" ORDER BY room_number', [dept]),
      
      // Seminar Halls
      query('SELECT * FROM seminar_halls WHERE dept = ? AND status = "approved" ORDER BY name', [dept]),
      
      // FDP Attended
      query('SELECT * FROM fdp_attended WHERE dept = ? AND status = "approved" ORDER BY start_date DESC', [dept]),
      
      // FDP Conducted
      query('SELECT * FROM fdp_conducted WHERE dept = ? AND status = "approved" ORDER BY start_date DESC', [dept]),
      
      // Board of Studies Members
      query('SELECT * FROM board_of_studies WHERE dept = ? ORDER BY name', [dept]),
      
      // Board of Studies Meeting Minutes
      query('SELECT * FROM bos_meeting_minutes WHERE dept = ? ORDER BY meeting_date DESC', [dept]),
      
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
      query('SELECT * FROM technical_magazines WHERE dept = ? AND status = "published" ORDER BY publication_date DESC', [dept]),
      
      // Technical Associations
      query('SELECT * FROM technical_associations WHERE dept = ? AND status = "active" ORDER BY established_year DESC', [dept]),
      
      // Newsletters
      query('SELECT * FROM newsletters WHERE dept = ? AND status = "published" ORDER BY publication_date DESC', [dept]),
      
      // Extracurriculars
      query('SELECT * FROM extracurriculars WHERE dept = ? AND status = "active" ORDER BY start_date DESC', [dept]),
      
      // Handbooks
      query('SELECT * FROM handbooks WHERE dept = ? AND status = "published" ORDER BY publication_date DESC', [dept])
    ]);

    return NextResponse.json({
      departmentInfo: departmentInfo[0] || null,
      faculty: faculty || [],
      laboratories: laboratories || [],
      facultyAchievements: facultyAchievements || [],
      studentAchievements: studentAchievements || [],
      workshops: workshops || [],
      placements: placements || [],
      syllabusDocuments: syllabusDocuments || [],
      mous: mous || [],
      classrooms: classrooms || [],
      seminarHalls: seminarHalls || [],
      fdpAttended: fdpAttended || [],
      fdpConducted: fdpConducted || [],
      boardOfStudiesMembers: boardOfStudiesMembers || [],
      boardOfStudiesMeetingMinutes: boardOfStudiesMeetingMinutes || [],
      facultyInnovations: facultyInnovations || [],
      researchCenters: researchCenters || [],
      productDevelopment: productDevelopment || [],
      departmentalActivities: departmentalActivities || [],
      greenInitiatives: greenInitiatives || [],
      technicalMagazines: technicalMagazines || [],
      technicalAssociations: technicalAssociations || [],
      newsletters: newsletters || [],
      extracurriculars: extracurriculars || [],
      handbooks: handbooks || []
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
