import { promises as fs } from 'fs';
import path from 'path';

/**
 * Utility functions for automatic file management in CST admin operations
 */

// Common file URL field patterns to look for
const FILE_URL_PATTERNS = [
  'file_url',
  'document_url', 
  'pdf_url',
  'image_url',
  'attachment_url',
  'report_url',
  'certificate_url',
  'photo_url',
  'upload_url',
  'link_url',
  'gallery',
  // CamelCase patterns (for BSH modules and modern schemas)
  'fileUrl',
  'documentUrl',
  'pdfUrl',
  'imageUrl',
  'attachmentUrl',
  'reportUrl',
  'certificateUrl',
  'photoUrl',
  'uploadUrl',
  'linkUrl',
  // Generic camelCase
  'url'
];

/**
 * Check if a field name indicates it contains a file URL
 */
export function isFileUrlField(fieldName: string): boolean {
  const lowerFieldName = fieldName.toLowerCase();
  return FILE_URL_PATTERNS.some(pattern => {
    // Check exact match or if field name includes the pattern
    return lowerFieldName === pattern || lowerFieldName.includes(pattern);
  });
}

/**
 * Extract file path from a URL (relative to public directory)
 */
export function extractFilePathFromUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  // Handle local file paths (e.g., /uploads/cst/module/file.pdf)
  if (url.startsWith('/uploads/')) {
    return path.join(process.cwd(), 'public', url);
  }
  
  // Handle full URLs pointing to our uploads directory
  const uploadMatch = url.match(/\/uploads\/(.+)$/);
  if (uploadMatch) {
    return path.join(process.cwd(), 'public/uploads', uploadMatch[1]);
  }
  
  return null;
}

/**
 * Delete a file from the filesystem
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath); // Check if file exists
    await fs.unlink(filePath);
    console.log(`✅ Deleted file: ${filePath}`);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log(`ℹ️ File not found (may be already deleted): ${filePath}`);
    } else {
      console.error(`❌ Error deleting file ${filePath}:`, error);
    }
    return false;
  }
}

/**
 * Find and delete all files referenced in a database record
 */
export async function deleteRecordFiles(record: Record<string, any>): Promise<void> {
  const filesToDelete: string[] = [];
  
  // Find all file URL fields in the record
  Object.entries(record).forEach(([fieldName, fieldValue]) => {
    console.log(`[deleteRecordFiles] Checking field: ${fieldName}, isFileUrlField: ${isFileUrlField(fieldName)}, value: ${fieldValue}`);
    
    if (isFileUrlField(fieldName) && fieldValue) {
      const filePath = extractFilePathFromUrl(fieldValue);
      if (filePath) {
        console.log(`[deleteRecordFiles] Found file to delete: ${filePath}`);
        filesToDelete.push(filePath);
      }
    }
  });
  
  // Delete all found files
  if (filesToDelete.length > 0) {
    console.log(`🗑️ Deleting ${filesToDelete.length} file(s) for record:`, filesToDelete);
    
    const deletePromises = filesToDelete.map(filePath => deleteFile(filePath));
    await Promise.all(deletePromises);
  } else {
    console.log(`[deleteRecordFiles] No files found to delete for this record`);
  }
}

/**
 * Compare old and new record and delete files that are being replaced
 */
export async function deleteReplacedFiles(oldRecord: Record<string, any>, newRecord: Record<string, any>): Promise<void> {
  const filesToDelete: string[] = [];
  
  // Find file URL fields that have changed
  Object.entries(oldRecord).forEach(([fieldName, oldValue]) => {
    if (isFileUrlField(fieldName) && oldValue) {
      const newValue = newRecord[fieldName];
      
      // If the file URL has changed or is being removed, delete the old file
      if (oldValue !== newValue) {
        const filePath = extractFilePathFromUrl(oldValue);
        if (filePath) {
          filesToDelete.push(filePath);
        }
      }
    }
  });
  
  // Delete all replaced files
  if (filesToDelete.length > 0) {
    console.log(`🔄 Deleting ${filesToDelete.length} replaced file(s):`, filesToDelete);
    
    const deletePromises = filesToDelete.map(filePath => deleteFile(filePath));
    await Promise.all(deletePromises);
  }
}

/**
 * Validate file size (1MB = 1,048,576 bytes)
 */
export function validateFileSize(fileSize: number, maxSizeBytes: number = 1048576): boolean {
  return fileSize <= maxSizeBytes;
}

/**
 * Get file size limit error message
 */
export function getFileSizeErrorMessage(maxSizeBytes: number = 1048576): string {
  const maxSizeMB = (maxSizeBytes / 1048576).toFixed(1);
  return `File size exceeds the maximum limit of ${maxSizeMB}MB`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if file size is approaching the limit (>80% of 1MB)
 */
export function isFileSizeNearLimit(fileSize: number, maxSizeBytes: number = 1048576): boolean {
  return fileSize > (maxSizeBytes * 0.8);
}

/**
 * Convert ISO 8601 date strings to MySQL-compatible format
 * Converts ISO format (e.g., "2025-11-14T18:30:00.000Z") to MySQL format (e.g., "2025-11-14" or "2025-11-14 18:30:00")
 */
export function convertISODateToMySQLFormat(record: Record<string, any>): Record<string, any> {
  const converted = { ...record };
  
  // Common date field patterns in MySQL
  const dateFieldPatterns = [
    'date', 'time', '_at', 'created', 'updated', 'start', 'end', 'meeting', 'event'
  ];
  
  Object.entries(converted).forEach(([key, value]) => {
    // Skip if value is not a string or doesn't look like ISO date
    if (typeof value !== 'string' || !value.match(/^\d{4}-\d{2}-\d{2}T/)) {
      return;
    }
    
    // Check if this field might be a date field
    const lowerKey = key.toLowerCase();
    const isDateField = dateFieldPatterns.some(pattern => lowerKey.includes(pattern));
    
    if (isDateField) {
      try {
        const date = new Date(value);
        
        // Check if it's a valid date
        if (!isNaN(date.getTime())) {
          // Convert to YYYY-MM-DD format by taking the date part of ISO string
          const sqlDate = value.split('T')[0];
          
          // If there's time component and field suggests time storage, keep time
          if (value.includes('T') && lowerKey.includes('time')) {
            // Format as YYYY-MM-DD HH:MM:SS
            const [datePart, timePart] = value.split('T');
            const [hours, minutes, seconds] = timePart.split(':');
            converted[key] = `${datePart} ${hours}:${minutes}:${seconds.split('.')[0]}`;
          } else {
            // Use date-only format
            converted[key] = sqlDate;
          }
          
          console.log(`[convertISODateToMySQLFormat] Converted ${key}: "${value}" -> "${converted[key]}"`);
        }
      } catch (error) {
        console.error(`[convertISODateToMySQLFormat] Error converting ${key}:`, error);
      }
    }
  });
  
  return converted;
}