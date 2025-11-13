import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { verifyToken } from '@/lib/auth/auth';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'cst', 'bos-minutes');

// Ensure upload directory exists
async function ensureUploadDir() {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore error
  }
}

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

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await verifyCSTAccess(request);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type (only PDF allowed)
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ 
        error: 'Only PDF files are allowed' 
      }, { status: 400 });
    }

    // Validate file size (1MB maximum)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File size exceeds 1MB limit. Current size: ${Math.round(file.size / 1024)}KB` 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `cst-bos-minutes-${timestamp}-${originalName}`;

    // Ensure upload directory exists
    await ensureUploadDir();

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/cst/bos-minutes/${filename}`;
    const fileSizeKB = Math.round(file.size / 1024);

    return NextResponse.json({
      success: true,
      data: {
        url: publicUrl,
        filename,
        size: fileSizeKB,
        originalName: file.name
      },
      message: `PDF uploaded successfully (${fileSizeKB}KB)`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Failed to upload file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}