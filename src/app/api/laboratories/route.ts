import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET /api/laboratories - Get all laboratories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const status = searchParams.get('status') || 'approved';

    let sql = `
      SELECT * FROM laboratories 
      WHERE deleted_at IS NULL
    `;
    const params: string[] = [];

    if (dept) {
      sql += ` AND dept = ?`;
      params.push(dept);
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY created_at DESC`;

    const laboratories = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: laboratories
    });
  } catch (error) {
    console.error('Error fetching laboratories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch laboratories' },
      { status: 500 }
    );
  }
}

// POST /api/laboratories - Create new laboratory
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const lab_name = formData.get('lab_name') as string;
    const lab_code = formData.get('lab_code') as string;
    const capacity = formData.get('capacity') as string;
    const usage = formData.get('usage') as string;
    const softwares = formData.get('softwares') as string;
    const equipments = formData.get('equipments') as string;
    const location = formData.get('location') as string;
    const incharge = formData.get('incharge') as string;
    const image = formData.get('image') as File;

    if (!dept || !lab_name) {
      return NextResponse.json(
        { success: false, message: 'Department and lab name are required' },
        { status: 400 }
      );
    }

    let image_url = null;

    // Handle file upload
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `lab_${dept}_${Date.now()}.${image.name.split('.').pop()}`;
      const uploadDir = join(process.cwd(), 'public/uploads/lab-images');
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      image_url = `/uploads/lab-images/${filename}`;
    }

    const result = await execute(`
      INSERT INTO laboratories 
      (dept, lab_name, lab_code, capacity, usage, softwares, equipments, location, incharge, image_url, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      dept,
      lab_name,
      lab_code || null,
      capacity ? parseInt(capacity) : null,
      usage || null,
      softwares || null,
      equipments || null,
      location || null,
      incharge || null,
      image_url
    ]);

    return NextResponse.json({
      success: true,
      message: 'Laboratory created successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('Error creating laboratory:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create laboratory' },
      { status: 500 }
    );
  }
}
