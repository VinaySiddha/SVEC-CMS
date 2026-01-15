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
      "SELECT id, meeting_no, file_url, minutes_url FROM cai_bos_minutes"
    );
    
    console.log('BOS Minutes - All fields:');
    rows.forEach(row => {
      console.log(`\nID ${row.id}:`);
      console.log(`  file_url: ${row.file_url}`);
      console.log(`  minutes_url: ${row.minutes_url}`);
    });
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
