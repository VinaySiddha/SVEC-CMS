import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, logAuditEvent } from '@/lib/auth/auth';
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

    // Get all departments with their statistics
    const departments = await query<RowDataPacket[]>(
      `SELECT 
         di.dept, di.dept_full_name, di.hod_name, di.hod_image,
         di.vision, di.mission, di.about, di.contact_email, di.contact_phone,
         di.status, di.created_at, di.updated_at,
         COUNT(DISTINCT u.id) as user_count,
         COUNT(DISTINCT fp.id) as faculty_count,
         COUNT(DISTINCT sa.id) as student_achievements,
         COUNT(DISTINCT fa.id) as faculty_achievements
       FROM department_info di
       LEFT JOIN users u ON di.dept = u.department AND u.deleted_at IS NULL
       LEFT JOIN faculty_profiles fp ON di.dept = fp.department AND fp.deleted_at IS NULL
       LEFT JOIN student_achievements sa ON di.dept = sa.department AND sa.deleted_at IS NULL
       LEFT JOIN faculty_achievements fa ON di.dept = fa.department AND fa.deleted_at IS NULL
       WHERE di.deleted_at IS NULL
       GROUP BY di.id, di.dept
       ORDER BY di.dept_full_name`
    );

    // Get recent activities for each department
    const recentActivities = await query<RowDataPacket[]>(
      `SELECT 
         al.department, al.action, al.resource_type, al.created_at,
         u.username as user_name
       FROM audit_logs al
       LEFT JOIN users u ON al.user_id = u.id
       WHERE al.department IS NOT NULL
         AND al.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       ORDER BY al.created_at DESC
       LIMIT 100`
    );

    // Group activities by department
    const activitiesByDept = recentActivities.reduce((acc: any, activity: any) => {
      if (!acc[activity.department]) {
        acc[activity.department] = [];
      }
      acc[activity.department].push(activity);
      return acc;
    }, {});

    // Combine department data with activities
    const departmentsWithData = departments.map((dept: any) => ({
      code: dept.dept,
      name: dept.dept_full_name,
      hod_name: dept.hod_name,
      hod_image: dept.hod_image,
      vision: dept.vision,
      mission: dept.mission,
      about: dept.about,
      contact_email: dept.contact_email,
      contact_phone: dept.contact_phone,
      status: dept.status,
      created_at: dept.created_at,
      updated_at: dept.updated_at,
      statistics: {
        user_count: dept.user_count,
        faculty_count: dept.faculty_count,
        student_achievements: dept.student_achievements,
        faculty_achievements: dept.faculty_achievements
      },
      recent_activities: (activitiesByDept[dept.dept] || []).slice(0, 5)
    }));

    return NextResponse.json({
      departments: departmentsWithData,
      total_departments: departments.length
    });

  } catch (error) {
    console.error('Get departments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    const {
      dept,
      dept_full_name,
      hod_name,
      hod_image,
      vision,
      mission,
      about,
      contact_email,
      contact_phone
    } = await request.json();

    // Validation
    if (!dept || !dept_full_name || !hod_name) {
      return NextResponse.json(
        { error: 'Department code, full name, and HOD name are required' },
        { status: 400 }
      );
    }

    // Check if department already exists
    const existingDept = await query<RowDataPacket[]>(
      'SELECT id FROM department_info WHERE dept = ? AND deleted_at IS NULL',
      [dept]
    );

    if (existingDept.length > 0) {
      return NextResponse.json(
        { error: 'Department already exists' },
        { status: 409 }
      );
    }

    // Create new department
    const result = await query(
      `INSERT INTO department_info 
       (dept, dept_full_name, hod_name, hod_image, vision, mission, about, contact_email, contact_phone, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
      [dept, dept_full_name, hod_name, hod_image || null, vision || null, mission || null, 
       about || null, contact_email || null, contact_phone || null]
    );

    // Log the department creation
    await logAuditEvent({
      userId: superAdmin.id,
      action: 'department_created',
      resourceType: 'department_info',
      resourceId: dept,
      department: dept,
      newValues: {
        dept,
        dept_full_name,
        hod_name,
        contact_email,
        contact_phone
      },
      severity: 'high'
    });

    return NextResponse.json({
      message: 'Department created successfully',
      department: {
        code: dept,
        name: dept_full_name,
        hod_name,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Create department error:', error);
    
    await logAuditEvent({
      action: 'department_creation_error',
      resourceType: 'department_info',
      severity: 'high',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Failed to create department' },
      { status: 500 }
    );
  }
}