const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkNewsletters() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('✓ Connected to MySQL database');

    // Check if table exists
    const [tableCheck] = await connection.query(
      'SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=? AND TABLE_NAME=?',
      ['svec_cms', 'eee_newsletters']
    );
    console.log('📋 Table eee_newsletters exists:', tableCheck[0].count > 0);

    // Get data from table
    const [rows] = await connection.query('SELECT * FROM eee_newsletters LIMIT 10');
    console.log(`📰 Newsletter records found: ${rows.length}`);
    if (rows.length > 0) {
      console.log('Column names:', Object.keys(rows[0]));
      console.log('Sample record:', JSON.stringify(rows[0], null, 2));
    } else {
      console.log('⚠️  No newsletters found in the table');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

checkNewsletters();
