import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// PUT /api/admin/board-of-studies/minutes/[id] - Update meeting minute
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const {
      meeting_title,
      meeting_number,
      meeting_date,
      document_url,
      academic_year,
      description,
      status
    } = body;

    if (!meeting_title || !meeting_number || !meeting_date || !document_url || !academic_year) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await query(
      `UPDATE bos_meeting_minutes 
       SET meeting_title = ?, meeting_number = ?, meeting_date = ?, document_url = ?, 
           academic_year = ?, description = ?, status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [meeting_title, meeting_number, meeting_date, document_url, academic_year, description, status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Meeting minute updated successfully'
    });
  } catch (error) {
    console.error('Error updating meeting minute:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update meeting minute',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/board-of-studies/minutes/[id] - Delete meeting minute
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await query('DELETE FROM bos_meeting_minutes WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Meeting minute deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting meeting minute:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete meeting minute',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}