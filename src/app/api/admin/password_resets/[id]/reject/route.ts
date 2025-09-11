import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth';
import { findResetById, rejectPasswordReset } from '@/lib/db/password-resets';
import { PasswordResetRejectionSchema } from '@/lib/validation/auth-schemas';

/**
 * API route for rejecting a password reset request (admin only)
 * POST /api/admin/password_resets/[id]/reject
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
    
    // Parse and validate the request body
    const body = await req.json();
    
    const validationResult = PasswordResetRejectionSchema.safeParse({
      id: resetId,
      ...body
    });
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, 
        { status: 400 }
      );
    }
    
    const { reason } = validationResult.data;
    
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
    
    // Reject the password reset
    await rejectPasswordReset(resetId, user.id, reason);
    
    return NextResponse.json({
      message: 'Password reset request rejected',
      status: 'rejected'
    });
    
  } catch (error) {
    console.error('Failed to reject password reset:', error);
    return NextResponse.json(
      { error: 'Failed to reject password reset request' }, 
      { status: 500 }
    );
  }
}
