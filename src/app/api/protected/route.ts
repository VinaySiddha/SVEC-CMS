import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

/**
 * Protected API route example
 * Only accessible to authenticated users
 * 
 * @route GET /api/protected
 */
export async function GET(req: NextRequest) {
  // Check if user is authenticated
  const user = await requireAuth(req);
  
  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }
  
  // User is authenticated, proceed with request
  return NextResponse.json({
    message: 'This is a protected endpoint',
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      department: user.department,
    },
  });
}
