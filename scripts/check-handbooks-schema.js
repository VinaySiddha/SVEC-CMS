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

async function checkHandbooksSchema() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    // Check aiml_handbooks columns
    const [columns] = await connection.query("DESCRIBE aiml_handbooks");
    console.log('📋 aiml_handbooks columns:');
    columns.forEach(col => console.log(`  - ${col.Field}: ${col.Type}`));
    
    // Check sample records
    const [samples] = await connection.query("SELECT * FROM aiml_handbooks LIMIT 3");
    console.log('\n📝 Sample aiml_handbooks records:');
    samples.forEach((s, idx) => {
      console.log(`\nRecord ${idx + 1}:`);
      console.log(JSON.stringify(s, null, 2));
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

checkHandbooksSchema();
