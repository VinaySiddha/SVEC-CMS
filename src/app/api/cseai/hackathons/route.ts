import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const hackathons = await query(`
      SELECT hackathon_name, theme, description, organizer, start_date, end_date, 
             venue, participants_count, prize_amount, image_url, document_url, display_order 
      FROM hackathons 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY start_date DESC, display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: hackathons
        });
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch hackathons' },
            { status: 500 }
        );
    }
}
