import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const query = 'SELECT * FROM autonomous_exam_section ORDER BY posteddate DESC, date DESC';
    const dbResult = await db.query(query);
    
    let rows: any[] = [];
    if (Array.isArray(dbResult)) {
      rows = Array.isArray(dbResult[0]) ? dbResult[0] : dbResult;
    } else if (dbResult && typeof dbResult === 'object' && 'rows' in dbResult) {
      rows = (dbResult as any).rows;
    }

    return NextResponse.json(rows || []);
  } catch (error) {
    console.error('Error fetching autonomous exam sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch autonomous exam sections' },
      { status: 500 }
    );
  }
}