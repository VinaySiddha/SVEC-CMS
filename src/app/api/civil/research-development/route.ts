import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'civil';
        const activityType = searchParams.get('activity_type');

        let sql = `
      SELECT activity_title, activity_type, description, faculty_name, 
             start_date, end_date, funding_agency, funding_amount, status, 
             document_url, display_order 
      FROM research_development_activities 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (activityType) {
            sql += ` AND activity_type = ?`;
            params.push(activityType);
        }

        sql += ` ORDER BY activity_type, start_date DESC, display_order ASC`;

        const activities = await query(sql, params);

        // Group by activity type
        const groupedActivities = activities.reduce((acc: any, activity: any) => {
            if (!acc[activity.activity_type]) {
                acc[activity.activity_type] = [];
            }
            acc[activity.activity_type].push(activity);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedActivities
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch research development activities' },
            { status: 500 }
        );
    }
}
