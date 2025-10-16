import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth/auth';

const dbConfig = {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms', 
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    const connection = await mysql.createConnection(dbConfig);

    // Check if user exists
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND status = "active"',
      [email]
    );

    const user = (users as any[])[0];

    if (!user) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if user has admin privileges
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    }

    // Update last login
    await connection.execute(
      'UPDATE users SET last_login = NOW() WHERE id = ?',
      [user.id]
    );

    await connection.end();

    // Generate session ID for simple authentication
    const sessionId = createSession(user.id);

    // Create response
    const response = NextResponse.json({
      success: true,
      sessionId,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department
      },
      message: 'Login successful'
    });

    // Set HTTP-only cookie
    response.cookies.set('admin_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}