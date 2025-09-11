import { NextRequest, NextResponse } from 'next/server';
import { createIssuesTable } from '@/utils/issue-utils';

export async function GET() {
  try {
    const result = await createIssuesTable();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error initializing issues table:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
