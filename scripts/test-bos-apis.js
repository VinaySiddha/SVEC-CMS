const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

async function testAPIs() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check unique dept values
    console.log('📋 Checking unique dept values in aiml_bos_members:');
    const [depts] = await connection.execute(
      "SELECT DISTINCT dept FROM aiml_bos_members"
    );
    console.log('Departments:', depts.map(d => d.dept));

    console.log('\n');

    // Test aiml-bos-members query with any dept
    console.log('📋 Testing aiml-bos-members API query:');
    const [members] = await connection.execute(
      "SELECT id, dept, name, designation, organization, position_in_job FROM aiml_bos_members ORDER BY id ASC"
    );
    console.log(`Found ${members.length} members`);
    if (members.length > 0) {
      console.log('Sample:', JSON.stringify(members[0], null, 2));
    }

    console.log('\n');

    // Test aiml-bos-minutes query
    console.log('📋 Testing aiml-bos-minutes API query:');
    const [minutes] = await connection.execute(
      "SELECT id, dept, meeting_no, meeting_date, file_url FROM aiml_bos_minutes ORDER BY id DESC"
    );
    console.log(`Found ${minutes.length} meeting minutes`);
    if (minutes.length > 0) {
      console.log('Sample:', JSON.stringify(minutes[0], null, 2));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

testAPIs();
