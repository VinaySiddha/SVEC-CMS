import { NextRequest, NextResponse } from 'next/server';
import { validateSession, getUserById } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from cookie or Authorization header
    let sessionId = request.cookies.get('sessionId')?.value;
    
    // Also check Authorization header for API calls
    const authHeader = request.headers.get('authorization');
    if (!sessionId && authHeader && authHeader.startsWith('Bearer ')) {
      sessionId = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'No session provided' },
        { status: 401 }
      );
    }

    const userId = validateSession(sessionId);

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get fresh user data
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        department: user.department,
        department_name: user.department_name,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Verify session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
