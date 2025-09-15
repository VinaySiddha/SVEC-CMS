import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// PUT /api/admin/board-of-studies/members/[id] - Update board member
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const {
      member_name,
      designation,
      organization,
      role,
      year,
      contact_email,
      status
    } = body;

    if (!member_name || !designation || !organization || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE board_of_studies 
       SET member_name = ?, designation = ?, organization = ?, role = ?, 
           year = ?, contact_email = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [member_name, designation, organization, role, year, contact_email, status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Board member updated successfully'
    });
  } catch (error) {
    console.error('Error updating board member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update board member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/board-of-studies/members/[id] - Delete board member
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await query('DELETE FROM board_of_studies WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Board member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting board member:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete board member',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}