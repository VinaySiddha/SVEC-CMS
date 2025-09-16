import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const newsletters = await query(`
      SELECT newsletter_title, issue_number, publication_date, description, 
             document_url, cover_image_url, display_order 
      FROM newsletters 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY publication_date DESC, display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: newsletters
        });
    } catch (error) {
        console.error('Error fetching newsletters:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch newsletters' },
            { status: 500 }
        );
    }
}
