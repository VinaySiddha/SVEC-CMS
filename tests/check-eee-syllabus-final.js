const mysql = require('mysql2/promise');

async function checkEEESyllabus() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database');
    
    // Check records by department (using correct column name 'dept')
    console.log('\n=== Records by Department ===');
    const [byDept] = await connection.execute('SELECT dept, COUNT(*) as count FROM syllabus_documents GROUP BY dept');
    byDept.forEach(row => {
      console.log(`${row.dept}: ${row.count} records`);
    });
    
    // Check specifically for EEE records
    console.log('\n=== EEE Department Records ===');
    const [eeeRecords] = await connection.execute('SELECT * FROM syllabus_documents WHERE dept = ? OR dept = ?', ['EEE', 'eee']);
    if (eeeRecords.length > 0) {
      console.log(`Found ${eeeRecords.length} EEE records:`);
      eeeRecords.forEach((record, index) => {
        console.log(`${index + 1}. ${record.title}`);
        console.log(`   - Type: ${record.type}, Regulation: ${record.regulation}, Semester: ${record.semester}`);
        console.log(`   - URL: ${record.document_url}`);
        console.log(`   - Status: ${record.status}`);
      });
    } else {
      console.log('❌ No EEE records found');
      
      // Check what departments do exist
      console.log('\n=== Available Departments ===');
      const [depts] = await connection.execute('SELECT DISTINCT dept FROM syllabus_documents ORDER BY dept');
      depts.forEach(row => {
        console.log(`- ${row.dept}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkEEESyllabus();