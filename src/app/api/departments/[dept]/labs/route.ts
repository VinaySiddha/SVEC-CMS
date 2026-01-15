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

    // Fetch labs for the department
    let query_str = 'SELECT * FROM laboratories WHERE dept = ?';
    let queryParams = [dept];
    
    // Show only approved labs for department users, all for admins
    if (decoded.role === 'dept') {
      query_str += ' AND (status = "approved" OR status IS NULL)';
    }
    
    query_str += ' ORDER BY lab_name';
    
    const labs = await query(query_str, queryParams);

    return NextResponse.json({ 
      success: true,
      labs 
    });

  } catch (error) {
    console.error('Error fetching labs:', error);
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

    // Insert lab
    const result = await query(`
      INSERT INTO labs (
        lab_name, department, lab_area, equipment_count, 
        description, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      data.lab_name,
      dept,
      data.lab_area || null,
      data.equipment_count || null,
      data.description || null,
      status
    ]);

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Lab added successfully'
    });

  } catch (error) {
    console.error('Error adding lab:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
