const mysql = require('mysql2/promise');

async function setupHackathonsData() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // First, check if cai_hackathon_gallery exists
    try {
      const [existing] = await connection.execute('SELECT 1 FROM cai_hackathon_gallery LIMIT 1');
      console.log('📋 cai_hackathon_gallery table exists');
      
      const [count] = await connection.execute('SELECT COUNT(*) as total FROM cai_hackathon_gallery');
      console.log(`📊 Current gallery records: ${count[0].total}`);
    } catch (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        console.log('⚠️  cai_hackathon_gallery table not found. Creating...\n');
        
        // Create the gallery table
        await connection.execute(`
          CREATE TABLE IF NOT EXISTS cai_hackathon_gallery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            dept VARCHAR(50) NOT NULL DEFAULT 'cse-ai',
            academic_year VARCHAR(20) NOT NULL,
            title VARCHAR(255) DEFAULT NULL,
            gallery LONGTEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        
        console.log('✅ Created cai_hackathon_gallery table\n');
        
        // Insert sample gallery data
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
          }
        ];

        for (const item of sampleGallery) {
          await connection.execute(
            'INSERT INTO cai_hackathon_gallery (dept, academic_year, title, gallery) VALUES (?, ?, ?, ?)',
            [item.dept, item.academic_year, item.title, item.gallery]
          );
          console.log(`✅ Inserted gallery for ${item.academic_year}`);
        }
      }
    }

    // Check hackathons table data
    console.log('\n📋 Checking hackathons data:');
    const [hackData] = await connection.execute('SELECT * FROM cai_hackathons');
    console.log(`📊 Total hackathons records: ${hackData.length}`);
    
    hackData.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.academic_year} - Dept: ${row.dept}`);
    });

    // Check gallery table data
    console.log('\n📋 Checking gallery data:');
    const [galleryData] = await connection.execute('SELECT * FROM cai_hackathon_gallery');
    console.log(`📊 Total gallery records: ${galleryData.length}`);
    
    galleryData.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.academic_year} - ${row.title || 'No title'}`);
    });

    console.log('\n✅ Setup complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupHackathonsData();
