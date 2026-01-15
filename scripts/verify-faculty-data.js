const mysql = require('mysql2/promise');

async function verifyFacultyData() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Check total faculty records
    const [totalCount] = await connection.execute(
      'SELECT COUNT(*) as total FROM cai_faculty'
    );
    console.log(`📊 Total faculty records in table: ${totalCount[0].total}`);

    // Check active records
    const [activeCount] = await connection.execute(
      'SELECT COUNT(*) as total FROM cai_faculty WHERE status = "active"'
    );
    console.log(`✅ Active faculty records: ${activeCount[0].total}`);

    // Check inactive/null status records
    const [inactiveCount] = await connection.execute(
      'SELECT COUNT(*) as total FROM cai_faculty WHERE status != "active" OR status IS NULL'
    );
    console.log(`⚠️  Inactive/null status records: ${inactiveCount[0].total}\n`);

    // Show first 5 records with their status
    console.log('📋 Sample records:');
    const [sample] = await connection.execute(
      'SELECT id, name, designation, status FROM cai_faculty LIMIT 5'
    );
    
    sample.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.name} - Status: "${row.status}"`);
    });

    // Update any NULL or missing status values to 'active'
    if (totalCount[0].total > activeCount[0].total) {
      console.log(`\n🔄 Updating ${inactiveCount[0].total} records to active status...`);
      await connection.execute(
        'UPDATE cai_faculty SET status = "active" WHERE status IS NULL OR status = "" OR status != "active"'
      );
      console.log('✅ Updated all records to active status');
    }

    // Verify the fix
    const [finalCount] = await connection.execute(
      'SELECT COUNT(*) as total FROM cai_faculty WHERE status = "active"'
    );
    console.log(`\n✅ Final active faculty count: ${finalCount[0].total}`);

    // Show all faculty that will be fetched by the API
    console.log('\n📝 Faculty that will be returned by API:');
    const [finalData] = await connection.execute(
      'SELECT id, name, qualification, designation, profileUrl FROM cai_faculty WHERE status = "active" ORDER BY id ASC'
    );

    finalData.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.name} (${row.qualification}) - ${row.designation}`);
    });

    console.log(`\n✅ Total records available: ${finalData.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

verifyFacultyData();
