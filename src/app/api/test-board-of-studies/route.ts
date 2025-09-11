import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { migrate } from '@/migrations/002-create-board-of-studies';

/**
 * Test endpoint to set up the Board of Studies table and add sample data
 * @route GET /api/test-board-of-studies
 */
export async function GET(req: NextRequest) {
  try {
    // Check if board_of_studies table exists
    const tables = await query(`
      SELECT TABLE_NAME 
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND TABLE_NAME = 'board_of_studies'
    `);
    
    let tableExists = false;
    if (Array.isArray(tables) && tables.length > 0) {
      tableExists = true;
    }

    // Run migration if table doesn't exist
    let migrationResult = null;
    if (!tableExists) {
      migrationResult = await migrate();
    }
    
    // Insert sample data if requested
    const insertSample = req.nextUrl.searchParams.get('sample') === 'true';
    let sampleData = null;
    
    if (insertSample) {
      // Check if we already have sample data
      const existingDocs = await query('SELECT COUNT(*) as count FROM board_of_studies');
      const count = Array.isArray(existingDocs) && existingDocs.length > 0 
        ? (existingDocs[0] as {count: number}).count 
        : 0;
      
      if (count < 3) {
        // Insert sample board of studies documents
        const departments = ['cse', 'ece', 'eee', 'civil', 'mech'];
        const academicYears = ['2023-24', '2024-25', '2025-26'];
        
        for (let i = 0; i < 5; i++) {
          const dept = departments[i % departments.length];
          const academicYear = academicYears[i % academicYears.length];
          
          await query(`
            INSERT INTO board_of_studies (dept, description, academic_year, status)
            VALUES (?, ?, ?, ?)
          `, [
            dept,
            `This is a sample Board of Studies document for the ${dept.toUpperCase()} department for the academic year ${academicYear}. It contains curriculum updates, syllabus changes, and new course proposals.`,
            academicYear,
            i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected'
          ]);
        }
        
        sampleData = 'Sample data created successfully';
      } else {
        sampleData = 'Sample data already exists';
      }
    }
    
    // Get all board of studies documents
    const documents = await query('SELECT * FROM board_of_studies LIMIT 5');
    
    return NextResponse.json({
      success: true,
      message: 'Board of Studies setup completed successfully',
      tableExists,
      migrationResult,
      sampleData,
      sampleDocuments: documents
    });
    
  } catch (error: any) {
    console.error('Board of Studies setup error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Board of Studies setup failed'
    }, { status: 500 });
  }
}
