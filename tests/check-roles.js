const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000
};

async function checkRoles() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    
    console.log('Checking role enum values...');
    const [columns] = await connection.execute("SHOW COLUMNS FROM users LIKE 'role'");
    console.log('Role column definition:');
    console.table(columns);
    
    console.log('\nExisting roles in database...');
    const [roles] = await connection.execute('SELECT DISTINCT role FROM users WHERE role IS NOT NULL');
    console.table(roles);
    
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkRoles();