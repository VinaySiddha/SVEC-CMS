import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { dept: string; id: string } }
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

    const { dept, id } = params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await request.json();

    // Update faculty member
    await query(`
      UPDATE faculty_profiles SET
        name = ?, email = ?, qualification = ?, designation = ?,
        specialization = ?, experience_years = ?, profile_url = ?,
        bio = ?, research_interests = ?, publications = ?, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND dept = ?
    `, [
      data.name,
      data.email,
      data.qualification,
      data.designation,
      data.specialization,
      data.experience,
      data.profile_image || null,
      data.bio || null,
      data.research_areas || null,
      data.publications || null,
      id,
      dept
    ]);

    return NextResponse.json({
      success: true,
      message: 'Faculty member updated successfully'
    });

  } catch (error) {
    console.error('Error updating faculty:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { dept: string; id: string } }
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

    const { dept, id } = params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Delete faculty member
    await query(
      'DELETE FROM faculty_profiles WHERE id = ? AND dept = ?',
      [id, dept]
    );

    return NextResponse.json({
      success: true,
      message: 'Faculty member deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting faculty:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
