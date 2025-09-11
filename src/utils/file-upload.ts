/**
 * File Upload Utilities
 * 
 * Functions to handle file uploads with multipart/form-data
 */

import { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as fsPromises from 'fs/promises';

// Default configuration
const DEFAULT_CONFIG = {
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  uploadDir: 'uploads',
  baseUrl: '/uploads'
};

// File type specific configurations
const FILE_TYPE_CONFIG = {
  images: {
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxFileSize: 2 * 1024 * 1024, // 2MB
  },
  documents: {
    allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
  },
  videos: {
    allowedFileTypes: ['video/mp4', 'video/webm'],
    maxFileSize: 100 * 1024 * 1024, // 100MB
  }
};

/**
 * Parse a multipart/form-data request
 * 
 * @param req NextRequest object
 * @returns Object containing fields and files
 */
export async function parseMultipartForm(req: NextRequest): Promise<{ fields: Record<string, string>, files: Record<string, File> }> {
  try {
    const formData = await req.formData();
    const fields: Record<string, string> = {};
    const files: Record<string, File> = {};
    
    // Process each entry in the form data
    for (const [name, value] of formData.entries()) {
      if (value instanceof File) {
        // This is a file
        files[name] = value;
      } else {
        // This is a field
        fields[name] = value as string;
      }
    }
    
    return { fields, files };
  } catch (error) {
    console.error('Error parsing multipart form data:', error);
    throw new Error('Failed to parse form data');
  }
}

// Define the file config type
interface FileTypeConfig {
  allowedFileTypes: string[];
  maxFileSize: number;
}

/**
 * Get file type specific configuration
 * 
 * @param fileType Type of file (images, documents, videos)
 * @returns Configuration object
 */
export function getFileTypeConfig(fileType?: string): FileTypeConfig {
  switch (fileType) {
    case 'images':
      return FILE_TYPE_CONFIG.images;
    case 'documents':
      return FILE_TYPE_CONFIG.documents;
    case 'videos':
      return FILE_TYPE_CONFIG.videos;
    default:
      return {
        allowedFileTypes: DEFAULT_CONFIG.allowedFileTypes,
        maxFileSize: DEFAULT_CONFIG.maxFileSize
      };
  }
}

/**
 * Save a file to disk and return its public path
 * 
 * @param file File object to save
 * @param directory Target directory relative to public folder
 * @param options Optional configuration options
 * @returns Object with filePath, fileName and error (if any)
 */
export async function saveFile(
  file: File, 
  directory: string = 'uploads',
  options?: {
    allowedFileTypes?: string[];
    maxFileSize?: number;
    fileName?: string;
    fileType?: 'images' | 'documents' | 'videos';
  }
): Promise<{ filePath: string; fileName: string; error?: string }> {
  try {
    // Get file type specific config
    const typeConfig = options?.fileType ? getFileTypeConfig(options.fileType) : getFileTypeConfig();
    
    // Merge configurations
    const config = {
      allowedFileTypes: options?.allowedFileTypes || typeConfig.allowedFileTypes,
      maxFileSize: options?.maxFileSize || typeConfig.maxFileSize,
    };
    
    // Validate file type
    if (!config.allowedFileTypes.includes(file.type)) {
      return { 
        filePath: '', 
        fileName: '', 
        error: `Invalid file type. Allowed types: ${config.allowedFileTypes.join(', ')}` 
      };
    }
    
    // Validate file size
    if (file.size > config.maxFileSize) {
      return { 
        filePath: '', 
        fileName: '', 
        error: `File size exceeds the limit of ${config.maxFileSize / (1024 * 1024)}MB` 
      };
    }
    
    // Determine file extension
    let fileExtension = '';
    if (file.name) {
      // Extract from filename
      const parts = file.name.split('.');
      if (parts.length > 1) {
        fileExtension = `.${parts.pop()}`;
      }
    }
    
    if (!fileExtension) {
      // Extract from MIME type if filename doesn't have an extension
      const mimeExtension = file.type.split('/').pop();
      if (mimeExtension) {
        fileExtension = `.${mimeExtension}`;
      }
    }
    
    // Default to .bin if still no extension
    fileExtension = fileExtension || '.bin';
    
    // Generate a unique filename or use provided one
    const fileName = options?.fileName || `${uuidv4()}${fileExtension}`;
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', directory);
    if (!fs.existsSync(uploadDir)) {
      await fsPromises.mkdir(uploadDir, { recursive: true });
    }
    
    // Create file path
    const filePath = path.join(uploadDir, fileName);
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Write file to disk using promises
    await fsPromises.writeFile(filePath, buffer);
    
    // Return the public URL path
    return { 
      filePath: filePath,
      fileName: `/${directory}/${fileName}` 
    };
  } catch (error) {
    console.error('Error saving file:', error);
    return { 
      filePath: '',
      fileName: '',
      error: 'Failed to save file'
    };
  }
}

/**
 * Delete a file from disk
 * 
 * @param fileName File path relative to public directory
 * @returns Whether deletion was successful
 */
export async function deleteFile(fileName: string): Promise<boolean> {
  try {
    // Skip if no fileName provided
    if (!fileName) {
      return false;
    }
    
    // Ensure the path starts with a slash and remove any leading slash
    const normalizedPath = fileName.startsWith('/') ? fileName.substring(1) : fileName;
    
    // Get absolute path
    const filePath = path.join(process.cwd(), 'public', normalizedPath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return false;
    }
    
    // Delete the file
    await fsPromises.unlink(filePath);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

// Define upload options interface
export interface UploadOptions {
  directory?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  fileName?: string;
  fileType?: 'images' | 'documents' | 'videos';
}

// Define upload result interface
export interface FileUploadResult {
  success: boolean;
  fileName?: string;
  url?: string;
  error?: string;
}

/**
 * Upload a file and return the result
 * 
 * @param file File to upload
 * @param options Upload options
 * @returns Upload result with success status, URL, and potential error
 */
export async function uploadFile(file: File, options: UploadOptions = {}): Promise<FileUploadResult> {
  try {
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    const directory = options.directory || 'uploads';
    const result = await saveFile(file, directory, {
      allowedFileTypes: options.allowedFileTypes,
      maxFileSize: options.maxFileSize,
      fileName: options.fileName,
      fileType: options.fileType,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error
      };
    }

    return {
      success: true,
      fileName: result.fileName,
      url: result.fileName // This is the relative path from public directory
    };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    return {
      success: false,
      error: 'File upload failed'
    };
  }
}
