/**
 * Test script to verify database connection and user creation functionality
 */

import { testDatabaseConnection, testTableAccess, runFullDatabaseTest } from '@/lib/database-test';
import { query } from '@/lib/db';

async function testUserCreation() {
  console.log('Testing user table schema...');
  
  try {
    // Get the user table structure
    const tableStructure = await query('DESCRIBE users');
    console.log('Users table structure:', tableStructure);
    
    // Check if password_hash column exists
    const passwordColumn = tableStructure.find((col: any) => col.Field === 'password_hash');
    if (passwordColumn) {
      console.log('✅ password_hash column exists:', passwordColumn);
    } else {
      console.log('❌ password_hash column not found');
      console.log('Available columns:', tableStructure.map((col: any) => col.Field));
    }
    
    return {
      success: !!passwordColumn,
      structure: tableStructure,
      hasPasswordHash: !!passwordColumn
    };
    
  } catch (error) {
    console.error('Error testing user table:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      hasPasswordHash: false
    };
  }
}

async function testUserQuery() {
  console.log('Testing user count query...');
  
  try {
    const result = await query('SELECT COUNT(*) as count FROM users');
    const userCount = (result[0] as any).count;
    
    console.log(`✅ Users table accessible, ${userCount} users found`);
    
    return {
      success: true,
      userCount,
      accessible: true
    };
    
  } catch (error) {
    console.error('Error querying users table:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      accessible: false
    };
  }
}

export async function runUserManagementTests() {
  console.log('🧪 Starting User Management System Tests...\n');
  
  const results = {
    database: await testDatabaseConnection(),
    userTable: await testTableAccess('users'),
    userSchema: await testUserCreation(),
    userQuery: await testUserQuery(),
    timestamp: new Date().toISOString()
  };
  
  const allPassed = results.database.connected &&
                   results.userTable.accessible &&
                   results.userSchema.success &&
                   results.userQuery.success;
  
  console.log('\n📊 Test Results Summary:');
  console.log('=' .repeat(50));
  console.log(`Database Connection: ${results.database.connected ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`User Table Access: ${results.userTable.accessible ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`User Schema Check: ${results.userSchema.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`User Query Test: ${results.userQuery.success ? '✅ PASS' : '❌ FAIL'}`);
  console.log('=' .repeat(50));
  console.log(`Overall Result: ${allPassed ? '🎉 ALL TESTS PASSED' : '⚠️ SOME TESTS FAILED'}\n`);
  
  if (!allPassed) {
    console.log('❗ Issues found:');
    if (!results.database.connected) {
      console.log(`- Database connection failed: ${results.database.error}`);
    }
    if (!results.userTable.accessible) {
      console.log(`- User table access failed: ${results.userTable.error}`);
    }
    if (!results.userSchema.success) {
      console.log(`- User schema issue: ${results.userSchema.error || 'password_hash column missing'}`);
    }
    if (!results.userQuery.success) {
      console.log(`- User query failed: ${results.userQuery.error}`);
    }
  }
  
  return {
    success: allPassed,
    results,
    summary: {
      totalTests: 4,
      passed: [results.database.connected, results.userTable.accessible, results.userSchema.success, results.userQuery.success].filter(Boolean).length,
      avgResponseTime: (results.database.responseTime + results.userTable.responseTime) / 2
    }
  };
}