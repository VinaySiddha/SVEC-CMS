import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const category = searchParams.get('category');
        const academicYear = searchParams.get('academic_year');

        let sql = `
      SELECT category, title, description, student_name, student_roll_no, 
             academic_year, achievement_date, document_url, image_url, display_order 
      FROM student_achievements 
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

        const achievements = await query(sql, params);

        // Group by category and academic year
        const groupedAchievements = achievements.reduce((acc: any, achievement: any) => {
            const key = `${achievement.category}_${achievement.academic_year}`;
            if (!acc[key]) {
                acc[key] = {
                    category: achievement.category,
                    academic_year: achievement.academic_year,
                    items: []
                };
            }
            acc[key].items.push(achievement);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: Object.values(groupedAchievements)
        });
    } catch (error) {
        console.error('Error fetching student achievements:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch student achievements' },
            { status: 500 }
        );
    }
}
