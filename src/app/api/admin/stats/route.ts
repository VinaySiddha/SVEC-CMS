import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

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

    // Fetch statistics
    const [
      userCount,
      pendingCount,
      departmentCount,
      recentActivityCount
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM users'),
      query(`
        SELECT COUNT(*) as count FROM (
          SELECT id FROM faculty_profiles WHERE status = 'pending'
          UNION ALL
          SELECT id FROM faculty_achievements WHERE status = 'pending'
          UNION ALL
          SELECT id FROM student_achievements WHERE status = 'pending'
          UNION ALL
          SELECT id FROM labs WHERE status = 'pending'
          UNION ALL
          SELECT id FROM workshops WHERE status = 'pending'
        ) as pending_items
      `),
      query('SELECT COUNT(DISTINCT dept) as count FROM faculty_profiles WHERE dept IS NOT NULL'),
      query(`
        SELECT COUNT(*) as count FROM (
          SELECT created_at FROM faculty_profiles WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
          UNION ALL
          SELECT created_at FROM faculty_achievements WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
          UNION ALL
          SELECT created_at FROM student_achievements WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
          UNION ALL
          SELECT created_at FROM labs WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
          UNION ALL
          SELECT created_at FROM workshops WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ) as recent_activity
      `)
    ]);

    return NextResponse.json({
      totalUsers: (userCount as any)[0]?.count || 0,
      pendingApprovals: (pendingCount as any)[0]?.count || 0,
      totalDepartments: (departmentCount as any)[0]?.count || 0,
      recentActivity: (recentActivityCount as any)[0]?.count || 0
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
