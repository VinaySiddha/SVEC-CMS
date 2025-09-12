import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { dept: string } }
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

    const { dept } = params;

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
      placements
    ] = await Promise.all([
      // Department Info - will create this table if needed
      query('SELECT * FROM department_info WHERE department_code = ? LIMIT 1', [dept]).catch(() => []),
      
      // Faculty
      query('SELECT * FROM faculty_profiles WHERE dept = ? ORDER BY name', [dept]),
      
      // Laboratories
      query('SELECT * FROM labs WHERE department = ? ORDER BY lab_name', [dept]),
      
      // Faculty Achievements
      query('SELECT * FROM faculty_achievements WHERE department = ? ORDER BY achievement_date DESC', [dept]),
      
      // Student Achievements
      query('SELECT * FROM student_achievements WHERE department = ? ORDER BY achievement_date DESC', [dept]),
      
      // Workshops
      query('SELECT * FROM workshops WHERE department = ? ORDER BY start_date DESC', [dept]),
      
      // Placements
      query('SELECT * FROM placements WHERE department = ? ORDER BY academic_year DESC', [dept])
    ]);

    return NextResponse.json({
      departmentInfo: departmentInfo[0] || null,
      faculty: faculty || [],
      laboratories: laboratories || [],
      facultyAchievements: facultyAchievements || [],
      studentAchievements: studentAchievements || [],
      workshops: workshops || [],
      placements: placements || []
    });

  } catch (error) {
    console.error('Error fetching department data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
