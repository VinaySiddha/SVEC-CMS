import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        // Return empty data since hackathons table doesn't exist yet
        const hackathons: any[] = [];

        return NextResponse.json({
            success: true,
            data: hackathons
        });
    } catch (error) {
        console.error('Error fetching hackathons:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch hackathons' },
            { status: 500 }
        );
    }
}
