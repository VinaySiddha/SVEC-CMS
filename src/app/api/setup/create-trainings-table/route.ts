import { NextResponse } from 'next/server';
import { createTrainingsTable } from '@/utils/training-utils';

export async function GET() {
  try {
    const result = await createTrainingsTable();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating trainings table:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}
