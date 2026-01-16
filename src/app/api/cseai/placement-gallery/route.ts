import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        let sql = `
      SELECT id, dept, title, image_url, caption
      FROM placement_gallery 
      WHERE dept = ?
    `;
        const params = [department];

        sql += ` ORDER BY id DESC`;

        const galleryItems = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: galleryItems
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Failed to fetch placement gallery' },
            { status: 500 }
        );
    }
}
