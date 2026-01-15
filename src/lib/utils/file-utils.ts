import { unlink } from 'fs/promises';
import { join } from 'path';

export async function deleteFile(filePath: string) {
    try {
        // Remove the leading slash and 'public' from the path
        const cleanPath = filePath.replace(/^\//, '');
        const fullPath = join(process.cwd(), 'public', cleanPath);
        await unlink(fullPath);
        return true;
    } catch (error) {
        console.error('Error deleting file:', error);
        return false;
    }
}