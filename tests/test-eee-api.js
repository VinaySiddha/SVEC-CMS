const mysql = require('mysql2/promise');

async function testEEEAPI() {
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

    // Test the new query that will be used by the API
    console.log('\n=== Testing EEE Syllabus Query ===');
    
    const [eeeResults] = await connection.execute(`
      SELECT * FROM EEE_Syllabus 
      WHERE status = "active" 
      ORDER BY regulation DESC, type, academic_year DESC, semester
    `);

    console.log(`Found ${eeeResults.length} syllabus documents for EEE department`);
    
    if (eeeResults.length > 0) {
      console.log('\nFirst 5 documents:');
      eeeResults.slice(0, 5).forEach((doc, index) => {
        console.log(`${index + 1}. ${doc.title}`);
        console.log(`   - Type: ${doc.type}, Regulation: ${doc.regulation}, Semester: ${doc.semester}`);
        console.log(`   - Program: ${doc.program || 'N/A'}`);
        console.log(`   - URL: ${doc.document_url}`);
      });
      
      // Group by regulation and type
      console.log('\n=== Summary by Regulation and Type ===');
      const summary = {};
      eeeResults.forEach(doc => {
        const key = `${doc.regulation} ${doc.type.toUpperCase()}`;
        summary[key] = (summary[key] || 0) + 1;
      });
      
      Object.entries(summary).forEach(([key, count]) => {
        console.log(`${key}: ${count} documents`);
      });
    }

    console.log('\n✅ EEE Syllabus API query test completed successfully!');

  } catch (error) {
    console.error('❌ Error testing API query:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testEEEAPI();