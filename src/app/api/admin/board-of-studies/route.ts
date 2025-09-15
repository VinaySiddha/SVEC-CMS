import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET /api/admin/board-of-studies - Get all board members and meeting minutes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept') || 'eee';
    const type = searchParams.get('type'); // 'members' or 'minutes'

    if (type === 'members') {
      // Get board members only
      const members = await query(
        'SELECT * FROM board_of_studies WHERE dept = ? ORDER BY id ASC',
        [dept]
      );
      
      return NextResponse.json({
        success: true,
        data: members
      });
    } else if (type === 'minutes') {
      // Get meeting minutes only
      const minutes = await query(
        'SELECT * FROM bos_meeting_minutes WHERE dept = ? ORDER BY meeting_number DESC',
        [dept]
      );
      
      return NextResponse.json({
        success: true,
        data: minutes
      });
    } else {
      // Get both members and minutes
      const [members, minutes] = await Promise.all([
        query('SELECT * FROM board_of_studies WHERE dept = ? ORDER BY id ASC', [dept]),
        query('SELECT * FROM bos_meeting_minutes WHERE dept = ? ORDER BY meeting_number DESC', [dept])
      ]);

      return NextResponse.json({
        success: true,
        data: {
          members,
          minutes
        }
      });
    }
  } catch (error) {
    console.error('Error fetching board of studies data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/board-of-studies - Create new board member or meeting minute
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    if (type === 'member') {
      // Create board member
      const {
        dept,
        member_name,
        designation,
        organization,
        role,
        year,
        contact_email,
        status = 'approved'
      } = data;

      if (!dept || !member_name || !designation || !organization || !role) {
        return NextResponse.json(
          { success: false, error: 'Missing required fields for member' },
          { status: 400 }
        );
      }

      const result = await query(
        `INSERT INTO board_of_studies 
         (dept, member_name, designation, organization, role, year, contact_email, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [dept, member_name, designation, organization, role, year, contact_email, status]
      );

      return NextResponse.json({
        success: true,
        data: { id: (result as any).insertId, ...data },
        message: 'Board member created successfully'
      });

    } else if (type === 'minute') {
      // Create meeting minute
      const {
        dept,
        meeting_title,
        meeting_number,
        meeting_date,
        document_url,
        academic_year,
        description,
        status = 'active'
      } = data;

      if (!dept || !meeting_title || !meeting_number || !meeting_date || !document_url || !academic_year) {
        return NextResponse.json(
          { success: false, error: 'Missing required fields for meeting minute' },
          { status: 400 }
        );
      }

      const result = await query(
        `INSERT INTO bos_meeting_minutes 
         (dept, meeting_title, meeting_number, meeting_date, document_url, academic_year, description, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [dept, meeting_title, meeting_number, meeting_date, document_url, academic_year, description, status]
      );

      return NextResponse.json({
        success: true,
        data: { id: (result as any).insertId, ...data },
        message: 'Meeting minute created successfully'
      });

    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be "member" or "minute"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error creating board of studies data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}