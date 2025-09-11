import { NextRequest, NextResponse } from 'next/server';
import { getPendingPasswordResets } from '@/lib/db/password-resets';
import { requireRole } from '@/lib/auth';

/**
 * API route for listing pending password reset requests (admin only)
 * GET /api/admin/password_resets
 */
export async function GET(req: NextRequest) {
  try {
    // Require admin role
    const user = await requireRole(req, 'admin');
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Get pending password reset requests
    const pendingResets = await getPendingPasswordResets();
    
    return NextResponse.json({
      pendingResets
    });
    
  } catch (error) {
    console.error('Failed to get pending password resets:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve password reset requests' }, 
      { status: 500 }
    );
  }
}
