#!/bin/bash

echo "🚀 Testing CST Admin Dashboard API Routes"
echo "========================================="

# Test login first to get a token
echo "📝 Testing login..."
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"identifier":"cst_admin","password":"CSTAdmin@2024"}')

echo "Login Response: $LOGIN_RESPONSE"

# Extract token (this is a simple extraction - in a real script you'd use jq)
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed - no token received"
  echo "Please check:"
  echo "1. Development server is running (npm run dev)"
  echo "2. CST admin credentials are correct"
  echo "3. Database is accessible"
  exit 1
fi

echo "✅ Login successful - token: ${TOKEN:0:20}..."

# Test CST faculty module
echo ""
echo "📊 Testing CST Faculty Module..."
FACULTY_RESPONSE=$(curl -s -X GET "http://localhost:3000/api/admin/departments/cst/faculty" \
  -H "Authorization: Bearer $TOKEN")

echo "Faculty Response: ${FACULTY_RESPONSE:0:200}..."

# Test CST student achievements module  
echo ""
echo "🏆 Testing CST Student Achievements Module..."
ACHIEVEMENTS_RESPONSE=$(curl -s -X GET "http://localhost:3000/api/admin/departments/cst/student-achievements" \
  -H "Authorization: Bearer $TOKEN")

echo "Achievements Response: ${ACHIEVEMENTS_RESPONSE:0:200}..."

# Test table structure endpoint
echo ""
echo "🏗️ Testing Table Structure Endpoint..."
STRUCTURE_RESPONSE=$(curl -s -X GET "http://localhost:3000/api/admin/departments/cst/faculty/structure" \
  -H "Authorization: Bearer $TOKEN")

echo "Structure Response: ${STRUCTURE_RESPONSE:0:200}..."

echo ""
echo "✅ API testing complete!"
echo "If you see JSON responses above, the API routes are working correctly."
echo "If you see HTML or error messages, there are still issues to resolve."