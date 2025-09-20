/**
 * Quick database structure checker - standalone version
 */
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser', 
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkUserTableStructure() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Checking users table structure...');
    const [structure] = await connection.execute('DESCRIBE users');
    
    console.log('Users table columns:');
    console.table(structure);
    
    // Also get a sample of data to see what exists
    const [sampleData] = await connection.execute('SELECT * FROM users LIMIT 1');
    console.log('Sample user data:', sampleData[0]);
    
    return structure;
  } catch (error) {
    console.error('Error checking table structure:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUserTableStructure().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch((error) => {
  console.error('Failed:', error);
  process.exit(1);
});