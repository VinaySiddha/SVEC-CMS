const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function testNewslettersAPI() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('✓ Connected to MySQL database');

    const dept = 'eee';
    const deptPrefix = dept.toLowerCase().replace(/-/g, '_');
    const newslettersTable = `${deptPrefix}_newsletters`;

    console.log(`\n📋 Testing query for department: ${dept}`);
    console.log(`📊 Table name: ${newslettersTable}\n`);

    // Execute the exact query from the API
    const [rows] = await connection.query(
      `SELECT * FROM ${newslettersTable} ORDER BY year DESC, id DESC`
    );

    console.log(`✅ Query successful!`);
    console.log(`📰 Newsletters found: ${rows.length}`);
    
    if (rows.length > 0) {
      console.log('\n📋 Sample records:');
      rows.slice(0, 5).forEach((row, i) => {
        console.log(`\n  ${i + 1}. ID: ${row.id}`);
        console.log(`     Title: ${row.title}`);
        console.log(`     Year: ${row.year}`);
        console.log(`     Month: ${row.month}`);
        console.log(`     URL: ${row.url}`);
      });
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

testNewslettersAPI();
