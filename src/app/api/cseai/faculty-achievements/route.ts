import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const facultyName = searchParams.get('faculty_name');
        const achievementType = searchParams.get('achievement_type');

        let sql = `
      SELECT title, year, proof_url
      FROM faculty_achievements 
      WHERE dept = ? 
    `;
        const params = [department];

        sql += ` ORDER BY year DESC, title ASC`;

        const achievements = await query(sql, params);

        // Group by title
        const groupedAchievements = achievements.reduce((acc: any, achievement: any) => {
            if (!acc[achievement.title]) {
                acc[achievement.title] = [];
            }
            acc[achievement.title].push({
                year: achievement.year,
                url: achievement.proof_url
            });
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedAchievements
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch faculty achievements' },
            { status: 500 }
        );
    }
}
