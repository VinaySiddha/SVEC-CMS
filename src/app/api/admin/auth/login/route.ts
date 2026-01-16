import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dbConfig = {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms', 

}

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

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

    // Generate JWT token with username
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username || user.email.split('@')[0],
        role: user.role,
        name: user.name,
        department: user.department
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create response with token included
    const response = NextResponse.json({
      success: true,
      token, // Include token in response for localStorage
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        department: user.department,
        username: user.username || user.email.split('@')[0]
      },
      message: 'Login successful'
    });

    // Set HTTP-only cookies (both names for compatibility)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });
    
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}