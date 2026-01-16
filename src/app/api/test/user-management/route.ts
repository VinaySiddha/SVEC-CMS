import { NextRequest, NextResponse } from 'next/server';
import { runUserManagementTests } from '@/lib/user-test';

export async function GET(request: NextRequest) {
  try {
    
    const testResults = await runUserManagementTests();
    
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