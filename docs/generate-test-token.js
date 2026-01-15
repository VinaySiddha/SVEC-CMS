const jwt = require('jsonwebtoken');

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';

// Create a test admin user payload for CSE-AI department
const testUser = {
  id: 14,
  username: 'cse_ai_admin',
  department: 'cse-ai',
  role: 'admin',  // Use admin role to ensure access
  permissions: []
};

// Generate token with 8 hour expiration
const token = jwt.sign(testUser, JWT_SECRET, { 
  expiresIn: '8h'
});

console.log('Generated fresh admin token for CSE-AI:');
console.log(token);
console.log('\nToken details:');
const decoded = jwt.decode(token);
console.log('User:', decoded.username);
console.log('Department:', decoded.department);
console.log('Role:', decoded.role);
console.log('Expires at:', new Date(decoded.exp * 1000));