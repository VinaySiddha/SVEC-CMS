import { NextResponse } from 'next/server';
import { migrateRegulationsTable } from '@/lib/migrations/regulations';

/**
 * POST /api/admin/setup/regulations
 * Runs the regulations table migration
 */
export async function POST() {
  try {
    // Only allow in development or with admin auth
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Setup endpoint not available in production' },
        { status: 403 }
      );
    }

    const result = await migrateRegulationsTable();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Regulations table created successfully'
      });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Setup failed' },
      { status: 500 }
    );
  }
}
