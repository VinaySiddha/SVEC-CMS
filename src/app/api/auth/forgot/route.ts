import { NextRequest, NextResponse } from 'next/server';
import { createPasswordReset, findUserByUsernameOrEmail } from '@/lib/db/password-resets';
import { ForgotPasswordSchema } from '@/lib/validation/auth-schemas';
import { z } from 'zod';

/**
 * API route for initiating a password reset
 * POST /api/auth/forgot
 */
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    
    const validationResult = ForgotPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message }, 
        { status: 400 }
      );
    }
    
    const { usernameOrEmail } = validationResult.data;
    
    // Find user by username or email
    const user = await findUserByUsernameOrEmail(usernameOrEmail);
    
    if (!user) {
      // For security reasons, we still return success even if user not found
      // This prevents user enumeration attacks
      return NextResponse.json(
        { message: 'If the account exists, a password reset link has been sent' }, 
        { status: 200 }
      );
    }
    
    // Create password reset token
    const resetRecord = await createPasswordReset(user.id);
    
    // In a real application, you would send an email with the reset token
    // For this example, we'll just return the token in the response
    // NOTE: In production, NEVER return the token directly in the response
    
    return NextResponse.json({
      message: 'If the account exists, a password reset link has been sent',
      // REMOVE THIS IN PRODUCTION - Only for testing/development
      debug: {
        token: resetRecord.token,
        expiresAt: resetRecord.expires_at
      }
    });
    
  } catch (error) {
    console.error('Password reset request failed:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' }, 
      { status: 500 }
    );
  }
}
