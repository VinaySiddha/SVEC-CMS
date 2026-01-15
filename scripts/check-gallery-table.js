const mysql = require('mysql2/promise');

async function checkAndFixGalleryTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Check table structure
    console.log('📋 Checking cai_hackathons_gallery structure:');
    const [columns] = await connection.execute('DESCRIBE cai_hackathons_gallery');
    
    columns.forEach((col, idx) => {
      console.log(`${idx + 1}. ${col.Field.padEnd(20)} | Type: ${col.Type}`);
    });

    // Check if title column exists
    const hasTitleColumn = columns.some(col => col.Field === 'title');
    
    if (!hasTitleColumn) {
      console.log('\n📝 Adding title column...');
      await connection.execute('ALTER TABLE cai_hackathons_gallery ADD COLUMN title VARCHAR(255) DEFAULT NULL');
      console.log('✅ Added title column');
    }

    // Check current data
    console.log('\n📊 Current data in cai_hackathons_gallery:');
    const [data] = await connection.execute('SELECT * FROM cai_hackathons_gallery');
    
    data.forEach((row, idx) => {
      console.log(`${idx + 1}. ${JSON.stringify(row)}`);
    });

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

checkAndFixGalleryTable();
