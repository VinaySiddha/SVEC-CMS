import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const category = searchParams.get('category');
        const academicYear = searchParams.get('academic_year');

        let sql = `
      SELECT category, title, description, file_url, file_type, academic_year, 
             semester, display_order 
      FROM department_eresources 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (category) {
            sql += ` AND category = ?`;
            params.push(category);
        }

        if (academicYear) {
            sql += ` AND academic_year = ?`;
            params.push(academicYear);
        }

        sql += ` ORDER BY category, academic_year DESC, display_order ASC`;

        const eresources = await query(sql, params);

        // Group by category and academic year
        const groupedResources = eresources.reduce((acc: any, item: any) => {
            const key = `${item.category}_${item.academic_year}`;
            if (!acc[key]) {
                acc[key] = {
                    category: item.category,
                    academic_year: item.academic_year,
                    items: []
                };
            }
            acc[key].items.push(item);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: Object.values(groupedResources)
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch e-resources' },
            { status: 500 }
        );
    }
}
