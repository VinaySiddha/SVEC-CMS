import { NextRequest, NextResponse } from 'next/server';
import { query, getPool, resetPool, execute } from '@/lib/db';
import mysql from 'mysql2/promise';
import { findUserByUsernameOrEmail, createPasswordReset, updateResetWithProposedPassword, createPasswordResetApproval } from '@/lib/db/password-resets';

/**
 * Test endpoint to verify database connectivity
 * @route GET /api/test-db
 */
export async function GET(req: NextRequest) {
  // Get URL parameters
  const url = new URL(req.url);
  const action = url.searchParams.get('action');
  const username = url.searchParams.get('username') || 'admin';
  
  // Force recreate the pool to ensure we're using the latest configuration
  resetPool();
  
  // If we're testing password reset flow
  if (action === 'test-password-reset') {
    try {
      // Test password reset flow
      const testUser = await findUserByUsernameOrEmail(username);
      
      if (!testUser) {
        return NextResponse.json(
          { error: `Test user '${username}' not found. Create a user first.` },
          { status: 404 }
        );
      }
      
      // Create a password reset request
      const resetRecord = await createPasswordReset(testUser.id);
      
      // Update with a new password
      const updated = await updateResetWithProposedPassword(resetRecord.id, 'NewPassword123');
      
      // Create admin approval request
      const approvalId = await createPasswordResetApproval(resetRecord.id, 'Test approval request');
      
      return NextResponse.json({
        success: true,
        message: 'Password reset test flow completed',
        userId: testUser.id,
        resetId: resetRecord.id,
        token: resetRecord.token,
        resetUpdated: updated,
        approvalId
      });
    } catch (error) {
      console.error('Password reset test error:', error);
      return NextResponse.json(
        { error: 'Password reset test failed', details: (error as Error).message },
        { status: 500 }
      );
    }
  }
  
  try {
    console.log('Testing database connection to college_portal...');
    
    // First try a direct connection to validate we can reach the database
    const directConfig = {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: 'college_portal',
      port: Number(process.env.MYSQL_PORT) || 3306
    };
    
    // Try a direct connection
    const conn = await mysql.createConnection(directConfig);
    const [directResult] = await conn.execute('SELECT 1 as ok, DATABASE() as db_name');
    await conn.end();
    
    // If we got here, direct connection worked - now try using the pool
    const results = await query<{ ok: number, db_name: string, tables: number }>(`
      SELECT 
        1 as ok,
        DATABASE() as db_name,
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE()) as tables
    `);
    
    // Return the successful result
    return NextResponse.json({
      ...results[0],
      connected: true,
      directTest: directResult,
      environment: process.env.NODE_ENV,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database test error:', error);
    
    // For development - provide a mock response if DB isn't set up yet
    if (process.env.NODE_ENV === 'development') {
      console.log('Running in development mode - returning mock response');
      
      return NextResponse.json({ 
        ok: 1, 
        mock: true,
        connected: false,
        environment: process.env.NODE_ENV,
        dbConfig: {
          host: process.env.MYSQL_HOST || 'localhost',
          user: process.env.MYSQL_USER || 'root',
          database: 'college_portal',
          port: Number(process.env.MYSQL_PORT) || 3306
        },
        message: 'Database not connected. This is a mock response for development.',
        error: (error as any).sqlMessage || (error as Error).message
      });
    }
    
    return NextResponse.json(
      { error: 'Database connection failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
