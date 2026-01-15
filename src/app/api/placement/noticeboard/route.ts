import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { deleteUploadedFile } from '@/lib/fileUtils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get('category');

    let query = 'SELECT * FROM placement_noticeboard';
    let params: any[] = [];

    if (categoryFilter) {
      query += " WHERE category = ?";
      params.push(categoryFilter);
    }

    query += " ORDER BY posted_date DESC, created_at DESC";

    const rows = await db.query(query, params);

    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      console.log('No placement noticeboard data found in database');
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No notices available'
      });
    }

    return NextResponse.json({
      success: true,
      data: rows,
      count: Array.isArray(rows) ? rows.length : 0
    });
  } catch (error: any) {
    console.error('Error fetching placement noticeboard data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch noticeboard data',
        data: []
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const content = formData.get('content') as string;
    const posted_date = formData.get('posted_date') as string;
    const file = formData.get('file') as File | null;

    // Validation
    if (!title || !category || !content) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and content are required' },
        { status: 400 }
      );
    }

    let file_url: string | null = null;

    // Handle file upload if present
    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'placement-noticeboard');
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const filepath = join(uploadDir, filename);

        // Write file to disk
        await writeFile(filepath, buffer);
        file_url = filename;
      } catch (fileError) {
        console.error('Error uploading file:', fileError);
        // Continue without file if upload fails, but log the error
      }
    }

    const query = `
      INSERT INTO placement_noticeboard 
      (title, category, content, file_url, posted_date, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    const result = await db.query(query, [
      title,
      category,
      content,
      file_url || null,
      posted_date || new Date().toISOString().split('T')[0]
    ]);

    return NextResponse.json({
      success: true,
      message: 'Notice created successfully',
      id: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Error creating notice:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create notice' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category, content, file_url, posted_date, oldFileUrl } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Notice ID is required' },
        { status: 400 }
      );
    }

    // Delete old file if it's being replaced with a new one
    if (oldFileUrl && file_url && oldFileUrl !== file_url) {
      await deleteUploadedFile(`placement-noticeboard/${oldFileUrl}`);
    }

    const query = `
      UPDATE placement_noticeboard 
      SET title = ?, category = ?, content = ?, file_url = ?, posted_date = ?, updated_at = NOW()
      WHERE id = ?
    `;

    await db.query(query, [
      title,
      category,
      content,
      file_url || null,
      posted_date || new Date().toISOString().split('T')[0],
      id
    ]);

    return NextResponse.json({
      success: true,
      message: 'Notice updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating notice:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update notice' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Notice ID is required' },
        { status: 400 }
      );
    }

    // Get the notice details to retrieve file URL before deleting
    const notice = await db.query('SELECT file_url FROM placement_noticeboard WHERE id = ?', [id]);

    // Delete from database
    await db.query('DELETE FROM placement_noticeboard WHERE id = ?', [id]);

    // Delete associated file if it exists
    if (notice && notice.length > 0 && notice[0].file_url) {
      await deleteUploadedFile(`placement-noticeboard/${notice[0].file_url}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Notice and associated file deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting notice:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete notice' },
      { status: 500 }
    );
  }
}
