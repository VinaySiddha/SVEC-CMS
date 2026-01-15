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
    
    const [rows] = await conn.query(
      "SELECT id, dept, category, title, description FROM cai_physical_facilities WHERE dept = 'cse-ai' ORDER BY category, id ASC LIMIT 5"
    );
    
    console.log('Physical Facilities data (first 5):');
    if (rows.length > 0) {
      rows.forEach(row => {
        console.log(`\n[${row.category}] ${row.title}`);
        console.log(`  Description: ${row.description ? row.description.substring(0, 50) + '...' : 'N/A'}`);
      });
    } else {
      console.log('No physical facilities data found for cse-ai');
    }
    
    // Check total count
    const [count] = await conn.query(
      "SELECT COUNT(*) as total FROM cai_physical_facilities WHERE dept = 'cse-ai'"
    );
    console.log(`\nTotal physical facilities records: ${count[0].total}`);
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
