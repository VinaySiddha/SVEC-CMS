import { NextRequest, NextResponse } from 'next/server';
import { runFullDatabaseTest } from '@/lib/database-test';

export async function GET(request: NextRequest) {
  try {
    
    // Run comprehensive database tests
    const testResults = await runFullDatabaseTest();
    
    // Return results with appropriate status code
    return NextResponse.json(testResults, { 
      status: testResults.success ? 200 : 500 
    });
    
  } catch (error) {
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}