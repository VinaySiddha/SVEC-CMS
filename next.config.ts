import type { NextConfig } from "next";

// /** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable standalone output for Docker
  output: 'standalone',
  
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
    ],
  },
};

// Only setup Cloudflare dev platform in development and when the module is available
if (process.env.NODE_ENV === 'development') {
  // Use an async IIFE to handle the await
  (async () => {
    try {
      const { setupDevPlatform } = await import('@cloudflare/next-on-pages/next-dev');
      await setupDevPlatform();
    } catch (error) {
      console.warn('Cloudflare dev platform setup failed (this is normal for Docker builds):', 
        error instanceof Error ? error.message : 'Unknown error');
    }
  })().catch(console.error);
}

export default nextConfig;
