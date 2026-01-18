import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all testimonies
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_testimonies WHERE is_active = TRUE ORDER BY display_order ASC, id DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching testimonies:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch testimonies' },
            { status: 500 }
        );
    }
}

// POST: Create new testimony
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { author_name, author_title, image_url, testimonial_text, display_order, is_active } = body;

        // Validate required fields
        if (!author_name || !testimonial_text) {
            return NextResponse.json(
                { success: false, error: 'Author name and testimonial text are required' },
                { status: 400 }
            );
        }

        // Insert new testimony
        const result = await execute(
            'INSERT INTO placement_testimonies (author_name, author_title, image_url, testimonial_text, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?)',
            [author_name, author_title || null, image_url || null, testimonial_text, display_order || 0, is_active !== false ? 1 : 0]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Testimony added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating testimony:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create testimony' },
            { status: 500 }
        );
    }
}

// PUT: Update testimony
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, author_name, author_title, image_url, testimonial_text, display_order, is_active } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        if (!author_name || !testimonial_text) {
            return NextResponse.json(
                { success: false, error: 'Author name and testimonial text are required' },
                { status: 400 }
            );
        }

        // Build dynamic update query
        const updates: string[] = [];
        const values: any[] = [];

        if (author_name !== undefined) {
            updates.push('author_name = ?');
            values.push(author_name);
        }

        if (author_title !== undefined) {
            updates.push('author_title = ?');
            values.push(author_title || null);
        }

        if (image_url !== undefined) {
            updates.push('image_url = ?');
            values.push(image_url || null);
        }

        if (testimonial_text !== undefined) {
            updates.push('testimonial_text = ?');
            values.push(testimonial_text);
        }

        if (display_order !== undefined) {
            updates.push('display_order = ?');
            values.push(display_order);
        }

        if (is_active !== undefined) {
            updates.push('is_active = ?');
            values.push(is_active ? 1 : 0);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No fields to update' },
                { status: 400 }
            );
        }

        values.push(id);

        const updateQuery = `UPDATE placement_testimonies SET ${updates.join(', ')} WHERE id = ?`;
        await execute(updateQuery, values);

        return NextResponse.json(
            { success: true, message: 'Testimony updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating testimony:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update testimony' },
            { status: 500 }
        );
    }
}

// DELETE: Delete testimony
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        await execute('DELETE FROM placement_testimonies WHERE id = ?', [id]);

        return NextResponse.json(
            { success: true, message: 'Testimony deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting testimony:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete testimony' },
            { status: 500 }
        );
    }
}
