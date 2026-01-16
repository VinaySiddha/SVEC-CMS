import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import path from 'path';
import fs from 'fs';

// GET: Get single gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = params;

    const sql = `
      SELECT id, dept, title, image_url, caption, created_at, updated_at
      FROM placement_gallery 
      WHERE id = ?
    `;
    const result = await query(sql, [id]);

    if (!result || (result as any[]).length === 0) {
      return NextResponse.json(
        { success: false, message: 'Gallery image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: (result as any[])[0]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
}

// PUT: Update gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const caption = formData.get('caption') as string || '';
    const dept = formData.get('dept') as string;
    const imageFile = formData.get('image') as File;

    if (!title) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      );
    }

    let updateSql = `
      UPDATE placement_gallery 
      SET title = ?, caption = ?, dept = ?, updated_at = NOW()
    `;
    let updateParams = [title, caption, dept];

    // Handle new image upload
    if (imageFile && imageFile.size > 0) {
      // Get old image for cleanup
      const oldImageResult = await query('SELECT image_url FROM placement_gallery WHERE id = ?', [id]);
      const oldImageUrl = (oldImageResult as any[])[0]?.image_url;

      // Create upload directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'placement-gallery');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExt = path.extname(imageFile.name);
      const fileName = `${timestamp}_${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${fileExt}`;
      const filePath = path.join(uploadDir, fileName);

      // Save new file
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      fs.writeFileSync(filePath, buffer);

      // Update SQL to include new image URL
      const imageUrl = `/uploads/placement-gallery/${fileName}`;
      updateSql += `, image_url = ?`;
      updateParams.push(imageUrl);

      // Delete old image file
      if (oldImageUrl && oldImageUrl.startsWith('/uploads/')) {
        const oldFilePath = path.join(process.cwd(), 'public', oldImageUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    updateSql += ` WHERE id = ?`;
    updateParams.push(id);

    await query(updateSql, updateParams);

    return NextResponse.json({
      success: true,
      message: 'Gallery image updated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

// DELETE: Delete gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = params;

    // Get image info for file cleanup
    const imageResult = await query('SELECT image_url FROM placement_gallery WHERE id = ?', [id]);
    const imageUrl = (imageResult as any[])[0]?.image_url;

    // Delete from database
    await query('DELETE FROM placement_gallery WHERE id = ?', [id]);

    // Delete image file
    if (imageUrl && imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}