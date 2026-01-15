import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// ECT department module mappings
const MODULE_TABLE_MAP: Record<string, string> = {
    'ect-faculty': 'ect_faculty',
    'ect-student-achievements': 'ect_student_achievements',
    'ect-syllabus': 'ect_syllabus',
    'ect-eresources': 'ect_eresources',
    'ect-department-library': 'ect_department_library',
    'ect-mous': 'ect_mous',
    'ect-industry-programs': 'ect_industry_programs',
    'ect-department-overview': 'ect_department_overview',
    'ect-training-activities': 'ect_training_activities',
    'ect-bos-members': 'ect_bos_members',
    'ect-bos-minutes': 'ect_bos_minutes',
    'ect-handbooks': 'ect_handbooks',
    'ect-physical-facilities': 'ect_physical_facilities',
    'ect-faculty-development': 'ect_faculty_development',
    'ect-faculty-achievements': 'ect_faculty_achievements',
    'ect-merit-scholarships': 'ect_merit_scholarships',
    'ect-extra-curricular': 'ect_extracurricular_activities',
    'ect-sahaya-events': 'ect_sahaya_events',
    'ect-scud-activities': 'ect_scud_activities',
    'ect-technical-association': 'ect_technical_association',
    'ect-newsletters': 'ect_newsletters',
    'ect-hackathons': 'ect_hackathons',
    'ect-placements': 'ect_placements',
    'ect-workshops': 'ect_workshops',
    'ect-gate': 'ect_gate',
    'ect-roll-of-honour': 'ect_roll_of_honour',
    'ect-hackathons-gallery': 'ect_hackathons_gallery',
    'ect-technical-association-gallery': 'ect_activity_gallery',
    'ect-training-activities-gallery': 'ect_training_activities_gallery',
    'ect-extra-curricular-gallery': 'ect_extracurricular_gallery',
    'ect-merit-scholarships-gallery': 'ect_merit_scholarships_gallery',
    'ect-placements-gallery': 'ect_placements_gallery',
    'ect-workshops-gallery': 'ect_workshops_gallery',
    'ect-faculty-development-gallery': 'ect_faculty_development_gallery',
    'ect-gate-gallery': 'ect_gate_gallery',
    'ect-roll-of-honour-gallery': 'ect_roll_of_honour_gallery',
    'ect-lecturers-gallery': 'ect_lecturers_gallery'
};

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ module: string }> }
) {
    try {
        const { module } = await params;
        const tableName = MODULE_TABLE_MAP[module];

        if (!tableName) {
            return NextResponse.json(
                { error: 'Invalid module name' },
                { status: 404 }
            );
        }

        // Check if table exists using query (safe since tableName is from our whitelist)
        const [tables] = await getPool().query<RowDataPacket[]>(
            `SHOW TABLES LIKE '${tableName}'`
        );

        if (!tables || tables.length === 0) {
            // Table doesn't exist, return empty array
            return NextResponse.json([]);
        }

        // Fetch all records from the table (tableName is safe as it comes from our whitelist)
        const [rows] = await getPool().query<RowDataPacket[]>(
            `SELECT * FROM \`${tableName}\` ORDER BY id DESC`
        );

        return NextResponse.json(rows || []);
    } catch (error) {
        console.error(`Error fetching ECT module data:`, error);
        return NextResponse.json(
            { error: 'Failed to fetch data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
