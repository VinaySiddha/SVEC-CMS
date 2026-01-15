const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST || '62.72.31.209',
  user: process.env.MYSQL_USER || 'cmsuser',
  password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function addEEETechnicalAssociationGallery() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('✓ Connected to MySQL database');

    // Sample gallery images for EEE Technical Association
    const galleryImages = [
      {
        category: 'technical association',
        academic_year: '2024-25',
        gallery: '/uploads/eee/technical-association/event-2024-img1.jpg'
      },
      {
        category: 'technical association',
        academic_year: '2024-25',
        gallery: '/uploads/eee/technical-association/event-2024-img2.jpg'
      },
      {
        category: 'technical association',
        academic_year: '2023-24',
        gallery: '/uploads/eee/technical-association/event-2023-img1.jpg'
      },
      {
        category: 'technical association',
        academic_year: '2023-24',
        gallery: '/uploads/eee/technical-association/event-2023-img2.jpg'
      }
    ];

    console.log('📝 Adding EEE Technical Association gallery images...\n');
    
    for (const img of galleryImages) {
      await connection.execute(
        'INSERT INTO eee_hackathons_gallery (category, academic_year, gallery) VALUES (?, ?, ?)',
        [img.category, img.academic_year, img.gallery]
      );
      console.log(`✅ Added: ${img.gallery}`);
    }

    // Verify the data
    console.log('\n📋 Verifying EEE Technical Association gallery data:');
    const [results] = await connection.execute(
      "SELECT id, category, academic_year, gallery FROM eee_hackathons_gallery WHERE category = 'technical association' ORDER BY academic_year DESC, id DESC"
    );
    
    console.log(`✓ Total records: ${results.length}`);
    console.log('Sample records:', JSON.stringify(results.slice(0, 2), null, 2));

    console.log('\n✅ EEE Technical Association Gallery Setup Complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

addEEETechnicalAssociationGallery();
