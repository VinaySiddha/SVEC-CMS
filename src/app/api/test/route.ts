import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  
  return NextResponse.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
}