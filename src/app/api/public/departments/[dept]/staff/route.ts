import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { dept: string } }
) {
  try {
    const dept = params.dept.toLowerCase();

    // Fetch technical staff
    const technicalStaff = await query(
      'SELECT * FROM technical_staff WHERE dept = ? AND status = "active" ORDER BY name',
      [dept]
    );

    // Fetch non-teaching staff
    const nonTeachingStaff = await query(
      'SELECT * FROM non_teaching_staff WHERE dept = ? AND status = "active" ORDER BY name',
      [dept]
    );

    return NextResponse.json({
      success: true,
      department: dept.toUpperCase(),
      data: {
        technicalStaff,
        nonTeachingStaff
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staff data' },
      { status: 500 }
    );
  }
}
