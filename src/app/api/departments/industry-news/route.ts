import { NextRequest, NextResponse } from 'next/server';
import { getAllIndustryNews } from '@/utils/industry-news-utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    const limit = limitParam ? parseInt(limitParam) : null;
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    
    const news = await getAllIndustryNews({
      dept: dept || null,
      limit,
      offset
    });
    
    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching industry news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industry news' },
      { status: 500 }
    );
  }
}
