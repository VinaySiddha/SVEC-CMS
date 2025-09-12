import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, createUser, logAuditEvent, DEPARTMENTS } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { headers } from 'next/headers';

// Create new department user credential
export async function POST(request: NextRequest) {
  try {
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    // Verify super admin authentication
    const token = request.cookies.get('super-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const superAdmin = verifyToken(token);
    if (!superAdmin || superAdmin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    const { 
      username, 
      email, 
      password, 
      department, 
      access_level = 'read',
      specific_modules = [],
      expires_at,
      notes,
      session_timeout = 28800
    } = await request.json();

    // Validation
    if (!username || !email || !password || !department) {
      return NextResponse.json(
        { error: 'Username, email, password, and department are required' },
        { status: 400 }
      );
    }

    if (!DEPARTMENTS[department as keyof typeof DEPARTMENTS]) {
      return NextResponse.json(
        { error: 'Invalid department code' },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUsers = await query<RowDataPacket[]>(
      'SELECT id, username, email FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      const existing = existingUsers[0] as any;
      const field = existing.username === username ? 'Username' : 'Email';
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }

    // Create user account
    const newUser = await createUser({
      username,
      email,
      password,
      department,
      department_name: DEPARTMENTS[department as keyof typeof DEPARTMENTS],
      role: 'dept'
    });

    if (!newUser) {
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }

    // Create department credential record
    const credentialResult = await query(
      `INSERT INTO department_credentials 
       (user_id, created_by, department, access_level, specific_modules, 
        session_timeout, expires_at, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newUser.id,
        superAdmin.id,
        department,
        access_level,
        JSON.stringify(specific_modules),
        session_timeout,
        expires_at || null,
        notes || null
      ]
    );

    // Log the credential creation
    await logAuditEvent({
      userId: superAdmin.id,
      action: 'department_credential_created',
      resourceType: 'department_credentials',
      resourceId: newUser.id.toString(),
      department,
      newValues: {
        username,
        email,
        department,
        access_level,
        specific_modules,
        expires_at
      },
      severity: 'high',
      ipAddress,
      userAgent
    });

    return NextResponse.json({
      message: 'Department credential created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        department: newUser.department,
        department_name: newUser.department_name,
        access_level,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Create credential error:', error);
    
    await logAuditEvent({
      action: 'credential_creation_error',
      resourceType: 'department_credentials',
      severity: 'high',
      status: 'failed',
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: 'Failed to create credential' },
      { status: 500 }
    );
  }
}

// Get all department credentials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Verify super admin authentication
    const token = request.cookies.get('super-admin-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const superAdmin = verifyToken(token);
    if (!superAdmin || superAdmin.role !== 'super_admin') {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    let whereClause = 'WHERE u.deleted_at IS NULL';
    let params: any[] = [];

    if (department) {
      whereClause += ' AND dc.department = ?';
      params.push(department);
    }

    // Get credentials with user information
    const credentials = await query<RowDataPacket[]>(
      `SELECT 
         u.id, u.username, u.email, u.department, u.department_name, u.is_active,
         u.created_at as user_created_at, u.last_login, u.login_count,
         dc.access_level, dc.specific_modules, dc.expires_at, dc.last_used,
         dc.notes, dc.created_at as credential_created_at,
         creator.username as created_by_username
       FROM users u
       INNER JOIN department_credentials dc ON u.id = dc.user_id
       LEFT JOIN users creator ON dc.created_by = creator.id
       ${whereClause}
       ORDER BY dc.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    // Get total count
    const countResult = await query<RowDataPacket[]>(
      `SELECT COUNT(*) as total
       FROM users u
       INNER JOIN department_credentials dc ON u.id = dc.user_id
       ${whereClause}`,
      params
    );

    const total = (countResult[0] as any).total;

    return NextResponse.json({
      credentials: credentials.map((cred: any) => ({
        id: cred.id,
        username: cred.username,
        email: cred.email,
        department: cred.department,
        department_name: cred.department_name,
        access_level: cred.access_level,
        specific_modules: JSON.parse(cred.specific_modules || '[]'),
        is_active: cred.is_active,
        expires_at: cred.expires_at,
        last_used: cred.last_used,
        last_login: cred.last_login,
        login_count: cred.login_count,
        notes: cred.notes,
        created_at: cred.credential_created_at,
        created_by: cred.created_by_username
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get credentials error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    );
  }
}