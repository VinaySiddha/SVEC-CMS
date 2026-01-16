import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';

export async function superAdminMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow access to login page
  if (pathname === '/super-admin/login') {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = request.cookies.get('super-admin-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/super-admin/login', request.url));
  }

  // Verify token
  try {
    const user = verifyToken(token);
    
    if (!user || user.role !== 'super_admin') {
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/super-admin/login', request.url));
      response.cookies.set('super-admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      return response;
    }

    // Add user info to headers for downstream use
    const response = NextResponse.next();
    response.headers.set('x-super-admin-id', user.id.toString());
    response.headers.set('x-super-admin-username', user.username);
    response.headers.set('x-super-admin-permissions', JSON.stringify(user.permissions || []));
    
    return response;

  } catch (error) {
    
    // Clear invalid token and redirect
    const response = NextResponse.redirect(new URL('/super-admin/login', request.url));
    response.cookies.set('super-admin-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    return response;
  }
}

// Helper function to check permissions in API routes
export function requireSuperAdminPermission(permission: string) {
  return async (request: NextRequest) => {
    const token = request.cookies.get('super-admin-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    try {
      const user = verifyToken(token);
      
      if (!user || user.role !== 'super_admin') {
        return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
      }

      if (permission && user.permissions && !user.permissions.includes(permission)) {
        return NextResponse.json({ 
          error: `Permission '${permission}' required` 
        }, { status: 403 });
      }

      return null; // Permission granted
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  };
}

// Rate limiting for super admin actions
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimitSuperAdmin(maxAttempts: number = 10, windowMs: number = 60000) {
  return (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const now = Date.now();
    const key = `super-admin-${ip}`;
    
    const limit = rateLimitMap.get(key);
    
    if (!limit || now > limit.resetTime) {
      // Reset or create new limit
      rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return null;
    }
    
    if (limit.count >= maxAttempts) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Increment counter
    limit.count++;
    return null;
  };
}