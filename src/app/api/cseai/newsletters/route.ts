import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept') || 'cseai';
    
    // Fetch newsletters for the specified department
    const newsletters = await query(`
      SELECT * FROM newsletters 
      WHERE dept = ? AND status = 'published' 
      ORDER BY publication_date DESC
    `, [dept]);

<<<<<<< HEAD
    return NextResponse.json({
      success: true,
      data: newsletters
    });
=======
        const newsletters = await query(`
      SELECT newsletter_title, issue_number, publication_date, description, 
             document_url, cover_image_url, display_order 
      FROM newsletters 
      WHERE department = ? AND is_active = TRUE 
      ORDER BY publication_date DESC, display_order ASC
    `, [department]);
>>>>>>> parent of c4eba33 (Merge branch 'celigo@abhi' of https://github.com/VinaySiddha/SVEC-CMS into celigo@abhi)

  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch newsletters',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept') || 'cseai';
    
    const body = await request.json();
    const { title, content, publication_date, author, file_url } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const result = await query(`
      INSERT INTO newsletters (dept, title, content, publication_date, author, file_url, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'published', NOW())
    `, [dept, title, content, publication_date || new Date(), author, file_url]);

    return NextResponse.json({
      success: true,
      message: 'Newsletter created successfully',
      id: (result as any).insertId
    });

  } catch (error) {
    console.error('Error creating newsletter:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create newsletter',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}