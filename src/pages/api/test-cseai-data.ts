import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export default async function handler(request: NextRequest) {
  return GET(request);
}

async function GET(request: NextRequest) {
  try {

    // Test individual endpoints
    const [
      facultyTest,
      facultyDevelopmentTest,
      mousTest
    ] = await Promise.all([
      query('SELECT COUNT(*) as count FROM faculty_profiles WHERE dept = ?', ['cse-ai']),
      query('SELECT COUNT(*) as count FROM cai_faculty_development', []),
      query('SELECT COUNT(*) as count FROM cai_mous', [])
    ]);


    // Test public API endpoint
    const publicAPIResponse = await fetch(`${request.nextUrl.origin}/api/public/departments/cse-ai`);
    const publicAPIData = await publicAPIResponse.json();


    return NextResponse.json({
      success: true,
      message: 'CSEAI data sources test completed',
      individualCounts: {
        faculty: facultyTest[0]?.count || 0,
        facultyDevelopment: facultyDevelopmentTest[0]?.count || 0,
        mous: mousTest[0]?.count || 0
      },
      publicAPI: {
        status: publicAPIResponse.status,
        success: publicAPIData?.success || false,
        dataKeys: Object.keys(publicAPIData?.data || {}),
        faculty: Array.isArray(publicAPIData?.data?.faculty) ? publicAPIData.data.faculty.length : 0,
        facultyDevelopment: Array.isArray(publicAPIData?.data?.facultyDevelopment) ? publicAPIData.data.facultyDevelopment.length : 0,
        mous: Array.isArray(publicAPIData?.data?.mous) ? publicAPIData.data.mous.length : 0
      },
      troubleshooting: [
        'Check if database tables exist and have data',
        'Verify public API endpoint works correctly',
        'Check frontend data extraction logic',
        'Verify state management in React component'
      ]
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to test CSEAI data sources',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}