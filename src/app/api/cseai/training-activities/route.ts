import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const trainingType = searchParams.get('training_type');

        let sql = `
      SELECT training_title, training_type, description, trainer, start_date, end_date, 
             duration, venue, participants_count, document_url, display_order 
      FROM training_activities 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (trainingType) {
            sql += ` AND training_type = ?`;
            params.push(trainingType);
        }

        sql += ` ORDER BY training_type, start_date DESC, display_order ASC`;

        // Return empty data since training_activities table doesn't exist yet
        const activities: any[] = [];

        return NextResponse.json({
            success: true,
            data: activities
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch training activities' },
            { status: 500 }
        );
    }
}
