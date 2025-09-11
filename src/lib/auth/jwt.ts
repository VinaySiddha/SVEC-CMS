import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from './schemas';

// In production, use environment variables for these secrets
const JWT_SECRET = 'your-secret-key-change-in-production';
export const COOKIE_NAME = 'sid';

export function createToken(user: Omit<User, 'password'>) {
  // Token expires in 24 hours
  return sign(
    { 
      id: user.id,
      username: user.username,
      role: user.role,
      department: user.department 
    }, 
    JWT_SECRET, 
    { expiresIn: '24h' }
  );
}

export function verifyAuthToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as User;
  } catch (error) {
    return null;
  }
}
