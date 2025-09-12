import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/admin/non-teaching-staff/[id] - Get specific non-teaching staff member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    const staff = await query(
      'SELECT * FROM non_teaching_staff WHERE id = ?',
      [id]
    );

    if (!Array.isArray(staff) || staff.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Non-teaching staff member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: staff[0]
    });
  } catch (error) {
    console.error('Error fetching non-teaching staff member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch non-teaching staff member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT /api/admin/non-teaching-staff/[id] - Update specific non-teaching staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      dept,
      name,
      designation,
      email,
      phone,
      employee_id,
      status
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    if (!name || !designation) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, designation' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE non_teaching_staff 
       SET dept = ?, name = ?, designation = ?, email = ?, phone = ?, employee_id = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [dept, name, designation, email, phone, employee_id, status || 'active', id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Non-teaching staff member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { id: parseInt(id), ...body },
      message: 'Non-teaching staff member updated successfully'
    });
  } catch (error) {
    console.error('Error updating non-teaching staff member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update non-teaching staff member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/non-teaching-staff/[id] - Delete specific non-teaching staff member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Staff ID is required' },
        { status: 400 }
      );
    }

    // Soft delete by setting status to 'inactive'
    const result = await query(
      `UPDATE non_teaching_staff 
       SET status = 'inactive', updated_at = NOW() 
       WHERE id = ?`,
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Non-teaching staff member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Non-teaching staff member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting non-teaching staff member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete non-teaching staff member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}