import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const activityType = searchParams.get('activity_type');

        let sql = `
      SELECT activity_name, activity_type, description, organizer, participants, 
             event_date, venue, image_url, document_url, display_order 
      FROM technical_association_activities 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (activityType) {
            sql += ` AND activity_type = ?`;
            params.push(activityType);
        }

        sql += ` ORDER BY activity_type, event_date DESC, display_order ASC`;

        const activities = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: activities
        });
    } catch (error) {
        console.error('Error fetching technical association activities:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch technical association activities' },
            { status: 500 }
        );
    }
}
