/**
 * Test Image Compression API Endpoint
 * 
 * Simple test endpoint to verify image processing functionality
 */

import { NextRequest, NextResponse } from 'next/server';
import { processImage, validateImageFile, formatFileSize, getOptimalFormat } from '@/lib/imageProcessor';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: 'No image file provided' },
        { status: 400 }
      );
    }

    console.log(`\n=== Image Processing Test ===`);
    console.log(`File: ${imageFile.name}`);
    console.log(`Type: ${imageFile.type}`);
    console.log(`Original size: ${formatFileSize(imageFile.size)}`);

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

    console.log(`Processing with format: ${outputFormat}`);

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
    console.log(`Dimensions: ${processedImage.dimensions.width}x${processedImage.dimensions.height}`);
    console.log(`Filename: ${processedImage.filename}`);
    console.log(`=== Processing Complete ===\n`);

    // Return processed image as base64 for testing
    const base64Image = processedImage.buffer.toString('base64');
    const dataUrl = `data:image/${outputFormat};base64,${base64Image}`;

    return NextResponse.json({
      success: true,
      message: 'Image processed successfully',
      originalInfo: {
        name: imageFile.name,
        type: imageFile.type,
        size: formatFileSize(imageFile.size),
        sizeBytes: imageFile.size
      },
      processedInfo: {
        filename: processedImage.filename,
        size: formatFileSize(processedImage.compressedSize),
        sizeBytes: processedImage.compressedSize,
        compressionRatio: `${processedImage.compressionRatio.toFixed(1)}%`,
        dimensions: `${processedImage.dimensions.width}x${processedImage.dimensions.height}`,
        format: outputFormat
      },
      dataUrl // For preview purposes only
    });
  } catch (error) {
    console.error('Image processing test error:', error);
    return NextResponse.json(
      { success: false, message: 'Image processing failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}