import { NextRequest, NextResponse } from 'next/server';
import { validateSession, getUserById } from '@/lib/auth/auth';

export async function GET(request: NextRequest) {
  try {
    // Get session ID from header or cookie
    const sessionId = request.headers.get('x-session-id') || request.cookies.get('sessionId')?.value;
    
    if (!sessionId) {
      return NextResponse.json({ error: 'No session ID provided' }, { status: 401 });
    }

    const userId = validateSession(sessionId);
    
    if (!userId) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
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
    console.error('Session check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}