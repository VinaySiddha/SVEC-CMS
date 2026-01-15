import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for this route to ensure fresh student achievements data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to safely execute queries without throwing
const safeQuery = async (sql: string, params: any[]) => {
    try {
        return await query(sql, params);
    } catch (error) {
        console.warn(`⚠️ Query failed: ${sql.substring(0, 50)}...`, error instanceof Error ? error.message : error);
        return [];
    }
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ dept: string }> }
) {
    try {
        const resolvedParams = await params;
        const dept = resolvedParams.dept;

        if (!dept) {
            return NextResponse.json(
                { error: 'Department parameter is required' },
                { status: 400 }
            );
        }

        console.log(`🏆 Fetching student achievements data for department: ${dept}`);

        // Fetch all 14 student achievement tables (3 General + 11 others)
        const results = await Promise.allSettled([
            safeQuery(
                `SELECT * FROM ${dept}_student_achievements_pdf ORDER BY id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_student_achievements_placement ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_student_achievements_internships ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_roll_of_honour ORDER BY batch DESC, percentage DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_placement ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_higher_studies ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_competitive_examinations ORDER BY year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_course_certifications ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_internship ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_workshops_soc ORDER BY academic_year DESC, start_date DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_crt ORDER BY academic_year DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_projects ORDER BY academic_year DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_csp ORDER BY academic_year DESC`,
                []
            ),
        ]);

        // Extract data from results
        const getData = (index: number) => {
            const result = results[index];
            return result.status === 'fulfilled' ? result.value : [];
        };

        const studentAchievementsData = {
            studentPdfList: getData(0),
            placementSummary: getData(1),
            internshipsSummary: getData(2),
            rollOfHonour: getData(3),
            placement: getData(4),
            higherStudies: getData(5),
            competitiveExaminations: getData(6),
            courseCertifications: getData(7),
            internship: getData(8),
            workshopsSoc: getData(9),
            crt: getData(10),
            projects: getData(11),
            csp: getData(12),
        };

        console.log(`✅ Student achievements data fetched successfully`);
        console.log(`📊 Student PDFs: ${studentAchievementsData.studentPdfList.length}`);
        console.log(`📊 Placement Summary: ${studentAchievementsData.placementSummary.length}`);
        console.log(`📊 Internships Summary: ${studentAchievementsData.internshipsSummary.length}`);
        console.log(`📊 Roll Of Honour: ${studentAchievementsData.rollOfHonour.length}`);
        console.log(`📊 Placement: ${studentAchievementsData.placement.length}`);
        console.log(`📊 Higher Studies: ${studentAchievementsData.higherStudies.length}`);
        console.log(`📊 Competitive Exams: ${studentAchievementsData.competitiveExaminations.length}`);
        console.log(`📊 Course Certifications: ${studentAchievementsData.courseCertifications.length}`);
        console.log(`📊 Internship: ${studentAchievementsData.internship.length}`);
        console.log(`📊 Workshops/SOC: ${studentAchievementsData.workshopsSoc.length}`);
        console.log(`📊 CRT: ${studentAchievementsData.crt.length}`);
        console.log(`📊 Projects: ${studentAchievementsData.projects.length}`);
        console.log(`📊 CSP: ${studentAchievementsData.csp.length}`);

        const response = NextResponse.json({
            success: true,
            department: dept,
            data: studentAchievementsData,
        });

        // Disable caching to ensure fresh data on every request
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;

    } catch (error) {
        console.error('❌ Error fetching student achievements data:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch student achievements data',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
