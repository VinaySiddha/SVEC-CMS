import { NextRequest, NextResponse } from 'next/server';
import { validateSession, getUserById } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from cookie
    const sessionId = request.cookies.get('admin_session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'No session provided' },
        { status: 401 }
      );
    }

    // Validate session
    const userId = validateSession(sessionId);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get user data
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        department: user.department,
        department_name: user.department_name
      }
    });

  } catch (error) {
    console.error('Me route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}