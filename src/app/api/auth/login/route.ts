import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/auth/auth';

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

    // Generate JWT token
    const token = generateToken(user);

    // Create response with success data
    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        department: user.department,
        department_name: user.department_name,
        role: user.role,
      }
    });

    // Set token as HTTP-only cookie for middleware authentication
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: false, // Set to false for Docker development
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
