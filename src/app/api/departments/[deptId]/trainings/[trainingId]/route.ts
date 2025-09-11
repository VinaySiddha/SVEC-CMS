import { NextRequest, NextResponse } from 'next/server';
import { getTraining, updateTraining, deleteTraining } from '@/utils/training-utils';
import { cookies } from 'next/headers';

// Simple authentication check
function isAuthenticated(req: NextRequest) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  return !!authCookie; // In a real app, validate this properly
}

export async function GET(
  req: NextRequest,
  { params }: { params: { deptId: string; trainingId: string } }
) {
  try {
    const { deptId, trainingId } = params;
    
    if (!deptId || !trainingId) {
      return NextResponse.json({
        success: false,
        message: 'Department ID and Training ID are required'
      }, { status: 400 });
    }
    
    const result = await getTraining(deptId, trainingId);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        training: result.training
      });
    } else {
      const errorMessage = result.message || 'Unknown error';
      const status = errorMessage.includes('not found') ? 404 : 500;
      
      return NextResponse.json({
        success: false,
        message: errorMessage
      }, { status });
    }
  } catch (error: any) {
    console.error('Error fetching training:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { deptId: string; trainingId: string } }
) {
  try {
    // Check authentication
    if (!isAuthenticated(req)) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }
    
    const { deptId, trainingId } = params;
    
    if (!deptId || !trainingId) {
      return NextResponse.json({
        success: false,
        message: 'Department ID and Training ID are required'
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
    
    const result = await updateTraining(deptId, trainingId, trainingData, certificate);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        training: result.training
      });
    } else {
      const errorMessage = result.message || 'Unknown error';
      const status = errorMessage.includes('not found') ? 404 : 500;
      
      return NextResponse.json({
        success: false,
        message: errorMessage
      }, { status });
    }
  } catch (error: any) {
    console.error('Error updating training:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { deptId: string; trainingId: string } }
) {
  try {
    // Check authentication
    if (!isAuthenticated(req)) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required'
      }, { status: 401 });
    }
    
    const { deptId, trainingId } = params;
    
    if (!deptId || !trainingId) {
      return NextResponse.json({
        success: false,
        message: 'Department ID and Training ID are required'
      }, { status: 400 });
    }
    
    const result = await deleteTraining(deptId, trainingId);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      const errorMessage = result.message || 'Unknown error';
      const status = errorMessage.includes('not found') ? 404 : 500;
      
      return NextResponse.json({
        success: false,
        message: errorMessage
      }, { status });
    }
  } catch (error: any) {
    console.error('Error deleting training:', error);
    return NextResponse.json({
      success: false,
      message: `Error: ${error.message}`
    }, { status: 500 });
  }
}
