import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, access } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { deleteRecordFiles, validateFileSize, isFileUrlField } from '@/utils/file-management';

/**
 * Get upload directory from environment variable or use default
 * For production VPS: /var/www/uploads
 * For local dev: project_dir/public/uploads
 */
const getUploadBaseDir = (): string => {
  const envUploadDir = process.env.UPLOAD_DIR;
  if (envUploadDir) {
    return envUploadDir;
  }
  // Default to local development path
  return join(process.cwd(), 'public', 'uploads');
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string; module: string }> }
) {
  try {
    const { dept, module } = await params;

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file uploaded'
      }, { status: 400 });
    }

    // Check if this is a gallery upload by checking form data or module
    const isGalleryUpload = data.get('gallery') === 'true' || module === 'hackathons-gallery';
    const maxSize = isGalleryUpload ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for gallery, 5MB for others

    // Validate file size with appropriate limit
    if (!validateFileSize(file.size, maxSize)) {
      const maxSizeDisplay = isGalleryUpload ? '2MB' : '5MB';
      return NextResponse.json({
        success: false,
        error: `File size exceeds ${maxSizeDisplay} limit. Current size: ${Math.round(file.size / 1024)}KB`
      }, { status: 400 });
    }

    // Validate file type (only PDF for consistency)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid file type. Only PDF, JPG, PNG, WebP, DOC, DOCX files are allowed.'
      }, { status: 400 });
    }

    // Create department/section directory structure
    const uploadDir = join(getUploadBaseDir(), dept, module);
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
    }

    // Use original filename without timestamps
    const fileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = join(uploadDir, fileName);

    // Write file
    const bytes = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(bytes);

    // Check if this is an image and resize for gallery uploads
    const isImage = file.type.startsWith('image/');
    if (isImage && isGalleryUpload) {
      try {
        // Resize image to 400x300px for gallery with high quality
        const resizedBuffer = await sharp(buffer)
          .resize(400, 300, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 95 })
          .toBuffer();
        buffer = resizedBuffer;
      } catch (resizeError) {
        // Continue with original buffer if resize fails
      }
    }

    await writeFile(filePath, buffer);

    // Generate public URL
    const publicUrl = `/uploads/${dept}/${module}/${fileName}`;

    // Optional: If this is a replacement upload, delete the old file
    const existingUrl = data.get('existingUrl') as string;
    if (existingUrl) {
      try {
        // Extract the path after /uploads/
        const relativePath = existingUrl.replace('/uploads/', '');
        const oldFilePath = join(getUploadBaseDir(), relativePath);

        await access(oldFilePath);

        await unlink(oldFilePath);
      } catch (error) {
      }
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: publicUrl,
        filename: fileName,
        originalName: file.name,
        size: Math.round(file.size / 1024), // Size in KB
        type: file.type,
        department: dept,
        module: module
      }
    });

  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error during file upload',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}