import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch the placement officer (only one record)
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_officer ORDER BY id DESC LIMIT 1'
        );

        return NextResponse.json(results.length > 0 ? results[0] : null, { status: 200 });
    } catch (error) {
        console.error('Error fetching placement officer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement officer' },
            { status: 500 }
        );
    }
}

// POST: Create new placement officer
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, designation, phone, email, linkedin, image_url } = body;

        // Validate required fields
        if (!name || name.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Name is required' },
                { status: 400 }
            );
        }

        if (!designation || designation.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Designation is required' },
                { status: 400 }
            );
        }

        if (!email || email.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (!phone || phone.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Phone is required' },
                { status: 400 }
            );
        }

        if (!image_url) {
            return NextResponse.json(
                { success: false, error: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Insert new placement officer
        const result = await execute(
            'INSERT INTO placement_officer (name, designation, phone, email, linkedin, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name.trim(), designation.trim(), phone.trim(), email.trim(), linkedin?.trim() || '', image_url]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Placement officer added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating placement officer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create placement officer' },
            { status: 500 }
        );
    }
}

// PUT: Update placement officer
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, designation, phone, email, linkedin, image_url } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        if (!name || name.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Name is required' },
                { status: 400 }
            );
        }

        if (!designation || designation.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Designation is required' },
                { status: 400 }
            );
        }

        if (!email || email.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (!phone || phone.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Phone is required' },
                { status: 400 }
            );
        }

        // Build dynamic update query based on provided fields
        let updateQuery = 'UPDATE placement_officer SET name = ?, designation = ?, phone = ?, email = ?, linkedin = ?';
        let params: any[] = [name.trim(), designation.trim(), phone.trim(), email.trim(), linkedin?.trim() || ''];

        if (image_url) {
            updateQuery += ', image_url = ?';
            params.push(image_url);
        }

        updateQuery += ' WHERE id = ?';
        params.push(id);

        // Update placement officer
        const result = await execute(updateQuery, params);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Placement officer not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Placement officer updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating placement officer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update placement officer' },
            { status: 500 }
        );
    }
}

// DELETE: Delete placement officer
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

        // Delete placement officer
        const result = await execute(
            'DELETE FROM placement_officer WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Placement officer not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Placement officer deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting placement officer:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete placement officer' },
            { status: 500 }
        );
    }
}
