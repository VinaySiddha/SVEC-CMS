import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export default async function handler(request: NextRequest) {
  return GET(request);
}

async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing Faculty Development data from cai_faculty_development...');

    const result = await query(
      'SELECT id, category, title, year, file_url, gallery FROM cai_faculty_development ORDER BY id DESC',
      []
    );

    console.log(`✅ Faculty Development Data Fetch Test`);
    console.log(`📊 Total Records: ${Array.isArray(result) ? result.length : 0}`);

    return NextResponse.json({
      success: true,
      message: 'Faculty Development data fetched successfully',
      count: Array.isArray(result) ? result.length : 0,
      data: result,
      columns: ['id', 'category', 'title', 'year', 'file_url', 'gallery'],
      expectedFormat: {
        id: 'number',
        category: 'string',
        title: 'string',
        year: 'string or number',
        file_url: 'string (URL)',
        gallery: 'string or JSON array'
      },
      endpoint: '/api/public/departments/cse-ai (includes facultyDevelopment)'
    });
  } catch (error) {
    console.error('❌ Error fetching Faculty Development data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch Faculty Development data',
        error: error instanceof Error ? error.message : 'Unknown error',
        troubleshooting: [
          'Verify cai_faculty_development table exists',
          'Check database connection credentials',
          'Verify required columns: id, category, title, year, file_url, gallery',
          'Ensure database user has SELECT permission',
          'Check for any MySQL syntax errors in query'
        ]
      },
      { status: 500 }
    );
  }
}
