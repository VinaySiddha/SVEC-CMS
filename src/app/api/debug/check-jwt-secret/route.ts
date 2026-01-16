import { NextResponse } from 'next/server';

/**
 * Debug endpoint to check JWT_SECRET configuration
 * GET /api/debug/check-jwt-secret
 */
export async function GET() {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    jwt_secret_exists: !!JWT_SECRET,
    jwt_secret_source: JWT_SECRET ? 'environment' : 'would use fallback: default_jwt_secret',
    jwt_secret_preview: JWT_SECRET ? JWT_SECRET.substring(0, 30) + '...' : 'NOT SET',
    all_env_keys: Object.keys(process.env).filter(k => k.includes('JWT') || k.includes('SECRET')),
    node_env: process.env.NODE_ENV
  });
}
