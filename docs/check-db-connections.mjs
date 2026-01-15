#!/usr/bin/env node

/**
 * Diagnostic script to check database connection status
 * Usage: node check-db-connections.mjs
 */

import mysql from 'mysql2/promise';

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkDatabaseStatus() {
  console.log('🔍 Checking MySQL Database Status...\n');
  
  try {
    // Create a simple connection to check status
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to database successfully\n');
    
    // Check max connections
    const [[maxConnResult]] = await connection.execute('SHOW VARIABLES LIKE "max_connections"');
    console.log('📊 Max Connections Setting:');
    console.log(`   ${maxConnResult.Variable_name}: ${maxConnResult.Value}\n`);
    
    // Check current connections
    const [[threadResult]] = await connection.execute('SHOW STATUS LIKE "Threads_connected"');
    console.log('📈 Current Active Connections:');
    console.log(`   ${threadResult.Variable_name}: ${threadResult.Value}\n`);
    
    // Check process list for sleep processes
    const [processes] = await connection.execute(`
      SELECT 
        ID, 
        USER, 
        HOST, 
        DB, 
        COMMAND, 
        TIME, 
        STATE,
        INFO
      FROM INFORMATION_SCHEMA.PROCESSLIST
      WHERE COMMAND = 'Sleep'
      LIMIT 10
    `);
    
    console.log('😴 Idle Connections (Sleep state):');
    console.log(`   Count: ${processes.length}\n`);
    
    if (processes.length > 0) {
      console.log('   Sample idle connections:');
      processes.slice(0, 5).forEach(p => {
        console.log(`   - ${p.USER}@${p.HOST} (${p.TIME}s idle)`);
      });
    }
    
    // Check cse_faculty table
    const [[tableInfo]] = await connection.execute('SELECT COUNT(*) as count FROM cse_faculty');
    console.log(`\n📚 CSE Faculty Records: ${tableInfo.count}\n`);
    
    // Check usage ratio
    const currentConnections = parseInt(threadResult.Value);
    const maxConnections = parseInt(maxConnResult.Value);
    const usagePercent = ((currentConnections / maxConnections) * 100).toFixed(2);
    
    console.log(`📊 Connection Pool Usage: ${usagePercent}%`);
    if (usagePercent > 80) {
      console.log('   ⚠️  WARNING: Connection pool is nearly full!');
      console.log('   Recommend: Contact database admin to increase max_connections');
    }
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Error connecting to database:');
    console.error(`   Code: ${error.code}`);
    console.error(`   Message: ${error.message}\n`);
    
    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('🚨 CRITICAL: Too many connections!');
      console.error('   Action: Contact database admin immediately');
      console.error('   Command: SHOW PROCESSLIST (admin check)');
      console.error('   Command: SET GLOBAL max_connections = 500 (admin fix)');
    }
  }
}

checkDatabaseStatus();
