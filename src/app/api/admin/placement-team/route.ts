import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

// GET /api/admin/placement-team - Get placement team members
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const department = searchParams.get('department');
    const is_active = searchParams.get('is_active');

    let sql = `
      SELECT * FROM placement_team 
      WHERE deleted_at IS NULL
    `;
    const params: string[] = [];

    if (role) {
      sql += ` AND role = ?`;
      params.push(role);
    }

    if (department) {
      sql += ` AND department = ?`;
      params.push(department);
    }

    if (is_active !== null && is_active !== undefined) {
      sql += ` AND is_active = ?`;
      params.push(is_active);
    }

    sql += ` ORDER BY display_order ASC, role ASC, name ASC`;

    const teamMembers = await query(sql, params);

    // Get available roles and departments for filters
    const roles = await query(`
      SELECT DISTINCT role 
      FROM placement_team 
      WHERE deleted_at IS NULL 
      ORDER BY role
    `);

    const departments = await query(`
      SELECT DISTINCT department 
      FROM placement_team 
      WHERE deleted_at IS NULL AND department IS NOT NULL 
      ORDER BY department
    `);

    return NextResponse.json({
      success: true,
      data: {
        team_members: teamMembers,
        filters: {
          roles: roles.map((r: any) => r.role),
          departments: departments.map((d: any) => d.department)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching placement team:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch placement team' },
      { status: 500 }
    );
  }
}

// POST /api/admin/placement-team - Create new team member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      designation,
      department,
      role,
      email,
      phone,
      office_phone,
      office_extension,
      profile_image_url,
      bio,
      experience_years,
      specialization,
      is_active,
      display_order
    } = body;

    if (!name || !designation || !role) {
      return NextResponse.json(
        { success: false, message: 'Name, designation, and role are required' },
        { status: 400 }
      );
    }

    // Get the next display order if not provided
    let order = display_order;
    if (!order) {
      const maxOrder = await query(
        'SELECT COALESCE(MAX(display_order), 0) as max_order FROM placement_team WHERE deleted_at IS NULL'
      );
      order = maxOrder[0].max_order + 1;
    }

    const result = await execute(`
      INSERT INTO placement_team 
      (name, designation, department, role, email, phone, office_phone, 
       office_extension, profile_image_url, bio, experience_years, 
       specialization, is_active, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, designation, department, role, email, phone, office_phone,
      office_extension, profile_image_url, bio, experience_years,
      specialization, is_active !== undefined ? is_active : true, order
    ]);

    return NextResponse.json({
      success: true,
      message: 'Team member added successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add team member' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/placement-team - Update team member
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      designation,
      department,
      role,
      email,
      phone,
      office_phone,
      office_extension,
      profile_image_url,
      bio,
      experience_years,
      specialization,
      is_active,
      display_order
    } = body;

    if (!id || !name || !designation || !role) {
      return NextResponse.json(
        { success: false, message: 'ID, name, designation, and role are required' },
        { status: 400 }
      );
    }

    // Check if team member exists
    const existing = await query(
      'SELECT id FROM placement_team WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Team member not found' },
        { status: 404 }
      );
    }

    await execute(`
      UPDATE placement_team SET
        name = ?, designation = ?, department = ?, role = ?, email = ?,
        phone = ?, office_phone = ?, office_extension = ?, profile_image_url = ?,
        bio = ?, experience_years = ?, specialization = ?, is_active = ?,
        display_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      name, designation, department, role, email, phone, office_phone,
      office_extension, profile_image_url, bio, experience_years,
      specialization, is_active !== undefined ? is_active : true,
      display_order, id
    ]);

    return NextResponse.json({
      success: true,
      message: 'Team member updated successfully'
    });

  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/placement-team - Delete team member (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Team member ID is required' },
        { status: 400 }
      );
    }

    await execute(`
      UPDATE placement_team SET 
        deleted_at = CURRENT_TIMESTAMP,
        is_active = FALSE
      WHERE id = ?
    `, [id]);

    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}