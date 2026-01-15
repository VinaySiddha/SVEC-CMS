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
    // Enable image optimization with modern formats
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 365 days
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Loader configuration for CDN
    loader: process.env.NEXT_PUBLIC_CDN_URL ? 'custom' : 'default',
    loaderFile: process.env.NEXT_PUBLIC_CDN_URL ? './src/lib/imageLoader.ts' : undefined,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Disable optimization in development for faster builds
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
  },
  // Enable standalone output for Node.js hosting (Hostinger, Docker, etc.)
  output: 'standalone',
  // For static hosting (cPanel), use: output: 'export'
  // Note: Static export doesn't support API routes or server-side features
  // Enable Gzip and Brotli compression
  compress: true,
  // React strict mode for better error detection
  reactStrictMode: true,
  // Production source maps for debugging
  productionBrowserSourceMaps: false,
  // Power optimization
  poweredByHeader: false,
  // Generate etags for better caching
  generateEtags: true,
  // Enable SWR (Stale While Revalidate) caching and optimizations
  experimental: {
    // Use modern compression and tree shaking
    optimizePackageImports: ['lucide-react', 'react-icons', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    // Optimize CSS imports
    optimizeCss: true,
    // Enable web vitals attribution for performance monitoring
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB', 'INP'],
  },
  // Custom headers for caching and security
  async headers() {
    return [
      // API caching
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Static assets caching (images, fonts, etc.)
      {
        source: '/:path(.*\\.(png|jpg|jpeg|gif|webp|avif|ico|svg|woff|woff2|ttf|otf|eot)$)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // JavaScript and CSS caching
      {
        source: '/:path(.*\\.(js|css)$)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security headers
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
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

