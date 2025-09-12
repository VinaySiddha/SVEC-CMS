import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

// Define protected routes and their access requirements
const protectedRoutes = {
  '/dashboard': { roles: ['dept', 'admin'] as const },
  '/admin': { roles: ['admin'] as const },
  '/api/department-info': { roles: ['dept', 'admin'] as const },
  '/api/laboratories': { roles: ['dept', 'admin'] as const },
  '/api/placements': { roles: ['dept', 'admin'] as const },
  '/api/faculty-achievements': { roles: ['dept', 'admin'] as const },
} as const;

/**
 * Middleware function that runs before routes are processed
 * Handles authentication and authorization
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow authentication routes
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token from Authorization header or cookie
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || 
                request.cookies.get('authToken')?.value;

  if (!token) {
    // Redirect to login for page routes
    if (!pathname.startsWith('/api/')) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Return 401 for API routes
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    // Redirect to login for page routes
    if (!pathname.startsWith('/api/')) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Return 401 for API routes
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  // Check role permissions
  const routeConfig = Object.entries(protectedRoutes).find(([route]) => 
    pathname.startsWith(route)
  )?.[1];

  if (routeConfig && !routeConfig.roles.includes(decoded.role)) {
    // Redirect to unauthorized page for page routes
    if (!pathname.startsWith('/api/')) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    // Return 403 for API routes
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  // Add user info to headers for API routes
  if (pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id.toString());
    requestHeaders.set('x-user-department', decoded.department);
    requestHeaders.set('x-user-role', decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
