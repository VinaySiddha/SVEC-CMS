import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { unlink } from 'fs/promises';
import { join } from 'path';

// GET: Fetch all items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const degree = searchParams.get('degree');

    let sql = 'SELECT id, date, content, link, degree, type, posted_date FROM rsac_items WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (degree) {
      sql += ' AND degree = ?';
      params.push(degree);
    }

    sql += ' ORDER BY date DESC';

    const items = await query(sql, params);

    // If requesting specific degree, return flat array
    if (degree) {
      return NextResponse.json(items);
    }

    // If requesting specific type without degree, organize by degree
    if (type) {
      const organized = {
        ug: (items as any[]).filter(item => item.degree === 'UG'),
        pg: (items as any[]).filter(item => item.degree === 'PG')
      };
      return NextResponse.json(organized);
    }

    // If no filters, return all items
    return NextResponse.json(items);

  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST: Create a new item
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { date, content, link, degree, type } = data;

    // Validate required fields
    if (!date || !content || !link || !degree || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate degree
    if (!['UG', 'PG'].includes(degree)) {
      return NextResponse.json(
        { error: 'Degree must be either UG or PG' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['syllabus', 'regulations', 'academic-calendar'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await execute(
      'INSERT INTO rsac_items (date, content, link, degree, type, posted_date) VALUES (?, ?, ?, ?, ?, NOW())',
      [date, content, link, degree, type]
    );

    return NextResponse.json({
      success: true,
      id: result.insertId,
      message: 'Item added successfully'
    });

  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}

// PUT: Update an item
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, date, content, link, degree, type } = data;

    // Validate required fields
    if (!id || !date || !content || !link || !degree || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate degree
    if (!['UG', 'PG'].includes(degree)) {
      return NextResponse.json(
        { error: 'Degree must be either UG or PG' },
        { status: 400 }
      );
    }

    // Validate type
    if (!['syllabus', 'regulations', 'academic-calendar'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    // Check if item exists
    const items = await query(
      'SELECT id FROM rsac_items WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Update the item
    await execute(
      'UPDATE rsac_items SET date = ?, content = ?, link = ?, degree = ?, type = ? WHERE id = ? AND deleted_at IS NULL',
      [date, content, link, degree, type, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Item updated successfully'
    });

  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

// DELETE: Delete an item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for deletion' },
        { status: 400 }
      );
    }

    // Get the item details first
    interface RsacItem {
      link?: string;
    }

    const items = (await query(
      'SELECT link FROM rsac_items WHERE id = ? AND deleted_at IS NULL',
      [id]
    )) as RsacItem[];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Soft delete the item
    await execute(
      'UPDATE rsac_items SET deleted_at = NOW() WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    // Delete the associated file
    const item = items[0];
    if (item.link) {
      const filePath = join(process.cwd(), 'public', item.link.replace(/^\//, ''));
      try {
        await unlink(filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
        // Continue even if file deletion fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}