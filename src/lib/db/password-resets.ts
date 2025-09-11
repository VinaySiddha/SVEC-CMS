import { query, execute, withTransaction } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '@/lib/auth';

/**
 * Types for password reset operations
 */
export type PasswordReset = {
  id: number;
  user_id: number;
  token: string;
  proposed_hash: string | null;
  status: 'pending' | 'approved' | 'rejected';
  expires_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type AdminApproval = {
  id: number;
  module: string;
  record_id: number;
  approver_id: number | null;
  status: 'pending' | 'approved' | 'rejected';
  comments: string | null;
  created_at: Date;
  updated_at: Date;
};

/**
 * Create a new password reset request
 * @param userId The ID of the user requesting the reset
 * @returns The created password reset record
 */
export async function createPasswordReset(userId: number): Promise<PasswordReset> {
  // Generate a random UUID token
  const token = uuidv4();
  
  // Set expiration time (1 hour from now)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);
  
  const result = await execute<{ insertId: number }>(`
    INSERT INTO password_resets 
      (user_id, token, expires_at, status) 
    VALUES 
      (?, ?, ?, 'pending')
  `, [userId, token, expiresAt]);
  
  const [reset] = await query<PasswordReset>(`
    SELECT * FROM password_resets WHERE id = ?
  `, [result.insertId]);
  
  return reset;
}

/**
 * Find a password reset by token
 * @param token The reset token
 * @returns The password reset record or null if not found
 */
export async function findResetByToken(token: string): Promise<PasswordReset | null> {
  const resets = await query<PasswordReset>(`
    SELECT * FROM password_resets 
    WHERE token = ? 
      AND status = 'pending'
      AND expires_at > NOW()
      AND deleted_at IS NULL
  `, [token]);
  
  return resets.length > 0 ? resets[0] : null;
}

/**
 * Find a password reset by ID
 * @param id The reset ID
 * @returns The password reset record or null if not found
 */
export async function findResetById(id: number): Promise<PasswordReset | null> {
  const resets = await query<PasswordReset>(`
    SELECT * FROM password_resets 
    WHERE id = ? 
      AND deleted_at IS NULL
  `, [id]);
  
  return resets.length > 0 ? resets[0] : null;
}

/**
 * Update a password reset with proposed new password hash
 * @param resetId The ID of the reset record
 * @param newPassword The new plain text password to hash and store
 * @returns True if successful
 */
export async function updateResetWithProposedPassword(
  resetId: number, 
  newPassword: string
): Promise<boolean> {
  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);
  
  // Update the reset record
  const result = await execute(`
    UPDATE password_resets 
    SET 
      proposed_hash = ?,
      updated_at = NOW()
    WHERE id = ? AND status = 'pending'
  `, [hashedPassword, resetId]);
  
  return result.affectedRows === 1;
}

/**
 * Create an admin approval record for a password reset
 * @param resetId The ID of the password reset record
 * @param comments Optional comments for the approval request
 * @returns The created admin approval record ID
 */
export async function createPasswordResetApproval(
  resetId: number,
  comments: string | null = null
): Promise<number> {
  const result = await execute<{ insertId: number }>(`
    INSERT INTO admin_approvals
      (module, record_id, status, comments)
    VALUES
      ('password_resets', ?, 'pending', ?)
  `, [resetId, comments]);
  
  return result.insertId;
}

/**
 * Approve a password reset and update the user's password
 * @param resetId The ID of the password reset record
 * @param approverId The ID of the admin approving the reset
 * @returns True if successful
 */
export async function approvePasswordReset(
  resetId: number,
  approverId: number
): Promise<boolean> {
  return await withTransaction(async (connection) => {
    // First, get the reset record to ensure it exists and has a proposed hash
    const [reset] = await connection.execute<any>(`
      SELECT pr.*, u.id as user_id 
      FROM password_resets pr
      JOIN users u ON pr.user_id = u.id
      WHERE pr.id = ? AND pr.status = 'pending' AND pr.proposed_hash IS NOT NULL
    `, [resetId]);
    
    if (!reset[0]) {
      throw new Error('Password reset not found or already processed');
    }
    
    const { user_id, proposed_hash } = reset[0];
    
    // Update the user's password with the proposed hash
    await connection.execute(`
      UPDATE users
      SET 
        password_hash = ?,
        updated_at = NOW()
      WHERE id = ?
    `, [proposed_hash, user_id]);
    
    // Update the reset status to approved
    await connection.execute(`
      UPDATE password_resets
      SET 
        status = 'approved',
        updated_at = NOW()
      WHERE id = ?
    `, [resetId]);
    
    // Update the admin approval status
    await connection.execute(`
      UPDATE admin_approvals
      SET 
        approver_id = ?,
        status = 'approved',
        updated_at = NOW()
      WHERE module = 'password_resets' AND record_id = ?
    `, [approverId, resetId]);
    
    return true;
  });
}

/**
 * Reject a password reset
 * @param resetId The ID of the password reset record
 * @param approverId The ID of the admin rejecting the reset
 * @param reason The reason for rejection
 * @returns True if successful
 */
export async function rejectPasswordReset(
  resetId: number,
  approverId: number,
  reason: string
): Promise<boolean> {
  return await withTransaction(async (connection) => {
    // Update the reset status to rejected
    await connection.execute(`
      UPDATE password_resets
      SET 
        status = 'rejected',
        updated_at = NOW()
      WHERE id = ? AND status = 'pending'
    `, [resetId]);
    
    // Update the admin approval status
    await connection.execute(`
      UPDATE admin_approvals
      SET 
        approver_id = ?,
        status = 'rejected',
        comments = ?,
        updated_at = NOW()
      WHERE module = 'password_resets' AND record_id = ?
    `, [approverId, reason, resetId]);
    
    return true;
  });
}

/**
 * Find a user by username or email
 * @param usernameOrEmail Username or email to search for
 * @returns User record if found, otherwise null
 */
export async function findUserByUsernameOrEmail(usernameOrEmail: string): Promise<any | null> {
  const users = await query(`
    SELECT * FROM users 
    WHERE (username = ? OR email = ?) 
      AND is_active = true
      AND deleted_at IS NULL
  `, [usernameOrEmail, usernameOrEmail]);
  
  return users.length > 0 ? users[0] : null;
}

/**
 * Get pending password reset requests for admin review
 * @returns Array of pending password reset requests with user information
 */
export async function getPendingPasswordResets(): Promise<any[]> {
  return await query(`
    SELECT 
      pr.id,
      pr.created_at,
      pr.updated_at,
      u.username,
      u.email,
      u.department,
      u.role
    FROM password_resets pr
    JOIN users u ON pr.user_id = u.id
    WHERE pr.status = 'pending'
      AND pr.proposed_hash IS NOT NULL
      AND pr.deleted_at IS NULL
    ORDER BY pr.created_at DESC
  `);
}
