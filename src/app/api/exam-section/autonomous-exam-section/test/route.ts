import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: NextRequest) {
  try {

    // Test 1: Check if table exists
    const tableCheck = await db.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME = 'autonomous_exam_section'`
    );
    const tableExists = (Array.isArray(tableCheck) && tableCheck[0]?.length > 0) || 
                       (tableCheck && typeof tableCheck === 'object' && tableCheck.length > 0);

    // Test 2: Get table structure
    const structure = await db.query('DESCRIBE autonomous_exam_section');
    const cols = Array.isArray(structure) ? structure[0] : structure;

    // Test 3: Count all records
    const countResult = await db.query('SELECT COUNT(*) as total FROM autonomous_exam_section');
    const countRows = Array.isArray(countResult) ? countResult[0] : countResult;

    // Test 4: Get active records (non-deleted)
    const allRecords = await db.query(
      'SELECT * FROM autonomous_exam_section WHERE deleted_at IS NULL OR deleted_at = "0000-00-00 00:00:00" LIMIT 5'
    );
    const records = Array.isArray(allRecords) ? allRecords[0] : allRecords;

    // Test 5: Get all records including deleted
    const allWithDeleted = await db.query(
      'SELECT *, IF(deleted_at IS NULL OR deleted_at = "0000-00-00 00:00:00", "ACTIVE", "DELETED") as status FROM autonomous_exam_section LIMIT 5'
    );
    const withDeletedRows = Array.isArray(allWithDeleted) ? allWithDeleted[0] : allWithDeleted;

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
    return NextResponse.json({
      error: 'Test failed',
      details: String(error)
    }, { status: 500 });
  }
}
