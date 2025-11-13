import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch single college
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const colleges = await query(
      `SELECT 
        id, name, short_name, code, type, affiliation, university,
        accreditation, naac_grade, nirf_ranking,
        email, phone, fax, website,
        address, city, state, country, pincode,
        principal_name, principal_email, principal_phone,
        established_year, autonomous, coed,
        total_students, total_faculty, total_departments,
        campus_area, hostel_capacity, library_books,
        status, logo_url, description, vision, mission,
        created_at, updated_at
      FROM colleges 
      WHERE id = ? AND deleted_at IS NULL`,
      [id]
    ) as any[];

    if (colleges.length === 0) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    // Also fetch departments and facilities
    const departments = await query(
      `SELECT 
        id, department_name, department_code, head_of_department,
        total_students, total_faculty, established_year, accreditation
      FROM college_departments 
      WHERE college_id = ? AND deleted_at IS NULL
      ORDER BY department_name`,
      [id]
    );

    const facilities = await query(
      `SELECT 
        id, facility_name, facility_type, description, capacity, is_available
      FROM college_facilities 
      WHERE college_id = ? AND deleted_at IS NULL
      ORDER BY facility_type, facility_name`,
      [id]
    );

    const college = colleges[0];
    college.departments = departments;
    college.facilities = facilities;

    return NextResponse.json({
      success: true,
      data: college
    });
  } catch (error) {
    console.error('Error fetching college:', error);
    return NextResponse.json(
      { error: 'Failed to fetch college' },
      { status: 500 }
    );
  }
}

// PUT: Update college
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
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

    // Check if college exists
    const existingCollege = await query(
      'SELECT id FROM colleges WHERE id = ? AND deleted_at IS NULL',
      [id]
    ) as any[];

    if (existingCollege.length === 0) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    // Check if code conflicts with another college
    const codeConflict = await query(
      'SELECT id FROM colleges WHERE code = ? AND id != ? AND deleted_at IS NULL',
      [code, id]
    ) as any[];

    if (codeConflict.length > 0) {
      return NextResponse.json(
        { error: 'College code already exists' },
        { status: 409 }
      );
    }

    await query(
      `UPDATE colleges SET 
        name = ?, short_name = ?, code = ?, type = ?, affiliation = ?, university = ?,
        accreditation = ?, naac_grade = ?, nirf_ranking = ?,
        email = ?, phone = ?, fax = ?, website = ?,
        address = ?, city = ?, state = ?, country = ?, pincode = ?,
        principal_name = ?, principal_email = ?, principal_phone = ?,
        established_year = ?, autonomous = ?, coed = ?,
        total_students = ?, total_faculty = ?, total_departments = ?,
        campus_area = ?, hostel_capacity = ?, library_books = ?,
        status = ?, logo_url = ?, description = ?, vision = ?, mission = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        name, short_name, code, type, affiliation, university,
        accreditation, naac_grade, nirf_ranking,
        email, phone, fax, website,
        address, city, state, country, pincode,
        principal_name, principal_email, principal_phone,
        established_year, autonomous, coed,
        total_students, total_faculty, total_departments,
        campus_area, hostel_capacity, library_books,
        status, logo_url, description, vision, mission,
        id
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'College updated successfully'
    });
  } catch (error) {
    console.error('Error updating college:', error);
    return NextResponse.json(
      { error: 'Failed to update college' },
      { status: 500 }
    );
  }
}

// DELETE: Delete college (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if college exists
    const existingCollege = await query(
      'SELECT id FROM colleges WHERE id = ? AND deleted_at IS NULL',
      [id]
    ) as any[];

    if (existingCollege.length === 0) {
      return NextResponse.json(
        { error: 'College not found' },
        { status: 404 }
      );
    }

    // Soft delete the college
    await query(
      'UPDATE colleges SET deleted_at = NOW(), updated_at = NOW() WHERE id = ?',
      [id]
    );

    // Also soft delete related departments and facilities
    await query(
      'UPDATE college_departments SET deleted_at = NOW(), updated_at = NOW() WHERE college_id = ?',
      [id]
    );

    await query(
      'UPDATE college_facilities SET deleted_at = NOW(), updated_at = NOW() WHERE college_id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'College deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting college:', error);
    return NextResponse.json(
      { error: 'Failed to delete college' },
      { status: 500 }
    );
  }
}