import fs from 'fs';
import path from 'path';

interface FileInfo {
  filePath: string;
  originalName: string;
}

export class FileManager {
  private static uploadDir = path.join(process.cwd(), 'public', 'uploads');

  /**
   * Delete a file from the server
   */
  static deleteFile(fileUrl: string): boolean {
    try {
      if (!fileUrl) return true;
      
      // Extract filename from URL (handle both relative and absolute URLs)
      let filename = fileUrl;
      if (fileUrl.includes('/uploads/')) {
        filename = fileUrl.split('/uploads/')[1];
      }
      
      const fullPath = path.join(this.uploadDir, filename);
      
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        console.log(`File deleted: ${fullPath}`);
        return true;
      }
      
      return true; // File doesn't exist, consider it "deleted"
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * Delete multiple files
   */
  static deleteFiles(fileUrls: string[]): boolean {
    if (!fileUrls || fileUrls.length === 0) return true;
    
    let allDeleted = true;
    for (const fileUrl of fileUrls) {
      if (!this.deleteFile(fileUrl)) {
        allDeleted = false;
      }
    }
    return allDeleted;
  }

  /**
   * Replace an existing file with a new one
   */
  static replaceFile(oldFileUrl: string, newFileUrl: string): boolean {
    try {
      // Delete the old file
      this.deleteFile(oldFileUrl);
      return true;
    } catch (error) {
      console.error('Error replacing file:', error);
      return false;
    }
  }

  /**
   * Extract file URLs from a record object
   */
  static extractFileUrls(record: any): string[] {
    const fileUrls: string[] = [];
    
    // Common file URL fields
    const fileFields = [
      'file_url', 'fileUrl', 'document_url', 'documentUrl',
      'image_url', 'imageUrl', 'profile_url', 'profileUrl',
      'pdf_url', 'pdfUrl', 'attachment_url', 'attachmentUrl'
    ];
    
    for (const field of fileFields) {
      if (record[field] && typeof record[field] === 'string') {
        fileUrls.push(record[field]);
      }
    }
    
    // Handle gallery arrays
    if (record.gallery && Array.isArray(record.gallery)) {
      fileUrls.push(...record.gallery.filter(url => typeof url === 'string'));
    }
    
    // Handle JSON fields that might contain file URLs
    if (record.lab_details && typeof record.lab_details === 'string') {
      try {
        const labDetails = JSON.parse(record.lab_details);
        if (Array.isArray(labDetails)) {
          labDetails.forEach(lab => {
            if (lab.image_url) fileUrls.push(lab.image_url);
            if (lab.file_url) fileUrls.push(lab.file_url);
          });
        }
      } catch (e) {
        // Ignore JSON parse errors
      }
    }
    
    return fileUrls.filter(url => url && url.trim() !== '');
  }

  /**
   * Clean up files associated with a database record
   */
  static cleanupRecordFiles(record: any): boolean {
    const fileUrls = this.extractFileUrls(record);
    return this.deleteFiles(fileUrls);
  }

  /**
   * Ensure upload directory exists
   */
  static ensureUploadDir(): void {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }
}

export default FileManager;