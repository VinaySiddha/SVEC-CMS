import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB for images

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (20MB max for images)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size must not exceed 20MB' },
        { status: 400 }
      );
    }

    // Validate file type (only images)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Create directory if it doesn't exist
    const baseDir = join(process.cwd(), 'public', 'controller-of-examinations');
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop();
    const fileName = `controller_${timestamp}_${randomString}.${ext}`;
    const filePath = join(baseDir, fileName);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return public URL
    const publicUrl = `/controller-of-examinations/${fileName}`;
    
    return NextResponse.json({
      success: true,
      message: 'Photo uploaded successfully',
      url: publicUrl
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Error uploading photo' },
      { status: 500 }
    );
  }
}
