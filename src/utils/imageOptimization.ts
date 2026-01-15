// Image optimization utilities for faster loading

export const getOptimizedImageUrl = (url: string, width?: number, height?: number): string => {
  if (!url) return '';
  
  // If it's a local image, apply Next.js Image Optimization
  if (url.startsWith('/')) {
    return url;
  }
  
  // Add image optimization parameters for external images
  const params = [];
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  
  const separator = url.includes('?') ? '&' : '?';
  return params.length > 0 ? `${url}${separator}${params.join('&')}` : url;
};

export const ImagePlaceholder = {
  small: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e0e0e0" width="100" height="100"/%3E%3C/svg%3E',
  medium: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e0e0e0" width="300" height="200"/%3E%3C/svg%3E',
  large: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e0e0e0" width="800" height="600"/%3E%3C/svg%3E',
};

export const getImageDimensions = (imageType: string): { width: number; height: number } => {
  const dimensions: { [key: string]: { width: number; height: number } } = {
    gallery: { width: 350, height: 240 },
    thumbnail: { width: 150, height: 150 },
    hero: { width: 1200, height: 600 },
    faculty: { width: 250, height: 300 },
  };
  
  return dimensions[imageType] || { width: 300, height: 200 };
};
