const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Database configuration from .env
const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function printStatus(message) {
  console.log(`${colors.blue}[INFO]${colors.reset} ${message}`);
}

function printSuccess(message) {
  console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
}

function printWarning(message) {
  console.log(`${colors.yellow}[WARNING]${colors.reset} ${message}`);
}

function printError(message) {
  console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function questionHidden(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let input = '';
    process.stdin.on('data', (char) => {
      char = char + '';
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(input);
          break;
        case '\u0003':
          process.exit(1);
          break;
        case '\u0008':
        case '\u007f':
          if (input.length > 0) {
            input = input.slice(0, -1);
            process.stdout.write('\u0008 \u0008');
          }
          break;
        default:
          input += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

async function testDatabaseConnection() {
  printStatus('Testing remote database connection...');
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    await connection.execute('SELECT 1');
    await connection.end();
    printSuccess('Remote database connection successful!');
    return true;
  } catch (error) {
    printError('Cannot connect to remote database.');
    printError(`Host: ${DB_CONFIG.host}:${DB_CONFIG.port}`);
    printError(`User: ${DB_CONFIG.user}`);
    printError(`Database: ${DB_CONFIG.database}`);
    printError(`Error: ${error.message}`);
    return false;
  }
}

async function checkExistingSchema() {
  printStatus('Checking existing database schema...');
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    const [rows] = await connection.execute(
      "SHOW TABLES LIKE 'super_admin_permissions'"
    );
    await connection.end();
    
    if (rows.length > 0) {
      printWarning('Super admin tables already exist.');
      const answer = await question('Do you want to recreate them? (y/N): ');
      if (answer.toLowerCase() === 'y') {
        await dropExistingTables();
        return true;
      } else {
        printStatus('Skipping schema creation.');
        return false;
      }
    }
    return true;
  } catch (error) {
    printError(`Failed to check existing schema: ${error.message}`);
    return false;
  }
}

async function dropExistingTables() {
  printStatus('Dropping existing super admin tables...');
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    
    const tables = [
      'super_admin_permissions',
      'department_credentials', 
      'audit_logs',
      'system_settings',
      'department_data_access'
    ];
    
    for (const table of tables) {
      await connection.execute(`DROP TABLE IF EXISTS ${table}`);
    }
    
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    await connection.end();
    
    printSuccess('Existing tables dropped successfully!');
  } catch (error) {
    printError(`Failed to drop tables: ${error.message}`);
    throw error;
  }
}

async function createSchema() {
  printStatus('Creating super admin database schema on remote server...');
  try {
    const schemaPath = path.join(__dirname, 'super_admin_schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      printError('super_admin_schema.sql file not found!');
      return false;
    }
    
    const sqlContent = fs.readFileSync(schemaPath, 'utf8');
    const connection = await mysql.createConnection(DB_CONFIG);
    
    // Split SQL content by semicolons and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.execute(statement);
        } catch (error) {
          // Skip errors for statements that might already exist or are comments
          if (!error.message.includes('already exists') && 
              !error.message.includes('Duplicate column name')) {
            console.warn(`Warning: ${error.message}`);
          }
        }
      }
    }
    
    await connection.end();
    printSuccess('Super admin schema created successfully on remote database!');
    return true;
  } catch (error) {
    printError(`Failed to create schema: ${error.message}`);
    return false;
  }
}

async function createSuperAdminUser() {
  console.log('');
  printStatus('Creating initial super admin user...');
  console.log('Please provide details for the first super admin account:');
  
  let username, email, password;
  
  // Get username
  do {
    username = await question('Enter super admin username: ');
    if (!username.trim()) {
      printError('Username cannot be empty!');
    }
  } while (!username.trim());
  
  // Get email
  do {
    email = await question('Enter super admin email: ');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      printError('Please enter a valid email address!');
    }
  } while (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  
  // Get password
  do {
    password = await questionHidden('Enter super admin password (min 8 characters): ');
    if (password.length < 8) {
      printError('Password must be at least 8 characters long!');
    }
  } while (password.length < 8);
  
  try {
    // Check if user already exists
    printStatus('Checking if user already exists...');
    const connection = await mysql.createConnection(DB_CONFIG);
    
    const [existingUsers] = await connection.execute(
      'SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existingUsers[0].count > 0) {
      printError('A user with this username or email already exists!');
      await connection.end();
      return false;
    }
    
    // Hash password
    printStatus('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Insert super admin user
    printStatus('Creating super admin user in remote database...');
    const [result] = await connection.execute(
      `INSERT INTO users (username, email, password_hash, department, department_name, role, is_active, created_at) 
       VALUES (?, ?, ?, 'admin', 'System Administration', 'super_admin', 1, NOW())`,
      [username, email, hashedPassword]
    );
    
    const userId = result.insertId;
    
    // Grant default permissions
    printStatus('Setting up default super admin permissions...');
    const permissions = [
      'manage_users',
      'view_all_departments', 
      'create_credentials',
      'manage_system_settings',
      'view_audit_logs'
    ];
    
    for (const permission of permissions) {
      await connection.execute(
        'INSERT INTO super_admin_permissions (user_id, permission, is_active) VALUES (?, ?, 1)',
        [userId, permission]
      );
    }
    
    await connection.end();
    printSuccess('Super admin user created successfully in remote database!');
    printSuccess('Default permissions granted successfully!');
    
    return { username, email, userId };
  } catch (error) {
    printError(`Failed to create super admin user: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 Setting up Super Admin System for SVEC-CMS (Remote Database)...');
  console.log('');
  
  try {
    // Test database connection
    if (!(await testDatabaseConnection())) {
      process.exit(1);
    }
    
    // Check and handle existing schema
    if (await checkExistingSchema()) {
      // Create schema
      if (!(await createSchema())) {
        process.exit(1);
      }
    }
    
    // Create super admin user
    const userResult = await createSuperAdminUser();
    if (!userResult) {
      process.exit(1);
    }
    
    // Final success message
    console.log('');
    console.log('🎉 ============================================');
    printSuccess('Super Admin System Setup Complete!');
    console.log('============================================');
    console.log('');
    console.log('📋 Setup Summary:');
    console.log('   ✅ Remote database schema created');
    console.log(`   ✅ Super admin user created: ${userResult.username}`);
    console.log('   ✅ Default permissions granted');
    console.log('');
    console.log('🚀 Next Steps:');
    console.log('   1. Start the development server: npm run dev');
    console.log('   2. Navigate to: http://localhost:3000/super-admin/login');
    console.log('   3. Login with your super admin credentials');
    console.log('');
    console.log('🔗 Access Points:');
    console.log("   • Main Header: Click 'Super Admin' link");
    console.log('   • Direct URL: /super-admin/login');
    console.log('   • Dashboard: /super-admin/dashboard');
    console.log('');
    console.log('🛡️ Security Notes:');
    console.log(`   • Your remote database is at: ${DB_CONFIG.host}:${DB_CONFIG.port}`);
    console.log('   • All actions will be logged in audit_logs table');
    console.log('   • Change JWT_SECRET in production');
    console.log('   • Monitor audit logs regularly');
    console.log('');
    console.log('📊 Super Admin Features:');
    console.log('   ✅ Department Management');
    console.log('   ✅ User Credential Management');
    console.log('   ✅ System Statistics & Monitoring');
    console.log('   ✅ Audit Logging & Activity Tracking');
    console.log('   ✅ Role-based Access Control');
    console.log('   ✅ Clean Professional Interface');
    console.log('');
    printSuccess('Happy administrating! 🚀');
    
  } catch (error) {
    printError(`Setup failed: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };