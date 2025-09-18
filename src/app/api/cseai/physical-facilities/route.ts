import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const facilityType = searchParams.get('facility_type');

        let sql = `
      SELECT facility_name, facility_type, description, capacity, area_sqft, 
             equipment_details, image_url, display_order 
      FROM physical_facilities 
      WHERE department = ? AND is_active = TRUE 
    `;
        const params = [department];

        if (facilityType) {
            sql += ` AND facility_type = ?`;
            params.push(facilityType);
        }

        sql += ` ORDER BY facility_type, display_order ASC`;

        const facilities = await query(sql, params);

        // Group by facility type
        const groupedFacilities = facilities.reduce((acc: any, facility: any) => {
            if (!acc[facility.facility_type]) {
                acc[facility.facility_type] = [];
            }
            acc[facility.facility_type].push(facility);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            data: groupedFacilities
        });
    } catch (error) {
        console.error('Error fetching physical facilities:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch physical facilities' },
            { status: 500 }
        );
    }
}
