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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const department = searchParams.get('department');
    const severity = searchParams.get('severity');
    const action = searchParams.get('action');

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];

    if (department) {
      whereClause += ' AND al.department = ?';
      params.push(department);
    }

    if (severity) {
      whereClause += ' AND al.severity = ?';
      params.push(severity);
    }

    if (action) {
      whereClause += ' AND al.action LIKE ?';
      params.push(`%${action}%`);
    }

    // Get recent activities with user information
    const activities = await query<RowDataPacket[]>(
      `SELECT 
         al.id,
         al.action,
         al.resource_type,
         al.resource_id,
         al.department,
         al.severity,
         al.status,
         al.ip_address,
         al.created_at,
         u.username as user_name,
         u.email as user_email,
         u.role as user_role
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       ${whereClause}
       ORDER BY al.created_at DESC
       LIMIT ?`,
      [...params, limit]
    );

    // Get activity summary for the last 24 hours
    const activitySummary = await query<RowDataPacket[]>(
      `SELECT 
         al.action,
         COUNT(*) as count,
         al.severity
       FROM audit_logs al
       WHERE al.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
       GROUP BY al.action, al.severity
       ORDER BY count DESC
       LIMIT 10`
    );

    return NextResponse.json({
      activities: activities.map((activity: any) => ({
        id: activity.id,
        action: activity.action,
        resource_type: activity.resource_type,
        resource_id: activity.resource_id,
        department: activity.department,
        severity: activity.severity,
        status: activity.status,
        user_name: activity.user_name || 'System',
        user_email: activity.user_email,
        user_role: activity.user_role,
        ip_address: activity.ip_address,
        created_at: activity.created_at
      })),
      summary: activitySummary.map((item: any) => ({
        action: item.action,
        count: item.count,
        severity: item.severity
      }))
    });

  } catch (error) {
    console.error('Dashboard activities error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}