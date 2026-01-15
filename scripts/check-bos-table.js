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
    
    // Check table schema
    const [schema] = await conn.query(
      "DESC cai_bos_minutes"
    );
    
    console.log('BOS Minutes table schema:');
    schema.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type}`);
    });
    
    // Check if there are any records with actual file paths (not example.com)
    const [rows] = await conn.query(
      "SELECT id, meeting_no, file_url, LENGTH(file_url) as url_length FROM cai_bos_minutes"
    );
    
    console.log('\nAll BOS minutes records:');
    rows.forEach(row => {
      const isExampleUrl = row.file_url.includes('example.com');
      console.log(`  ID ${row.id}: "${row.file_url}" (${isExampleUrl ? 'EXAMPLE/FAKE' : 'REAL'})`);
    });
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
