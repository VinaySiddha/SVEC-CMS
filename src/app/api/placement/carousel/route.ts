import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all carousel images
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_carousel ORDER BY id DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching carousel images:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch carousel images' },
            { status: 500 }
        );
    }
}

// POST: Create new carousel image
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image_url, alt_text } = body;

        // Validate required fields
        if (!image_url) {
            return NextResponse.json(
                { success: false, error: 'Image URL is required' },
                { status: 400 }
            );
        }

        if (!alt_text || alt_text.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Alt text is required' },
                { status: 400 }
            );
        }

        // Insert new carousel image
        const result = await execute(
            'INSERT INTO placement_carousel (image_url, alt_text) VALUES (?, ?)',
            [image_url, alt_text.trim()]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Carousel image added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating carousel image:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create carousel image' },
            { status: 500 }
        );
    }
}

// PUT: Update carousel image alt text
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, alt_text } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        if (!alt_text || alt_text.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Alt text is required' },
                { status: 400 }
            );
        }

        // Update carousel image
        const result = await execute(
            'UPDATE placement_carousel SET alt_text = ? WHERE id = ?',
            [alt_text.trim(), id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Carousel image not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Carousel image updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating carousel image:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update carousel image' },
            { status: 500 }
        );
    }
}

// DELETE: Delete carousel image
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        // Delete carousel image
        const result = await execute(
            'DELETE FROM placement_carousel WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Carousel image not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Carousel image deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting carousel image:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete carousel image' },
            { status: 500 }
        );
    }
}
