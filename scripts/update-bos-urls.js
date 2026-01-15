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
    
    // Update the BOS minutes with real PDF files
    const updates = [
      {
        id: 1,
        file_url: '/aboutus/Academic-2016-17.pdf'
      },
      {
        id: 2,
        file_url: '/aboutus/Academic-2017-18.pdf'
      },
      {
        id: 3,
        file_url: '/aboutus/Academic-2018-19.pdf'
      },
      {
        id: 4,
        file_url: '/aboutus/Academic-2019-20.pdf'
      }
    ];
    
    console.log('📝 Updating BOS minutes with real PDF URLs...');
    
    for (const update of updates) {
      await conn.execute(
        'UPDATE cai_bos_minutes SET file_url = ? WHERE id = ?',
        [update.file_url, update.id]
      );
      console.log(`✅ Updated BOS minutes ID ${update.id}: ${update.file_url}`);
    }
    
    // Verify the updates
    const [rows] = await conn.query(
      'SELECT id, meeting_no, file_url FROM cai_bos_minutes'
    );
    
    console.log('\n📊 Final BOS minutes URLs:');
    rows.forEach(row => {
      console.log(`  Meeting ${row.meeting_no}: ${row.file_url}`);
    });
    
    await conn.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
