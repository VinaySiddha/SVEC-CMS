import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'civil';
        const projectType = searchParams.get('project_type');

        let sql = `
      SELECT project_title, client_name, description, faculty_involved, 
             start_date, end_date, project_value, project_type, 
             document_url, display_order 
      FROM consultancy_activities 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (projectType) {
            sql += ` AND project_type = ?`;
            params.push(projectType);
        }

        sql += ` ORDER BY project_type, start_date DESC, display_order ASC`;

        const consultancy = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: consultancy
        });
    } catch (error) {
        console.error('Error fetching consultancy activities:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch consultancy activities' },
            { status: 500 }
        );
    }
}
