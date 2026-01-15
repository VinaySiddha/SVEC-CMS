const mysql = require('mysql2/promise');

async function addGalleryImages() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Add more hackathon gallery images for different academic years
    const galleryImages = [
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2023-image1.jpg',
        title: 'Hackathon 2023-2024'
      },
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2023-image2.jpg',
        title: 'Hackathon 2023-2024'
      },
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2023-image3.jpg',
        title: 'Hackathon 2023-2024'
      },
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2024-image1.jpg',
        title: 'Hackathon 2024-2025'
      },
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2024-image2.jpg',
        title: 'Hackathon 2024-2025'
      },
      {
        dept: 'cse-ai',
        category: 'hackathon',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/hackathons/hackathon-2024-image3.jpg',
        title: 'Hackathon 2024-2025'
      }
    ];

    console.log('📝 Adding hackathon gallery images...\n');
    
    for (const img of galleryImages) {
      await connection.execute(
        'INSERT INTO cai_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)',
        [img.dept, img.category, img.academic_year, img.title, img.gallery]
      );
      console.log(`✅ Added image for ${img.academic_year}`);
    }

    // Verify the data
    console.log('\n📋 Current hackathon gallery data grouped by year:');
    const [rows] = await connection.execute(
      "SELECT id, dept, category, academic_year, gallery, title FROM cai_hackathons_gallery WHERE category = 'hackathon' ORDER BY academic_year DESC, id DESC"
    );
    
    // Group by academic year
    const groupedByYear = {};
    rows.forEach(row => {
      if (!groupedByYear[row.academic_year]) {
        groupedByYear[row.academic_year] = [];
      }
      groupedByYear[row.academic_year].push(row.gallery);
    });

    Object.entries(groupedByYear).forEach(([year, images]) => {
      console.log(`\n${year}: ${images.length} images`);
      images.forEach((img, idx) => {
        console.log(`  ${idx + 1}. ${img.split('/').pop()}`);
      });
    });

    console.log(`\n✅ Total hackathon gallery records: ${rows.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addGalleryImages();
