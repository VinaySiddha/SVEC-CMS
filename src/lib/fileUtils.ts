import { unlink } from 'fs/promises';
import { join } from 'path';

/**
 * Delete a file from the public/uploads directory
 * @param filePath - The file path relative to public/uploads (e.g., 'placement_events/circular/file.pdf')
 */
export async function deleteUploadedFile(filePath: string | undefined | null): Promise<boolean> {
  if (!filePath) {
    return false;
  }

  try {
    // Construct the full file path
    const fullPath = join(process.cwd(), 'public', 'uploads', filePath);
    
    // Security check: ensure the path is within the uploads directory
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!fullPath.startsWith(uploadsDir)) {
      console.warn(`Security: Attempted to delete file outside uploads directory: ${fullPath}`);
      return false;
    }

    // Delete the file
    await unlink(fullPath);
    console.log(`File deleted successfully: ${filePath}`);
    return true;
  } catch (error: any) {
    // It's okay if the file doesn't exist
    if (error.code === 'ENOENT') {
      console.log(`File not found (already deleted): ${filePath}`);
      return true;
    }
    console.error(`Error deleting file ${filePath}:`, error);
    return false;
  }
}

/**
 * Delete multiple files
 * @param filePaths - Array of file paths to delete
 */
export async function deleteMultipleFiles(filePaths: (string | undefined | null)[]): Promise<boolean> {
  const results = await Promise.all(
    filePaths.filter(Boolean).map(path => deleteUploadedFile(path))
  );
  return results.every(result => result);
}
