import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt, COOKIE_NAME } from '@/lib/auth';

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/api/auth/login',
  '/api/test-db',
  '/api/env-check',
];

// Paths that require admin role
const adminPaths = [
  '/admin',
  '/api/admin'
];

/**
 * Middleware function that runs before routes are processed
 * Used for global authentication and authorization checks
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip auth check for public paths
  if (publicPaths.some(publicPath => path === publicPath || path.startsWith(publicPath + '/'))) {
    return NextResponse.next();
  }
  
  // Check for authentication token
  const token = request.cookies.get(COOKIE_NAME)?.value;
  
  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verify token
    const payload = verifyJwt(token);
    
    // Check for admin paths
    if (adminPaths.some(adminPath => path === adminPath || path.startsWith(adminPath + '/'))) {
      if (payload.role !== 'admin') {
        // Not an admin, redirect to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // Check for department paths
    if (path.startsWith('/departments/')) {
      const urlDept = path.split('/')[2];
      
      // Allow admins to access any department
      if (payload.role === 'admin') {
        return NextResponse.next();
      }
      
      // For department users, check if they're accessing their own department
      if (payload.role === 'dept' && payload.department !== urlDept) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
    
    // User is authorized for this path
    return NextResponse.next();
  } catch (error) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    // Match all paths except static files and api routes that handle their own auth
    '/((?!_next/static|favicon.ico).*)',
  ],
};
