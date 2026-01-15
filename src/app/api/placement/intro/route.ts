import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch placement intro
export async function GET() {
    try {
        const results: any = await query(
            'SELECT * FROM placement_intro LIMIT 1'
        );

        if (results.length === 0) {
            return NextResponse.json({ content: '' }, { status: 200 });
        }

        return NextResponse.json(results[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching placement intro:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement intro' },
            { status: 500 }
        );
    }
}

// POST: Create new placement intro
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { content } = body;

        // Validate required fields
        if (!content || content.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        // Check if intro already exists
        const existing: any = await query('SELECT id FROM placement_intro LIMIT 1');

        if (existing.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Placement intro already exists. Use PUT to update.' },
                { status: 400 }
            );
        }

        // Insert new intro
        const result = await execute(
            'INSERT INTO placement_intro (content) VALUES (?)',
            [content.trim()]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Placement intro created successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating placement intro:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create placement intro' },
            { status: 500 }
        );
    }
}

// PUT: Update placement intro
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, content } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        if (!content || content.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Content is required' },
                { status: 400 }
            );
        }

        // Update intro
        await execute(
            'UPDATE placement_intro SET content = ? WHERE id = ?',
            [content.trim(), id]
        );

        return NextResponse.json(
            { success: true, message: 'Placement intro updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating placement intro:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update placement intro' },
            { status: 500 }
        );
    }
}

// DELETE: Delete placement intro (optional)
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

        await execute('DELETE FROM placement_intro WHERE id = ?', [id]);

        return NextResponse.json(
            { success: true, message: 'Placement intro deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting placement intro:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete placement intro' },
            { status: 500 }
        );
    }
}
