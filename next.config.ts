import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "srivasaviengg.ac.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
    // Enable image optimization
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 365 days
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Increase timeout for external image optimization (30 seconds)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable optimization for problematic domains - use unoptimized instead
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
  },
  // Enable standalone output for Docker optimization
  output: 'standalone',
  // Compression settings
  compress: true,
  // Enable SWR (Stale While Revalidate) caching
  experimental: {
    // Use modern compression
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  // Custom headers for caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/public/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

async function setupDevPlatform(): Promise<void> {
  // Example: Load environment variables from .env.local if needed
  // Or perform other dev-only setup tasks

  // Log a message to indicate dev platform setup
  console.log("Setting up development platform...");

  // You could add more dev-specific initialization here
  // For example, starting a mock server, checking dependencies, etc.

  // Simulate async setup (remove if not needed)
  await Promise.resolve();
}

// Only run dev setup in development mode
if (process.env.NODE_ENV === 'development') {
  // Use an async IIFE to handle the await
  (async () => {
    await setupDevPlatform();
  })().catch(console.error);
}

export default nextConfig;

