import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    JWT_SECRET_EXISTS: !!process.env.JWT_SECRET,
    JWT_SECRET_LENGTH: process.env.JWT_SECRET?.length || 0,
    NODE_ENV: process.env.NODE_ENV,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    // Don't expose actual secrets
    env_keys: Object.keys(process.env).filter(key => 
      key.includes('JWT') || 
      key.includes('MYSQL') || 
      key.includes('NODE') ||
      key.includes('NEXT')
    )
  });
}