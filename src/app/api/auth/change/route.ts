import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { createPasswordReset, updateResetWithProposedPassword, createPasswordResetApproval } from '@/lib/db/password-resets';
import { ChangePasswordSchema } from '@/lib/validation/auth-schemas';
import { verifyPassword } from '@/lib/auth';
import { query } from '@/lib/db';

/**
 * API route for changing password (requires login)
 * POST /api/auth/change
 */
export async function POST(req: NextRequest) {
  try {
    // Authentication check
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse and validate the request body
    const body = await req.json();
    
    const validationResult = ChangePasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, 
        { status: 400 }
      );
    }
    
    const { oldPassword, newPassword } = validationResult.data;
    
    // Get the user's current password hash
    const [userData] = await query<{ password_hash: string }>(`
      SELECT password_hash 
      FROM users 
      WHERE id = ? AND deleted_at IS NULL
    `, [user.id]);
    
    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }
    
    // Verify that the old password is correct
    const isPasswordValid = await verifyPassword(oldPassword, userData.password_hash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' }, 
        { status: 400 }
      );
    }
    
    // Create password reset record
    const resetRecord = await createPasswordReset(user.id);
    
    // Update with the new password hash
    const updated = await updateResetWithProposedPassword(resetRecord.id, newPassword);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update password' }, 
        { status: 500 }
      );
    }
    
    // Create admin approval record
    await createPasswordResetApproval(resetRecord.id, `Password change requested by ${user.username}`);
    
    return NextResponse.json({
      message: 'Password change request submitted for approval',
      status: 'pending_approval'
    });
    
  } catch (error) {
    console.error('Password change failed:', error);
    return NextResponse.json(
      { error: 'Failed to process password change' }, 
      { status: 500 }
    );
  }
}
