import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { deleteUploadedFile } from '@/lib/fileUtils';

export const runtime = 'nodejs';

// GET: Fetch all placement events
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sort = searchParams.get('sort') || 'created_at';
        const order = searchParams.get('order') || 'DESC';

        const results = await query(
            `SELECT * FROM placement_events ORDER BY ${sort} ${order}`
        );

        return NextResponse.json(
            {
                success: true,
                data: results,
                count: results.length
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement events' },
            { status: 500 }
        );
    }
}

// POST: Create new placement event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, circular_url, link, guidelines_url } = body;

        // Validate required fields
        if (!title || title.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Title is required' },
                { status: 400 }
            );
        }

        // Insert new event
        const result = await execute(
            'INSERT INTO placement_events (title, circular_url, link, guidelines_url) VALUES (?, ?, ?, ?)',
            [title.trim(), circular_url || null, link || null, guidelines_url || null]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Placement event created successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create placement event' },
            { status: 500 }
        );
    }
}

// PUT: Update placement event
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, title, circular_url, link, guidelines_url, oldCircularUrl, oldGuidelinesUrl } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Event ID is required' },
                { status: 400 }
            );
        }

        if (!title || title.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Title is required' },
                { status: 400 }
            );
        }

        // Delete old files if they're being replaced with new ones
        if (oldCircularUrl && circular_url && oldCircularUrl !== circular_url) {
            await deleteUploadedFile(oldCircularUrl);
        }
        if (oldGuidelinesUrl && guidelines_url && oldGuidelinesUrl !== guidelines_url) {
            await deleteUploadedFile(oldGuidelinesUrl);
        }

        const result = await execute(
            'UPDATE placement_events SET title = ?, circular_url = ?, link = ?, guidelines_url = ? WHERE id = ?',
            [title.trim(), circular_url || null, link || null, guidelines_url || null, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Placement event updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to update placement event' },
            { status: 500 }
        );
    }
}

// DELETE: Remove placement event
export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Event ID is required' },
                { status: 400 }
            );
        }

        // Get the event details to retrieve file URLs before deleting
        const eventResults = await query(
            'SELECT circular_url, guidelines_url FROM placement_events WHERE id = ?',
            [id]
        );

        // Delete the database record
        const result = await execute(
            'DELETE FROM placement_events WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Event not found' },
                { status: 404 }
            );
        }

        // Delete associated files
        if (eventResults && eventResults.length > 0) {
            const event = eventResults[0] as any;
            if (event.circular_url) {
                await deleteUploadedFile(event.circular_url);
            }
            if (event.guidelines_url) {
                await deleteUploadedFile(event.guidelines_url);
            }
        }

        return NextResponse.json(
            { success: true, message: 'Placement event and associated files deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete placement event' },
            { status: 500 }
        );
    }
}
