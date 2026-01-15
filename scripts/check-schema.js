const mysql = require('mysql2/promise');

async function checkTableSchema() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Check cai_hackathons table
    const [hackColumns] = await connection.execute('DESCRIBE cai_hackathons');
    console.log('📋 cai_hackathons table columns:');
    console.log('─'.repeat(60));
    hackColumns.forEach((col, idx) => {
      console.log(`${idx + 1}. ${col.Field.padEnd(20)} | Type: ${col.Type.padEnd(20)} | Null: ${col.Null}`);
    });

    console.log('\n📊 Data in cai_hackathons:');
    const [hackData] = await connection.execute('SELECT * FROM cai_hackathons LIMIT 10');
    hackData.forEach((row, idx) => {
      console.log(`${idx + 1}. ${JSON.stringify(row)}`);
    });
    console.log(`\n✅ Total records: ${hackData.length}`);

    // Check cai_hackathon_gallery table
    const [galleryColumns] = await connection.execute('DESCRIBE cai_hackathon_gallery');
    console.log('\n📋 cai_hackathon_gallery table columns:');
    console.log('─'.repeat(60));
    galleryColumns.forEach((col, idx) => {
      console.log(`${idx + 1}. ${col.Field.padEnd(20)} | Type: ${col.Type.padEnd(20)} | Null: ${col.Null}`);
    });

    console.log('\n📊 Data in cai_hackathon_gallery:');
    const [galleryData] = await connection.execute('SELECT * FROM cai_hackathons_gallery LIMIT 10');
    galleryData.forEach((row, idx) => {
      console.log(`${idx + 1}. ${JSON.stringify(row)}`);
    });
    console.log(`\n✅ Total records: ${galleryData.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkTableSchema();
