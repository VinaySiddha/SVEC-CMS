import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const academicYear = searchParams.get('academic_year');
        const achievementType = searchParams.get('achievement_type');

        // Return empty data since the table structure doesn't match or table doesn't exist
        const scholarships: any[] = [];

        return NextResponse.json({
            success: true,
            data: scholarships
        });
    } catch (error) {
        console.error('Error fetching merit scholarships:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch merit scholarships' },
            { status: 500 }
        );
    }
}
