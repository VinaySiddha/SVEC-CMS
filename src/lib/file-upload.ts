import { writeFile } from 'fs/promises';
import path from 'path';

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
  return path.join(process.cwd(), 'public', 'uploads');
};

/**
 * Save a file to the server's file system
 * @param file The file from FormData
 * @param destinationFolder The folder to save the file in (relative to uploads base)
 * @param fileName Optional custom filename (default: use original filename)
 * @returns The URL path to access the file
 */
export async function saveFile(
  file: File,
  destinationFolder: string,
  fileName?: string
): Promise<string> {
  try {
    // Create a buffer from the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get the file extension
    const originalFileName = file.name;
    const extension = path.extname(originalFileName);

    // Use provided filename or generate one
    const finalFileName = fileName
      ? (fileName.includes('.') ? fileName : `${fileName}${extension}`)
      : originalFileName;

    // Ensure the destination directory exists
    const baseDir = getUploadBaseDir();
    const fullDestinationPath = path.join(baseDir, destinationFolder);

    // Create directories if they don't exist
    await createDirectoryIfNotExists(fullDestinationPath);

    // Full path to save the file
    const filePath = path.join(fullDestinationPath, finalFileName);

    // Write the file to disk
    await writeFile(filePath, buffer);

    // Return the public URL path
    return `/uploads/${path.join(destinationFolder, finalFileName).replace(/\\/g, '/')}`;
  } catch (error) {
    throw new Error('Failed to save file');
  }
}

/**
 * Utility to create a directory if it doesn't exist
 * @param dirPath Directory path
 */
async function createDirectoryIfNotExists(dirPath: string): Promise<void> {
  const fs = require('fs/promises');
  try {
    await fs.access(dirPath);
  } catch (error) {
    // Directory doesn't exist, create it recursively
    await fs.mkdir(dirPath, { recursive: true });
  }
}

/**
 * Generate a unique filename for uploads
 * @param prefix Prefix for the filename
 * @param originalName Original file name
 * @returns A unique filename
 */
export function generateUniqueFileName(prefix: string, originalName: string): string {
  const timestamp = Date.now();
  const extension = path.extname(originalName);
  const cleanedName = path.basename(originalName, extension)
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase();
  
  return `${prefix}_${timestamp}_${cleanedName}${extension}`;
}
