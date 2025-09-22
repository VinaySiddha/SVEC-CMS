import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const academicYear = searchParams.get('academic_year');
        const achievementType = searchParams.get('achievement_type');

        let sql = `
      SELECT student_name, student_roll_no, academic_year, semester, 
             achievement_type, cgpa, rank, scholarship_amount, awarding_body, 
             document_url, display_order 
      FROM merit_scholarships 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (academicYear) {
            sql += ` AND academic_year = ?`;
            params.push(academicYear);
        }

        if (achievementType) {
            sql += ` AND achievement_type = ?`;
            params.push(achievementType);
        }

        sql += ` ORDER BY academic_year DESC, achievement_type, display_order ASC`;

        const scholarships = await query(sql, params);

        // Group by academic year and achievement type
        const groupedScholarships = scholarships.reduce((acc: any, scholarship: any) => {
            const key = `${scholarship.academic_year}_${scholarship.achievement_type}`;
            if (!acc[key]) {
                acc[key] = {
                    academic_year: scholarship.academic_year,
                    achievement_type: scholarship.achievement_type,
                    items: []
                };
            }
            acc[key].items.push(scholarship);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: Object.values(groupedScholarships)
        });
    } catch (error) {
        console.error('Error fetching merit scholarships:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch merit scholarships' },
            { status: 500 }
        );
    }
}
