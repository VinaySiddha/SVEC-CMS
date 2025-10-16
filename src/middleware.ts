import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple session-based middleware (currently disabled)
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: []
};