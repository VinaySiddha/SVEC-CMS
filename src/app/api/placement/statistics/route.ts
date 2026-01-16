import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const stats = (await query(
      'SELECT id, academic_year, category, total_placed, average_package, highest_package, lowest_package, companies_visited FROM placement_statistics WHERE deleted_at IS NULL ORDER BY academic_year DESC'
    )) as any[];

    return NextResponse.json(stats || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      academic_year,
      category,
      total_placed,
      average_package,
      highest_package,
      lowest_package,
      companies_visited
    } = await request.json();

    if (!academic_year || !category) {
      return NextResponse.json(
        { error: 'Academic year and category are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO placement_statistics 
       (academic_year, category, total_placed, average_package, highest_package, lowest_package, companies_visited)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       total_placed = ?, average_package = ?, highest_package = ?, lowest_package = ?, companies_visited = ?`,
      [
        academic_year,
        category,
        total_placed,
        average_package,
        highest_package,
        lowest_package,
        companies_visited,
        total_placed,
        average_package,
        highest_package,
        lowest_package,
        companies_visited
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Placement statistics saved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save statistics' },
      { status: 500 }
    );
  }
}
