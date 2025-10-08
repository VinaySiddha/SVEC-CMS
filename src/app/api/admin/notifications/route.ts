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

    // Get notifications for pending approvals
    const notifications = [];

    // Get count of pending items from different modules
    const pendingCounts = await Promise.all([
      query('SELECT COUNT(*) as count FROM faculty_profiles WHERE status = "pending"'),
      query('SELECT COUNT(*) as count FROM faculty_achievements WHERE status = "pending"'),
      query('SELECT COUNT(*) as count FROM student_achievements WHERE status = "pending"'),
      query('SELECT COUNT(*) as count FROM labs WHERE status = "pending"'),
      query('SELECT COUNT(*) as count FROM workshops WHERE status = "pending"'),
      query('SELECT COUNT(*) as count FROM placements WHERE status = "pending"'),
    ]);

    // Create notifications for each module with pending items
    const modules = [
      { name: 'Faculty Profiles', count: (pendingCounts[0] as any)[0]?.count || 0 },
      { name: 'Faculty Achievements', count: (pendingCounts[1] as any)[0]?.count || 0 },
      { name: 'Student Achievements', count: (pendingCounts[2] as any)[0]?.count || 0 },
      { name: 'Laboratories', count: (pendingCounts[3] as any)[0]?.count || 0 },
      { name: 'Workshops', count: (pendingCounts[4] as any)[0]?.count || 0 },
      { name: 'Placements', count: (pendingCounts[5] as any)[0]?.count || 0 },
    ];

    modules.forEach(module => {
      if (module.count > 0) {
        notifications.push({
          id: `pending-${module.name.toLowerCase().replace(' ', '-')}`,
          type: 'approval',
          title: `${module.count} ${module.name} Pending Approval`,
          message: `You have ${module.count} ${module.name.toLowerCase()} waiting for your approval.`,
          created_at: new Date().toISOString(),
          read: false
        });
      }
    });

    // Get recent activities (last 24 hours)
    const recentActivities = await query(`
      SELECT 
        'faculty' as type, 
        CONCAT('New faculty profile: ', name) as message,
        created_at
      FROM faculty_profiles 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      
      UNION ALL
      
      SELECT 
        'achievement' as type,
        CONCAT('New achievement: ', title) as message,
        created_at
      FROM faculty_achievements 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      
      UNION ALL
      
      SELECT 
        'workshop' as type,
        CONCAT('New workshop: ', title) as message,
        created_at
      FROM workshops 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
      
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    // Add activity notifications
    (recentActivities as any[]).forEach((activity, index) => {
      notifications.push({
        id: `activity-${index}`,
        type: 'activity',
        title: 'Recent Activity',
        message: activity.message,
        created_at: activity.created_at,
        read: false
      });
    });

    return NextResponse.json({
      success: true,
      notifications: notifications.slice(0, 10) // Limit to 10 notifications
    });

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}