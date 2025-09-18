const mysql = require('mysql2/promise');

async function testEEEAPIFix() {
  let connection;
  
  try {
    // Database connection
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Test the exact query that the API uses for EEE
    console.log('\n=== Testing EEE API Query ===');
    
    const [eeeResults] = await connection.execute(`
      SELECT * FROM EEE_Syllabus 
      WHERE status = ? 
      ORDER BY regulation DESC, type, academic_year DESC, semester
    `, ['active']);

    console.log(`✅ EEE Query Result: ${eeeResults.length} documents found`);
    
    // Test the query for other departments
    console.log('\n=== Testing Other Department Query ===');
    
    const [otherResults] = await connection.execute(`
      SELECT * FROM syllabus_documents 
      WHERE dept = ? AND status = ? 
      ORDER BY regulation DESC, type, academic_year DESC, semester
    `, ['cst', 'approved']);

    console.log(`✅ Other Department Query Result: ${otherResults.length} documents found`);

    // Test if all required fields exist in EEE_Syllabus
    console.log('\n=== Testing EEE_Syllabus Structure ===');
    const [structure] = await connection.execute('DESCRIBE EEE_Syllabus');
    console.log('EEE_Syllabus columns:');
    structure.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type}`);
    });

    console.log('\n✅ API query fix test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing API fix:', error.message);
    console.error('Error details:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testEEEAPIFix();