import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Auth Debug Info ===');
    
    // Check all cookies
    const allCookies = request.cookies.getAll();
    console.log('All cookies:', allCookies);
    
    // Check token specifically
    const token = request.cookies.get('super-admin-token')?.value;
    console.log('Token exists:', !!token);
    console.log('Token value (first 20 chars):', token ? token.substring(0, 20) + '...' : 'No token');
    
    if (!token) {
      return NextResponse.json({ 
        authenticated: false, 
        error: 'No token found in cookies',
        cookies: allCookies 
      });
    }

    // Verify token
    const user = verifyToken(token);
    console.log('Token verification result:', user);
    
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
    console.error('Auth debug error:', error);
    return NextResponse.json({ 
      authenticated: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}