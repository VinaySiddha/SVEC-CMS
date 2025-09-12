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

    // Fetch recent activity from all tables
    const activities = [];

    // Faculty profiles
    const facultyActivities = await query(`
      SELECT 
        id, 
        'faculty' as type, 
        CONCAT('Faculty profile for ', name, ' was submitted') as description,
        created_at as timestamp,
        COALESCE(status, 'approved') as status,
        dept as department
      FROM faculty_profiles 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    // Faculty achievements
    const facultyAchievements = await query(`
      SELECT 
        id, 
        'faculty_achievement' as type, 
        CONCAT('Faculty achievement "', title, '" was submitted') as description,
        created_at as timestamp,
        COALESCE(status, 'pending') as status,
        department
      FROM faculty_achievements 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    // Student achievements
    const studentAchievements = await query(`
      SELECT 
        id, 
        'student_achievement' as type, 
        CONCAT('Student achievement "', title, '" was submitted') as description,
        created_at as timestamp,
        COALESCE(status, 'pending') as status,
        department
      FROM student_achievements 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    // Labs
    const labActivities = await query(`
      SELECT 
        id, 
        'lab' as type, 
        CONCAT('Lab "', lab_name, '" was submitted') as description,
        created_at as timestamp,
        COALESCE(status, 'pending') as status,
        department
      FROM labs 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    // Workshops
    const workshopActivities = await query(`
      SELECT 
        id, 
        'workshop' as type, 
        CONCAT('Workshop "', title, '" was submitted') as description,
        created_at as timestamp,
        COALESCE(status, 'pending') as status,
        department
      FROM workshops 
      ORDER BY created_at DESC 
      LIMIT 20
    `);

    // Combine all activities
    const allActivities = [
      ...(facultyActivities as any[]),
      ...(facultyAchievements as any[]),
      ...(studentAchievements as any[]),
      ...(labActivities as any[]),
      ...(workshopActivities as any[])
    ];

    // Sort by timestamp and format
    const sortedActivities = allActivities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 50)
      .map(activity => ({
        id: `${activity.type}_${activity.id}`,
        type: activity.type,
        description: activity.description,
        timestamp: new Date(activity.timestamp).toLocaleString(),
        status: activity.status,
        department: activity.department
      }));

    return NextResponse.json({
      success: true,
      activities: sortedActivities
    });

  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
