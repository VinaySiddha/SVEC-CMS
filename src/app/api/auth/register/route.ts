import { NextRequest, NextResponse } from 'next/server';
import { createUser, DEPARTMENTS, verifyToken } from '@/lib/auth/auth';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is super admin
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = verifyToken(token);
      
      if (!decoded || decoded.role !== 'super_admin') {
        return NextResponse.json(
          { error: 'Access denied. Only super administrators can create users.' },
          { status: 403 }
        );
      }
    } else {
      // For initial setup, allow registration without auth if no users exist
      const { query } = await import('@/lib/db');
      const users = await query('SELECT COUNT(*) as count FROM users');
      const userCount = (users as any[])[0].count;
      
      if (userCount > 0) {
        return NextResponse.json(
          { error: 'Registration requires super admin authorization' },
          { status: 401 }
        );
      }
    }
    const { username, email, password, department, role } = await request.json();

    // Validate input
    if (!username || !email || !password || !department) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate department
    if (!DEPARTMENTS[department as keyof typeof DEPARTMENTS]) {
      return NextResponse.json(
        { error: 'Invalid department code' },
        { status: 400 }
      );
    }

    // Create user
    const user = await createUser({
      username,
      email,
      password,
      department,
      department_name: DEPARTMENTS[department as keyof typeof DEPARTMENTS],
      role: role || 'dept',
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user. Username or email might already exist.' },
        { status: 400 }
      );
    }

    // Return success response without password
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
