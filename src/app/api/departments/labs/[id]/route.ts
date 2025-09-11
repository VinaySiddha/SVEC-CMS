import { NextRequest, NextResponse } from 'next/server';
import { getLab } from '@/utils/lab-utils';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Lab ID is required' },
        { status: 400 }
      );
    }
    
    const lab = await getLab(id);
    
    if (!lab) {
      return NextResponse.json(
        { error: 'Lab not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ lab });
  } catch (error) {
    console.error('Error fetching lab:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lab' },
      { status: 500 }
    );
  }
}
