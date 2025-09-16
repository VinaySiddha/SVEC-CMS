import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const programType = searchParams.get('program_type');

        let sql = `
      SELECT program_title, program_type, description, faculty_name, 
             start_date, end_date, duration, institution, document_url, display_order 
      FROM faculty_development_programs 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (programType) {
            sql += ` AND program_type = ?`;
            params.push(programType);
        }

        sql += ` ORDER BY program_type, start_date DESC, display_order ASC`;

        const programs = await query(sql, params);

        // Group by program type
        const groupedPrograms = programs.reduce((acc: any, program: any) => {
            if (!acc[program.program_type]) {
                acc[program.program_type] = [];
            }
            acc[program.program_type].push(program);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedPrograms
        });
    } catch (error) {
        console.error('Error fetching faculty development programs:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch faculty development programs' },
            { status: 500 }
        );
    }
}
