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
 * @route POST /api/departments/[deptId]/placement-gallery
 * @desc Add new images to placement gallery
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
    
    const title = formData.get('title') as string;
    const caption = formData.get('caption') as string;
    const image = formData.get('image') as File | null;
    
    if (!image || image.size === 0) {
      return NextResponse.json(
        { error: 'Image is required' },
        { status: 400 }
      );
    }
    
    // Save the image file
    const fileName = generateUniqueFileName(`${deptId}_gallery`, image.name);
    const imageUrl = await saveFile(image, 'uploads/placement-gallery', fileName);
    
    // Insert gallery data into database
    const [result] = await db.query(
      `INSERT INTO placement_gallery (dept, title, image_url, caption) 
       VALUES (?, ?, ?, ?)`,
      [deptId, title, imageUrl, caption]
    );
    
    // Use the result's OkPacket structure (MySQL2 specific)
    const insertId = result && Array.isArray(result) && result.length > 0 
      ? (result as any)[0]?.insertId 
      : 0;
    
    return NextResponse.json({
      message: 'Gallery image added successfully',
      id: insertId
    });
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to add gallery image' },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/departments/[deptId]/placement-gallery
 * @desc Delete an image from placement gallery
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
    
    // Delete the gallery entry
    await db.query('DELETE FROM placement_gallery WHERE id = ? AND dept = ?', [id, deptId]);
    
    return NextResponse.json({ message: 'Gallery image deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
