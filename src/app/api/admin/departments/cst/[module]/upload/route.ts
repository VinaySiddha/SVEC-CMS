import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { deleteFile, extractFilePathFromUrl } from '@/utils/file-management';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

// Verify user authentication and CST access
async function verifyCSTAccess(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.substring(7);
  const user = verifyToken(token);
  
  if (!user) {
    return { error: 'Invalid token', status: 401 };
  }

  // Allow super admin or CST department admin
  if (user.role === 'super_admin' || 
      (user.role === 'dept' && user.department === 'cst') ||
      user.role === 'admin') {
    return { user };
  }

  return { error: 'Insufficient permissions', status: 403 };
}

// Ensure upload directory exists
async function ensureUploadDir(moduleName: string) {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cst', moduleName);
  try {
    await mkdir(uploadDir, { recursive: true });
    return uploadDir;
  } catch (error) {
    throw new Error('Failed to create upload directory');
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ module: string }> }
) {
  try {
    // Verify authentication
    const authResult = await verifyCSTAccess(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { module } = await params;
    
    if (!module) {
      return NextResponse.json({ error: 'Module parameter is required' }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (PDF, images, or documents)
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'File type not allowed. Supported: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX' 
      }, { status: 400 });
    }

    // Validate file size (1MB maximum)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size exceeds 1MB limit. Current size: ${Math.round(file.size / 1024)}KB` 
      }, { status: 400 });
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'pdf';

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `cst-${module}-${timestamp}-${originalName}`;

    // Ensure upload directory exists
    const uploadDir = await ensureUploadDir(module);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/cst/${module}/${filename}`;
    const fileSizeKB = Math.round(file.size / 1024);

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        filename,
        size: fileSizeKB,
        originalName: file.name,
        type: file.type
      },
      message: `File uploaded successfully (${fileSizeKB}KB)`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}