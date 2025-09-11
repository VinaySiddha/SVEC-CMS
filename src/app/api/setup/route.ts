import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

/**
 * API endpoint to set up initial test data
 * GET /api/setup?action=<action>
 * 
 * Available actions:
 * - check: Check if admin users exist
 * - create-admin: Create admin user
 * - create-dept: Create department admin user
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const action = url.searchParams.get('action') || 'check';
  
  if (action === 'check') {
    // Check if we have any users set up
    try {
      const users = await query<{ 
        id: number, 
        username: string, 
        email: string,
        role: string,
        department: string | null 
      }>(`
        SELECT id, username, email, role, department
        FROM users
        WHERE deleted_at IS NULL
        LIMIT 5
      `);
      
      return NextResponse.json({
        usersExist: users.length > 0,
        userCount: users.length,
        users: users.map(u => ({
          id: u.id,
          username: u.username,
          email: u.email,
          role: u.role,
          department: u.department
        }))
      });
    } catch (error) {
      console.error('Error checking users:', error);
      return NextResponse.json(
        { error: 'Failed to check users', details: (error as Error).message },
        { status: 500 }
      );
    }
  } else if (action === 'create-admin') {
    // Create an admin user
    try {
      // Check if admin exists
      const admins = await query<{ count: number }>(`
        SELECT COUNT(*) as count FROM users WHERE role = 'admin'
      `);
      
      if (admins[0].count > 0) {
        return NextResponse.json({
          message: 'Admin user already exists',
          adminExists: true
        });
      }
      
      const password = await hashPassword('Admin@123');
      
      await execute(`
        INSERT INTO users (
          username, email, password_hash, role, is_active
        ) VALUES (
          'admin', 'admin@svec-cms.edu', ?, 'admin', true
        )
      `, [password]);
      
      return NextResponse.json({
        message: 'Admin user created successfully',
        username: 'admin',
        password: 'Admin@123' // Only in development - remove in production
      });
    } catch (error) {
      console.error('Error creating admin:', error);
      return NextResponse.json(
        { error: 'Failed to create admin', details: (error as Error).message },
        { status: 500 }
      );
    }
  } else if (action === 'create-dept') {
    // Create a department user
    try {
      const department = url.searchParams.get('dept') || 'cse';
      const username = `${department}_admin`;
      const email = `${department}@svec-cms.edu`;
      
      // Check if department user exists
      const deptUser = await query<{ count: number }>(`
        SELECT COUNT(*) as count FROM users 
        WHERE username = ? OR (role = 'dept' AND department = ?)
      `, [username, department]);
      
      if (deptUser[0].count > 0) {
        return NextResponse.json({
          message: `Department user for ${department} already exists`,
          deptExists: true
        });
      }
      
      const password = await hashPassword('Dept@123');
      
      await execute(`
        INSERT INTO users (
          username, email, password_hash, role, department, is_active
        ) VALUES (
          ?, ?, ?, 'dept', ?, true
        )
      `, [username, email, password, department]);
      
      return NextResponse.json({
        message: `Department user for ${department} created successfully`,
        username,
        password: 'Dept@123' // Only in development - remove in production
      });
    } catch (error) {
      console.error('Error creating department user:', error);
      return NextResponse.json(
        { error: 'Failed to create department user', details: (error as Error).message },
        { status: 500 }
      );
    }
  }
  
  return NextResponse.json(
    { error: 'Invalid action' },
    { status: 400 }
  );
}
