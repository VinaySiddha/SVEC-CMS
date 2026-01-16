import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find placement staff member
    const staff = (await query(
      'SELECT id, name, email, designation, branch, password_hash, is_active FROM placement_staff WHERE email = ? AND deleted_at IS NULL',
      [email]
    )) as any[];

    if (!staff || staff.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const staffMember = staff[0];

    // Verify password
    const hashedPassword = hashPassword(password);
    if (staffMember.password_hash !== hashedPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if active
    if (!staffMember.is_active) {
      return NextResponse.json(
        { message: 'Account is inactive' },
        { status: 403 }
      );
    }

    // Create token (simple JWT-like structure for demo)
    const token = crypto.randomBytes(32).toString('hex');

    // Return user data and token
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: staffMember.id,
        name: staffMember.name,
        email: staffMember.email,
        designation: staffMember.designation,
        branch: staffMember.branch
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
