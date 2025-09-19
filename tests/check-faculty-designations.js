const mysql = require('mysql2/promise');

async function checkFacultyDesignations() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Check EEE faculty designations
    const [designations] = await connection.execute(
      'SELECT DISTINCT designation FROM faculty_profiles WHERE dept = ? ORDER BY designation',
      ['EEE']
    );
    
    console.log('\n=== EEE Faculty Designations ===');
    designations.forEach((row, index) => {
      console.log(`${index + 1}. ${row.designation}`);
    });

    // Get faculty with their designations
    const [faculty] = await connection.execute(
      'SELECT name, designation FROM faculty_profiles WHERE dept = ? ORDER BY name',
      ['EEE']
    );
    
    console.log('\n=== EEE Faculty List ===');
    faculty.forEach((row, index) => {
      console.log(`${index + 1}. ${row.name} - ${row.designation}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkFacultyDesignations();