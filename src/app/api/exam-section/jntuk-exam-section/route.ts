import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');

    let query = 'SELECT * FROM exam_section';
    let params: any[] = [];

    if (typeFilter === 'timetable') {
      // Fetch only timetables
      query += " WHERE type = 'timetable' ORDER BY posteddate DESC, date DESC";
    } else {
      // Exclude timetables from the result (default behavior)
      query += " WHERE type != 'timetable' ORDER BY posteddate DESC, date DESC";
    }

    const rows = await db.query(query, params);
    
    // If no data from database, return mock data
    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      
      const mockJNTUKData = [
        // Results
        {
          sno: 5,
          date: '2024-02-15',
          content: 'B.Tech III Year I Semester Results - Nov 2023',
          degree: 'UG',
          type: 'results',
          link: '/documents/jntuk-ug-results-nov-2023.pdf',
          posteddate: '2024-02-15'
        },
        {
          sno: 6,
          date: '2024-02-18',
          content: 'M.Tech I Year I Semester Results - Nov 2023',
          degree: 'PG',
          type: 'results',
          link: '/documents/jntuk-pg-results-nov-2023.pdf',
          posteddate: '2024-02-18'
        },
        // Revaluation Results
        {
          sno: 7,
          date: '2024-02-25',
          content: 'B.Tech III Year I Semester Revaluation Results - Nov 2023',
          degree: 'UG',
          type: 'revaluation_results',
          link: '/documents/jntuk-ug-reval-results-nov-2023.pdf',
          posteddate: '2024-02-25'
        },
        {
          sno: 8,
          date: '2024-02-28',
          content: 'M.Tech I Year I Semester Revaluation Results - Nov 2023',
          degree: 'PG',
          type: 'revaluation_results',
          link: '/documents/jntuk-pg-reval-results-nov-2023.pdf',
          posteddate: '2024-02-28'
        },
        // Fee Notifications
        {
          sno: 9,
          date: '2024-03-01',
          content: 'B.Tech Exam Fee Notification - April 2024',
          degree: 'UG',
          type: 'fee_notification',
          link: '/documents/jntuk-ug-fee-notification-apr-2024.pdf',
          posteddate: '2024-03-01'
        },
        {
          sno: 10,
          date: '2024-03-01',
          content: 'M.Tech Exam Fee Notification - April 2024',
          degree: 'PG',
          type: 'fee_notification',
          link: '/documents/jntuk-pg-fee-notification-apr-2024.pdf',
          posteddate: '2024-03-01'
        },
        // Downloads
        {
          sno: 11,
          date: '2024-03-10',
          content: 'JNTUK UG Exam Section Downloads',
          degree: 'UG',
          type: 'downloads',
          link: '/documents/jntuk-ug-exam-downloads.pdf',
          posteddate: '2024-03-10'
        },
        {
          sno: 12,
          date: '2024-03-10',
          content: 'JNTUK PG Exam Section Downloads',
          degree: 'PG',
          type: 'downloads',
          link: '/documents/jntuk-pg-exam-downloads.pdf',
          posteddate: '2024-03-10'
        }
      ];
      if (typeFilter === 'timetable') {
        return NextResponse.json(mockJNTUKData.filter(item => item.type === 'timetable'));
      } else if (typeFilter === 'results') {
        return NextResponse.json(mockJNTUKData.filter(item => item.type === 'results'));
      } else if (typeFilter === 'revaluation_results') {
        return NextResponse.json(mockJNTUKData.filter(item => item.type === 'revaluation_results'));
      } else if (typeFilter === 'fee_notification') {
        return NextResponse.json(mockJNTUKData.filter(item => item.type === 'fee_notification'));
      } else if (typeFilter === 'downloads') {
        return NextResponse.json(mockJNTUKData.filter(item => item.type === 'downloads'));
      } else {
        return NextResponse.json(mockJNTUKData);
      }
    }
    
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    
    // Return mock data as fallback
    const mockJNTUKData = [
      {
        sno: 1,
        date: '2024-03-01',
        content: 'B.Tech III Year I Semester Regular Examinations Time Table - May 2024',
        degree: 'UG',
        type: 'timetable',
        link: '/documents/jntuk-ug-timetable-may-2024.pdf',
        posteddate: '2024-02-20'
      },
      {
        sno: 2,
        date: '2024-03-01',
        content: 'M.Tech I Year I Semester Regular Examinations Time Table - May 2024',
        degree: 'PG',
        type: 'timetable',
        link: '/documents/jntuk-pg-timetable-may-2024.pdf',
        posteddate: '2024-02-25'
      }
    ];
    
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');
    
    if (typeFilter === 'timetable') {
      return NextResponse.json(mockJNTUKData.filter(item => item.type === 'timetable'));
    } else {
      return NextResponse.json(mockJNTUKData.filter(item => item.type !== 'timetable'));
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, content, degree, type, link, posteddate } = body;

    if (!content || !degree || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: content, degree, type' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO exam_section (date, content, degree, type, link, posteddate) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      date || new Date().toISOString().split('T')[0],
      content,
      degree,
      type,
      link || null,
      posteddate || new Date().toISOString().split('T')[0]
    ];

    await db.query(query, values);

    return NextResponse.json(
      { success: true, message: 'JNTUK exam section entry created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create JNTUK exam section entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { sno } = body;

    if (!sno) {
      return NextResponse.json(
        { error: 'Missing required field: sno' },
        { status: 400 }
      );
    }

    // Get the record details first to retrieve the file link
    const records = await db.query('SELECT link FROM exam_section WHERE sno = ?', [sno]) as any[];
    
    // Delete the record
    const query = 'DELETE FROM exam_section WHERE sno = ?';
    await db.query(query, [sno]);

    // Delete the associated file if it exists
    if (records && records.length > 0 && records[0].link) {
      const { unlink } = await import('fs/promises');
      const { join } = await import('path');
      const filePath = join(process.cwd(), 'public', records[0].link.replace(/^\//, ''));
      try {
        await unlink(filePath);
      } catch (error) {
        // Continue even if file deletion fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'JNTUK exam section entry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete JNTUK exam section entry' },
      { status: 500 }
    );
  }
}