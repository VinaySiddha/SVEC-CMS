/**
 * Image Processing Utility
 * 
 * Handles image compression, resizing, and optimization for the placement gallery
 * Automatically reduces large images (10-20MB) to around 300KB while maintaining quality
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  maxFileSize?: number; // in KB
  format?: 'jpeg' | 'jpg' | 'png' | 'webp';
}

export interface ProcessedImageResult {
  buffer: Buffer;
  filename: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  dimensions: {
    width: number;
    height: number;
  };
}

/**
 * Process and compress an image to meet size and dimension requirements
 * 
 * @param imageBuffer - Raw image buffer from uploaded file
 * @param originalFilename - Original filename for generating new filename
 * @param options - Processing options for size, quality, etc.
 * @returns Promise<ProcessedImageResult> - Processed image data and metadata
 */
export async function processImage(
  imageBuffer: Buffer,
  originalFilename: string,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImageResult> {
  const {
    width = 1920,
    height = 700,
    quality = 85,
    maxFileSize = 300, // 300KB target
    format = 'jpeg'
  } = options;

  const originalSize = imageBuffer.length;
  
  // Get image metadata
  const metadata = await sharp(imageBuffer).metadata();
  
  // Create base sharp instance with resize
  let processor = sharp(imageBuffer)
    .resize(width, height, {
      fit: 'cover',
      position: 'center',
      withoutEnlargement: false
    });

  // Apply format-specific compression
  let processedBuffer: Buffer;
  let currentQuality = quality;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    attempts++;
    
    if (format === 'jpeg' || format === 'jpg') {
      processor = processor.jpeg({
        quality: currentQuality,
        progressive: true,
        mozjpeg: true,
        optimizeScans: true,
        optimizeCoding: true,
        quantizationTable: 3
      });
    } else if (format === 'png') {
      processor = processor.png({
        quality: currentQuality,
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10
      });
    } else if (format === 'webp') {
      processor = processor.webp({
        quality: currentQuality,
        effort: 6,
        smartSubsample: true
      });
    }

    processedBuffer = await processor.toBuffer();
    const compressedSize = processedBuffer.length;
    const compressedSizeKB = compressedSize / 1024;

    // If within target size or we've tried enough times, break
    if (compressedSizeKB <= maxFileSize || attempts >= maxAttempts) {
      break;
    }

    // Reduce quality for next attempt
    currentQuality = Math.max(currentQuality - 5, 30);
    
    // Reset processor for next iteration
    processor = sharp(imageBuffer)
      .resize(width, height, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: false
      });

  } while (attempts < maxAttempts);

  // Generate new filename with compression info
  const ext = path.extname(originalFilename);
  const baseName = path.basename(originalFilename, ext);
  const timestamp = Date.now();
  const newFilename = `${baseName}_${width}x${height}_compressed_${timestamp}.${format}`;

  const compressedSize = processedBuffer.length;
  const compressionRatio = ((originalSize - compressedSize) / originalSize * 100);

  return {
    buffer: processedBuffer,
    filename: newFilename,
    originalSize,
    compressedSize,
    compressionRatio,
    dimensions: {
      width,
      height
    }
  };
}

/**
 * Save processed image buffer to disk
 * 
 * @param buffer - Processed image buffer
 * @param filePath - Full path where to save the file
 * @returns Promise<void>
 */
export async function saveImageBuffer(buffer: Buffer, filePath: string): Promise<void> {
  const dir = path.dirname(filePath);
  
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  
  await fs.writeFile(filePath, buffer);
}

/**
 * Get optimal image format based on file type and size requirements
 * 
 * @param originalFormat - Original image format
 * @param hasTransparency - Whether image has transparency
 * @returns Optimal format for compression
 */
export function getOptimalFormat(
  originalFormat: string,
  hasTransparency: boolean = false
): 'jpeg' | 'png' | 'webp' {
  // If transparency is needed, use PNG or WebP
  if (hasTransparency) {
    return 'webp'; // WebP handles transparency better than PNG for our use case
  }
  
  // For photos without transparency, JPEG is usually best
  // WebP could be better but has less browser support
  return 'jpeg';
}

/**
 * Validate uploaded image file
 * 
 * @param file - File object from form upload
 * @returns Validation result
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, or WebP images only.'
    };
  }

  // Check file size (max 50MB for input)
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File too large. Maximum upload size is 50MB.'
    };
  }

  return { isValid: true };
}

/**
 * Format file size for human-readable display
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB", "150 KB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default {
  processImage,
  saveImageBuffer,
  getOptimalFormat,
  validateImageFile,
  formatFileSize
};