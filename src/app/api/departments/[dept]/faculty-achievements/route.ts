import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { dept: string } }
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

    // Fetch faculty achievements for the department
    let query_str = 'SELECT * FROM faculty_achievements WHERE dept = ?';
    let queryParams = [dept];
    
    // Show only approved achievements for department users, all for admins
    if (decoded.role === 'dept') {
      query_str += ' AND (status = "approved" OR status IS NULL)';
    }
    
    query_str += ' ORDER BY achievement_date DESC';
    
    const achievements = await query(query_str, queryParams);

    return NextResponse.json({ 
      success: true,
      achievements 
    });

  } catch (error) {
    console.error('Error fetching faculty achievements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { dept: string } }
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

    // Insert faculty achievement
    const result = await query(`
      INSERT INTO faculty_achievements (
        title, faculty_name, department, achievement_date, 
        description, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      data.title,
      data.faculty_name,
      dept,
      data.achievement_date,
      data.description || null,
      status
    ]);

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Faculty achievement added successfully'
    });

  } catch (error) {
    console.error('Error adding faculty achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
