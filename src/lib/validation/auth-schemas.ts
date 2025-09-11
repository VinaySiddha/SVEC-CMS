import { z } from 'zod';

/**
 * Schema for password forget/reset requests
 */

// Forgot password request schema
export const ForgotPasswordSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required')
});

// Reset password token confirmation schema
export const ResetPasswordConfirmSchema = z.object({
  token: z.string().uuid('Invalid token format'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
});

// Change password schema (from dashboard)
export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .refine(val => /[A-Z]/.test(val), 'Password must contain at least one uppercase letter')
    .refine(val => /[0-9]/.test(val), 'Password must contain at least one number')
});

/**
 * Admin approval schemas
 */

// Password reset approval schema
export const PasswordResetApprovalSchema = z.object({
  id: z.number().int().positive('Invalid reset ID'),
  approved: z.boolean(),
  reason: z.string().optional()
});

// Password reset rejection schema
export const PasswordResetRejectionSchema = z.object({
  id: z.number().int().positive('Invalid reset ID'),
  reason: z.string().min(1, 'Rejection reason is required')
});

// Type definitions for the schemas
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordConfirmRequest = z.infer<typeof ResetPasswordConfirmSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
export type PasswordResetApprovalRequest = z.infer<typeof PasswordResetApprovalSchema>;
export type PasswordResetRejectionRequest = z.infer<typeof PasswordResetRejectionSchema>;
