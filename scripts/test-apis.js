const mysql = require('mysql2/promise');

async function testAPIs() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Test hackathons API
    console.log('📋 Testing /api/cai-hackathons response:');
    const [hackathons] = await connection.execute('SELECT * FROM cai_hackathons ORDER BY id DESC');
    
    const hackathonsResponse = hackathons.map(h => ({
      ...h,
      gallery: h.gallery ? h.gallery.split(',').map(url => url.trim()).filter(Boolean) : []
    }));

    console.log(JSON.stringify(hackathonsResponse, null, 2));
    console.log(`\n✅ Total hackathons: ${hackathonsResponse.length}\n`);

    // Test hackathons gallery API
    console.log('📋 Testing /api/cai-hackathons-gallery response:');
    const [gallery] = await connection.execute('SELECT * FROM cai_hackathon_gallery ORDER BY academic_year DESC');
    
    const galleryResponse = gallery.map(row => ({
      ...row,
      gallery: row.gallery || ''
    }));

    console.log(JSON.stringify(galleryResponse, null, 2));
    console.log(`\n✅ Total gallery records: ${galleryResponse.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testAPIs();
