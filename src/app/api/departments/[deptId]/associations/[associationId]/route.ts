import { NextRequest, NextResponse } from 'next/server';
import { getAssociation, updateAssociation, deleteAssociation } from '@/utils/association-utils';
import { parseMultipartForm } from '@/utils/file-upload';
import { cookies } from 'next/headers';

/**
 * Simple auth check using cookies
 * @param req NextRequest object
 * @returns Authentication result
 */
async function simpleAuthCheck(req: NextRequest) {
  // Get auth cookie
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  
  // Check if cookie exists
  if (!authCookie?.value) {
    return { success: false };
  }
  
  // For now, just return success if auth cookie exists
  // In a real app, you'd verify the token
  return { 
    success: true,
    isAdmin: true  // For simplicity, assume the user is an admin if they have an auth cookie
  };
}

/**
 * GET /api/departments/[deptId]/associations/[associationId]
 * Get a specific association
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string; associationId: string } }
) {
  try {
    const associationId = parseInt(params.associationId, 10);
    if (isNaN(associationId)) {
      return NextResponse.json(
        { error: 'Invalid association ID' },
        { status: 400 }
      );
    }
    
    const association = await getAssociation(associationId);
    
    if (!association) {
      return NextResponse.json(
        { error: 'Association not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(association);
  } catch (error) {
    console.error('Error in GET /api/departments/[deptId]/associations/[associationId]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch association' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/departments/[deptId]/associations/[associationId]
 * Update a specific association
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { deptId: string; associationId: string } }
) {
  try {
    // Check user authentication and permissions
    const authResult = await simpleAuthCheck(request);
    if (!authResult.success || !authResult.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const associationId = parseInt(params.associationId, 10);
    if (isNaN(associationId)) {
      return NextResponse.json(
        { error: 'Invalid association ID' },
        { status: 400 }
      );
    }
    
    const { fields, files } = await parseMultipartForm(request);
    
    // Validate required fields
    if (!fields.name || !fields.role || !fields.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Parse events if provided
    let events = [];
    if (fields.events) {
      try {
        events = JSON.parse(fields.events);
      } catch (err) {
        return NextResponse.json(
          { error: 'Invalid events data format' },
          { status: 400 }
        );
      }
    }
    
    const result = await updateAssociation(associationId, {
      name: fields.name,
      role: fields.role,
      description: fields.description,
      proof: files.proof,
      events: events
    });
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to update association' },
        { status: result.error?.includes('not found') ? 404 : 500 }
      );
    }
  } catch (error) {
    console.error('Error in PUT /api/departments/[deptId]/associations/[associationId]:', error);
    return NextResponse.json(
      { error: 'Failed to update association' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/departments/[deptId]/associations/[associationId]
 * Delete a specific association
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { deptId: string; associationId: string } }
) {
  try {
    // Check user authentication and permissions
    const authResult = await simpleAuthCheck(request);
    if (!authResult.success || !authResult.isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const associationId = parseInt(params.associationId, 10);
    if (isNaN(associationId)) {
      return NextResponse.json(
        { error: 'Invalid association ID' },
        { status: 400 }
      );
    }
    
    const result = await deleteAssociation(associationId);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to delete association' },
        { status: result.error?.includes('not found') ? 404 : 500 }
      );
    }
  } catch (error) {
    console.error('Error in DELETE /api/departments/[deptId]/associations/[associationId]:', error);
    return NextResponse.json(
      { error: 'Failed to delete association' },
      { status: 500 }
    );
  }
}
