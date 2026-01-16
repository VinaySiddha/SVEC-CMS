import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    
    // Check all cookies
    const allCookies = request.cookies.getAll();
    
    // Check token specifically
    const token = request.cookies.get('super-admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        authenticated: false, 
        error: 'No token found in cookies',
        cookies: allCookies 
      });
    }

    // Verify token
    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json({ 
        authenticated: false, 
        error: 'Token verification failed',
        tokenExists: true 
      });
    }

    return NextResponse.json({ 
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department
      },
      tokenValid: true
    });

  } catch (error) {
    return NextResponse.json({ 
      authenticated: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}