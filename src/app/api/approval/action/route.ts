import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

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

    const { id, type, action, comments } = await request.json();

    if (!id || !type || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (action !== 'approve' && action !== 'reject') {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    let tableName = '';

    // Map type to table name
    switch (type) {
      case 'faculty':
        tableName = 'faculty_profiles';
        break;
      case 'achievement':
        // Need to determine if it's faculty or student achievement
        // Check both tables to find the item
        const facultyCheck = await query(
          'SELECT id FROM faculty_achievements WHERE id = ? AND status = ?',
          [id, 'pending']
        );
        const studentCheck = await query(
          'SELECT id FROM student_achievements WHERE id = ? AND status = ?',
          [id, 'pending']
        );
        
        if ((facultyCheck as any[]).length > 0) {
          tableName = 'faculty_achievements';
        } else if ((studentCheck as any[]).length > 0) {
          tableName = 'student_achievements';
        } else {
          return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
        }
        break;
      case 'laboratory':
        tableName = 'labs';
        break;
      case 'workshop':
        tableName = 'workshops';
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Update the item status
    const updateResult = await query(
      `UPDATE ${tableName} 
       SET status = ?, 
           reviewed_by = ?, 
           reviewed_at = NOW(), 
           review_comments = ? 
       WHERE id = ? AND status = 'pending'`,
      [newStatus, decoded.username, comments || null, id]
    );

    if ((updateResult as any).affectedRows === 0) {
      return NextResponse.json({ error: 'Item not found or already processed' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Item ${action}d successfully`
    });

  } catch (error) {
    console.error('Error processing approval action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
