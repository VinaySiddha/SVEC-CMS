import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { department: string; module: string } }
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

    const { department, module } = params;

    // Define module table mapping
    const moduleTableMapping: Record<string, string> = {
      'faculty_profiles': 'faculty_profiles',
      'student_achievements': 'student_achievements',
      'faculty_achievements': 'faculty_achievements',
      'placements': 'placements',
      'workshops': 'workshops',
      'organized_events': 'organized_events',
      'labs': 'labs',
      'fdp': 'fdp',
      'industry_news': 'industry_news'
    };

    const tableName = moduleTableMapping[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid module' }, { status: 400 });
    }

    // Fetch data from the appropriate table
    const data = await query(
      `SELECT * FROM ${tableName} WHERE department = ? ORDER BY created_at DESC`,
      [department]
    );

    return NextResponse.json({
      data,
      department,
      module,
      count: data.length
    });

  } catch (error) {
    console.error('Error fetching module data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { department: string; module: string } }
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

    const { department, module } = params;
    const url = new URL(request.url);
    const recordId = url.searchParams.get('id');

    if (!recordId) {
      return NextResponse.json({ error: 'Record ID required' }, { status: 400 });
    }

    // Define module table mapping
    const moduleTableMapping: Record<string, string> = {
      'faculty_profiles': 'faculty_profiles',
      'student_achievements': 'student_achievements',
      'faculty_achievements': 'faculty_achievements',
      'placements': 'placements',
      'workshops': 'workshops',
      'organized_events': 'organized_events',
      'labs': 'labs',
      'fdp': 'fdp',
      'industry_news': 'industry_news'
    };

    const tableName = moduleTableMapping[module];
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid module' }, { status: 400 });
    }

    // Delete the record
    await query(
      `DELETE FROM ${tableName} WHERE id = ? AND department = ?`,
      [recordId, department]
    );

    // Log the action
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
      'DELETE_RECORD',
      module,
      recordId,
      JSON.stringify({
        department,
        module,
        deleted_by: user.username
      }),
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    ]);

    return NextResponse.json({ message: 'Record deleted successfully' });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}