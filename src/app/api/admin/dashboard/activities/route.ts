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

    // Get recent activities from the last 7 days
    const activities = await query(`
      SELECT 
        'faculty_profile' as activity_type,
        CONCAT('New faculty profile added: ', name) as description,
        dept as department,
        created_at,
        'pending' as status
      FROM faculty_profiles 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      UNION ALL
      
      SELECT 
        'faculty_achievement' as activity_type,
        CONCAT('Faculty achievement added: ', title) as description,
        dept as department,
        created_at,
        status
      FROM faculty_achievements 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      UNION ALL
      
      SELECT 
        'student_achievement' as activity_type,
        CONCAT('Student achievement added: ', title) as description,
        dept as department,
        created_at,
        status
      FROM student_achievements 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      UNION ALL
      
      SELECT 
        'workshop' as activity_type,
        CONCAT('Workshop added: ', title) as description,
        department,
        created_at,
        status
      FROM workshops 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      UNION ALL
      
      SELECT 
        'laboratory' as activity_type,
        CONCAT('Laboratory added: ', lab_name) as description,
        department,
        created_at,
        status
      FROM labs 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      UNION ALL
      
      SELECT 
        'placement' as activity_type,
        CONCAT('Placement record added: ', student_name, ' at ', company_name) as description,
        department,
        created_at,
        status
      FROM placements 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      
      ORDER BY created_at DESC 
      LIMIT 50
    `);

    return NextResponse.json({
      success: true,
      activities: activities || []
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}