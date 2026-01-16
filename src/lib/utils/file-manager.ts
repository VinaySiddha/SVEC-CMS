import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ALLOWED_TYPES = ['application/pdf'];

export interface FileUploadOptions {
  file: File;
  type: 'UG' | 'PG';
  section: 'syllabus' | 'regulations' | 'academic-calendars';
}

export async function handleFileUpload({ file, type, section }: FileUploadOptions) {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 1MB');
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Only PDF files are allowed');
    }

    // Create directory path
    const baseDir = join(process.cwd(), 'public', section, type);
    
    // Ensure directories exist
    if (!existsSync(baseDir)) {
      await mkdir(baseDir, { recursive: true });
    }

    // Generate unique filename with timestamp and random string
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${section}_${timestamp}_${randomString}.pdf`;
    const filePath = join(baseDir, fileName);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Return the public URL
    return {
      success: true,
      url: `/${section}/${type}/${fileName}`,
      fileName
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
}

export async function deleteFile(url: string) {
  try {
    const filePath = join(process.cwd(), 'public', url);
    if (existsSync(filePath)) {
      await unlink(filePath);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}