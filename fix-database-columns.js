const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000
};

async function fixDatabaseColumns() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    
    console.log('🔧 Fixing missing database columns...\n');
    
    // Check existing columns in users table
    console.log('1. Checking users table structure...');
    const [usersCols] = await connection.execute('DESCRIBE users');
    const existingUserCols = usersCols.map(col => col.Field);
    
    const requiredUserCols = [
      { name: 'last_login', type: 'TIMESTAMP NULL' },
      { name: 'login_count', type: 'INT UNSIGNED NOT NULL DEFAULT 0' },
      { name: 'password_changed_at', type: 'TIMESTAMP NULL' },
      { name: 'must_change_password', type: 'BOOLEAN NOT NULL DEFAULT FALSE' }
    ];
    
    for (const col of requiredUserCols) {
      if (!existingUserCols.includes(col.name)) {
        console.log(`   Adding column: ${col.name}`);
        await connection.execute(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`);
        console.log(`   ✅ Added ${col.name}`);
      } else {
        console.log(`   ✅ ${col.name} already exists`);
      }
    }
    
    // Check existing columns in audit_logs table
    console.log('\n2. Checking audit_logs table structure...');
    const [auditCols] = await connection.execute('DESCRIBE audit_logs');
    const existingAuditCols = auditCols.map(col => col.Field);
    
    const requiredAuditCols = [
      { name: 'department', type: "VARCHAR(32) NULL" },
      { name: 'severity', type: "ENUM('info', 'warning', 'error', 'critical') NOT NULL DEFAULT 'info'" },
      { name: 'status', type: "ENUM('pending', 'success', 'failed') NOT NULL DEFAULT 'success'" },
      { name: 'metadata', type: 'JSON NULL' },
      { name: 'session_id', type: 'VARCHAR(255) NULL' }
    ];
    
    for (const col of requiredAuditCols) {
      if (!existingAuditCols.includes(col.name)) {
        console.log(`   Adding column: ${col.name}`);
        await connection.execute(`ALTER TABLE audit_logs ADD COLUMN ${col.name} ${col.type}`);
        console.log(`   ✅ Added ${col.name}`);
      } else {
        console.log(`   ✅ ${col.name} already exists`);
      }
    }
    
    // Verify the tables now have the correct structure
    console.log('\n📋 Verifying table structures...\n');
    
    console.log('Users table structure:');
    const [finalUsersCols] = await connection.execute('DESCRIBE users');
    finalUsersCols.forEach(col => {
      if (['last_login', 'login_count', 'password_changed_at', 'must_change_password'].includes(col.Field)) {
        console.log(`   ✅ ${col.Field}: ${col.Type}`);
      }
    });
    
    console.log('\nAudit logs table structure:');
    const [finalAuditCols] = await connection.execute('DESCRIBE audit_logs');
    finalAuditCols.forEach(col => {
      if (['department', 'severity', 'status', 'metadata', 'session_id'].includes(col.Field)) {
        console.log(`   ✅ ${col.Field}: ${col.Type}`);
      }
    });
    
    await connection.end();
    console.log('\n🎉 Database columns fixed successfully!');
    console.log('\nYou can now restart your application and try logging in again.');
    
  } catch (error) {
    console.error('❌ Error fixing database columns:', error.message);
    throw error;
  }
}

fixDatabaseColumns();