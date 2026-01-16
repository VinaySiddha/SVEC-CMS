import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'civil';
        const projectType = searchParams.get('project_type');

        let sql = `
      SELECT project_title, project_type, description, principal_investigator, 
             co_investigators, start_date, end_date, funding_agency, funding_amount, 
             status, document_url, display_order 
      FROM research_projects 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (projectType) {
            sql += ` AND project_type = ?`;
            params.push(projectType);
        }

        sql += ` ORDER BY project_type, start_date DESC, display_order ASC`;

        const projects = await query(sql, params);

        // Group by project type
        const groupedProjects = projects.reduce((acc: any, project: any) => {
            if (!acc[project.project_type]) {
                acc[project.project_type] = [];
            }
            acc[project.project_type].push(project);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedProjects
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch research projects' },
            { status: 500 }
        );
    }
}
