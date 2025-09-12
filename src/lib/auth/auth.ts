/**
 * Authentication utilities for department-based login system
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  username: string;
  email: string;
  department: string;
  department_name: string;
  role: 'dept' | 'admin' | 'super_admin';
  is_active: boolean;
}

export interface AuthToken {
  id: number;
  username: string;
  department: string;
  role: 'dept' | 'admin' | 'super_admin';
}

const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(user: Pick<User, 'id' | 'username' | 'department' | 'role'>): string {
  const payload: AuthToken = {
    id: user.id,
    username: user.username,
    department: user.department,
    role: user.role,
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '8h' // 8-hour session
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthToken;
  } catch (error) {
    return null;
  }
}

/**
 * Authenticate user with username/email and password
 */
export async function authenticateUser(
  identifier: string, // username or email
  password: string
): Promise<User | null> {
  try {
    // Query user by username or email
    const users = await query<RowDataPacket[]>(
      `SELECT id, username, email, password_hash, department, department_name, role, is_active 
       FROM users 
       WHERE (username = ? OR email = ?) AND is_active = 1 AND deleted_at IS NULL`,
      [identifier, identifier]
    );

    if (users.length === 0) {
      return null;
    }

    const user = users[0] as any;
    
    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return null;
    }

    // Return user without password hash
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      department: user.department,
      department_name: user.department_name,
      role: user.role,
      is_active: user.is_active,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  try {
    const users = await query<RowDataPacket[]>(
      `SELECT id, username, email, department, department_name, role, is_active 
       FROM users 
       WHERE id = ? AND is_active = 1 AND deleted_at IS NULL`,
      [id]
    );

    if (users.length === 0) {
      return null;
    }

    const user = users[0] as any;
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      department: user.department,
      department_name: user.department_name,
      role: user.role,
      is_active: user.is_active,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Create a new department user (admin only)
 */
export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  department: string;
  department_name: string;
  role?: 'dept' | 'admin';
}): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(userData.password);
    
    const result = await query(
      `INSERT INTO users (username, email, password_hash, department, department_name, role)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userData.username,
        userData.email,
        hashedPassword,
        userData.department,
        userData.department_name,
        userData.role || 'dept'
      ]
    );

    const insertId = (result as any).insertId;
    return getUserById(insertId);
  } catch (error) {
    console.error('Create user error:', error);
    return null;
  }
}

/**
 * Department mappings for user creation
 */
export const DEPARTMENTS = {
  'cse': 'Computer Science and Engineering',
  'cse-ai': 'CSE (Artificial Intelligence)',
  'cse-ds': 'CSE (Data Science)',
  'ece': 'Electronics and Communication Engineering',
  'eee': 'Electrical and Electronics Engineering',
  'civil': 'Civil Engineering',
  'mech': 'Mechanical Engineering',
  'mba': 'Master of Business Administration',
  'bsh': 'Basic Sciences and Humanities',
  'cst': 'Computer Science and Technology',
  'ect': 'Electronics and Computer Technology',
  'aiml': 'Artificial Intelligence and Machine Learning',
} as const;

export type DepartmentCode = keyof typeof DEPARTMENTS;
