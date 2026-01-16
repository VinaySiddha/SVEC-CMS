import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const query = 'SELECT * FROM exam_section ORDER BY posteddate DESC, date DESC';
    const dbResult = await db.query(query);
    
    let rows: any[] = [];
    if (Array.isArray(dbResult)) {
      rows = Array.isArray(dbResult[0]) ? dbResult[0] : dbResult;
    } else if (dbResult && typeof dbResult === 'object' && 'rows' in dbResult) {
      rows = (dbResult as any).rows;
    }

    return NextResponse.json(rows || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch JNTUK exam sections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, content, degree, type, link, posteddate } = body;

    if (!content || !degree || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: content, degree, type' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO exam_section (date, content, degree, type, link, posteddate) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      date || new Date().toISOString().split('T')[0],
      content,
      degree,
      type,
      link || null,
      posteddate || new Date().toISOString().split('T')[0]
    ];

    await db.query(query, values);

    return NextResponse.json(
      { success: true, message: 'JNTUK exam section entry created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create JNTUK exam section entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sno } = body;

    if (!sno) {
      return NextResponse.json(
        { error: 'Missing required field: sno' },
        { status: 400 }
      );
    }

    const query = 'DELETE FROM exam_section WHERE sno = ?';
    await db.query(query, [sno]);

    return NextResponse.json(
      { success: true, message: 'JNTUK exam section entry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete JNTUK exam section entry' },
      { status: 500 }
    );
  }
}