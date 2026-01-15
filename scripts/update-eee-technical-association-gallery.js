const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST || '62.72.31.209',
  user: process.env.MYSQL_USER || 'cmsuser',
  password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function updateEEETechnicalAssociationGallery() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('✓ Connected to MySQL database');

    // Real image URLs from the existing uploads folder
    const imagesToUpdate = [
      {
        id: 34,
        gallery: '/uploads/eee/hackathons-gallery/15.jpg'
      },
      {
        id: 35,
        gallery: '/uploads/eee/hackathons-gallery/HODCSE.jpg'
      },
      {
        id: 36,
        gallery: '/uploads/eee/hackathons-gallery/Linus_Torvalds_Lab.jpg'
      }
    ];

    console.log('📝 Updating EEE Technical Association gallery with real image URLs...\n');
    
    for (const img of imagesToUpdate) {
      await connection.execute(
        'UPDATE eee_hackathons_gallery SET gallery = ? WHERE id = ?',
        [img.gallery, img.id]
      );
      console.log(`✅ Updated ID ${img.id}: ${img.gallery}`);
    }

    // Verify the updates
    console.log('\n📋 Verifying updated data:');
    const [results] = await connection.execute(
      "SELECT id, category, academic_year, gallery FROM eee_hackathons_gallery WHERE category = 'technical association' ORDER BY id DESC LIMIT 5"
    );
    
    console.log(`✓ Total records: ${results.length}`);
    results.forEach(r => {
      console.log(`  ID ${r.id}: ${r.gallery}`);
    });

    console.log('\n✅ EEE Technical Association Gallery Update Complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

updateEEETechnicalAssociationGallery();
