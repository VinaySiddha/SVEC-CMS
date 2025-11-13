import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { processImage, saveImageBuffer, validateImageFile, formatFileSize, getOptimalFormat } from '@/lib/imageProcessor';
import path from 'path';

// GET: Fetch placement gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('dept') || 'placement';

    let sql = `
      SELECT id, dept, title, image_url, caption, created_at, updated_at
      FROM placement_gallery 
      WHERE dept = ?
      ORDER BY created_at DESC
    `;
    const params = [department];

    const galleryItems = await query(sql, params);

    return NextResponse.json({
      success: true,
      data: galleryItems
    });
  } catch (error) {
    console.error('Error fetching placement gallery:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch placement gallery' },
      { status: 500 }
    );
  }
}

// POST: Add new placement gallery image with automatic compression
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const caption = formData.get('caption') as string || '';
    const dept = formData.get('dept') as string || 'placement';
    const imageFile = formData.get('image') as File;

    if (!title || !imageFile) {
      return NextResponse.json(
        { success: false, message: 'Title and image are required' },
        { status: 400 }
      );
    }

    // Validate image file
    const validation = validateImageFile(imageFile);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await imageFile.arrayBuffer();
    const originalBuffer = Buffer.from(bytes);

    // Determine optimal format
    const hasTransparency = imageFile.type === 'image/png';
    const outputFormat = getOptimalFormat(imageFile.type, hasTransparency);

    console.log(`Processing image: ${imageFile.name}`);
    console.log(`Original size: ${formatFileSize(originalBuffer.length)}`);
    console.log(`Output format: ${outputFormat}`);

    // Process image (resize to 1920x700 and compress to ~300KB)
    const processedImage = await processImage(originalBuffer, imageFile.name, {
      width: 1920,
      height: 700,
      quality: 85,
      maxFileSize: 300, // 300KB target
      format: outputFormat
    });

    console.log(`Compressed size: ${formatFileSize(processedImage.compressedSize)}`);
    console.log(`Compression ratio: ${processedImage.compressionRatio.toFixed(1)}%`);

    // Create upload directory and save processed image
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'placement-gallery');
    const filePath = path.join(uploadDir, processedImage.filename);
    
    await saveImageBuffer(processedImage.buffer, filePath);

    // Save to database with processed image info
    const imageUrl = `/uploads/placement-gallery/${processedImage.filename}`;
    const insertSql = `
      INSERT INTO placement_gallery (dept, title, image_url, caption, created_at, updated_at)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
    const insertParams = [dept, title, imageUrl, caption];

    const result = await query(insertSql, insertParams) as any;

    return NextResponse.json({
      success: true,
      message: 'Gallery image added and compressed successfully',
      data: {
        id: result.insertId || Date.now(),
        dept,
        title,
        image_url: imageUrl,
        caption
      },
      processingInfo: {
        originalSize: formatFileSize(processedImage.originalSize),
        compressedSize: formatFileSize(processedImage.compressedSize),
        compressionRatio: `${processedImage.compressionRatio.toFixed(1)}%`,
        dimensions: `${processedImage.dimensions.width}x${processedImage.dimensions.height}`,
        format: outputFormat
      }
    });
  } catch (error) {
    console.error('Error adding placement gallery image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add gallery image' },
      { status: 500 }
    );
  }
}