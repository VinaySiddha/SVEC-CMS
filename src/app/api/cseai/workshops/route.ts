import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const workshopType = searchParams.get('workshop_type');

        let sql = `
      SELECT id, dept, title, date_from, date_to, description, report_url, gallery 
      FROM workshops 
      WHERE dept = ? 
    `;
        const params = [department];

        sql += ` ORDER BY date_from DESC`;

        const workshops = await query(sql, params);

        // Group by year
        const groupedWorkshops = workshops.reduce((acc: any, workshop: any) => {
            const year = new Date(workshop.date_from).getFullYear();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(workshop);
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
