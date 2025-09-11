import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { saveFile, generateUniqueFileName } from '@/lib/file-upload';

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * @route GET /api/departments/[deptId]/placements
 * @desc Get all placements for a department
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const { deptId } = params;
    
    // Get placements data
    const [placementsRows] = await db.query(
      'SELECT * FROM placements WHERE dept = ? ORDER BY academic_year DESC',
      [deptId]
    );
    
    // Get gallery images
    const [galleryRows] = await db.query(
      'SELECT * FROM placement_gallery WHERE dept = ?',
      [deptId]
    );
    
    return NextResponse.json({
      placements: placementsRows,
      gallery: galleryRows
    });
  } catch (error) {
    console.error('Error fetching placements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch placements data' },
      { status: 500 }
    );
  }
}

/**
 * @route POST /api/departments/[deptId]/placements
 * @desc Add new placement stats for a department
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Add authentication as needed for production
    // This is a simplified version for development
    
    const { deptId } = params;
    const formData = await request.formData();
    
    // Extract data from form
    const academicYear = formData.get('academicYear') as string;
    const totalOffers = parseInt(formData.get('totalOffers') as string, 10);
    const highestPackage = parseFloat(formData.get('highestPackage') as string);
    const averagePackage = parseFloat(formData.get('averagePackage') as string);
    
    let reportUrl = null;
    const reportFile = formData.get('report') as File | null;
    
    // Handle file upload if provided
    if (reportFile && reportFile.size > 0) {
      const fileName = generateUniqueFileName(`${deptId}_report`, reportFile.name);
      reportUrl = await saveFile(reportFile, 'uploads/placements', fileName);
    }
    
    // Insert placement data into database
    const [result] = await db.query(
      `INSERT INTO placements (dept, academic_year, total_offers, highest_package, average_package, report_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [deptId, academicYear, totalOffers, highestPackage, averagePackage, reportUrl]
    );
    
    // Use the result's OkPacket structure (MySQL2 specific)
    const insertId = result && Array.isArray(result) && result.length > 0 
      ? (result as any)[0]?.insertId 
      : 0;
    
    return NextResponse.json({
      message: 'Placement stats added successfully',
      id: insertId
    });
  } catch (error) {
    console.error('Error adding placement stats:', error);
    return NextResponse.json(
      { error: 'Failed to add placement stats' },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/departments/[deptId]/placements
 * @desc Delete a placement entry
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    // Add authentication as needed for production
    // This is a simplified version for development
    
    const { deptId } = params;
    const { id } = await request.json();
    
    // Delete the placement entry
    await db.query('DELETE FROM placements WHERE id = ? AND dept = ?', [id, deptId]);
    
    return NextResponse.json({ message: 'Placement entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting placement entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete placement entry' },
      { status: 500 }
    );
  }
}
