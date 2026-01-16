import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const sectionName = searchParams.get('section');

        let sql = `
      SELECT section_name, section_title, section_content, display_order 
      FROM department_info_sections 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (sectionName) {
            sql += ` AND section_name = ?`;
            params.push(sectionName);
        }

        sql += ` ORDER BY display_order ASC`;

        const sections = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: sections
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch department info sections' },
            { status: 500 }
        );
    }
}
