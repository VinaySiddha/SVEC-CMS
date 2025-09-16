import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const placementBatches = await query(`
      SELECT batch_name, academic_year, document_url, document_title, display_order 
      FROM placement_batches 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: placementBatches
        });
    } catch (error) {
        console.error('Error fetching placement batches:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch placement batches' },
            { status: 500 }
        );
    }
}
