import mysql from 'mysql2/promise';

async function testDSBOS() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('\n=== Checking DS BOS Members ===');
    const [members] = await connection.execute(
      'SELECT id, dept, name, designation, organization, position_in_job FROM ds_bos_members WHERE dept = ? ORDER BY id ASC',
      ['ds']
    );
    console.log(`Found ${members.length} BOS members:`);
    console.table(members);

    console.log('\n=== Checking DS BOS Minutes ===');
    const [minutes] = await connection.execute(
      'SELECT id, dept, meeting_no, meeting_date, file_url FROM ds_bos_minutes WHERE dept = ? ORDER BY id DESC',
      ['ds']
    );
    console.log(`Found ${minutes.length} BOS meeting minutes:`);
    console.table(minutes);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

testDSBOS();
