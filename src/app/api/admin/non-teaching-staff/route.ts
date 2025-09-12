import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/admin/non-teaching-staff - Get all non-teaching staff
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept') || 'eee';

    const staff = await query(
      'SELECT * FROM non_teaching_staff WHERE dept = ? AND status = "active" ORDER BY name',
      [dept]
    );
    
    return NextResponse.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching non-teaching staff:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch non-teaching staff',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/non-teaching-staff - Create new non-teaching staff member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      dept,
      name,
      designation,
      email,
      phone,
      employee_id
    } = body;

    if (!dept || !name || !designation) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: dept, name, designation' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO non_teaching_staff 
       (dept, name, designation, email, phone, employee_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'active')`,
      [dept, name, designation, email, phone, employee_id]
    );

    return NextResponse.json({
      success: true,
      data: { id: (result as any).insertId, ...body },
      message: 'Non-teaching staff member created successfully'
    });
  } catch (error) {
    console.error('Error creating non-teaching staff:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create non-teaching staff member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}