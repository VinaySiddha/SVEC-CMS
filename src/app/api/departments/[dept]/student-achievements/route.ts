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

    const { dept } = params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch student achievements for the department
    let query_str = 'SELECT * FROM student_achievements WHERE department = ?';
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
    console.error('Error fetching student achievements:', error);
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

    const { dept } = params;

    // Check if user has permission for this department
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await request.json();

    // Set status based on user role
    const status = (decoded.role === 'admin' || decoded.role === 'super_admin') ? 'approved' : 'pending';

    // Insert student achievement
    const result = await query(`
      INSERT INTO student_achievements (
        title, student_name, department, achievement_date, 
        description, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [
      data.title,
      data.student_name,
      dept,
      data.achievement_date,
      data.description || null,
      status
    ]);

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Student achievement added successfully'
    });

  } catch (error) {
    console.error('Error adding student achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
