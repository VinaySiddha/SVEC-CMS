import mysql from 'mysql2/promise';

async function checkTableStructure() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Checking ds_physical_facilities table structure...');
    const [columns] = await connection.execute('DESCRIBE ds_physical_facilities');
    console.log('Table columns:');
    console.table(columns);

    console.log('\nChecking existing data:');
    const [data] = await connection.execute('SELECT * FROM ds_physical_facilities LIMIT 5');
    console.log(`Found ${data.length} rows`);
    if (data.length > 0) {
      console.table(data);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkTableStructure();
