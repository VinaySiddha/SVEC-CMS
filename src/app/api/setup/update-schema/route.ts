import { NextRequest, NextResponse } from 'next/server';
import { execute } from '@/lib/db';

/**
 * API endpoint to update the database schema
 * GET /api/setup/update-schema
 */
export async function GET(req: NextRequest) {
  try {
    // Add necessary columns to password_resets table
    const result1 = await execute(`
      ALTER TABLE password_resets 
      ADD COLUMN IF NOT EXISTS proposed_hash VARCHAR(255) NULL AFTER token,
      ADD COLUMN IF NOT EXISTS status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending' AFTER proposed_hash
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Schema updated successfully',
      alterTableResult: result1
    });
  } catch (error) {
    console.error('Error updating schema:', error);
    return NextResponse.json(
      { error: 'Failed to update schema', details: (error as Error).message },
      { status: 500 }
    );
  }
}
