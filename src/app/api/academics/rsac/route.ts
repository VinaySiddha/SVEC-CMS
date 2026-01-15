import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface RsacItem {
  id: number;
  date: string;
  content: string;
  link: string;
  degree: 'UG' | 'PG';
  type: 'syllabus' | 'regulations' | 'academic-calendar';
  posted_date: string;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const degree = searchParams.get('degree');

    let sql = 'SELECT id, date, content, link, degree, type, posted_date FROM rsac_items WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (degree && (degree === 'UG' || degree === 'PG')) {
      sql += ' AND degree = ?';
      params.push(degree);
    }

    sql += ' ORDER BY date DESC';

    const items = (await query(sql, params)) as RsacItem[];

    // Organize by degree if no specific degree requested
    if (!degree && type) {
      const byDegree = {
        ug: items.filter(item => item.degree === 'UG'),
        pg: items.filter(item => item.degree === 'PG'),
      };
      return NextResponse.json(byDegree);
    }

    // Return items as array if specific degree requested
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching RSAC items:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch RSAC items',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
