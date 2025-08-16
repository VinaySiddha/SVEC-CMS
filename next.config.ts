import type { NextConfig } from "next";
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

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
};
 if (process.env.NODE_ENV === 'development') {
   await setupDevPlatform();
 }

export default nextConfig;
