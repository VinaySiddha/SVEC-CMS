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

    // Fetch pending items from different tables
    const pendingItems = [];

    // Faculty profiles pending approval
    const facultyProfiles = await query(`
      SELECT 
        id, 'faculty' as type, name as title, dept as department,
        'System' as submitted_by, created_at as submitted_at, status,
        JSON_OBJECT('name', name, 'qualification', qualification, 'designation', designation) as data
      FROM faculty_profiles 
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `);

    // Faculty achievements pending approval
    const facultyAchievements = await query(`
      SELECT 
        id, 'achievement' as type, title, department,
        'System' as submitted_by, created_at as submitted_at, status,
        JSON_OBJECT('title', title, 'faculty_name', faculty_name, 'achievement_date', achievement_date) as data
      FROM faculty_achievements 
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `);

    // Student achievements pending approval
    const studentAchievements = await query(`
      SELECT 
        id, 'achievement' as type, title, department,
        'System' as submitted_by, created_at as submitted_at, status,
        JSON_OBJECT('title', title, 'student_name', student_name, 'achievement_date', achievement_date) as data
      FROM student_achievements 
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `);

    // Labs pending approval
    const labs = await query(`
      SELECT 
        id, 'laboratory' as type, lab_name as title, department,
        'System' as submitted_by, created_at as submitted_at, status,
        JSON_OBJECT('lab_name', lab_name, 'lab_area', lab_area, 'equipment_count', equipment_count) as data
      FROM labs 
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `);

    // Workshops pending approval
    const workshops = await query(`
      SELECT 
        id, 'workshop' as type, title, department,
        'System' as submitted_by, created_at as submitted_at, status,
        JSON_OBJECT('title', title, 'duration', duration, 'start_date', start_date) as data
      FROM workshops 
      WHERE status = 'pending'
      ORDER BY created_at DESC
    `);

    // Combine all pending items
    const allItems = [
      ...(facultyProfiles as any[]).map(item => ({ ...item, data: JSON.parse(item.data as string) })),
      ...(facultyAchievements as any[]).map(item => ({ ...item, data: JSON.parse(item.data as string) })),
      ...(studentAchievements as any[]).map(item => ({ ...item, data: JSON.parse(item.data as string) })),
      ...(labs as any[]).map(item => ({ ...item, data: JSON.parse(item.data as string) })),
      ...(workshops as any[]).map(item => ({ ...item, data: JSON.parse(item.data as string) }))
    ];

    // Sort by created_at descending
    allItems.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime());

    return NextResponse.json({
      success: true,
      items: allItems
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
