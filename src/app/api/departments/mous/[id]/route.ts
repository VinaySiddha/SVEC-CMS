import { NextRequest, NextResponse } from 'next/server';
import { getMOU } from '@/utils/mou-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'MOU ID is required' },
        { status: 400 }
      );
    }
    
    const mou = await getMOU(id);
    
    if (!mou) {
      return NextResponse.json(
        { error: 'MOU not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ mou });
  } catch (error) {
    console.error('Error fetching MOU:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MOU' },
      { status: 500 }
    );
  }
}
