import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET /api/faculty-achievements - Get all faculty achievements
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const faculty_name = searchParams.get('faculty_name');
    const achievement_type = searchParams.get('achievement_type');
    const status = searchParams.get('status') || 'approved';

    let sql = `
      SELECT * FROM faculty_achievements 
      WHERE deleted_at IS NULL
    `;
    const params: string[] = [];

    if (dept) {
      sql += ` AND dept = ?`;
      params.push(dept);
    }

    if (faculty_name) {
      sql += ` AND faculty_name LIKE ?`;
      params.push(`%${faculty_name}%`);
    }

    if (achievement_type) {
      sql += ` AND achievement_type = ?`;
      params.push(achievement_type);
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY achievement_date DESC, created_at DESC`;

    const achievements = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: achievements
    });
  } catch (error) {
    console.error('Error fetching faculty achievements:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch faculty achievements' },
      { status: 500 }
    );
  }
}

// POST /api/faculty-achievements - Create new faculty achievement
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const faculty_name = formData.get('faculty_name') as string;
    const achievement_type = formData.get('achievement_type') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const achievement_date = formData.get('achievement_date') as string;
    const issuing_authority = formData.get('issuing_authority') as string;
    const document = formData.get('document') as File;

    if (!dept || !faculty_name || !achievement_type || !title) {
      return NextResponse.json(
        { success: false, message: 'Department, faculty name, achievement type, and title are required' },
        { status: 400 }
      );
    }

    let document_url = null;

    // Handle file upload
    if (document && document.size > 0) {
      const buffer = Buffer.from(await document.arrayBuffer());
      const filename = `faculty_achievement_${Date.now()}.${document.name.split('.').pop()}`;
      const uploadDir = join(process.cwd(), 'public/uploads/faculty-achievements');
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      document_url = `/uploads/faculty-achievements/${filename}`;
    }

    const result = await execute(`
      INSERT INTO faculty_achievements 
      (dept, faculty_name, achievement_type, title, description, achievement_date, 
       issuing_authority, document_url, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      dept,
      faculty_name,
      achievement_type,
      title,
      description || null,
      achievement_date || null,
      issuing_authority || null,
      document_url
    ]);

    return NextResponse.json({
      success: true,
      message: 'Faculty achievement created successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('Error creating faculty achievement:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create faculty achievement' },
      { status: 500 }
    );
  }
}
