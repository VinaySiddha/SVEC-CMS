/**
 * Authentication Utilities for SVEC-CMS
 * 
 * This module provides utilities for password hashing, JWT token handling,
 * and authentication middleware for protecting routes.
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Configuration
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'development_secret_change_in_production';
const COOKIE_NAME = 'sid';

/**
 * User interface representing the JWT payload
 */
export interface AuthUser {
  id: number;
  username: string;
  department?: string;
  role: 'admin' | 'dept';
}

/**
 * Hash a password using bcrypt
 * 
 * @example
 * const hashedPassword = await hashPassword('plain_password');
 * // Store hashedPassword in database
 * 
 * @param password - Plain text password to hash
 * @returns Promise resolving to hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 * 
 * @example
 * const isValid = await verifyPassword('plain_password', storedHash);
 * if (isValid) {
 *   // Authentication successful
 * }
 * 
 * @param password - Plain text password to verify
 * @param hash - Stored hash to compare against
 * @returns Promise resolving to boolean indicating if password matches
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Sign a JWT token with user data
 * 
 * @example
 * const token = signJwt({ id: 1, username: 'admin', role: 'admin' });
 * // Set token in cookie or return to client
 * 
 * @param payload - User data to include in the token
 * @returns Signed JWT token
 */
export function signJwt(payload: AuthUser): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verify a JWT token
 * 
 * @example
 * try {
 *   const user = verifyJwt(token);
 *   // Use user data
 * } catch (error) {
 *   // Invalid or expired token
 * }
 * 
 * @param token - JWT token to verify
 * @returns Decoded token payload or throws an error if invalid
 */
export function verifyJwt(token: string): AuthUser {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Middleware to require authentication
 * 
 * @example
 * export async function GET(req: NextRequest) {
 *   const user = await requireAuth(req);
 *   if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 *   
 *   // Continue with authenticated request
 *   return NextResponse.json({ user });
 * }
 * 
 * @param req - Next.js request object
 * @returns User object if authenticated, null otherwise
 */
export async function requireAuth(req: NextRequest): Promise<AuthUser> {
  try {
    // First, try to get token from Authorization header (for API requests)
    const authHeader = req.headers.get('authorization');
    let token: string | undefined;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    
    // If no token in header, try to get from cookies (for browser requests)
    if (!token) {
      const cookieStore = cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    }
    
    if (!token) {
      throw new Error('Unauthorized: No authentication token provided');
    }
    
    const user = verifyJwt(token);
    if (!user) {
      throw new Error('Unauthorized: Invalid token');
    }
    
    return user;
  } catch (error: any) {
    throw {
      message: error.message || 'Authentication failed',
      status: 401
    };
  }
}

/**
 * Middleware to require a specific role
 * 
 * @example
 * export async function GET(req: NextRequest) {
 *   const user = await requireRole(req, 'admin');
 *   if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
 *   
 *   // Continue with authorized request
 *   return NextResponse.json({ user });
 * }
 * 
 * @param req - Next.js request object
 * @param role - Required role ('admin' or 'dept')
 * @returns User object if authorized, null otherwise
 */
export async function requireRole(req: NextRequest, role: 'admin' | 'dept'): Promise<AuthUser | null> {
  const user = await requireAuth(req);
  
  if (!user) {
    return null;
  }
  
  // Check if user has the required role
  if (user.role !== role && !(role === 'dept' && user.role === 'admin')) {
    return null;
  }
  
  return user;
}

/**
 * Get authenticated user for server components
 * 
 * @example
 * // In a Server Component
 * const user = await getAuthUser();
 * if (user) {
 *   // User is authenticated
 * }
 * 
 * @returns User object if authenticated, null otherwise
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    
    if (!token) {
      return null;
    }
    
    return verifyJwt(token);
  } catch (error) {
    return null;
  }
}

export { COOKIE_NAME };
