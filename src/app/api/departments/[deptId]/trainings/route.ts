import { NextRequest, NextResponse } from 'next/server';
import { getTrainings, createTraining } from '@/utils/training-utils';
import { cookies } from 'next/headers';

// Simple authentication check
function isAuthenticated(req: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  return !!authCookie; // In a real app, validate this properly
}

export async function GET(
  req: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    
    if (!deptId) {
      return NextResponse.json({
        success: false,
        message: 'Department ID is required'
      }, { status: 400 });
    }
    
    const result = await getTrainings(deptId);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        trainings: result.trainings
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Check authentication
    if (!isAuthenticated(req)) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }
    
    const deptId = params.deptId;
    
    if (!deptId) {
      return NextResponse.json({
        success: false,
        message: 'Department ID is required'
      }, { status: 400 });
    }
    
    // Parse form data from request
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const provider = formData.get('provider') as string;
    const hours = parseInt(formData.get('hours') as string, 10);
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const certificate = formData.get('certificate') as File || undefined;
    
    // Validate required fields
    if (!title || !provider || isNaN(hours) || !date_from || !date_to) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }
    
    const trainingData = {
      title,
      provider,
      hours,
      date_from,
      date_to
    };
    
    const result = await createTraining(deptId, trainingData, certificate);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        training: result.training
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error creating training:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}
