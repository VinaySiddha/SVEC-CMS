import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface AutonomousExamSection {
  id: number;
  type: string; // examination_rules, notifications, time_tables, results, revaluation_results
  degree: string; // UG or PG
  content: string;
  link: string | null;
  posteddate: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const degree = searchParams.get('degree');

    let query = 'SELECT * FROM autonomous_exam_section';
    const params: any[] = [];

    if (type === 'examination_rules') {
      query += ' WHERE type = ?';
      params.push(type);
    }

    if (degree && (degree === 'UG' || degree === 'PG')) {
      query += params.length > 0 ? ' AND degree = ?' : ' WHERE degree = ?';
      params.push(degree);
    }

    query += ' ORDER BY posteddate DESC';

    const dbResult = await db.query(query, params);
    let rows: AutonomousExamSection[] = [];
    if (Array.isArray(dbResult)) {
      rows = Array.isArray(dbResult[0]) ? dbResult[0] : dbResult;
    } else if (dbResult && typeof dbResult === 'object' && 'rows' in dbResult) {
      rows = (dbResult as any).rows;
    }

    // Organize by degree and type
    const byDegree: { [key: string]: { [key: string]: AutonomousExamSection[] } } = {
      UG: {},
      PG: {},
    };

    (Array.isArray(rows) ? rows : []).forEach((item) => {
      const degree = item.degree as keyof typeof byDegree;
      if (!byDegree[degree]) {
        byDegree[degree] = {};
      }
      if (!byDegree[degree][item.type]) {
        byDegree[degree][item.type] = [];
      }
      byDegree[degree][item.type].push(item);
    });

    return NextResponse.json({
      success: true,
      data: byDegree,
      total: (Array.isArray(rows) ? rows.length : 0),
    });
  } catch (error) {
    console.error('Error fetching autonomous exam sections:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch autonomous exam sections',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, degree, content, link } = body;

    // Validate required fields
    if (!type || !degree || !content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: type, degree, content',
        },
        { status: 400 }
      );
    }

    // Validate enum values
    if (!['UG', 'PG'].includes(degree)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Degree must be UG or PG',
        },
        { status: 400 }
      );
    }

    const validTypes = [
      'examination_rules',
      'notifications',
      'time_tables',
      'results',
      'revaluation_results',
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Type must be one of: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO autonomous_exam_section (type, degree, content, link, posteddate)
      VALUES (?, ?, ?, ?, CURDATE())
    `;

    const result = await db.query(query, [type, degree, content, link || null]);

    return NextResponse.json(
      {
        success: true,
        message: 'Autonomous exam section created successfully',
        id: (result as any).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating autonomous exam section:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create autonomous exam section',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
