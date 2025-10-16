import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const metaFilePath = path.join(process.cwd(), 'public', 'meta.json');
    const metaData = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));
    
    // Add dynamic data like current timestamp
    metaData.lastAccessed = new Date().toISOString();
    metaData.buildTimestamp = process.env.BUILD_TIMESTAMP || new Date().toISOString();
    
    return NextResponse.json(metaData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error serving meta.json:', error);
    return NextResponse.json(
      { error: 'Failed to load metadata' },
      { status: 500 }
    );
  }
}