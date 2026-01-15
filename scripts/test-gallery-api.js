const mysql = require('mysql2/promise');

async function testHackathonsGalleryAPI() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Simulate the API response for /api/cai-hackathons-gallery
    console.log('📋 Testing /api/cai-hackathons-gallery response:');
    
    const [rows] = await connection.execute(
      "SELECT id, dept, category, academic_year, gallery, title FROM cai_hackathons_gallery WHERE category = 'hackathon' ORDER BY academic_year DESC"
    );
    
    // Transform: Group multiple gallery records by academic_year into comma-separated URLs
    const groupedByYear = {};
    
    rows.forEach(row => {
      if (!groupedByYear[row.academic_year]) {
        groupedByYear[row.academic_year] = {
          academic_year: row.academic_year,
          dept: row.dept,
          gallery: [],
          title: row.title
        };
      }
      if (row.gallery) {
        groupedByYear[row.academic_year].gallery.push(row.gallery);
      }
    });
    
    // Convert back to array and format gallery as comma-separated string
    const hackathonsGallery = Object.values(groupedByYear).map(item => ({
      ...item,
      gallery: item.gallery.join(',')
    }));
    
    console.log(JSON.stringify(hackathonsGallery, null, 2));
    console.log(`\n✅ Total gallery groups by year: ${hackathonsGallery.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testHackathonsGalleryAPI();
