import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { dept: string } }
) {
  try {
    const dept = params.dept;

    // Fetch only approved data for public display
    const [
      facultyData,
      labsData,
      facultyAchievements,
      studentAchievements,
      workshopsData,
      technicalStaff,
      nonTeachingStaff
    ] = await Promise.all([
      query(
        'SELECT * FROM faculty_profiles WHERE dept = ? AND (status = "approved" OR status IS NULL) ORDER BY name',
        [dept]
      ),
      query(
        'SELECT * FROM labs WHERE dept = ? AND status = "active" ORDER BY lab_name',
        [dept]
      ),
      query(
        'SELECT * FROM faculty_achievements WHERE dept = ? AND approved = 1 ORDER BY created_at DESC',
        [dept]
      ),
      query(
        'SELECT * FROM student_achievements WHERE dept = ? ORDER BY created_at DESC',
        [dept]
      ),
      query(
        'SELECT * FROM workshops WHERE dept = ? ORDER BY date_from DESC',
        [dept]
      ),
      query(
        'SELECT * FROM technical_staff WHERE dept = ? AND status = "active" ORDER BY name',
        [dept]
      ),
      query(
        'SELECT * FROM non_teaching_staff WHERE dept = ? AND status = "active" ORDER BY name',
        [dept]
      )
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
        nonTeachingStaff: nonTeachingStaff
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
