import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { findResetById, approvePasswordReset } from '@/lib/db/password-resets';

/**
 * API route for approving a password reset request (admin only)
 * POST /api/admin/password_resets/[id]/approve
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Require admin role
    const user = await requireRole(req, 'admin');
    if (!user) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const resetId = parseInt(params.id, 10);
    if (isNaN(resetId)) {
      return NextResponse.json(
        { error: 'Invalid reset ID' }, 
        { status: 400 }
      );
    }
    
    // Find reset record by ID
    const resetRecord = await findResetById(resetId);
    
    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Password reset request not found' }, 
        { status: 404 }
      );
    }
    
    // Check if reset record is in pending status
    if (resetRecord.status !== 'pending') {
      return NextResponse.json(
        { error: 'Password reset request has already been processed' }, 
        { status: 400 }
      );
    }
    
    // Approve the password reset
    await approvePasswordReset(resetId, user.id);
    
    return NextResponse.json({
      message: 'Password reset request approved',
      status: 'approved'
    });
    
  } catch (error) {
    console.error('Failed to approve password reset:', error);
    return NextResponse.json(
      { error: 'Failed to approve password reset request' }, 
      { status: 500 }
    );
  }
}
