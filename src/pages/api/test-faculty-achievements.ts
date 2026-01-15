import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export default async function handler(request: NextRequest) {
  return GET(request);
}

async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Faculty Achievements data from cai_faculty_achievements...');

    const result = await query(
      'SELECT id, category, year, title, file_url FROM cai_faculty_achievements ORDER BY created_at DESC',
      []
    );

    console.log(`✅ Faculty Achievements Data Fetch Test`);
    console.log(`📊 Total Records: ${Array.isArray(result) ? result.length : 0}`);

    return NextResponse.json({
      success: true,
      message: 'Faculty Achievements data fetched successfully',
      count: Array.isArray(result) ? result.length : 0,
      data: result,
      columns: ['id', 'category', 'year', 'title', 'file_url'],
      expectedFormat: {
        id: 'number',
        category: 'string',
        year: 'string or number',
        title: 'string',
        file_url: 'string (URL)'
      },
      endpoint: '/api/public/departments/cse-ai (includes facultyAchievements)'
    });
  } catch (error) {
    console.error('❌ Error fetching Faculty Achievements data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch Faculty Achievements data',
        error: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: [
          'Verify cai_faculty_achievements table exists',
          'Check database connection credentials',
          'Verify required columns: id, category, year, title, file_url',
          'Ensure database user has SELECT permission',
          'Check for any MySQL syntax errors in query'
        ]
      },
      { status: 500 }
    );
  }
}
