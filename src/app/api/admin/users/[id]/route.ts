import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, hashPassword } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = await params;
    const { username, email, password, department, role, is_active } = await request.json();

    // Validation
    if (!username || !email || !department || !role) {
      return NextResponse.json(
        { error: 'Username, email, department, and role are required' },
        { status: 400 }
      );
    }

    // Check if role assignment is allowed
    if (role === 'super_admin' && decoded.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only super admins can assign super admin role' },
        { status: 403 }
      );
    }

    // Check if username or email already exists (excluding current user)
    const existingUser = await query<RowDataPacket[]>(
      'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ? AND deleted_at IS NULL',
      [username, email, id]
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

    // Prepare update query
    let updateQuery = `
      UPDATE users 
      SET username = ?, email = ?, department = ?, department_name = ?, role = ?, is_active = ?, updated_at = NOW()
      WHERE id = ? AND deleted_at IS NULL
    `;
    let queryParams = [username, email, department, departmentName, role, is_active, id];

    // If password is provided, include it in the update
    if (password && password.trim() !== '') {
      const hashedPassword = await hashPassword(password);
      updateQuery = `
        UPDATE users 
        SET username = ?, email = ?, password_hash = ?, department = ?, department_name = ?, role = ?, is_active = ?, password_changed_at = NOW(), updated_at = NOW()
        WHERE id = ? AND deleted_at IS NULL
      `;
      queryParams = [username, email, hashedPassword, department, departmentName, role, is_active, id];
    }

    const result = await query(updateQuery, queryParams);

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = await params;

    // Check if user exists and get their role
    const userToDelete = await query<RowDataPacket[]>(
      'SELECT role FROM users WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (userToDelete.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent non-super admins from deleting super admins
    if (userToDelete[0].role === 'super_admin' && decoded.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only super admins can delete super admin users' },
        { status: 403 }
      );
    }

    // Prevent users from deleting themselves
    if (parseInt(id) === decoded.userId) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Soft delete the user
    const result = await query(
      'UPDATE users SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}