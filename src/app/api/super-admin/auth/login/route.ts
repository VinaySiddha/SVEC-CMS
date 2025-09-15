import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken, logAuditEvent } from '@/lib/auth/auth';
import { headers } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Username/email and password are required' },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 
                     headersList.get('x-real-ip') || 
                     request.ip || 
                     'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Authenticate user
    const user = await authenticateUser(identifier, password);

    if (!user) {
      // Log failed login attempt
      await logAuditEvent({
        action: 'login_failed',
        resourceType: 'authentication',
        severity: 'medium',
        status: 'failed',
        metadata: { identifier, reason: 'invalid_credentials' },
        ipAddress,
        userAgent
      });

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user is super admin
    if (user.role !== 'super_admin') {
      await logAuditEvent({
        userId: user.id,
        action: 'unauthorized_access_attempt',
        resourceType: 'super_admin',
        severity: 'high',
        status: 'failed',
        metadata: { attempted_role: 'super_admin', actual_role: user.role },
        ipAddress,
        userAgent
      });

      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      );
    }

    // Check if password needs to be changed
    if (user.must_change_password) {
      return NextResponse.json(
        { 
          error: 'Password change required',
          requirePasswordChange: true,
          userId: user.id 
        },
        { status: 200 }
      );
    }

    // Generate token
    const token = generateToken(user);

    // Log successful super admin login
    await logAuditEvent({
      userId: user.id,
      action: 'super_admin_login',
      resourceType: 'authentication',
      severity: 'high',
      metadata: { 
        login_count: user.login_count,
        permissions: user.permissions 
      },
      ipAddress,
      userAgent
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
        last_login: user.last_login
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('super-admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 4 * 60 * 60, // 4 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Super admin login error:', error);
    
    await logAuditEvent({
      action: 'super_admin_login_error',
      resourceType: 'authentication',
      severity: 'critical',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}