import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { organizedEventSchema } from '@/utils/organized-events-utils';
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'organized-events');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/organized-events - Get all organized events with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const limitParam = searchParams.get('limit');
    
    let sql = 'SELECT * FROM organized_events WHERE 1=1';
    const params: any[] = [];

    if (dept) {
      sql += ' AND dept = ?';
      params.push(dept);
    }

    sql += ' ORDER BY date_from DESC';

    if (limitParam) {
      const limit = parseInt(limitParam);
      sql += ' LIMIT ?';
      params.push(limit);
    }

    const events = await query(sql, params);
    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error fetching organized events:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch organized events' }, { status: 500 });
  }
}

// POST /api/organized-events - Create a new organized event
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const organizer = formData.get('organizer') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const reportFile = formData.get('report_file') as File;
    
    // Create data object for validation
    const eventData = {
      dept,
      title,
      organizer,
      date_from,
      date_to,
    };
    
    // Validate data
    const validationResult = organizedEventSchema.safeParse(eventData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let report_url = '';
    
    // Upload report if provided
    if (reportFile && reportFile instanceof File) {
      try {
        const uploadsDir = await ensureUploadDir();
        const fileExt = reportFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write file to disk
        const buffer = Buffer.from(await reportFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Set URL for database (relative to public)
        report_url = `/uploads/organized-events/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload report' }, 
          { status: 500 }
        );
      }
    }
    
    // Insert into database
    const insertQuery = `
      INSERT INTO organized_events 
      (dept, title, organizer, date_from, date_to, report_url) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await query(insertQuery, [
      dept,
      title,
      organizer,
      date_from,
      date_to,
      report_url,
    ]);
    
    // Assuming result is an object with affectedRows or similar property
    // or an array where the first element contains insertId
    const insertId = Array.isArray(result) && result.length > 0 && result[0] !== null && typeof result[0] === 'object' && 'insertId' in (result[0] as any) 
      ? (result[0] as any).insertId 
      : (typeof result === 'object' && result !== null && 'insertId' in (result as any) 
          ? (result as any).insertId 
          : null);
    
    if (!insertId) {
      throw new Error('Failed to insert organized event data');
    }
    
    // Fetch the newly created event
    const newEvent = await query(
      'SELECT * FROM organized_events WHERE id = ?', 
      [insertId]
    );
    
    return NextResponse.json(newEvent[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating organized event:', error);
    return NextResponse.json({ error: error.message || 'Failed to create organized event' }, { status: 500 });
  }
}
