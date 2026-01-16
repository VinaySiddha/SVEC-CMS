#!/usr/bin/env node
/**
 * Verify JWT_SECRET configuration
 * This script checks if JWT_SECRET is properly loaded from environment
 */

require('dotenv').config({ path: '.env.local' });

const jwt = require('jsonwebtoken');

console.log('\n🔍 JWT Configuration Check\n');
console.log('═'.repeat(50));

// Check if JWT_SECRET is set
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret) {
  console.log('✅ JWT_SECRET is loaded from .env.local');
  console.log(`   Length: ${jwtSecret.length} characters`);
  console.log(`   Preview: ${jwtSecret.substring(0, 20)}...`);
} else {
  console.log('❌ JWT_SECRET is NOT set in environment');
  console.log('   Using fallback: "default_jwt_secret"');
}

console.log('\n' + '═'.repeat(50));

// Test token generation and verification
console.log('\n🧪 Testing Token Generation & Verification\n');

const testPayload = {
  id: 1,
  username: 'test_user',
  department: 'test',
  role: 'dept'
};

try {
  const secret = jwtSecret || 'default_jwt_secret';

  // Generate token
  const token = jwt.sign(testPayload, secret, { expiresIn: '8h' });
  console.log('✅ Token generated successfully');
  console.log(`   Token preview: ${token.substring(0, 50)}...`);

  // Verify token
  const decoded = jwt.verify(token, secret);
  console.log('✅ Token verified successfully');
  console.log(`   Decoded user: ${decoded.username}`);

  console.log('\n✅ JWT setup is working correctly!\n');
} catch (error) {
  console.log('\n❌ JWT test failed:', error.message);
  console.log('\n');
}
