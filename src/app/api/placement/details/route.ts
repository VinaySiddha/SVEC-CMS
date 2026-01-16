import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const details = (await query(
      'SELECT id, academic_year, branch, category, placed, not_placed, higher_studies FROM placement_details WHERE deleted_at IS NULL ORDER BY academic_year DESC, branch'
    )) as any[];

    return NextResponse.json(details || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch placement details' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      academic_year,
      branch,
      category,
      placed,
      not_placed,
      higher_studies
    } = await request.json();

    if (!academic_year || !branch) {
      return NextResponse.json(
        { error: 'Academic year and branch are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO placement_details 
       (academic_year, branch, category, placed, not_placed, higher_studies)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
       placed = ?, not_placed = ?, higher_studies = ?`,
      [
        academic_year,
        branch,
        category || 'UG',
        placed || 0,
        not_placed || 0,
        higher_studies || 0,
        placed || 0,
        not_placed || 0,
        higher_studies || 0
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Placement details saved successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save placement details' },
      { status: 500 }
    );
  }
}
