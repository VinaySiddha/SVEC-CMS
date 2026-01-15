const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

async function checkBOSSchema() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully\n');

    // Check aiml_bos_members table
    console.log('📋 Checking aiml_bos_members table...');
    try {
      const [bosMembers] = await connection.execute('SELECT * FROM aiml_bos_members LIMIT 5');
      console.log(`Found ${bosMembers.length} records in aiml_bos_members`);
      if (bosMembers.length > 0) {
        console.log('Sample record:', JSON.stringify(bosMembers[0], null, 2));
        console.log('Columns:', Object.keys(bosMembers[0]));
      }
    } catch (err) {
      console.log('⚠️ aiml_bos_members table not found or error:', err.message);
    }

    console.log('\n');

    // Check aiml_bos_miutes table (note the typo in table name)
    console.log('📋 Checking aiml_bos_miutes table...');
    try {
      const [bosMiutes] = await connection.execute('SELECT * FROM aiml_bos_miutes LIMIT 5');
      console.log(`Found ${bosMiutes.length} records in aiml_bos_miutes`);
      if (bosMiutes.length > 0) {
        console.log('Sample record:', JSON.stringify(bosMiutes[0], null, 2));
        console.log('Columns:', Object.keys(bosMiutes[0]));
      }
    } catch (err) {
      console.log('⚠️ aiml_bos_miutes table not found or error:', err.message);
    }

    console.log('\n');

    // Check aiml_bos_minutes table (correct spelling)
    console.log('📋 Checking aiml_bos_minutes table...');
    try {
      const [bosMinutes] = await connection.execute('SELECT * FROM aiml_bos_minutes LIMIT 5');
      console.log(`Found ${bosMinutes.length} records in aiml_bos_minutes`);
      if (bosMinutes.length > 0) {
        console.log('Sample record:', JSON.stringify(bosMinutes[0], null, 2));
        console.log('Columns:', Object.keys(bosMinutes[0]));
      }
    } catch (err) {
      console.log('⚠️ aiml_bos_minutes table not found or error:', err.message);
    }

    console.log('\n');

    // List all tables
    console.log('📊 All tables in database:');
    const [tables] = await connection.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ?", [dbConfig.database]);
    const bosRelatedTables = tables.filter(t => t.TABLE_NAME.includes('bos'));
    console.log('BOS-related tables:', bosRelatedTables.map(t => t.TABLE_NAME));

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

checkBOSSchema();
