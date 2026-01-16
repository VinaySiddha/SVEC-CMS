import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Helper function to get user info from headers (set by middleware)
function getUserFromHeaders(request: NextRequest) {
  return {
    id: request.headers.get('x-user-id'),
    department: request.headers.get('x-user-department'),
    role: request.headers.get('x-user-role'),
  };
}

// GET /api/department-info - Get department info (filtered by user permissions)
export async function GET(request: NextRequest) {
  try {
    const user = getUserFromHeaders(request);
    
    let whereClause = 'WHERE deleted_at IS NULL';
    let queryParams: any[] = [];

    // Department users can only see their own department
    if (user.role === 'dept') {
      whereClause += ' AND dept = ?';
      queryParams.push(user.department);
    }

    const departments = await query(`
      SELECT * FROM department_info 
      ${whereClause}
      ORDER BY dept_full_name
    `, queryParams);

    return NextResponse.json({
      success: true,
      data: departments
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch department info' },
      { status: 500 }
    );
  }
}

// POST /api/department-info - Create new department info
export async function POST(request: NextRequest) {
  try {
    const user = getUserFromHeaders(request);
    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const dept_full_name = formData.get('dept_full_name') as string;
    const hod_name = formData.get('hod_name') as string;
    const vision = formData.get('vision') as string;
    const mission = formData.get('mission') as string;
    const about = formData.get('about') as string;
    const contact_email = formData.get('contact_email') as string;
    const contact_phone = formData.get('contact_phone') as string;
    const hod_image = formData.get('hod_image') as File;

    if (!dept || !dept_full_name || !hod_name) {
      return NextResponse.json(
        { success: false, message: 'Department code, full name, and HOD name are required' },
        { status: 400 }
      );
    }

    // Department users can only create/update their own department
    if (user.role === 'dept' && dept !== user.department) {
      return NextResponse.json(
        { success: false, message: 'You can only manage your own department' },
        { status: 403 }
      );
    }

    // Check if department already exists
    const existing = await query(
      'SELECT id FROM department_info WHERE dept = ? AND deleted_at IS NULL',
      [dept]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Department already exists' },
        { status: 409 }
      );
    }

    let hod_image_url = null;

    // Handle file upload
    if (hod_image && hod_image.size > 0) {
      const buffer = Buffer.from(await hod_image.arrayBuffer());
      const filename = `hod_${dept}_${Date.now()}.${hod_image.name.split('.').pop()}`;
      const uploadDir = join(process.cwd(), 'public/uploads/hod-images');
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      hod_image_url = `/uploads/hod-images/${filename}`;
    }

    const result = await execute(`
      INSERT INTO department_info 
      (dept, dept_full_name, hod_name, hod_image, vision, mission, about, contact_email, contact_phone, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      dept,
      dept_full_name,
      hod_name,
      hod_image_url,
      vision || null,
      mission || null,
      about || null,
      contact_email || null,
      contact_phone || null
    ]);

    return NextResponse.json({
      success: true,
      message: 'Department info created successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create department info' },
      { status: 500 }
    );
  }
}
