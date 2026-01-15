import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

const VALID_CATEGORIES = ['UG', 'PG', 'TOTAL'];

// GET: Fetch all placement category stats
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_category_stats ORDER BY year DESC, category ASC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching placement category stats:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement category stats' },
            { status: 500 }
        );
    }
}

// POST: Create new category stats entry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { year, category, civil, mech, eee, ece, cse, mba } = body;

        // Validate required fields
        if (!year || year.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Year is required' },
                { status: 400 }
            );
        }

        if (!category || category.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Category is required' },
                { status: 400 }
            );
        }

        // Validate category value
        if (!VALID_CATEGORIES.includes(category.trim().toUpperCase())) {
            return NextResponse.json(
                { success: false, error: 'Category must be one of: UG, PG, TOTAL' },
                { status: 400 }
            );
        }

        // Insert new category stats entry
        const result = await execute(
            'INSERT INTO placement_category_stats (year, category, civil, mech, eee, ece, cse, mba) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                year.trim(),
                category.trim().toUpperCase(),
                parseInt(civil) || 0,
                parseInt(mech) || 0,
                parseInt(eee) || 0,
                parseInt(ece) || 0,
                parseInt(cse) || 0,
                parseInt(mba) || 0
            ]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Category stats entry added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating category stats entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create category stats entry' },
            { status: 500 }
        );
    }
}

// PUT: Update category stats entry
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, year, category, civil, mech, eee, ece, cse, mba } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        // Build dynamic update query
        const updateFields: string[] = [];
        const params: any[] = [];

        if (year !== undefined && year.trim() !== '') {
            updateFields.push('year = ?');
            params.push(year.trim());
        }

        if (category !== undefined && category.trim() !== '') {
            // Validate category value
            if (!VALID_CATEGORIES.includes(category.trim().toUpperCase())) {
                return NextResponse.json(
                    { success: false, error: 'Category must be one of: UG, PG, TOTAL' },
                    { status: 400 }
                );
            }
            updateFields.push('category = ?');
            params.push(category.trim().toUpperCase());
        }

        if (civil !== undefined) {
            updateFields.push('civil = ?');
            params.push(parseInt(civil) || 0);
        }

        if (mech !== undefined) {
            updateFields.push('mech = ?');
            params.push(parseInt(mech) || 0);
        }

        if (eee !== undefined) {
            updateFields.push('eee = ?');
            params.push(parseInt(eee) || 0);
        }

        if (ece !== undefined) {
            updateFields.push('ece = ?');
            params.push(parseInt(ece) || 0);
        }

        if (cse !== undefined) {
            updateFields.push('cse = ?');
            params.push(parseInt(cse) || 0);
        }

        if (mba !== undefined) {
            updateFields.push('mba = ?');
            params.push(parseInt(mba) || 0);
        }

        if (updateFields.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No fields to update' },
                { status: 400 }
            );
        }

        // Add id to params
        params.push(id);

        // Update category stats entry
        const updateQuery = `UPDATE placement_category_stats SET ${updateFields.join(', ')} WHERE id = ?`;
        const result = await execute(updateQuery, params);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Category stats entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Category stats entry updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating category stats entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update category stats entry' },
            { status: 500 }
        );
    }
}

// DELETE: Delete category stats entry
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

        // Delete category stats entry
        const result = await execute(
            'DELETE FROM placement_category_stats WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Category stats entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Category stats entry deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting category stats entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete category stats entry' },
            { status: 500 }
        );
    }
}
