import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import formidable from 'formidable';

// Configure allowed file types and their extensions
const ALLOWED_FILE_TYPES = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

// File storage utility
export const fileStorage = {
  /**
   * Save a file to the specified module directory
   * @param file The file to save
   * @param dept The department code
   * @param module The module name
   * @returns The public URL of the saved file
   */
  async saveFile(file: formidable.File, dept: string, module: string): Promise<string> {
    // Check if file type is allowed
    if (!file.mimetype || !(file.mimetype in ALLOWED_FILE_TYPES)) {
      throw new Error('File type not allowed');
    }

    const extension = ALLOWED_FILE_TYPES[file.mimetype as keyof typeof ALLOWED_FILE_TYPES];
    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomId = randomUUID().slice(0, 8);
    const fileName = `${datePrefix}-${randomId}.${extension}`;
    
    // Create the upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', dept, module);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, fileName);
    
    // Copy the file to the uploads directory
    await fs.promises.copyFile(file.filepath, filePath);
    
    // Return public URL
    return `/uploads/${dept}/${module}/${fileName}`;
  },
  
  /**
   * Delete a file from the uploads directory
   * @param url The public URL of the file to delete
   */
  async deleteFile(url: string): Promise<void> {
    if (!url || !url.startsWith('/uploads/')) return;
    
    const filePath = path.join(process.cwd(), 'public', url);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  },

  /**
   * Parse form data with file uploads
   * @param req The NextApiRequest object
   * @returns An object containing fields and files
   */
  parseFormData(req: any): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({
        maxFileSize: 10 * 1024 * 1024, // 10MB
      });
      
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  }
};
