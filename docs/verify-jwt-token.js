/**
 * JWT Token Verification Script
 * Run this to verify that JWT tokens are working correctly
 * Usage: node verify-jwt-token.js
 */

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

console.log('=== JWT Configuration Check ===\n');
console.log('1. JWT_SECRET loaded:', JWT_SECRET === 'default_jwt_secret' ? '❌ Using fallback (BAD!)' : '✅ From environment');
console.log('   Value:', JWT_SECRET.substring(0, 20) + '...\n');

// Create a test token
const testPayload = {
  id: 1,
  username: 'test_user',
  email: 'test@example.com',
  department: 'cse-ai',
  role: 'admin'
};

console.log('2. Creating test token...');
const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: '24h' });
console.log('   ✅ Token created successfully');
console.log('   Length:', token.length);
console.log('   Preview:', token.substring(0, 50) + '...\n');

// Verify the token
console.log('3. Verifying token...');
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log('   ✅ Token verified successfully');
  console.log('   Decoded payload:', JSON.stringify(decoded, null, 2));
} catch (error) {
  console.log('   ❌ Token verification failed:', error.message);
}

console.log('\n=== Test Complete ===');
console.log('\nIf all checks passed (✅), your JWT configuration is correct.');
console.log('If you see ❌, check that:');
console.log('  1. .env.local file exists in the project root');
console.log('  2. JWT_SECRET is defined in .env.local');
console.log('  3. The development server was restarted after changes');
