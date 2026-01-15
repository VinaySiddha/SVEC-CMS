import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

export const runtime = 'nodejs';

// GET: Fetch all placement PDFs
export async function GET() {
    try {
        const results = await query(
            'SELECT * FROM placement_pdfs ORDER BY year DESC, id DESC'
        );

        return NextResponse.json(results, { status: 200 });
    } catch (error) {
        console.error('Error fetching placement PDFs:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch placement PDFs' },
            { status: 500 }
        );
    }
}

// POST: Create new placement PDF
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { year, title, pdf_url } = body;

        // Validate required fields
        if (!year || year.trim() === '') {
            return NextResponse.json(
                { success: false, error: 'Year is required' },
                { status: 400 }
            );
        }

        if (!pdf_url) {
            return NextResponse.json(
                { success: false, error: 'PDF URL is required' },
                { status: 400 }
            );
        }

        // Validate PDF file extension
        if (!pdf_url.toLowerCase().endsWith('.pdf')) {
            return NextResponse.json(
                { success: false, error: 'File must be a PDF' },
                { status: 400 }
            );
        }

        // Insert new PDF record
        const result = await execute(
            'INSERT INTO placement_pdfs (year, title, pdf_url) VALUES (?, ?, ?)',
            [year.trim(), title?.trim() || null, pdf_url]
        );

        return NextResponse.json(
            {
                success: true,
                message: 'Placement PDF added successfully',
                id: result.insertId
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating placement PDF:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create placement PDF' },
            { status: 500 }
        );
    }
}

// PUT: Update placement PDF
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, year, title, pdf_url } = body;

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

        if (year !== undefined) {
            if (year.trim() === '') {
                return NextResponse.json(
                    { success: false, error: 'Year cannot be empty' },
                    { status: 400 }
                );
            }
            updates.push('year = ?');
            values.push(year.trim());
        }

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title?.trim() || null);
        }

        if (pdf_url !== undefined) {
            // Validate PDF file extension if updating URL
            if (!pdf_url.toLowerCase().endsWith('.pdf')) {
                return NextResponse.json(
                    { success: false, error: 'File must be a PDF' },
                    { status: 400 }
                );
            }
            updates.push('pdf_url = ?');
            values.push(pdf_url);
        }

        if (updates.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No fields to update' },
                { status: 400 }
            );
        }

        values.push(id);

        const updateQuery = `UPDATE placement_pdfs SET ${updates.join(', ')} WHERE id = ?`;
        await execute(updateQuery, values);

        return NextResponse.json(
            { success: true, message: 'Placement PDF updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating placement PDF:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update placement PDF' },
            { status: 500 }
        );
    }
}

// DELETE: Delete placement PDF
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

        await execute('DELETE FROM placement_pdfs WHERE id = ?', [id]);

        return NextResponse.json(
            { success: true, message: 'Placement PDF deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting placement PDF:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete placement PDF' },
            { status: 500 }
        );
    }
}
