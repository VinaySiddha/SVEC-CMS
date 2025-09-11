import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { deptId: string; scholarshipId: string } }
) {
  try {
    const { deptId, scholarshipId } = params;
    
    // First, get the scholarship to find the file path
    const scholarships = await query<any>(
      `SELECT * FROM scholarships WHERE id = ? AND dept = ?`,
      [scholarshipId, deptId]
    );
    
    if (scholarships.length === 0) {
      return NextResponse.json(
        { error: 'Scholarship not found' },
        { status: 404 }
      );
    }
    
    // Delete the file if it exists
    const scholarship = scholarships[0];
    if (scholarship.proof_url) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'scholarships', scholarship.proof_url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error('Error deleting scholarship proof file:', fileError);
        // Continue with deleting the database record even if file deletion fails
      }
    }
    
    // Delete the scholarship record from the database
    await query(
      `DELETE FROM scholarships WHERE id = ? AND dept = ?`,
      [scholarshipId, deptId]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    return NextResponse.json(
      { error: 'Failed to delete scholarship' },
      { status: 500 }
    );
  }
}
