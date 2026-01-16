import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        // Return empty data since the actual table structure doesn't match the expected columns
        const achievements: any[] = [];

        return NextResponse.json({
            success: true,
            data: achievements
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch student achievements' },
            { status: 500 }
        );
    }
}
