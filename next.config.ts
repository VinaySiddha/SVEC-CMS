import type { NextConfig } from "next";

// /** @type {import('next').NextConfig} */


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
 if (process.env.NODE_ENV === 'development') {
   // Use an async IIFE to handle the await
   (async () => {
     await setupDevPlatform();
   })().catch(console.error);
 }

export default nextConfig;

