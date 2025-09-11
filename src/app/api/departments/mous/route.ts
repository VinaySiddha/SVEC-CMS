import { NextRequest, NextResponse } from 'next/server';
import { getMOUs } from '@/utils/mou-utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    
    if (!dept) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }
    
    const mous = await getMOUs(dept);
    
    return NextResponse.json({ mous });
  } catch (error) {
    console.error('Error fetching MOUs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MOUs' },
      { status: 500 }
    );
  }
}
