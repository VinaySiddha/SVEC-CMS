/**
 * Custom Image Loader for CDN Integration
 * Supports Cloudflare, Vercel, AWS CloudFront, or custom CDN
 *
 * To use:
 * 1. Set NEXT_PUBLIC_CDN_URL in your .env file
 * 2. Example: NEXT_PUBLIC_CDN_URL=https://your-cdn.cloudflare.com
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL;

  // If no CDN is configured, return original src
  if (!CDN_URL) {
    return src;
  }

  // Handle absolute URLs (don't modify external images)
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;

  // Construct CDN URL with optimization parameters
  // Format varies by CDN provider
  const params = new URLSearchParams();

  // Cloudflare Image Resizing format
  if (CDN_URL.includes('cloudflare')) {
    return `${CDN_URL}/cdn-cgi/image/width=${width},quality=${quality || 80},format=auto/${cleanSrc}`;
  }

  // Vercel Image Optimization format
  if (CDN_URL.includes('vercel')) {
    params.append('url', cleanSrc);
    params.append('w', width.toString());
    params.append('q', (quality || 80).toString());
    return `${CDN_URL}/_next/image?${params.toString()}`;
  }

  // AWS CloudFront with Lambda@Edge or CloudFront Functions
  if (CDN_URL.includes('cloudfront') || CDN_URL.includes('amazonaws')) {
    params.append('width', width.toString());
    params.append('quality', (quality || 80).toString());
    return `${CDN_URL}/${cleanSrc}?${params.toString()}`;
  }

  // Generic CDN format (works with most CDNs)
  params.append('w', width.toString());
  params.append('q', (quality || 80).toString());
  return `${CDN_URL}/${cleanSrc}?${params.toString()}`;
}

/**
 * Helper function to get optimized image URL directly
 */
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality: number = 80
): string {
  return imageLoader({ src, width, quality });
}

/**
 * Preload critical images for better LCP (Largest Contentful Paint)
 */
export function preloadImage(src: string, width: number = 1920): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageLoader({ src, width });
  link.fetchPriority = 'high';
  document.head.appendChild(link);
}
