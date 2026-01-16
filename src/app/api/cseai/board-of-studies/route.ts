import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        // Return empty data since board_of_studies table doesn't exist yet
        const meetings: any[] = [];

        return NextResponse.json({
            success: true,
            data: meetings
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch board of studies' },
            { status: 500 }
        );
    }
}
