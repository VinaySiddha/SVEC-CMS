import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB file size limit

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const degree = formData.get('degree') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type and size
    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    // Validate type and degree
    if (!type || !['syllabus', 'regulations', 'academic-calendar'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type' },
        { status: 400 }
      );
    }

    if (!degree || !['UG', 'PG'].includes(degree)) {
      return NextResponse.json(
        { error: 'Degree must be either UG or PG' },
        { status: 400 }
      );
    }

    // Create directory structure
    const baseDir = join(process.cwd(), 'public', 'rsac');
    const typeDir = join(baseDir, type);
    const degreeDir = join(typeDir, degree);

    // Create directories if they don't exist
    for (const dir of [baseDir, typeDir, degreeDir]) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${type}_${degree}_${timestamp}_${randomString}.pdf`;
    const filePath = join(degreeDir, fileName);

    // Save the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/rsac/${type}/${degree}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'File uploaded successfully',
      fileSize: Math.round(file.size / 1024) // KB
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}