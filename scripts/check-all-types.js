const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
};

(async () => {
  try {
    const conn = await mysql.createConnection(config);
    
    // Check all types
    const [allRows] = await conn.query(
      "SELECT DISTINCT type FROM autonomous_exam_section ORDER BY type"
    );
    
    console.log('Available types:');
    allRows.forEach(row => console.log(`  - ${row.type}`));
    
    // Count by type
    console.log('\nRecords by type:');
    const [countResults] = await conn.query(
      "SELECT type, degree, COUNT(*) as count FROM autonomous_exam_section GROUP BY type, degree ORDER BY type, degree"
    );
    
    countResults.forEach(row => {
      console.log(`  ${row.type} [${row.degree}]: ${row.count} records`);
    });
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
