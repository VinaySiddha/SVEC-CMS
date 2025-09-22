import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const library = await query(`
      SELECT library_name, description, total_books, journals_count, 
             digital_resources, seating_capacity, working_hours, image_url, display_order 
      FROM department_library 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: library
        });
    } catch (error) {
        console.error('Error fetching department library:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch department library' },
            { status: 500 }
        );
    }
}
