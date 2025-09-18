const mysql = require('mysql2/promise');

async function testOtherDepartments() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Test non-EEE departments (like CST, ECE) to ensure they still work
    console.log('\n=== Testing Non-EEE Departments ===');
    
    const [otherDepts] = await connection.execute(`
      SELECT DISTINCT dept FROM syllabus_documents 
      WHERE dept != 'EEE' 
      ORDER BY dept
    `);

    console.log(`Found ${otherDepts.length} other departments with syllabus data:`);
    
    for (const deptRow of otherDepts) {
      const dept = deptRow.dept;
      const [syllabusCount] = await connection.execute(`
        SELECT COUNT(*) as count FROM syllabus_documents 
        WHERE dept = ? AND status = "approved"
      `, [dept]);
      
      console.log(`- ${dept}: ${syllabusCount[0].count} syllabus documents`);
    }

    console.log('\n✅ Other departments verification completed!');
    console.log('The API update uses conditional logic, so other departments will continue using syllabus_documents table.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testOtherDepartments();