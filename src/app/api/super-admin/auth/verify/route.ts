import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, logAuditEvent } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     request.ip || 
                     'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Get token from cookie
    const token = request.cookies.get('super-admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user || user.role !== 'super_admin') {
      await logAuditEvent({
        userId: user?.id,
        action: 'invalid_token_attempt',
        resourceType: 'authentication',
        severity: 'medium',
        status: 'failed',
        ipAddress,
        userAgent
      });

      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Log successful token verification (only for sensitive operations)
    if (request.nextUrl.pathname.includes('/sensitive/')) {
      await logAuditEvent({
        userId: user.id,
        action: 'token_verified',
        resourceType: 'authentication',
        severity: 'low',
        ipAddress,
        userAgent
      });
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department,
        permissions: user.permissions
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    
    await logAuditEvent({
      action: 'token_verification_error',
      resourceType: 'authentication',
      severity: 'high',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Token verification failed' },
      { status: 500 }
    );
  }
}