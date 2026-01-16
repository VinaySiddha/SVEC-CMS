import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const staff = (await query(
      'SELECT id, name, designation, branch, email FROM placement_staff WHERE deleted_at IS NULL AND is_active = true ORDER BY name'
    )) as any[];

    return NextResponse.json(staff || []);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      designation,
      branch,
      email
    } = await request.json();

    if (!name || !designation || !email) {
      return NextResponse.json(
        { error: 'Name, designation, and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingStaff = await query(
      'SELECT id FROM placement_staff WHERE email = ? AND deleted_at IS NULL',
      [email]
    ) as any[];

    if (existingStaff.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO placement_staff (name, designation, branch, email, password_hash, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'default_hash', true, NOW(), NOW())`,
      [name, designation, branch || '', email]
    );

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Staff member added successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add staff' },
      { status: 500 }
    );
  }
}
