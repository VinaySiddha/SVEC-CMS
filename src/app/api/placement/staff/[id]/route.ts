import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Get single staff member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const staff = await query(
      'SELECT id, name, designation, branch, email FROM placement_staff WHERE id = ? AND deleted_at IS NULL',
      [id]
    ) as any[];

    if (staff.length === 0) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(staff[0]);
  } catch (error) {
    console.error('Error fetching staff member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff member' },
      { status: 500 }
    );
  }
}

// PUT: Update staff member
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name, designation, branch, email } = await request.json();

    if (!name || !designation || !email) {
      return NextResponse.json(
        { error: 'Name, designation, and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists for other staff members
    const existingStaff = await query(
      'SELECT id FROM placement_staff WHERE email = ? AND id != ? AND deleted_at IS NULL',
      [email, id]
    ) as any[];

    if (existingStaff.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Check if staff member exists
    const currentStaff = await query(
      'SELECT id FROM placement_staff WHERE id = ? AND deleted_at IS NULL',
      [id]
    ) as any[];

    if (currentStaff.length === 0) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    await query(
      `UPDATE placement_staff 
       SET name = ?, designation = ?, branch = ?, email = ?, updated_at = NOW()
       WHERE id = ? AND deleted_at IS NULL`,
      [name, designation, branch || '', email, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Staff member updated successfully'
    });
  } catch (error) {
    console.error('Error updating staff member:', error);
    return NextResponse.json(
      { error: 'Failed to update staff member' },
      { status: 500 }
    );
  }
}

// DELETE: Delete staff member (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if staff member exists
    const staff = await query(
      'SELECT id FROM placement_staff WHERE id = ? AND deleted_at IS NULL',
      [id]
    ) as any[];

    if (staff.length === 0) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    // Soft delete
    await query(
      'UPDATE placement_staff SET deleted_at = NOW(), is_active = false WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    return NextResponse.json(
      { error: 'Failed to delete staff member' },
      { status: 500 }
    );
  }
}