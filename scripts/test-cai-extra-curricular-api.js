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

    const [rows] = await connection.query(
      "SELECT id, title, batch, file_url FROM cai_extra_curricular ORDER BY id DESC"
    );

    console.log('📋 Testing /api/cai-extra-curricular response:\n');
    console.log(JSON.stringify(rows, null, 2));
    console.log(`\n✅ Total records: ${rows.length}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

testExtraCurricularAPI();
