import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, DEPARTMENTS } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
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

    // Check if user is admin or super admin
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get department statistics
    const departmentStats = await query<RowDataPacket[]>(`
      SELECT 
        di.dept,
        di.dept_full_name,
        di.hod_name,
        di.hod_image,
        di.status,
        di.created_at,
        di.updated_at,
        COUNT(DISTINCT u.id) as userCount,
        COUNT(DISTINCT fp.id) as facultyCount,
        (
          COALESCE((SELECT COUNT(*) FROM faculty_profiles WHERE dept = di.dept AND status = 'pending'), 0) +
          COALESCE((SELECT COUNT(*) FROM faculty_achievements WHERE dept = di.dept AND status = 'pending'), 0) +
          COALESCE((SELECT COUNT(*) FROM student_achievements WHERE dept = di.dept AND status = 'pending'), 0) +
          COALESCE((SELECT COUNT(*) FROM labs WHERE department = di.dept AND status = 'pending'), 0) +
          COALESCE((SELECT COUNT(*) FROM workshops WHERE department = di.dept AND status = 'pending'), 0) +
          COALESCE((SELECT COUNT(*) FROM placements WHERE department = di.dept AND status = 'pending'), 0)
        ) as pendingItems,
        (
          COALESCE((SELECT COUNT(*) FROM faculty_profiles WHERE dept = di.dept), 0) +
          COALESCE((SELECT COUNT(*) FROM faculty_achievements WHERE dept = di.dept), 0) +
          COALESCE((SELECT COUNT(*) FROM student_achievements WHERE dept = di.dept), 0) +
          COALESCE((SELECT COUNT(*) FROM labs WHERE department = di.dept), 0) +
          COALESCE((SELECT COUNT(*) FROM workshops WHERE department = di.dept), 0) +
          COALESCE((SELECT COUNT(*) FROM placements WHERE department = di.dept), 0)
        ) as totalSubmissions,
        COALESCE(MAX(u.last_login), 'Never') as lastActivity
      FROM department_info di
      LEFT JOIN users u ON u.department = di.dept AND u.deleted_at IS NULL
      LEFT JOIN faculty_profiles fp ON fp.dept = di.dept AND fp.deleted_at IS NULL
      WHERE di.deleted_at IS NULL
      GROUP BY di.dept, di.dept_full_name, di.hod_name, di.hod_image, di.status, di.created_at, di.updated_at
      ORDER BY di.dept_full_name
    `);

    // Include departments that might not be in department_info table
    const allDepartments = Object.entries(DEPARTMENTS).map(([code, name]) => {
      const existingDept = departmentStats.find(d => d.dept === code);
      if (existingDept) {
        return existingDept;
      } else {
        // Return default data for departments not in database
        return {
          dept: code,
          dept_full_name: name,
          hod_name: null,
          hod_image: null,
          status: 'active',
          userCount: 0,
          facultyCount: 0,
          pendingItems: 0,
          totalSubmissions: 0,
          lastActivity: 'Never',
          created_at: null,
          updated_at: null
        };
      }
    });

    return NextResponse.json({
      success: true,
      departments: allDepartments
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}