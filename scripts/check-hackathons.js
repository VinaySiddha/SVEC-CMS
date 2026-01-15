const mysql = require('mysql2/promise');

async function checkHackathonsTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Get table structure
    const [columns] = await connection.execute(
      'DESCRIBE cai_hackathons'
    );

    console.log('📋 cai_hackathons table columns:');
    console.log('─'.repeat(70));
    columns.forEach((col, idx) => {
      console.log(`${idx + 1}. ${col.Field.padEnd(20)} | Type: ${col.Type.padEnd(20)} | Null: ${col.Null}`);
    });

    console.log('\n📊 Data in cai_hackathons table:');
    const [data] = await connection.execute(
      'SELECT * FROM cai_hackathons LIMIT 10'
    );
    
    if (data.length === 0) {
      console.log('⚠️  No records found in cai_hackathons table');
    } else {
      data.forEach((row, idx) => {
        console.log(`${idx + 1}. Title: ${row.title || 'N/A'} | Dept: ${row.dept || 'N/A'}`);
      });
    }

    console.log(`\n✅ Total records: ${data.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkHackathonsTable();
