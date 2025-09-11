import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { migrate } from '@/migrations/001-create-faculty-profiles';

/**
 * Test endpoint to run migrations and add sample data
 * @route GET /api/test-migrate
 */
export async function GET(req: NextRequest) {
  try {
    // Check if faculty_profiles table exists
    const tables = await query(`
      SELECT TABLE_NAME 
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND TABLE_NAME = 'faculty_profiles'
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
      const existingProfiles = await query('SELECT COUNT(*) as count FROM faculty_profiles');
      const count = Array.isArray(existingProfiles) && existingProfiles.length > 0 
        ? (existingProfiles[0] as {count: number}).count 
        : 0;
      
      if (count < 5) {
        // Insert sample faculty profiles
        const departments = ['cse', 'ece', 'eee', 'civil', 'mech'];
        const qualifications = ['Ph.D', 'M.Tech', 'M.E', 'B.Tech'];
        const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'HOD'];
        
        for (let i = 0; i < 10; i++) {
          const dept = departments[Math.floor(Math.random() * departments.length)];
          const qualification = qualifications[Math.floor(Math.random() * qualifications.length)];
          const designation = designations[Math.floor(Math.random() * designations.length)];
          
          await query(`
            INSERT INTO faculty_profiles (dept, name, qualification, designation, status)
            VALUES (?, ?, ?, ?, ?)
          `, [
            dept,
            `Test Faculty ${i + 1}`,
            qualification,
            designation,
            i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected'
          ]);
        }
        
        sampleData = 'Sample data created successfully';
      } else {
        sampleData = 'Sample data already exists';
      }
    }
    
    // Get all faculty profiles
    const profiles = await query('SELECT * FROM faculty_profiles LIMIT 5');
    
    return NextResponse.json({
      success: true,
      message: 'Migration test completed successfully',
      tableExists,
      migrationResult,
      sampleData,
      sampleProfiles: profiles
    });
    
  } catch (error: any) {
    console.error('Migration test error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Migration test failed'
    }, { status: 500 });
  }
}
