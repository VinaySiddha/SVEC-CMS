import mysql from 'mysql2/promise';

async function checkCivilTable() {
  const conn = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔍 Checking civil_technical_faculty table...\n');

    // Check if table exists
    const [tables] = await conn.execute(
      'SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?',
      ['svec_cms', 'civil_technical_faculty']
    );

    if (tables.length === 0) {
      console.log('❌ Table civil_technical_faculty does NOT exist');
    } else {
      console.log('✅ Table civil_technical_faculty EXISTS');
      
      // Get table structure
      const [columns] = await conn.execute('DESCRIBE civil_technical_faculty');
      console.log('\nTable Columns:');
      console.table(columns);
      
      // Get record count
      const [count] = await conn.execute('SELECT COUNT(*) as total FROM civil_technical_faculty');
      console.log(`\nTotal records: ${count[0].total}`);
      
      // Get sample data
      if (count[0].total > 0) {
        const [sample] = await conn.execute('SELECT * FROM civil_technical_faculty LIMIT 3');
        console.log('\nSample Records:');
        console.table(sample);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await conn.end();
  }
}

checkCivilTable();
