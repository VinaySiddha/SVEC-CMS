import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const boardMeetings = await query(`
      SELECT meeting_title, meeting_date, meeting_number, description, 
             document_url, display_order 
      FROM board_of_studies 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY meeting_date DESC, display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: boardMeetings
        });
    } catch (error) {
        console.error('Error fetching board of studies:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch board of studies' },
            { status: 500 }
        );
    }
}
