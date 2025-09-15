const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000
};

async function checkUsersTable() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    
    console.log('=== USERS TABLE STRUCTURE ===');
    const [columns] = await connection.execute('DESCRIBE users');
    console.table(columns);
    
    console.log('\n=== EXISTING ROLES ===');
    const [roles] = await connection.execute('SELECT DISTINCT role FROM users WHERE role IS NOT NULL');
    console.table(roles);
    
    console.log('\n=== CHECK IF SUPER_ADMIN ROLE EXISTS ===');
    const [superAdmins] = await connection.execute("SELECT * FROM users WHERE role LIKE '%admin%'");
    console.log(`Found ${superAdmins.length} admin users:`);
    console.table(superAdmins);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkUsersTable();