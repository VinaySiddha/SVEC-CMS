import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';

        const sidebarItems = await query(`
      SELECT item_id, label, icon_name, display_order 
      FROM department_sidebar_items 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY display_order ASC
    `, [department]);

        return NextResponse.json({
            success: true,
            data: sidebarItems
        });
    } catch (error) {
        console.error('Error fetching sidebar items:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch sidebar items' },
            { status: 500 }
        );
    }
}
