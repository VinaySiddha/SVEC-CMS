import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/lib/auth/jwt';
import { verifyAuthToken } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    // Get the token from the cookies
    const cookieStore = await cookies();
    const tokenCookie = await cookieStore.get(COOKIE_NAME);
    const token = tokenCookie?.value;
    
    if (!token) {
      return NextResponse.json({
        authenticated: false,
        message: 'No authentication token found'
      }, { status: 401 });
    }
    
    // Verify the token
    const user = verifyAuthToken(token);
    
    if (!user) {
      return NextResponse.json({
        authenticated: false,
        message: 'Invalid or expired token'
      }, { status: 401 });
    }
    
    // User is authenticated
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department
      }
    });
    
  } catch (error) {
    console.error('Authentication check error:', error);
    return NextResponse.json({
      authenticated: false,
      message: 'An error occurred checking authentication'
    }, { status: 500 });
  }
}
