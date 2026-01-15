const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testExtraCurricularAPI() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    // Check table structure
    const [tableInfo] = await connection.query("DESCRIBE cai_extra_curricular");
    console.log('📋 cai_extra_curricular table structure:');
    console.log(tableInfo);
    console.log();

    // Check if there's any data
    const [rows] = await connection.query("SELECT * FROM cai_extra_curricular");
    
    console.log(`📊 Total records in cai_extra_curricular: ${rows.length}`);
    
    if (rows.length > 0) {
      console.log('\n📋 Sample data:');
      console.log(JSON.stringify(rows.slice(0, 3), null, 2));
    } else {
      console.log('\n⚠️  No records found in cai_extra_curricular table');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

testExtraCurricularAPI();
