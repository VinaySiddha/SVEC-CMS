const mysql = require('mysql2/promise');

async function checkTables() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database');
    
    // Show all tables
    console.log('\n=== All Tables in Database ===');
    const [tables] = await connection.execute('SHOW TABLES');
    tables.forEach((table, index) => {
      console.log(`${index + 1}. ${Object.values(table)[0]}`);
    });
    
    // Check specifically for syllabus-related tables
    console.log('\n=== Looking for Syllabus-related Tables ===');
    const [syllabusSearch] = await connection.execute("SHOW TABLES LIKE '%syllabus%'");
    if (syllabusSearch.length > 0) {
      syllabusSearch.forEach(table => {
        console.log('Found:', Object.values(table)[0]);
      });
    } else {
      console.log('❌ No syllabus-related tables found');
    }
    
    // Check for document-related tables
    console.log('\n=== Looking for Document-related Tables ===');
    const [docSearch] = await connection.execute("SHOW TABLES LIKE '%document%'");
    if (docSearch.length > 0) {
      docSearch.forEach(table => {
        console.log('Found:', Object.values(table)[0]);
      });
    } else {
      console.log('❌ No document-related tables found');
    }

    // Check for other content tables
    console.log('\n=== Looking for Content-related Tables ===');
    const [contentSearch] = await connection.execute("SHOW TABLES LIKE '%content%'");
    if (contentSearch.length > 0) {
      contentSearch.forEach(table => {
        console.log('Found:', Object.values(table)[0]);
      });
    } else {
      console.log('❌ No content-related tables found');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkTables();