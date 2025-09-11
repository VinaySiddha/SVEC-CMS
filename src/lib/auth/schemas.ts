import { z } from 'zod';

// Define schema for login request
export const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
});

// Define schema for user
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
  department: z.string().nullable().optional()
});

// Define schema for login response
export const LoginResponseSchema = z.object({
  ok: z.boolean(),
  user: UserSchema.optional(),
  error: z.string().optional()
});

// Types derived from schemas
export type LoginRequest = z.infer<typeof LoginSchema>;
export type User = z.infer<typeof UserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
