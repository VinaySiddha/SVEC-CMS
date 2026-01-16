import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

/**
 * Debug endpoint to test JWT token verification
 * GET /api/debug/jwt
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: {
      JWT_SECRET_exists: !!process.env.JWT_SECRET,
      JWT_SECRET_preview: process.env.JWT_SECRET ? process.env.JWT_SECRET.substring(0, 20) + '...' : 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    },
    request: {
      authHeader_present: !!authHeader,
      authHeader_preview: authHeader ? authHeader.substring(0, 50) + '...' : 'MISSING',
    }
  };

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      success: false,
      error: 'No Authorization header or invalid format',
      debug: debugInfo
    }, { status: 401 });
  }

  const token = authHeader.substring(7);
  debugInfo.token = {
    length: token.length,
    preview: token.substring(0, 30) + '...',
  };

  try {
    const user = verifyToken(token);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Token verification failed - verifyToken returned null',
        debug: debugInfo,
        hint: 'This usually means JWT_SECRET mismatch between token creation and verification'
      }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Token is valid!',
      user: {
        id: user.id,
        username: user.username,
        department: user.department,
        role: user.role
      },
      debug: debugInfo
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      debug: debugInfo
    }, { status: 500 });
  }
}
