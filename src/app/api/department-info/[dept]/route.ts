import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';

// GET /api/department-info/[dept] - Get specific department info
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const dept = params.dept;

    const department = await query(`
      SELECT * FROM department_info 
      WHERE dept = ? AND deleted_at IS NULL
    `, [dept]);

    if (department.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: department[0]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch department info' },
      { status: 500 }
    );
  }
}

// PUT /api/department-info/[dept] - Update department info
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const dept = params.dept;
    const formData = await request.formData();
    
    const dept_full_name = formData.get('dept_full_name') as string;
    const hod_name = formData.get('hod_name') as string;
    const vision = formData.get('vision') as string;
    const mission = formData.get('mission') as string;
    const about = formData.get('about') as string;
    const contact_email = formData.get('contact_email') as string;
    const contact_phone = formData.get('contact_phone') as string;
    const hod_image = formData.get('hod_image') as File;

    if (!dept_full_name || !hod_name) {
      return NextResponse.json(
        { success: false, message: 'Department full name and HOD name are required' },
        { status: 400 }
      );
    }

    // Check if department exists
    const existing = await query<{
      id: number;
      dept: string;
      dept_full_name: string;
      hod_name: string;
      hod_image: string | null;
      vision: string | null;
      mission: string | null;
      about: string | null;
      contact_email: string | null;
      contact_phone: string | null;
      status: string;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    }>(
      'SELECT * FROM department_info WHERE dept = ? AND deleted_at IS NULL',
      [dept]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Department not found' },
        { status: 404 }
      );
    }

    let hod_image_url = existing[0].hod_image;

    // Handle file upload
    if (hod_image && hod_image.size > 0) {
      const buffer = Buffer.from(await hod_image.arrayBuffer());
      const filename = `hod_${dept}_${Date.now()}.${hod_image.name.split('.').pop()}`;
      const uploadDir = join(process.cwd(), 'public/uploads/hod-images');
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      // Delete old image if exists
      if (existing[0].hod_image) {
        try {
          const oldImagePath = join(process.cwd(), 'public', existing[0].hod_image);
          await unlink(oldImagePath);
        } catch (error) {
        }
      }
      
      hod_image_url = `/uploads/hod-images/${filename}`;
    }

    await execute(`
      UPDATE department_info 
      SET dept_full_name = ?, hod_name = ?, hod_image = ?, vision = ?, mission = ?, 
          about = ?, contact_email = ?, contact_phone = ?, status = 'pending', updated_at = CURRENT_TIMESTAMP
      WHERE dept = ?
    `, [
      dept_full_name,
      hod_name,
      hod_image_url,
      vision || null,
      mission || null,
      about || null,
      contact_email || null,
      contact_phone || null,
      dept
    ]);

    return NextResponse.json({
      success: true,
      message: 'Department info updated successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update department info' },
      { status: 500 }
    );
  }
}

// DELETE /api/department-info/[dept] - Delete department info
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const dept = (await params).dept;

    // Check if department exists
    const existing = await query(
      'SELECT * FROM department_info WHERE dept = ? AND deleted_at IS NULL',
      [dept]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Department not found' },
        { status: 404 }
      );
    }

    // Soft delete
    await execute(`
      UPDATE department_info 
      SET deleted_at = CURRENT_TIMESTAMP 
      WHERE dept = ?
    `, [dept]);

    return NextResponse.json({
      success: true,
      message: 'Department info deleted successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete department info' },
      { status: 500 }
    );
  }
}
