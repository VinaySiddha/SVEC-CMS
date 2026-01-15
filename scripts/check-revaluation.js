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
      "SELECT id, type, degree, content, link, posteddate FROM autonomous_exam_section WHERE type = 'revaluation_results' ORDER BY posteddate DESC"
    );
    
    console.log('Revaluation Results found:', rows.length);
    console.log(JSON.stringify(rows, null, 2));
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
