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
  last_login?: Date;
  login_count?: number;
  must_change_password?: boolean;
  permissions?: string[];
}

export interface AuthToken {
  id: number;
  username: string;
  department: string;
  role: 'dept' | 'admin' | 'super_admin';
  permissions?: string[];
}

export interface SuperAdminPermission {
  id: number;
  permission: string;
  resource?: string;
  expires_at?: Date;
  is_active: boolean;
}

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
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
export function generateToken(user: Pick<User, 'id' | 'username' | 'department' | 'role' | 'permissions'>): string {
  const payload: AuthToken = {
    id: user.id,
    username: user.username,
    department: user.department,
    role: user.role,
    permissions: user.permissions || [],
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: user.role === 'super_admin' ? '4h' : '8h' // Shorter session for super admin
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
      `SELECT u.id, u.username, u.email, u.password_hash, u.department, u.department_name, 
              u.role, u.is_active, u.last_login, u.login_count, u.must_change_password
       FROM users u
       WHERE (u.username = ? OR u.email = ?) AND u.is_active = 1 AND u.deleted_at IS NULL`,
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

    // Get permissions for super admin users
    let permissions: string[] = [];
    if (user.role === 'super_admin') {
      permissions = await getSuperAdminPermissions(user.id);
    }

    // Update last login and login count
    await query(
      `UPDATE users SET last_login = CURRENT_TIMESTAMP, login_count = login_count + 1 
       WHERE id = ?`,
      [user.id]
    );

    // Log the login
    await logAuditEvent({
      userId: user.id,
      action: 'user_login',
      resourceType: 'authentication',
      department: user.department,
      severity: 'low',
      metadata: { login_method: 'password' }
    });

    // Return user without password hash
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      department: user.department,
      department_name: user.department_name,
      role: user.role,
      is_active: user.is_active,
      last_login: user.last_login,
      login_count: user.login_count,
      must_change_password: user.must_change_password,
      permissions: permissions,
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

/**
 * Get super admin permissions for a user
 */
export async function getSuperAdminPermissions(userId: number): Promise<string[]> {
  try {
    const permissions = await query<RowDataPacket[]>(
      `SELECT permission FROM super_admin_permissions 
       WHERE user_id = ? AND is_active = 1 AND (expires_at IS NULL OR expires_at > NOW())`,
      [userId]
    );

    return permissions.map((p: any) => p.permission);
  } catch (error) {
    console.error('Get permissions error:', error);
    return [];
  }
}

/**
 * Check if a user has a specific permission
 */
export async function hasPermission(userId: number, permission: string, resource?: string): Promise<boolean> {
  try {
    const conditions = ['user_id = ?', 'permission = ?', 'is_active = 1', '(expires_at IS NULL OR expires_at > NOW())'];
    const params: any[] = [userId, permission];
    
    if (resource) {
      conditions.push('(resource IS NULL OR resource = ?)');
      params.push(resource);
    }

    const result = await query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM super_admin_permissions WHERE ${conditions.join(' AND ')}`,
      params
    );

    return (result[0] as any).count > 0;
  } catch (error) {
    console.error('Check permission error:', error);
    return false;
  }
}

/**
 * Grant permission to a super admin
 */
export async function grantPermission(
  userId: number,
  permission: string,
  grantedBy: number,
  resource?: string,
  expiresAt?: Date
): Promise<boolean> {
  try {
    await query(
      `INSERT INTO super_admin_permissions (user_id, permission, resource, granted_by, expires_at) 
       VALUES (?, ?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE 
         granted_by = VALUES(granted_by), 
         expires_at = VALUES(expires_at), 
         is_active = 1`,
      [userId, permission, resource || null, grantedBy, expiresAt || null]
    );

    await logAuditEvent({
      userId: grantedBy,
      action: 'permission_granted',
      resourceType: 'super_admin_permissions',
      resourceId: userId.toString(),
      metadata: { permission, resource },
      severity: 'medium'
    });

    return true;
  } catch (error) {
    console.error('Grant permission error:', error);
    return false;
  }
}

/**
 * Log audit events
 */
export async function logAuditEvent(event: {
  userId?: number;
  action: string;
  resourceType: string;
  resourceId?: string;
  department?: string;
  oldValues?: any;
  newValues?: any;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'success' | 'failed' | 'pending';
  errorMessage?: string;
  metadata?: any;
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
}): Promise<void> {
  try {
    await query(
      `INSERT INTO audit_logs 
       (user_id, action, resource_type, resource_id, department, old_values, new_values, 
        severity, status, error_message, metadata, ip_address, user_agent, session_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event.userId || null,
        event.action,
        event.resourceType,
        event.resourceId || null,
        event.department || null,
        event.oldValues ? JSON.stringify(event.oldValues) : null,
        event.newValues ? JSON.stringify(event.newValues) : null,
        event.severity || 'medium',
        event.status || 'success',
        event.errorMessage || null,
        event.metadata ? JSON.stringify(event.metadata) : null,
        event.ipAddress || null,
        event.userAgent || null,
        event.sessionId || null
      ]
    );
  } catch (error) {
    console.error('Audit logging error:', error);
    // Don't throw - audit logging should not break the main flow
  }
}
