import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    // Verify super admin authentication
    const token = request.cookies.get('super-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const superAdmin = verifyToken(token);
    if (!superAdmin || superAdmin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    // Get dashboard statistics
    const [
      departmentsResult,
      usersResult,
      credentialsResult,
      activitiesResult,
      approvalsResult
    ] = await Promise.all([
      // Total departments
      query<RowDataPacket[]>(`
        SELECT COUNT(*) as count 
        FROM department_info 
        WHERE deleted_at IS NULL
      `),
      
      // Total users
      query<RowDataPacket[]>(`
        SELECT COUNT(*) as count 
        FROM users 
        WHERE deleted_at IS NULL AND is_active = 1
      `),
      
      // Active credentials
      query<RowDataPacket[]>(`
        SELECT COUNT(*) as count 
        FROM department_credentials dc
        INNER JOIN users u ON dc.user_id = u.id
        WHERE dc.is_active = 1 
          AND u.deleted_at IS NULL 
          AND u.is_active = 1
          AND (dc.expires_at IS NULL OR dc.expires_at > NOW())
      `),
      
      // Recent activities (30 days)
      query<RowDataPacket[]>(`
        SELECT COUNT(*) as count 
        FROM audit_logs 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      `),
      
      // Pending approvals
      query<RowDataPacket[]>(`
        SELECT COUNT(*) as count 
        FROM admin_approvals 
        WHERE status = 'pending' AND deleted_at IS NULL
      `)
    ]);

    // Determine system health based on various factors
    const totalUsers = (usersResult[0] as any).count;
    const pendingApprovals = (approvalsResult[0] as any).count;
    const recentActivities = (activitiesResult[0] as any).count;
    
    let systemHealth: 'healthy' | 'warning' | 'critical' = 'healthy';
    
    if (pendingApprovals > 10) {
      systemHealth = 'warning';
    }
    if (pendingApprovals > 50 || totalUsers === 0) {
      systemHealth = 'critical';
    }

    const stats = {
      total_departments: (departmentsResult[0] as any).count,
      total_users: totalUsers,
      active_credentials: (credentialsResult[0] as any).count,
      recent_activities: recentActivities,
      pending_approvals: pendingApprovals,
      system_health: systemHealth
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}