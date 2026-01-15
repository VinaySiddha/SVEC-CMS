import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export default async function handler(request: NextRequest) {
  return GET(request);
}

async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing all CSEAI data sources...');

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

    console.log('✅ Individual data counts:');
    console.log(`📊 Faculty: ${facultyTest[0]?.count || 0}`);
    console.log(`📊 Faculty Development: ${facultyDevelopmentTest[0]?.count || 0}`);
    console.log(`📊 MOUs: ${mousTest[0]?.count || 0}`);

    // Test public API endpoint
    const publicAPIResponse = await fetch(`${request.nextUrl.origin}/api/public/departments/cse-ai`);
    const publicAPIData = await publicAPIResponse.json();

    console.log('✅ Public API Response Status:', publicAPIResponse.status);
    console.log('✅ Public API Data Keys:', Object.keys(publicAPIData?.data || {}));

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
    console.error('❌ Error testing CSEAI data sources:', error);
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