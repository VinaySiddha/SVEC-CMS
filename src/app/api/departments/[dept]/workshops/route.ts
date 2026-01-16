import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
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

    const { dept } = await params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch workshops for the department
    let query_str = 'SELECT * FROM workshops WHERE dept = ?';
    let queryParams = [dept];
    
    // Show only approved workshops for department users, all for admins
    if (decoded.role === 'dept') {
      query_str += ' AND (status = "approved" OR status IS NULL)';
    }
    
    query_str += ' ORDER BY date_from DESC';
    
    const workshops = await query(query_str, queryParams);

    return NextResponse.json({ 
      success: true,
      workshops 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
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

    const { dept } = await params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await request.json();

    // Set status based on user role
    const status = (decoded.role === 'admin' || decoded.role === 'super_admin') ? 'approved' : 'pending';

    // Insert workshop
    const result = await query(`
      INSERT INTO workshops (
        title, department, duration, start_date, end_date,
        description, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `, [
      data.title,
      dept,
      data.duration || null,
      data.start_date,
      data.end_date || null,
      data.description || null,
      status
    ]);

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Workshop added successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
