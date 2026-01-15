const mysql = require('mysql2/promise');

async function checkData() {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('Connected to database...\n');

    // Check all records
    const [allRows] = await connection.execute('SELECT * FROM cai_merit_scholarships');
    console.log('📊 All records in cai_merit_scholarships table:');
    console.table(allRows);

    // Check CSE-AI records specifically
    const [cseaiRows] = await connection.execute("SELECT * FROM cai_merit_scholarships WHERE dept IN ('cseai', 'cse-ai', 'CSE-AI')");
    console.log('\n📊 CSE-AI records:');
    console.table(cseaiRows);

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkData();
