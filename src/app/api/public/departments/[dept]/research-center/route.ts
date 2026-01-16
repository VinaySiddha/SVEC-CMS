import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for this route to ensure fresh research center data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to safely execute queries without throwing
const safeQuery = async (sql: string, params: any[]) => {
    try {
        return await query(sql, params);
    } catch (error) {
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


        // Fetch all 8 research tables for EEE department
        const results = await Promise.allSettled([
            safeQuery(
                `SELECT * FROM ${dept}_research_verticles ORDER BY order_number ASC, id ASC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_research_supervisor ORDER BY id ASC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_journal_publications ORDER BY year DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_conference_publications ORDER BY year DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_patents ORDER BY publication_date DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_book_publications ORDER BY year DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_career_advancements ORDER BY joining_date DESC, id DESC`,
                []
            ),
            safeQuery(
                `SELECT * FROM ${dept}_interaction_outside_world ORDER BY id DESC`,
                []
            ),
        ]);

        // Extract data from results
        const getData = (index: number) => {
            const result = results[index];
            return result.status === 'fulfilled' ? result.value : [];
        };

        const researchData = {
            researchVerticles: getData(0),
            researchSupervisors: getData(1),
            journalPublications: getData(2),
            conferencePublications: getData(3),
            patents: getData(4),
            bookPublications: getData(5),
            careerAdvancements: getData(6),
            interactionOutsideWorld: getData(7),
        };


        const response = NextResponse.json({
            success: true,
            department: dept,
            data: researchData,
        });

        // Disable caching to ensure fresh data on every request
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');

        return response;

    } catch (error) {

        return NextResponse.json(
            {
                error: 'Failed to fetch research center data',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
