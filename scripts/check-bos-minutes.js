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
      "SELECT id, meeting_no, meeting_date, file_url FROM cai_bos_minutes ORDER BY meeting_date DESC LIMIT 5"
    );
    
    console.log('BOS Minutes data:');
    console.log(JSON.stringify(rows, null, 2));
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
