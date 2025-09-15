import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hash } from 'bcryptjs';
import { verifyToken } from '@/lib/auth/auth';

const DEPARTMENTS = {
  'cse': 'Computer Science and Engineering',
  'cseai': 'CSE (Artificial Intelligence)',
  'cseds': 'CSE (Data Science)',
  'aiml': 'Artificial Intelligence and Machine Learning',
  'cst': 'Computer Science and Technology',
  'ece': 'Electronics and Communication Engineering',
  'ect': 'Electronics and Communication Technology',
  'eee': 'Electrical and Electronics Engineering',
  'civil': 'Civil Engineering',
  'mech': 'Mechanical Engineering',
  'mba': 'Master of Business Administration',
  'bsh': 'Basic Sciences and Humanities'
} as const;

export async function GET(request: NextRequest) {
  try {
    // Verify super admin access
    const token = request.cookies.get('super-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user || user.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch all department users
    const users = await query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.department,
        u.department_name,
        u.role,
        u.is_active,
        u.last_login,
        u.login_count,
        u.created_at,
        u.updated_at,
        u.password_changed_at,
        u.must_change_password
      FROM users u
      WHERE u.role IN ('dept', 'admin')
      ORDER BY u.created_at DESC
    `);

    // Process users data
    const processedUsers = users.map((user: any) => ({
      ...user,
      is_active: !!user.is_active,
      must_change_password: !!user.must_change_password
    }));

    // Calculate statistics
    const stats = {
      total_users: users.length,
      active_users: users.filter((u: any) => u.is_active).length,
      inactive_users: users.filter((u: any) => !u.is_active).length,
      users_by_department: users.reduce((acc: any, user: any) => {
        acc[user.department] = (acc[user.department] || 0) + 1;
        return acc;
      }, {}),
      users_by_access_level: users.reduce((acc: any, user: any) => {
        acc[user.access_level] = (acc[user.access_level] || 0) + 1;
        return acc;
      }, {})
    };

    return NextResponse.json({
      users: processedUsers,
      stats
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Log all cookies
    console.log('All cookies:', request.cookies.getAll());
    
    // Verify super admin access
    const token = request.cookies.get('super-admin-token')?.value;
    console.log('Token from cookies:', token ? 'Token exists' : 'No token found');
    
    if (!token) {
      console.log('Authentication failed: No token');
      return NextResponse.json({ error: 'Unauthorized - No token found' }, { status: 401 });
    }

    const user = verifyToken(token);
    console.log('Decoded user:', user ? { id: user.id, username: user.username, role: user.role } : 'Token verification failed');
    
    if (!user) {
      console.log('Authentication failed: Invalid token');
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
    }
    
    if (user.role !== 'super_admin') {
      console.log('Authorization failed: User role is', user.role, 'but super_admin required');
      return NextResponse.json({ error: 'Forbidden - Insufficient permissions' }, { status: 403 });
    }

    console.log('Authentication successful for super admin:', user.username);

    const body = await request.json();
    const {
      username,
      email,
      password,
      department,
      role = 'dept',
      must_change_password = false
    } = body;

    // Validation
    if (!username || !email || !password || !department) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    // Check if username or email already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const result = await query(`
      INSERT INTO users (
        username,
        email,
        password_hash,
        department,
        department_name,
        role,
        is_active,
        must_change_password,
        login_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      username,
      email,
      hashedPassword,
      department,
      DEPARTMENTS[department as keyof typeof DEPARTMENTS] || department,
      role,
      true,
      must_change_password,
      0
    ]);

    // Log the creation
    await query(`
      INSERT INTO audit_logs (
        user_id,
        action,
        resource_type,
        resource_id,
        new_values,
        ip_address,
        department,
        severity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      user.id,
      'CREATE_USER',
      'user',
      (result as any).insertId.toString(),
      JSON.stringify({
        username,
        email,
        department,
        role
      }),
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      department,
      'info'
    ]);

    return NextResponse.json({
      message: 'User created successfully',
      user_id: (result as any).insertId
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}