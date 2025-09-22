import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const workshopType = searchParams.get('workshop_type');

        let sql = `
      SELECT workshop_title, workshop_type, description, organizer, 
             start_date, end_date, venue, participants_count, document_url, display_order 
      FROM workshops 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (workshopType) {
            sql += ` AND workshop_type = ?`;
            params.push(workshopType);
        }

        sql += ` ORDER BY workshop_type, start_date DESC, display_order ASC`;

        const workshops = await query(sql, params);

        // Group by workshop type
        const groupedWorkshops = workshops.reduce((acc: any, workshop: any) => {
            if (!acc[workshop.workshop_type]) {
                acc[workshop.workshop_type] = [];
            }
            acc[workshop.workshop_type].push(workshop);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedWorkshops
        });
    } catch (error) {
        console.error('Error fetching workshops:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch workshops' },
            { status: 500 }
        );
    }
}
