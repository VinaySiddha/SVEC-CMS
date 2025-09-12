import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// GET /api/placements - Get all placements
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const academic_year = searchParams.get('academic_year');
    const company = searchParams.get('company');
    const status = searchParams.get('status') || 'approved';

    let sql = `
      SELECT * FROM placements 
      WHERE deleted_at IS NULL
    `;
    const params: string[] = [];

    if (dept) {
      sql += ` AND dept = ?`;
      params.push(dept);
    }

    if (academic_year) {
      sql += ` AND academic_year = ?`;
      params.push(academic_year);
    }

    if (company) {
      sql += ` AND company_name LIKE ?`;
      params.push(`%${company}%`);
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    sql += ` ORDER BY placement_date DESC, created_at DESC`;

    const placements = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: placements
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch placements' },
      { status: 500 }
    );
  }
}

// POST /api/placements - Create new placement
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const student_name = formData.get('student_name') as string;
    const roll_number = formData.get('roll_number') as string;
    const company_name = formData.get('company_name') as string;
    const position = formData.get('position') as string;
    const packageAmount = formData.get('package') as string;
    const placement_date = formData.get('placement_date') as string;
    const placement_type = formData.get('placement_type') as string;
    const academic_year = formData.get('academic_year') as string;
    const batch = formData.get('batch') as string;
    const image = formData.get('image') as File;

    if (!dept || !student_name || !roll_number || !company_name || !position || !academic_year || !batch) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if placement record already exists for this student
    const existing = await query(
      'SELECT id FROM placements WHERE roll_number = ? AND dept = ? AND deleted_at IS NULL',
      [roll_number, dept]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Placement record already exists for this student' },
        { status: 409 }
      );
    }

    let image_url = null;

    // Handle file upload
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const filename = `placement_${roll_number}_${Date.now()}.${image.name.split('.').pop()}`;
      const uploadDir = join(process.cwd(), 'public/uploads/placement-images');
      
      // Create directory if it doesn't exist
      await mkdir(uploadDir, { recursive: true });
      
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      image_url = `/uploads/placement-images/${filename}`;
    }

    const result = await execute(`
      INSERT INTO placements 
      (dept, student_name, roll_number, company_name, position, package, placement_date, 
       placement_type, academic_year, batch, image_url, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `, [
      dept,
      student_name,
      roll_number,
      company_name,
      position,
      packageAmount ? parseFloat(packageAmount) : null,
      placement_date || null,
      placement_type,
      academic_year,
      batch,
      image_url
    ]);

    return NextResponse.json({
      success: true,
      message: 'Placement record created successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('Error creating placement:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create placement record' },
      { status: 500 }
    );
  }
}
