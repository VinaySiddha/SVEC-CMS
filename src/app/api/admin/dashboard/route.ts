import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';

/**
 * Admin-only API route example
 * Only accessible to users with admin role
 * 
 * @route GET /api/admin/dashboard
 */
export async function GET(req: NextRequest) {
  // Check if user has admin role
  const user = await requireRole(req, 'admin');
  
  if (!user) {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }
  
  // User is an admin, proceed with request
  return NextResponse.json({
    message: 'Admin dashboard data',
    stats: {
      departments: 12,
      users: 150,
      pendingApprovals: 27,
    },
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
}
