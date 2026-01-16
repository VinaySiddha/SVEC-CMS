import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        // Return empty data since department_library table doesn't exist yet
        const libraryInfo: any[] = [];

        return NextResponse.json({
            success: true,
            data: libraryInfo
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch department library' },
            { status: 500 }
        );
    }
}
