import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET: List records
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const degree = searchParams.get('degree');
    const type = searchParams.get('type');

    let baseQuery = 'SELECT * FROM autonomous_exam_section';
    const conditions: string[] = [];
    const params: any[] = [];

    if (degree) {
      conditions.push('degree = ?');
      params.push(degree);
    }
    if (type) {
      conditions.push('type = ?');
      params.push(type);
    }

    if (conditions.length) {
      baseQuery += ' WHERE ' + conditions.join(' AND ');
    }
    baseQuery += ' ORDER BY posteddate DESC, date DESC';

    const rows = await db.query(baseQuery, params);
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch autonomous exam sections', details: String(error) }, { status: 500 });
  }
}

// POST: Create new record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, type, degree, content, link } = body;

    if (!type || !degree || !content) {
      return NextResponse.json({ error: 'type, degree and content are required' }, { status: 400 });
    }
    const allowedDegrees = ['UG', 'PG'];
    if (!allowedDegrees.includes(degree)) {
      return NextResponse.json({ error: 'degree must be UG or PG' }, { status: 400 });
    }
    // Accept both legacy types and new enumerations
    const allowedTypes = [
      'examination_rules','notifications','time_tables','results','revaluation_results',
      'Regular','Supply','Fee Notification','Circular','Timetable','Rules'
    ];
    if (!allowedTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const posteddate = currentDate;

    // Try to insert with date field if provided, otherwise just use posteddate
    let insertQuery, insertParams;
    
    if (date) {
      insertQuery = `
        INSERT INTO autonomous_exam_section (date, type, degree, content, link, posteddate)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      insertParams = [date, type, degree, content, link || '', posteddate];
    } else {
      insertQuery = `
        INSERT INTO autonomous_exam_section (type, degree, content, link, posteddate)
        VALUES (?, ?, ?, ?, ?)
      `;
      insertParams = [type, degree, content, link || '', posteddate];
    }

    const insertResult = await db.execute(insertQuery, insertParams);
    return NextResponse.json({ success: true, id: insertResult.insertId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create record', details: String(error) }, { status: 500 });
  }
}

// PUT: Update existing record
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, type, degree, content, link } = body;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Fetch existing to ensure it exists
    const existingRows = await db.query<any>('SELECT * FROM autonomous_exam_section WHERE id = ?', [id]);
    if (!existingRows.length) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }
    const existing = existingRows[0];

    const nextDate = date || existing.date;
    const nextType = type || existing.type;
    const nextDegree = degree || existing.degree;
    const nextContent = content || existing.content;
    const nextLink = (link !== undefined) ? link : existing.link;

    const updateQuery = `
      UPDATE autonomous_exam_section
      SET date = ?, type = ?, degree = ?, content = ?, link = ?
      WHERE id = ?
    `;
    await db.execute(updateQuery, [nextDate, nextType, nextDegree, nextContent, nextLink, id]);
    return NextResponse.json({ success: true, message: 'Record updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

// DELETE: Delete record
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    // Get the record details first to retrieve the file link
    const records = await db.query('SELECT link FROM autonomous_exam_section WHERE id = ?', [id]) as any[];
    
    // Delete the record
    await db.execute('DELETE FROM autonomous_exam_section WHERE id = ?', [id]);
    
    // Delete the associated file if it exists
    if (records && records.length > 0 && records[0].link) {
      const { unlink } = await import('fs/promises');
      const { join } = await import('path');
      const filePath = join(process.cwd(), 'public', records[0].link.replace(/^\//, ''));
      try {
        await unlink(filePath);
      } catch (error) {
        // Continue even if file deletion fails
      }
    }
    
    return NextResponse.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}