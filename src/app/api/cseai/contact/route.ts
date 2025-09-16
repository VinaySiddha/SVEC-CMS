import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const contactType = searchParams.get('contact_type');

        let sql = `
      SELECT contact_type, contact_name, designation, phone, email, 
             office_location, display_order 
      FROM department_contact 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (contactType) {
            sql += ` AND contact_type = ?`;
            params.push(contactType);
        }

        sql += ` ORDER BY contact_type, display_order ASC`;

        const contacts = await query(sql, params);

        return NextResponse.json({
            success: true,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching department contact:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch department contact' },
            { status: 500 }
        );
    }
}
