/**
 * Test script to verify database connection and user creation functionality
 */

import { testDatabaseConnection, testTableAccess, runFullDatabaseTest } from '@/lib/database-test';
import { query } from '@/lib/db';

async function testUserCreation() {
  
  try {
    // Get the user table structure
    const tableStructure = await query('DESCRIBE users');
    
    // Check if password_hash column exists
    const passwordColumn = tableStructure.find((col: any) => col.Field === 'password_hash');
    if (passwordColumn) {
    } else {
    }
    
    return {
      success: !!passwordColumn,
      structure: tableStructure,
      hasPasswordHash: !!passwordColumn
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      hasPasswordHash: false
    };
  }
}

async function testUserQuery() {
  
  try {
    const result = await query('SELECT COUNT(*) as count FROM users');
    const userCount = (result[0] as any).count;
    
    
    return {
      success: true,
      userCount,
      accessible: true
    };
    
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      accessible: false
    };
  }
}

export async function runUserManagementTests() {
  
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
  
  
  if (!allPassed) {
    if (!results.database.connected) {
    }
    if (!results.userTable.accessible) {
    }
    if (!results.userSchema.success) {
    }
    if (!results.userQuery.success) {
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