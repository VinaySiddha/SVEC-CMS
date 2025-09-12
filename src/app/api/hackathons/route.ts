import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');

    let sql = `
      SELECT * FROM hackathons 
      WHERE deleted_at IS NULL
    `;
    const params: string[] = [];

    if (dept) {
      sql += ` AND dept = ?`;
      params.push(dept);
    }

    sql += ` ORDER BY start_date DESC, created_at DESC`;

    const hackathons = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: hackathons
    });
  } catch (error) {
    console.error('Error fetching hackathons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hackathons' },
      { status: 500 }
    );
  }
}