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
    ],
  },
  // Enable standalone output for Docker optimization
  output: 'standalone',
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

