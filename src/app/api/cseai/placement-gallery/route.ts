import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const batchName = searchParams.get('batch');

        let sql = `
      SELECT batch_name, image_url, alt_text, student_roll_no, student_name, 
             company_name, package_amount, display_order 
      FROM placement_gallery 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (batchName) {
            sql += ` AND batch_name = ?`;
            params.push(batchName);
        }

        sql += ` ORDER BY display_order ASC`;

        const galleryItems = await query(sql, params);

        // Group by batch_name
        const groupedGallery = galleryItems.reduce((acc: any, item: any) => {
            if (!acc[item.batch_name]) {
                acc[item.batch_name] = [];
            }
            acc[item.batch_name].push(item);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedGallery
        });
    } catch (error) {
        console.error('Error fetching placement gallery:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch placement gallery' },
            { status: 500 }
        );
    }
}
