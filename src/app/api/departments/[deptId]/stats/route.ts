import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

/**
 * Department-specific API route example
 * Only accessible to department users for their own department or admins
 * 
 * @route GET /api/departments/[deptId]/stats
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { deptId: string } }
) {
  const { deptId } = params;
  
  // Check if user is authenticated
  const user = await requireAuth(req);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  // Check if user is authorized for this department
  if (user.role === 'dept' && user.department !== deptId) {
    return NextResponse.json(
      { error: 'Access denied to this department' },
      { status: 403 }
    );
  }
  
  // User is authorized (either admin or department user for this department)
  return NextResponse.json({
    message: `Department stats for ${deptId}`,
    department: deptId,
    stats: {
      faculty: 25,
      students: 450,
      courses: 32,
      laboratories: 8,
    },
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      department: user.department,
    },
  });
}
