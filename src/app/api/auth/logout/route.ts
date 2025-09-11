import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME } from '@/lib/auth/jwt';

export async function GET(request: Request) {
  try {
    // Delete the auth cookie
    const cookieStore = await cookies();
    await cookieStore.delete(COOKIE_NAME);
    
    return NextResponse.json({
      ok: true,
      message: 'Successfully logged out'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      ok: false,
      error: 'An error occurred during logout'
    }, { status: 500 });
  }
}
