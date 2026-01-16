import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

interface AuthToken {
  id: number;
  username: string;
  department: string;
  role: 'dept' | 'admin' | 'super_admin';
  permissions?: string[];
}

async function verifyToken(token: string): Promise<AuthToken | null> {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as AuthToken;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/health') ||
    pathname.startsWith('/api/test') ||
    pathname.startsWith('/api/auth/') ||
    pathname.startsWith('/api/debug/') ||
    pathname.startsWith('/static/') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg')
  ) {
    return NextResponse.next();
  }

  // Check for authentication token in header or cookies
  const token = request.headers.get('authorization')?.replace('Bearer ', '') || 
                request.cookies.get('token')?.value ||
                request.cookies.get('admin_token')?.value;

  // Routes that require authentication
  const protectedRoutes = [
    '/admin',
    '/api/admin'
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login for page requests
      if (!pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      // Return unauthorized for API requests
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token (now async)
    const user = await verifyToken(token);
    if (!user) {
      if (!pathname.startsWith('/api/')) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Department admin access control (for authenticated routes only)
    if (pathname.startsWith('/departments/') && pathname.includes('/dashboard')) {
      const pathParts = pathname.split('/');
      const requestedDept = pathParts[2]; // /departments/{dept}/dashboard...

      // Super admin can access all departments
      if (user.role === 'super_admin') {
        return NextResponse.next();
      }

      // Admin and dept users can only access their own department
      if (user.role === 'admin' || user.role === 'dept') {
        if (user.department !== requestedDept) {
          if (!pathname.startsWith('/api/')) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
          return NextResponse.json({ error: 'Access denied to this department' }, { status: 403 });
        }
      }
    }

    // API department access control
    if (pathname.startsWith('/api/admin/departments/')) {
      const pathParts = pathname.split('/');
      const requestedDept = pathParts[4]; // /api/admin/departments/{dept}/...
      
      // Super admin can access all departments
      if (user.role === 'super_admin') {
        return NextResponse.next();
      }

      // Admin and dept users can only access their own department
      if (user.role === 'admin' || user.role === 'dept') {
        if (user.department !== requestedDept) {
          return NextResponse.json({ error: 'Access denied to this department' }, { status: 403 });
        }
      }
    }

    // Super admin dashboard access
    if (pathname.startsWith('/admin/dashboard')) {
      if (user.role !== 'super_admin' && user.role !== 'admin') {
        if (!pathname.startsWith('/api/')) {
          return NextResponse.redirect(new URL(`/departments/${user.department}/dashboard`, request.url));
        }
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
    }

    // Add user info to request headers for API routes
    if (pathname.startsWith('/api/')) {
      const response = NextResponse.next();
      response.headers.set('x-user-id', user.id.toString());
      response.headers.set('x-user-role', user.role);
      response.headers.set('x-user-department', user.department);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}