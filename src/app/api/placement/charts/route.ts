import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all placement charts data
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_charts ORDER BY year DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching placement charts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement charts' },
            { status: 500 }
        );
    }
}

// POST: Create new placement chart entry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { year, civil, mech, eee, ece, cse, mba, aiml, cai, ect, cst } = body;

        // Validate required fields
        if (!year || year.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Year is required' },
                { status: 400 }
            );
        }

        // Check if year already exists
        const existing = await query(
            'SELECT id FROM placement_charts WHERE year = ?',
            [year.trim()]
        );

        if (existing.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Year already exists' },
                { status: 400 }
            );
        }

        // Insert new placement chart entry
        const result = await execute(
            `INSERT INTO placement_charts 
            (year, civil, mech, eee, ece, cse, mba, aiml, cai, ect, cst) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                year.trim(),
                parseInt(civil) || 0,
                parseInt(mech) || 0,
                parseInt(eee) || 0,
                parseInt(ece) || 0,
                parseInt(cse) || 0,
                parseInt(mba) || 0,
                parseInt(aiml) || 0,
                parseInt(cai) || 0,
                parseInt(ect) || 0,
                parseInt(cst) || 0
            ]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Placement chart entry added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating placement chart entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create placement chart entry' },
            { status: 500 }
        );
    }
}

// PUT: Update placement chart entry
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, year, civil, mech, eee, ece, cse, mba, aiml, cai, ect, cst } = body;

        // Validate required fields
        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        if (!year || year.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Year is required' },
                { status: 400 }
            );
        }

        // Check if year already exists (excluding current record)
        const existing = await query(
            'SELECT id FROM placement_charts WHERE year = ? AND id != ?',
            [year.trim(), id]
        );

        if (existing.length > 0) {
            return NextResponse.json(
                { success: false, error: 'Year already exists' },
                { status: 400 }
            );
        }

        // Update placement chart entry
        const result = await execute(
            `UPDATE placement_charts SET 
                year = ?, 
                civil = ?, 
                mech = ?, 
                eee = ?, 
                ece = ?, 
                cse = ?, 
                mba = ?,
                aiml = ?,
                cai = ?,
                ect = ?,
                cst = ?
            WHERE id = ?`,
            [
                year.trim(),
                parseInt(civil) || 0,
                parseInt(mech) || 0,
                parseInt(eee) || 0,
                parseInt(ece) || 0,
                parseInt(cse) || 0,
                parseInt(mba) || 0,
                parseInt(aiml) || 0,
                parseInt(cai) || 0,
                parseInt(ect) || 0,
                parseInt(cst) || 0,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Placement chart entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Placement chart entry updated successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating placement chart entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update placement chart entry' },
            { status: 500 }
        );
    }
}

// DELETE: Delete placement chart entry
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

        // Delete placement chart entry
        const result = await execute(
            'DELETE FROM placement_charts WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Placement chart entry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Placement chart entry deleted successfully'
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting placement chart entry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete placement chart entry' },
            { status: 500 }
        );
    }
}
