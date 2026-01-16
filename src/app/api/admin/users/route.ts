import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, createUser, hashPassword } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Get all users
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin or super admin
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch all users with their department information
    const users = await query<RowDataPacket[]>(`
      SELECT 
        u.id, u.username, u.email, u.department, 
        u.department_name, u.role, u.is_active,
        u.last_login, u.login_count, u.created_at,
        creator.username as created_by
      FROM users u
      LEFT JOIN users creator ON u.created_by = creator.id
      WHERE u.deleted_at IS NULL
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      users: users || []
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new user
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin or super admin
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { username, email, password, department, role, is_active = true } = await request.json();

    // Validation
    if (!username || !email || !password || !department || !role) {
      return NextResponse.json(
        { error: 'Username, email, password, department, and role are required' },
        { status: 400 }
      );
    }

    // Check if role assignment is allowed
    if (role === 'super_admin' && decoded.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only super admins can create super admin users' },
        { status: 403 }
      );
    }

    // Check if username or email already exists
    const existingUser = await query<RowDataPacket[]>(
      'SELECT id FROM users WHERE (username = ? OR email = ?) AND deleted_at IS NULL',
      [username, email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }

    // Get department name
    const departmentInfo = await query<RowDataPacket[]>(
      'SELECT dept_full_name FROM department_info WHERE dept = ?',
      [department]
    );

    const departmentName = departmentInfo.length > 0 ? 
      departmentInfo[0].dept_full_name : 
      department.toUpperCase();

    // Create user
    const hashedPassword = await hashPassword(password);
    
    const result = await query(
      `INSERT INTO users (
        username, email, password_hash, department, department_name, role, is_active, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, department, departmentName, role, is_active, decoded.userId]
    );

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      userId: (result as any).insertId
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}