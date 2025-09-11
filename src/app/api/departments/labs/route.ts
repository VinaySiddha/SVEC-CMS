import { NextRequest, NextResponse } from 'next/server';
import { getLabs } from '@/utils/lab-utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    const limitParam = searchParams.get('limit');
    
    const limit = limitParam ? parseInt(limitParam) : undefined;
    
    const labs = await getLabs(dept || undefined);
    
    return NextResponse.json({ labs });
  } catch (error) {
    console.error('Error fetching labs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch labs' },
      { status: 500 }
    );
  }
}
