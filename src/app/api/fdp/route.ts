import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { fdpSchema } from '@/utils/fdp-utils';
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'fdp');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/fdp - Get all FDPs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const faculty = searchParams.get('faculty');
    const limitParam = searchParams.get('limit');
    
    let sql = 'SELECT * FROM faculty_development_programs WHERE 1=1';
    const params: any[] = [];

    if (dept) {
      sql += ' AND dept = ?';
      params.push(dept);
    }

    if (faculty) {
      sql += ' AND faculty_name LIKE ?';
      params.push(`%${faculty}%`);
    }

    sql += ' ORDER BY date_from DESC';

    if (limitParam) {
      const limit = parseInt(limitParam);
      sql += ' LIMIT ?';
      params.push(limit);
    }

    const fdps = await query(sql, params);
    return NextResponse.json(fdps);
  } catch (error: any) {
    console.error('Error fetching FDPs:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch FDPs' }, { status: 500 });
  }
}

// POST /api/fdp - Create a new FDP
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const faculty_name = formData.get('faculty_name') as string;
    const organizer = formData.get('organizer') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const certificateFile = formData.get('certificate_file') as File;
    
    // Create data object for validation
    const fdpData = {
      dept,
      title,
      faculty_name,
      organizer,
      date_from,
      date_to,
    };
    
    // Validate data
    const validationResult = fdpSchema.safeParse(fdpData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let certificate_url = '';
    
    // Upload certificate if provided
    if (certificateFile && certificateFile instanceof File) {
      try {
        const uploadsDir = await ensureUploadDir();
        const fileExt = certificateFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write file to disk
        const buffer = Buffer.from(await certificateFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Set URL for database (relative to public)
        certificate_url = `/uploads/fdp/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload certificate' }, 
          { status: 500 }
        );
      }
    }
    
    // Insert into database
    const insertQuery = `
      INSERT INTO faculty_development_programs 
      (dept, title, faculty_name, organizer, date_from, date_to, certificate_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await query(insertQuery, [
      dept,
      title,
      faculty_name,
      organizer,
      date_from,
      date_to,
      certificate_url,
    ]);
    
    // Assuming result is an object with affectedRows or similar property
    // or an array where the first element contains insertId
    const insertId = Array.isArray(result) && result.length > 0 && result[0] !== null && typeof result[0] === 'object' && 'insertId' in (result[0] as any) 
      ? (result[0] as any).insertId 
      : (typeof result === 'object' && result !== null && 'insertId' in (result as any) 
          ? (result as any).insertId 
          : null);
    
    if (!insertId) {
      throw new Error('Failed to insert FDP data');
    }
    
    // Fetch the newly created FDP
    const newFdp = await query(
      'SELECT * FROM faculty_development_programs WHERE id = ?', 
      [insertId]
    );
    
    return NextResponse.json(newFdp[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating FDP:', error);
    return NextResponse.json({ error: error.message || 'Failed to create FDP' }, { status: 500 });
  }
}
