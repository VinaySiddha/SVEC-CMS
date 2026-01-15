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

async function checkAIMLSchema() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    // Check aiml_faculty columns
    const [facultyColumns] = await connection.query("DESCRIBE aiml_faculty");
    console.log('📋 aiml_faculty columns:');
    facultyColumns.forEach(col => console.log(`  - ${col.Field}: ${col.Type}`));
    
    // Check one sample record
    const [facultySample] = await connection.query("SELECT * FROM aiml_faculty LIMIT 1");
    console.log('\n📝 Sample aiml_faculty record:');
    console.log(JSON.stringify(facultySample[0], null, 2));

    console.log('\n---\n');

    // Check aiml_staff columns
    const [staffColumns] = await connection.query("DESCRIBE aiml_staff");
    console.log('📋 aiml_staff columns:');
    staffColumns.forEach(col => console.log(`  - ${col.Field}: ${col.Type}`));
    
    // Check one sample record
    const [staffSample] = await connection.query("SELECT * FROM aiml_staff LIMIT 1");
    console.log('\n📝 Sample aiml_staff record:');
    console.log(JSON.stringify(staffSample[0], null, 2));

    console.log('\n---\n');

    // Check aiml_technical_faculty columns
    const [tfColumns] = await connection.query("DESCRIBE aiml_technical_faculty");
    console.log('📋 aiml_technical_faculty columns:');
    tfColumns.forEach(col => console.log(`  - ${col.Field}: ${col.Type}`));
    
    // Check one sample record
    const [tfSample] = await connection.query("SELECT * FROM aiml_technical_faculty LIMIT 1");
    console.log('\n📝 Sample aiml_technical_faculty record:');
    console.log(JSON.stringify(tfSample[0], null, 2));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

checkAIMLSchema();
