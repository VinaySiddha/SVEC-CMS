import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('[LOGIN API] Request received');
    const { identifier, password } = await request.json();
    console.log('[LOGIN API] Credentials received for:', identifier);

    // Validate input
    if (!identifier || !password) {
      console.log('[LOGIN API] ❌ Missing credentials');
      return NextResponse.json(
        { error: 'Username/email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user
    console.log('[LOGIN API] Authenticating user...');
    const user = await authenticateUser(identifier, password);
    console.log('[LOGIN API] Authentication result:', !!user);
    
    if (!user) {
      console.log('[LOGIN API] ❌ Invalid credentials');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    console.log('[LOGIN API] Generating token for user:', user.username);
    const token = generateToken(user);
    console.log('[LOGIN API] Token generated, length:', token.length);

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

    console.log('[LOGIN API] ✅ Login successful for:', user.username);
    return response;

  } catch (error) {
    console.error('[LOGIN API] ❌ Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
