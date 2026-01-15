const mysql = require('mysql2/promise');

async function createAndPopulateHackathonsGalleryTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Create cai_hackathons_gallery table (plural name)
    console.log('📝 Creating cai_hackathons_gallery table...');
    try {
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS cai_hackathons_gallery (
          id INT AUTO_INCREMENT PRIMARY KEY,
          dept VARCHAR(50) NOT NULL DEFAULT 'cse-ai',
          academic_year VARCHAR(20) NOT NULL,
          title VARCHAR(255) DEFAULT NULL,
          gallery LONGTEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `);
      console.log('✅ Created cai_hackathons_gallery table\n');
    } catch (err) {
      if (err.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log('✅ Table cai_hackathons_gallery already exists\n');
      } else {
        throw err;
      }
    }

    // Check if table is empty
    const [count] = await connection.execute('SELECT COUNT(*) as total FROM cai_hackathons_gallery');
    
    if (count[0].total === 0) {
      console.log('📝 Populating cai_hackathons_gallery with sample data...\n');
      
      const sampleGallery = [
        {
          dept: 'cse-ai',
          academic_year: '2023-2024',
          title: 'Hackathon 2023 Gallery',
          gallery: '/uploads/cse-ai/hackathons/image1.jpg,/uploads/cse-ai/hackathons/image2.jpg,/uploads/cse-ai/hackathons/image3.jpg'
        },
        {
          dept: 'cse-ai',
          academic_year: '2024-2025',
          title: 'Hackathon 2024 Gallery',
          gallery: '/uploads/cse-ai/hackathons/2024-img1.jpg,/uploads/cse-ai/hackathons/2024-img2.jpg'
        },
        {
          dept: 'cse-ai',
          academic_year: '2022-2023',
          title: 'Hackathon 2022 Gallery',
          gallery: '/uploads/cse-ai/hackathons/2022-img1.jpg,/uploads/cse-ai/hackathons/2022-img2.jpg,/uploads/cse-ai/hackathons/2022-img3.jpg,/uploads/cse-ai/hackathons/2022-img4.jpg'
        }
      ];

      for (const item of sampleGallery) {
        await connection.execute(
          'INSERT INTO cai_hackathons_gallery (dept, academic_year, title, gallery) VALUES (?, ?, ?, ?)',
          [item.dept, item.academic_year, item.title, item.gallery]
        );
        console.log(`✅ Inserted gallery for ${item.academic_year}`);
      }
    } else {
      console.log(`✅ Table already populated with ${count[0].total} records\n`);
    }

    // Verify data
    console.log('\n📋 Current gallery records in cai_hackathons_gallery:');
    const [data] = await connection.execute('SELECT id, dept, academic_year, title FROM cai_hackathons_gallery ORDER BY academic_year DESC');
    
    data.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.academic_year} - ${row.title}`);
    });

    console.log(`\n✅ Total records: ${data.length}`);
    console.log('\n✅ Setup complete! The /api/cai-hackathons-gallery endpoint will now fetch from cai_hackathons_gallery table.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createAndPopulateHackathonsGalleryTable();
