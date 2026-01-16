import { unlink } from 'fs/promises';
import { join } from 'path';

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

/**
 * Delete a file from the uploads directory
 * @param filePath - The file path relative to uploads (e.g., 'placement_events/circular/file.pdf')
 */
export async function deleteUploadedFile(filePath: string | undefined | null): Promise<boolean> {
  if (!filePath) {
    return false;
  }

  try {
    // Get the base upload directory
    const uploadsDir = getUploadBaseDir();

    // Construct the full file path
    const fullPath = join(uploadsDir, filePath);

    // Security check: ensure the path is within the uploads directory
    if (!fullPath.startsWith(uploadsDir)) {
      return false;
    }

    // Delete the file
    await unlink(fullPath);
    return true;
  } catch (error: any) {
    // It's okay if the file doesn't exist
    if (error.code === 'ENOENT') {
      return true;
    }
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
