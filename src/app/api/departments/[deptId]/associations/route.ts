import { NextRequest, NextResponse } from 'next/server';
import { createAssociation, getAssociations } from '@/utils/association-utils';
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
 * GET /api/departments/[deptId]/associations
 * Get associations for a specific department
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const associations = await getAssociations(deptId);
    
    return NextResponse.json(associations);
  } catch (error) {
    console.error('Error in GET /api/departments/[deptId]/associations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch associations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/departments/[deptId]/associations
 * Create a new association for a department
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  // Check user authentication and permissions
  const authResult = await simpleAuthCheck(request);
  if (!authResult.success || !authResult.isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const deptId = params.deptId;
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

    const result = await createAssociation(deptId, {
      name: fields.name,
      role: fields.role,
      description: fields.description,
      proof: files.proof,
      events: events
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        id: result.id
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to create association' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in POST /api/departments/[deptId]/associations:', error);
    return NextResponse.json(
      { error: 'Failed to create association' },
      { status: 500 }
    );
  }
}
