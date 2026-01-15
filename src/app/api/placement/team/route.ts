import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all placement team members
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_team ORDER BY id DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching placement team members:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement team members' },
            { status: 500 }
        );
    }
}

// POST: Create new team member
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, designation, branch, email, phone, image_url } = body;

        // Validate required fields
        if (!name || name.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Name is required' },
                { status: 400 }
            );
        }

        if (!image_url) {
            return NextResponse.json(
                { success: false, error: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Validate email format if provided
        if (email && email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { success: false, error: 'Invalid email format' },
                    { status: 400 }
                );
            }
        }

        // Insert new team member
        const result = await execute(
            'INSERT INTO placement_team (name, designation, branch, email, phone, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [
                name.trim(),
                designation?.trim() || '',
                branch?.trim() || '',
                email?.trim() || '',
                phone?.trim() || '',
                image_url
            ]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Team member added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create team member' },
            { status: 500 }
        );
    }
}

// PUT: Update team member
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, designation, branch, email, phone, image_url } = body;

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

        // Validate email format if provided
        if (email && email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { success: false, error: 'Invalid email format' },
                    { status: 400 }
                );
            }
        }

        // Build dynamic update query
        let updateQuery = 'UPDATE placement_team SET name = ?, designation = ?, branch = ?, email = ?, phone = ?';
        let params: any[] = [
            name.trim(),
            designation?.trim() || '',
            branch?.trim() || '',
            email?.trim() || '',
            phone?.trim() || ''
        ];

        // Only update image if provided
        if (image_url) {
            updateQuery += ', image_url = ?';
            params.push(image_url);
        }

        updateQuery += ' WHERE id = ?';
        params.push(id);

        // Update team member
        const result = await execute(updateQuery, params);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Team member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Team member updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update team member' },
            { status: 500 }
        );
    }
}

// DELETE: Delete team member
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

        // Delete team member
        const result = await execute(
            'DELETE FROM placement_team WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Team member not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Team member deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete team member' },
            { status: 500 }
        );
    }
}
