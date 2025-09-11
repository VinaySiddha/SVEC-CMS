import { NextRequest, NextResponse } from 'next/server';

/**
 * Endpoint to check environment variables
 * @route GET /api/env-check
 */
export async function GET(req: NextRequest) {
  return NextResponse.json({
    databaseConfig: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      // Don't show actual password
      passwordSet: !!process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'college_portal',
      port: Number(process.env.MYSQL_PORT) || 3306,
    },
    nodeEnv: process.env.NODE_ENV
  });
}
