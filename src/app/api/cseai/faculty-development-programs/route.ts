import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const programType = searchParams.get('program_type');

        let sql = `
      SELECT id, dept, title, year, file_url 
      FROM faculty_development_programs 
      WHERE dept = ? 
    `;
        const params = [department];

        sql += ` ORDER BY year DESC, title ASC`;

        const programs = await query(sql, params);

        // Group by year
        const groupedPrograms = programs.reduce((acc: any, program: any) => {
            if (!acc[program.year]) {
                acc[program.year] = [];
            }
            acc[program.year].push(program);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedPrograms
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch faculty development programs' },
            { status: 500 }
        );
    }
}
