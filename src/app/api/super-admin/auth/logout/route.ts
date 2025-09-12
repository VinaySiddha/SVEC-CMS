import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     request.ip || 
                     'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Get user from token if available
    const token = request.cookies.get('super-admin-token')?.value;
    let userId: number | undefined;

    if (token) {
      try {
        const { verifyToken } = await import('@/lib/auth/auth');
        const user = verifyToken(token);
        userId = user?.id;
      } catch (error) {
        // Token verification failed, but we'll still log the logout attempt
        console.warn('Token verification failed during logout:', error);
      }
    }

    // Log the logout
    await logAuditEvent({
      userId,
      action: 'super_admin_logout',
      resourceType: 'authentication',
      severity: 'medium',
      ipAddress,
      userAgent
    });

    const response = NextResponse.json({
      message: 'Logged out successfully'
    });

    // Clear the authentication cookie
    response.cookies.set('super-admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    
    await logAuditEvent({
      action: 'logout_error',
      resourceType: 'authentication',
      severity: 'medium',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}