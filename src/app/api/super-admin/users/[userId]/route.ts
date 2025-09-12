import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
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

    const { userId } = await params;
    const body = await request.json();

    // Get current user data for audit logging
    const currentUser = await query('SELECT * FROM users WHERE id = ?', [userId]);
    if (currentUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (body.hasOwnProperty('is_active')) {
      updates.push('is_active = ?');
      values.push(body.is_active);
    }

    if (body.hasOwnProperty('access_level')) {
      updates.push('access_level = ?');
      values.push(body.access_level);
    }

    if (body.hasOwnProperty('allowed_modules')) {
      updates.push('allowed_modules = ?');
      values.push(JSON.stringify(body.allowed_modules));
    }

    if (body.hasOwnProperty('expires_at')) {
      updates.push('expires_at = ?');
      values.push(body.expires_at);
    }

    if (body.hasOwnProperty('notes')) {
      updates.push('notes = ?');
      values.push(body.notes);
    }

    if (body.hasOwnProperty('session_timeout')) {
      updates.push('session_timeout = ?');
      values.push(body.session_timeout);
    }

    if (body.hasOwnProperty('max_sessions')) {
      updates.push('max_sessions = ?');
      values.push(body.max_sessions);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
    }

    // Add updated_at
    updates.push('updated_at = NOW()');
    values.push(userId);

    // Execute update
    await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    // Log the update
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
      'UPDATE_USER',
      'user',
      userId.toString(),
      JSON.stringify({
        changes: body,
        updated_by: user.username
      }),
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      'admin',
      'info'
    ]);

    return NextResponse.json({ message: 'User updated successfully' });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
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

    const userId = params.userId;

    // Get user data for audit logging
    const targetUser = await query('SELECT username, email, department FROM users WHERE id = ?', [userId]);
    if (targetUser.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent deletion of super admin users
    const userToDelete = await query('SELECT role FROM users WHERE id = ?', [userId]) as any[];
    if (userToDelete.length > 0 && userToDelete[0]?.role === 'super_admin') {
      return NextResponse.json({ error: 'Cannot delete super admin user' }, { status: 403 });
    }

    // Delete user
    await query('DELETE FROM users WHERE id = ?', [userId]);

    // Log the deletion
    await query(`
      INSERT INTO audit_logs (
        user_id,
        action,
        target_type,
        target_id,
        details,
        ip_address
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      user.id,
      'DELETE_USER',
      'user',
      userId,
      JSON.stringify({
        deleted_user: targetUser[0],
        deleted_by: user.username
      }),
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    ]);

    return NextResponse.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}