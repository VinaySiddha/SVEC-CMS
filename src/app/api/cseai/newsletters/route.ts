import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        // Return empty data since newsletters table doesn't exist yet
        const newsletters: any[] = [];

        return NextResponse.json({
            success: true,
            data: newsletters
        });
    } catch (error) {
        console.error('Error fetching newsletters:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch newsletters' },
            { status: 500 }
        );
    }
}
