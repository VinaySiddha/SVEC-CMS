import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all company logos
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_company_logos ORDER BY id DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching company logos:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch company logos' },
            { status: 500 }
        );
    }
}

// POST: Create new company logo
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image_url, company_name } = body;

        // Validate required fields
        if (!image_url) {
            return NextResponse.json(
                { success: false, error: 'Image URL is required' },
                { status: 400 }
            );
        }

        // Insert new company logo
        const result = await execute(
            'INSERT INTO placement_company_logos (image_url, company_name) VALUES (?, ?)',
            [image_url, company_name || null]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Company logo added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating company logo:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create company logo' },
            { status: 500 }
        );
    }
}

// PUT: Update company logo
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, company_name, image_url } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        // Build dynamic update query
        const updates: string[] = [];
        const values: any[] = [];

        if (company_name !== undefined) {
            updates.push('company_name = ?');
            values.push(company_name || null);
        }

        if (image_url !== undefined) {
            updates.push('image_url = ?');
            values.push(image_url);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No fields to update' },
                { status: 400 }
            );
        }

        values.push(id);

        const updateQuery = `UPDATE placement_company_logos SET ${updates.join(', ')} WHERE id = ?`;
        await execute(updateQuery, values);

        return NextResponse.json(
            { success: true, message: 'Company logo updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating company logo:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update company logo' },
            { status: 500 }
        );
    }
}

// DELETE: Delete company logo
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

        await execute('DELETE FROM placement_company_logos WHERE id = ?', [id]);

        return NextResponse.json(
            { success: true, message: 'Company logo deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting company logo:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete company logo' },
            { status: 500 }
        );
    }
}
