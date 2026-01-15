import mysql from 'mysql2/promise';

async function testSeminarHalls() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('\n=== Checking DS Seminar Halls Data ===');
    const [halls] = await connection.execute(
      'SELECT id, category, title, description, document_url FROM ds_physical_facilities WHERE category = ? ORDER BY id ASC',
      ['Seminar Halls']
    );
    console.log(`Found ${halls.length} Seminar Halls:`);
    console.table(halls);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

testSeminarHalls();
