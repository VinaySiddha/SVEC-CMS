// This should match the secret used on the server side
export const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';

// Token expiry time (e.g., 24 hours)
export const JWT_EXPIRES_IN = '24h';