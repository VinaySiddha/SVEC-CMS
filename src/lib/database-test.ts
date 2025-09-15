/**
 * Database connection test utility
 * Use this to diagnose connection issues
 */

import { query } from '@/lib/db';

export async function testDatabaseConnection() {
  const testResults = {
    connected: false,
    responseTime: 0,
    error: null as string | null,
    serverInfo: null as any,
    timestamp: new Date().toISOString()
  };

  const startTime = Date.now();
  
  try {
    console.log('Testing database connection...');
    
    // Simple query to test connection
    const result = await query('SELECT 1 as test, VERSION() as mysql_version, NOW() as server_time');
    
    testResults.responseTime = Date.now() - startTime;
    testResults.connected = true;
    testResults.serverInfo = result[0];
    
    console.log('Database connection successful:', {
      responseTime: testResults.responseTime + 'ms',
      serverInfo: testResults.serverInfo
    });
    
  } catch (error: any) {
    testResults.responseTime = Date.now() - startTime;
    testResults.error = error.message || 'Unknown error';
    testResults.connected = false;
    
    console.error('Database connection failed:', {
      error: error.message,
      code: error.code,
      responseTime: testResults.responseTime + 'ms'
    });
  }
  
  return testResults;
}

export async function testTableAccess(tableName: string = 'users') {
  const testResults = {
    accessible: false,
    recordCount: 0,
    responseTime: 0,
    error: null as string | null,
    timestamp: new Date().toISOString()
  };

  const startTime = Date.now();
  
  try {
    console.log(`Testing table access: ${tableName}`);
    
    // Test basic table access
    const result = await query(`SELECT COUNT(*) as count FROM ${tableName} LIMIT 1`);
    
    testResults.responseTime = Date.now() - startTime;
    testResults.accessible = true;
    testResults.recordCount = (result[0] as any).count;
    
    console.log(`Table ${tableName} access successful:`, {
      recordCount: testResults.recordCount,
      responseTime: testResults.responseTime + 'ms'
    });
    
  } catch (error: any) {
    testResults.responseTime = Date.now() - startTime;
    testResults.error = error.message || 'Unknown error';
    testResults.accessible = false;
    
    console.error(`Table ${tableName} access failed:`, {
      error: error.message,
      code: error.code,
      responseTime: testResults.responseTime + 'ms'
    });
  }
  
  return testResults;
}

export async function runFullDatabaseTest() {
  console.log('Starting full database test...');
  
  const tests = {
    connection: await testDatabaseConnection(),
    usersTable: await testTableAccess('users'),
    departmentCredentialsTable: await testTableAccess('department_credentials'),
    auditLogsTable: await testTableAccess('audit_logs')
  };
  
  const allSuccessful = tests.connection.connected && 
                       tests.usersTable.accessible && 
                       tests.departmentCredentialsTable.accessible &&
                       tests.auditLogsTable.accessible;
  
  console.log('Database test results:', {
    overall: allSuccessful ? 'SUCCESS' : 'FAILED',
    tests
  });
  
  return {
    success: allSuccessful,
    results: tests,
    summary: {
      totalTests: 4,
      passed: Object.values(tests).filter(t => 
        'connected' in t ? t.connected : t.accessible
      ).length,
      avgResponseTime: Object.values(tests).reduce((sum, t) => sum + t.responseTime, 0) / 4
    }
  };
}