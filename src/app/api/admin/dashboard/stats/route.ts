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

    // Fetch comprehensive dashboard statistics
    const [
      userCount,
      pendingCount,
      departmentCount,
      recentActivityCount,
      departmentStats,
      moduleStats
    ] = await Promise.all([
      // Total users count
      query('SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL'),
      
      // Total pending approvals across all modules
      query(`
        SELECT 
          (SELECT COUNT(*) FROM faculty_profiles WHERE status = 'pending') +
          (SELECT COUNT(*) FROM faculty_achievements WHERE status = 'pending') +
          (SELECT COUNT(*) FROM student_achievements WHERE status = 'pending') +
          (SELECT COUNT(*) FROM labs WHERE status = 'pending') +
          (SELECT COUNT(*) FROM workshops WHERE status = 'pending') +
          (SELECT COUNT(*) FROM placements WHERE status = 'pending') as count
      `),
      
      // Department count
      query('SELECT COUNT(DISTINCT dept) as count FROM department_info'),
      
      // Recent activity (last 24 hours)
      query(`
        SELECT 
          (SELECT COUNT(*) FROM faculty_profiles WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) +
          (SELECT COUNT(*) FROM faculty_achievements WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) +
          (SELECT COUNT(*) FROM student_achievements WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) +
          (SELECT COUNT(*) FROM workshops WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)) as count
      `),
      
      // Department-wise statistics
      query(`
        SELECT 
          di.dept as department,
          di.dept_full_name as department_name,
          COUNT(DISTINCT u.id) as userCount,
          (
            COALESCE((SELECT COUNT(*) FROM faculty_profiles WHERE dept = di.dept AND status = 'pending'), 0) +
            COALESCE((SELECT COUNT(*) FROM faculty_achievements WHERE dept = di.dept AND status = 'pending'), 0) +
            COALESCE((SELECT COUNT(*) FROM student_achievements WHERE dept = di.dept AND status = 'pending'), 0) +
            COALESCE((SELECT COUNT(*) FROM labs WHERE department = di.dept AND status = 'pending'), 0) +
            COALESCE((SELECT COUNT(*) FROM workshops WHERE department = di.dept AND status = 'pending'), 0) +
            COALESCE((SELECT COUNT(*) FROM placements WHERE department = di.dept AND status = 'pending'), 0)
          ) as pendingItems,
          COALESCE(MAX(u.last_login), 'Never') as lastActivity
        FROM department_info di
        LEFT JOIN users u ON u.department = di.dept
        GROUP BY di.dept, di.dept_full_name
        ORDER BY di.dept_full_name
      `),
      
      // Module-wise statistics
      query(`
        SELECT 'faculty_profiles' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM faculty_profiles
        WHERE deleted_at IS NULL
        
        UNION ALL
        
        SELECT 'faculty_achievements' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM faculty_achievements
        WHERE deleted_at IS NULL
        
        UNION ALL
        
        SELECT 'student_achievements' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM student_achievements
        WHERE deleted_at IS NULL
        
        UNION ALL
        
        SELECT 'labs' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM labs
        WHERE deleted_at IS NULL
        
        UNION ALL
        
        SELECT 'workshops' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM workshops
        WHERE deleted_at IS NULL
        
        UNION ALL
        
        SELECT 'placements' as module,
               COUNT(*) as total,
               SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
               SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
               SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM placements
        WHERE deleted_at IS NULL
      `)
    ]);

    return NextResponse.json({
      totalUsers: (userCount as any)[0]?.count || 0,
      pendingApprovals: (pendingCount as any)[0]?.count || 0,
      totalDepartments: (departmentCount as any)[0]?.count || 12,
      recentActivity: (recentActivityCount as any)[0]?.count || 0,
      departmentStats: departmentStats || [],
      moduleStats: moduleStats || []
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}