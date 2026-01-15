import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "JNTUK exam section test endpoint working",
    timestamp: new Date().toISOString()
  });
}