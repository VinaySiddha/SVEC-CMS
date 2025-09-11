import { NextRequest, NextResponse } from 'next/server';
import { getIndustryNewsItem } from '@/utils/industry-news-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'News ID is required' },
        { status: 400 }
      );
    }
    
    const newsItem = await getIndustryNewsItem(id);
    
    if (!newsItem) {
      return NextResponse.json(
        { error: 'Industry news item not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ newsItem });
  } catch (error) {
    console.error('Error fetching industry news item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industry news item' },
      { status: 500 }
    );
  }
}
