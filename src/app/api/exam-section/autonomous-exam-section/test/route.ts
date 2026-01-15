import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('=== Testing autonomous_exam_section endpoint ===');

    // Test 1: Check if table exists
    console.log('\n✅ Test 1: Checking table existence...');
    const tableCheck = await db.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'autonomous_exam_section'`
    );
    const tableExists = (Array.isArray(tableCheck) && tableCheck[0]?.length > 0) || 
                       (tableCheck && typeof tableCheck === 'object' && tableCheck.length > 0);
    console.log('Table exists:', tableExists);

    // Test 2: Get table structure
    console.log('\n✅ Test 2: Getting table structure...');
    const structure = await db.query('DESCRIBE autonomous_exam_section');
    const cols = Array.isArray(structure) ? structure[0] : structure;
    console.log('Columns:', cols);

    // Test 3: Count all records
    console.log('\n✅ Test 3: Counting records...');
    const countResult = await db.query('SELECT COUNT(*) as total FROM autonomous_exam_section');
    const countRows = Array.isArray(countResult) ? countResult[0] : countResult;
    console.log('Total records:', countRows);

    // Test 4: Get active records (non-deleted)
    console.log('\n✅ Test 4: Fetching active records...');
    const allRecords = await db.query(
      'SELECT * FROM autonomous_exam_section WHERE deleted_at IS NULL OR deleted_at = "0000-00-00 00:00:00" LIMIT 5'
    );
    const records = Array.isArray(allRecords) ? allRecords[0] : allRecords;
    console.log('Active records (first 5):', records);

    // Test 5: Get all records including deleted
    console.log('\n✅ Test 5: All records (including deleted)...');
    const allWithDeleted = await db.query(
      'SELECT *, IF(deleted_at IS NULL OR deleted_at = "0000-00-00 00:00:00", "ACTIVE", "DELETED") as status FROM autonomous_exam_section LIMIT 5'
    );
    const withDeletedRows = Array.isArray(allWithDeleted) ? allWithDeleted[0] : allWithDeleted;
    console.log('All records with status (first 5):', withDeletedRows);

    return NextResponse.json({
      success: true,
      tests: {
        tableExists,
        columns: cols,
        totalRecords: countRows,
        activeRecords: records,
        allRecordsWithStatus: withDeletedRows
      }
    });
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: String(error)
    }, { status: 500 });
  }
}
