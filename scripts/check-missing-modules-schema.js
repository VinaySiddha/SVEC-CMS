const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

async function checkTableSchemas() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database\n');

    // Check aiml_eresources
    console.log('📋 aiml_eresources schema and sample data:');
    const [eresSchema] = await connection.execute("DESC aiml_eresources");
    console.log('Columns:', eresSchema.map(c => c.Field));
    const [eresSample] = await connection.execute("SELECT * FROM aiml_eresources WHERE dept = 'aiml' LIMIT 2");
    console.log(`Found ${eresSample.length} e-Resources records`);
    if (eresSample.length > 0) {
      console.log('Sample:', JSON.stringify(eresSample[0], null, 2));
    } else {
      console.log('No records found for aiml department');
      const [allRes] = await connection.execute("SELECT DISTINCT dept FROM aiml_eresources");
      console.log('Available departments:', allRes.map(r => r.dept));
    }

    console.log('\n');

    // Check aiml_department_library
    console.log('📋 aiml_department_library schema and sample data:');
    const [libSchema] = await connection.execute("DESC aiml_department_library");
    console.log('Columns:', libSchema.map(c => c.Field));
    const [libSample] = await connection.execute("SELECT * FROM aiml_department_library LIMIT 2");
    console.log(`Found ${libSample.length} library records`);
    if (libSample.length > 0) {
      console.log('Sample:', JSON.stringify(libSample[0], null, 2));
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

checkTableSchemas();
