import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');

    let sql = 'SELECT id, name, logo_url, category, industry, visit_year FROM placement_companies WHERE deleted_at IS NULL';
    let params: any[] = [];

    if (year) {
      sql += ' AND visit_year = ?';
      params.push(year);
    }

    sql += ' ORDER BY visit_year DESC, name';

    const companies = (await query(sql, params)) as any[];

    return NextResponse.json(companies || []);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      logo_url,
      category,
      industry,
      visit_year
    } = await request.json();

    if (!name || !visit_year) {
      return NextResponse.json(
        { error: 'Company name and visit year are required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO placement_companies (name, logo_url, category, industry, visit_year, is_active)
       VALUES (?, ?, ?, ?, ?, true)`,
      [name, logo_url, category, industry, visit_year]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Company added successfully'
    });
  } catch (error) {
    console.error('Error adding company:', error);
    return NextResponse.json(
      { error: 'Failed to add company' },
      { status: 500 }
    );
  }
}
