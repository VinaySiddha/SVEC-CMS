import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const facultyName = searchParams.get('faculty_name');
        const achievementType = searchParams.get('achievement_type');

        let sql = `
      SELECT faculty_name, achievement_type, title, description, 
             achievement_date, awarding_body, document_url, display_order 
      FROM faculty_achievements 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (facultyName) {
            sql += ` AND faculty_name = ?`;
            params.push(facultyName);
        }

        if (achievementType) {
            sql += ` AND achievement_type = ?`;
            params.push(achievementType);
        }

        sql += ` ORDER BY faculty_name, achievement_date DESC, display_order ASC`;

        const achievements = await query(sql, params);

        // Group by faculty name
        const groupedAchievements = achievements.reduce((acc: any, achievement: any) => {
            if (!acc[achievement.faculty_name]) {
                acc[achievement.faculty_name] = [];
            }
            acc[achievement.faculty_name].push(achievement);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedAchievements
        });
    } catch (error) {
        console.error('Error fetching faculty achievements:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch faculty achievements' },
            { status: 500 }
        );
    }
}
