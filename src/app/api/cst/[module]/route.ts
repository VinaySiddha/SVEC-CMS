import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// CST department module mappings
const MODULE_TABLE_MAP: Record<string, string> = {
    'cst-faculty': 'cst_faculty',
    'cst-student-achievements': 'cst_student_achievements',
    'cst-syllabus': 'cst_syllabus',
    'cst-eresources': 'cst_eresources',
    'cst-department-library': 'cst_department_library',
    'cst-mous': 'cst_mous',
    'cst-industry-programs': 'cst_industry_programs',
    'cst-department-overview': 'cst_department_overview',
    'cst-training-activities': 'cst_training_activities',
    'cst-bos-members': 'cst_bos_members',
    'cst-bos-minutes': 'cst_bos_minutes',
    'cst-handbooks': 'cst_handbooks',
    'cst-physical-facilities': 'cst_physical_facilities',
    'cst-faculty-development': 'cst_faculty_development',
    'cst-faculty-achievements': 'cst_faculty_achievements',
    'cst-merit-scholarships': 'cst_merit_scholarships',
    'cst-eapcet-toppers': 'cst_eapcet_toppers',
    'cst-extra-curricular': 'cst_extra_curricular',
    'cst-sahaya-events': 'cst_sahaya_events',
    'cst-scud-activities': 'cst_scud_activities',
    'cst-newsletters': 'cst_newsletters',
    'cst-hackathons': 'cst_hackathons',
    'cst-placements': 'cst_placements',
    'cst-workshops': 'cst_workshops',
    'cst-gate': 'cst_gate',
    'cst-roll-of-honour': 'cst_roll_of_honour',
    'cst-hackathons-gallery': 'cst_hackathons_gallery',
    'cst-technical-association-gallery': 'cst_activity_gallery',
    'cst-training-activities-gallery': 'cst_training_activities_gallery',
    'cst-extra-curricular-gallery': 'cst_extracurricular_gallery',
    'cst-merit-scholarships-gallery': 'cst_merit_scholarships_gallery',
    'cst-placements-gallery': 'cst_placements_gallery',
    'cst-workshops-gallery': 'cst_workshops_gallery',
    'cst-faculty-development-gallery': 'cst_faculty_development_gallery',
    'cst-gate-gallery': 'cst_gate_gallery',
    'cst-roll-of-honour-gallery': 'cst_roll_of_honour_gallery',
    'cst-lecturers-gallery': 'cst_lecturers_gallery'
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

        // Fetch all records ordered by id ascending for stable display
        const [rows] = await query<RowDataPacket[]>(
            `SELECT * FROM ${tableName} ORDER BY id ASC`
        );

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch data', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
