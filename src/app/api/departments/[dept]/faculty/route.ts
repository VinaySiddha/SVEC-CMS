import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';

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
    if (decoded.role !== 'admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const data = await request.json();

    // Insert faculty member
    const result = await query(`
      INSERT INTO faculty_profiles (
        name, email, qualification, designation, specialization,
        experience_years, profile_url, bio, research_interests,
        publications, dept
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      dept
    ]);

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: 'Faculty member added successfully'
    });

  } catch (error) {
    console.error('Error adding faculty:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    if (decoded.role !== 'admin' && decoded.department !== dept) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch faculty members (only approved ones for regular users)
    let query_str = 'SELECT * FROM faculty_profiles WHERE dept = ?';
    let queryParams = [dept];
    
    // Show only approved faculty for department users, all for admins
    if (decoded.role === 'dept') {
      query_str += ' AND (status = "approved" OR status IS NULL)';
    }
    
    query_str += ' ORDER BY name';
    
    const faculty = await query(query_str, queryParams);

    return NextResponse.json({ faculty });

  } catch (error) {
    console.error('Error fetching faculty:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
