import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, department, role = 'admin' } = await request.json();

    if (!username || !department) {
      return NextResponse.json(
        { error: 'Username and department are required' },
        { status: 400 }
      );
    }

    // Generate a test token
    const testUser = {
      id: Math.floor(Math.random() * 1000) + 100, // Random ID for testing
      username,
      department,
      role: role as 'admin' | 'super_admin' | 'dept',
      permissions: []
    };

    const token = generateToken(testUser);

    return NextResponse.json({
      success: true,
      token,
      user: testUser,
      expiresIn: role === 'super_admin' ? '4h' : '8h'
    });

  } catch (error) {
    console.error('Token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
}