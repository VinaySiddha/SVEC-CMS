import { NextRequest, NextResponse } from 'next/server';
import { findResetByToken, updateResetWithProposedPassword, createPasswordResetApproval } from '@/lib/db/password-resets';
import { ResetPasswordConfirmSchema } from '@/lib/validation/auth-schemas';

/**
 * API route for confirming a password reset with a new password
 * POST /api/auth/reset/confirm
 */
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    
    const validationResult = ResetPasswordConfirmSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, 
        { status: 400 }
      );
    }
    
    const { token, newPassword } = validationResult.data;
    
    // Find reset record by token
    const resetRecord = await findResetByToken(token);
    
    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired token' }, 
        { status: 400 }
      );
    }
    
    // Update reset record with new hashed password
    const updated = await updateResetWithProposedPassword(resetRecord.id, newPassword);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update password' }, 
        { status: 500 }
      );
    }
    
    // Create admin approval record
    await createPasswordResetApproval(resetRecord.id, 'Password reset requested by user');
    
    return NextResponse.json({
      message: 'Password reset request submitted for approval',
      status: 'pending_approval'
    });
    
  } catch (error) {
    console.error('Password reset confirmation failed:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset confirmation' }, 
      { status: 500 }
    );
  }
}
