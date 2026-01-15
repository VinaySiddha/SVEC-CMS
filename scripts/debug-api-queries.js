const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function debugQueries() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('✓ Connected to MySQL database\n');

    const dept = 'eee';
    const deptPrefix = dept.toLowerCase().replace(/-/g, '_');
    const newslettersTable = `${deptPrefix}_newsletters`;
    const hackathonsGalleryTable = `${deptPrefix}_hackathons_gallery`;

    // Test Newsletters Query
    console.log('📰 Testing Newsletters Query:');
    console.log(`   Table: ${newslettersTable}`);
    try {
      const [rows1] = await connection.query(
        `SELECT * FROM ${newslettersTable} ORDER BY year DESC, id DESC`
      );
      console.log(`   ✅ Query successful: ${rows1.length} records found\n`);
    } catch (err) {
      console.log(`   ❌ Query failed: ${err.message}\n`);
    }

    // Test Product Development Gallery Query
    console.log('🎨 Testing Product Development Gallery Query:');
    console.log(`   Table: ${hackathonsGalleryTable}`);
    console.log(`   Category filter: 'pd'\n`);
    try {
      const [rows2] = await connection.query(
        `SELECT * FROM ${hackathonsGalleryTable} WHERE category = 'pd' ORDER BY id DESC`
      );
      console.log(`   ✅ Query successful: ${rows2.length} records found`);
      if (rows2.length === 0) {
        console.log('   ⚠️  No records with category="pd" found\n');
        
        // Check what categories exist
        const [categories] = await connection.query(
          `SELECT DISTINCT category FROM ${hackathonsGalleryTable} ORDER BY category`
        );
        console.log('   Available categories:');
        categories.forEach((cat) => {
          console.log(`     - "${cat.category}"`);
        });
      }
    } catch (err) {
      console.log(`   ❌ Query failed: ${err.message}\n`);
    }

  } catch (error) {
    console.error('❌ Connection Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

debugQueries();
