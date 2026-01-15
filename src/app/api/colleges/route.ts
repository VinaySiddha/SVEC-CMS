import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch all colleges
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    const state = searchParams.get('state');
    const status = searchParams.get('status') || 'Active';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let sql = `
      SELECT 
        id, name, short_name, code, type, affiliation, university,
        accreditation, naac_grade, nirf_ranking,
        email, phone, website,
        address, city, state, country, pincode,
        principal_name, principal_email,
        established_year, autonomous, coed,
        total_students, total_faculty, total_departments,
        campus_area, status, logo_url, description,
        created_at, updated_at
      FROM colleges 
      WHERE deleted_at IS NULL
    `;
    const params = [];

    if (status && status !== 'All') {
      sql += ` AND status = ?`;
      params.push(status);
    }

    if (type && type !== 'All') {
      sql += ` AND type = ?`;
      params.push(type);
    }

    if (state && state !== 'All') {
      sql += ` AND state = ?`;
      params.push(state);
    }

    if (search) {
      sql += ` AND (name LIKE ? OR short_name LIKE ? OR code LIKE ? OR city LIKE ?)`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    // Get total count
    const countSql = `SELECT COUNT(*) as total FROM (${sql}) as count_query`;
    const countResult = await query(countSql, params) as any[];
    const total = countResult[0]?.total || 0;

    // Add sorting and pagination
    sql += ` ORDER BY name ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const colleges = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch colleges' },
      { status: 500 }
    );
  }
}

// POST: Create new college
export async function POST(request: NextRequest) {
  try {
    const {
      name,
      short_name,
      code,
      type,
      affiliation,
      university,
      accreditation,
      naac_grade,
      nirf_ranking,
      email,
      phone,
      fax,
      website,
      address,
      city,
      state,
      country,
      pincode,
      principal_name,
      principal_email,
      principal_phone,
      established_year,
      autonomous,
      coed,
      total_students,
      total_faculty,
      total_departments,
      campus_area,
      hostel_capacity,
      library_books,
      status,
      logo_url,
      description,
      vision,
      mission
    } = await request.json();

    if (!name || !code) {
      return NextResponse.json(
        { error: 'College name and code are required' },
        { status: 400 }
      );
    }

    // Check if code already exists
    const existingCollege = await query(
      'SELECT id FROM colleges WHERE code = ? AND deleted_at IS NULL',
      [code]
    ) as any[];

    if (existingCollege.length > 0) {
      return NextResponse.json(
        { error: 'College code already exists' },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO colleges (
        name, short_name, code, type, affiliation, university,
        accreditation, naac_grade, nirf_ranking,
        email, phone, fax, website,
        address, city, state, country, pincode,
        principal_name, principal_email, principal_phone,
        established_year, autonomous, coed,
        total_students, total_faculty, total_departments,
        campus_area, hostel_capacity, library_books,
        status, logo_url, description, vision, mission,
        created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?, ?,
        NOW(), NOW()
      )`,
      [
        name, short_name, code, type || 'Engineering', affiliation, university,
        accreditation, naac_grade || 'Not Accredited', nirf_ranking,
        email, phone, fax, website,
        address, city, state, country || 'India', pincode,
        principal_name, principal_email, principal_phone,
        established_year, autonomous || false, coed || 'Co-Educational',
        total_students || 0, total_faculty || 0, total_departments || 0,
        campus_area, hostel_capacity || 0, library_books || 0,
        status || 'Active', logo_url, description, vision, mission
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'College created successfully',
      id: (result as any).insertId
    });
  } catch (error) {
    console.error('Error creating college:', error);
    return NextResponse.json(
      { error: 'Failed to create college' },
      { status: 500 }
    );
  }
}