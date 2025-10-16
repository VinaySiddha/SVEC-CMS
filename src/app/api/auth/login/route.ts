import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, createSession } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    // Validate input
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Username/email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await authenticateUser(identifier, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session ID for simple authentication
    const sessionId = createSession(user.id);

    // Create response with success data
    const response = NextResponse.json({
      success: true,
      sessionId,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        department: user.department,
        department_name: user.department_name,
        role: user.role,
      }
    });

    // Set session ID as HTTP-only cookie for middleware authentication
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      secure: false, // Set to false for Docker development
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8 // 8 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
