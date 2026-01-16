import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Disable caching for this route to ensure fresh staff data on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
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

    const response = NextResponse.json({
      success: true,
      department: dept.toUpperCase(),
      data: {
        technicalStaff,
        nonTeachingStaff
      }
    });

    // Disable caching to ensure fresh data on every request
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staff data' },
      { status: 500 }
    );
  }
}
