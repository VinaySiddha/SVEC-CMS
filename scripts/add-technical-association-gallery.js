const mysql = require('mysql2/promise');

async function addTechnicalAssociationGallery() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Add technical association gallery images
    const galleryImages = [
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2023-2024',
        title: 'Technical Association 2023-2024',
        gallery: '/uploads/cse-ai/technical-association/event-2023-img1.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2023-2024',
        title: 'Technical Association 2023-2024',
        gallery: '/uploads/cse-ai/technical-association/event-2023-img2.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2023-2024',
        title: 'Technical Association 2023-2024',
        gallery: '/uploads/cse-ai/technical-association/event-2023-img3.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2024-2025',
        title: 'Technical Association 2024-2025',
        gallery: '/uploads/cse-ai/technical-association/event-2024-img1.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2024-2025',
        title: 'Technical Association 2024-2025',
        gallery: '/uploads/cse-ai/technical-association/event-2024-img2.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2024-2025',
        title: 'Technical Association 2024-2025',
        gallery: '/uploads/cse-ai/technical-association/event-2024-img3.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2022-2023',
        title: 'Technical Association 2022-2023',
        gallery: '/uploads/cse-ai/technical-association/event-2022-img1.jpg'
      },
      {
        dept: 'cse-ai',
        category: 'technical association',
        academic_year: '2022-2023',
        title: 'Technical Association 2022-2023',
        gallery: '/uploads/cse-ai/technical-association/event-2022-img2.jpg'
      }
    ];

    console.log('📝 Adding technical association gallery images...\n');
    
    for (const img of galleryImages) {
      await connection.execute(
        'INSERT INTO cai_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)',
        [img.dept, img.category, img.academic_year, img.title, img.gallery]
      );
      console.log(`✅ Added image for ${img.academic_year}`);
    }

    // Verify the data
    console.log('\n📋 Current technical association gallery data:');
    const [rows] = await connection.execute(
      "SELECT id, dept, category, academic_year, gallery, title FROM cai_hackathons_gallery WHERE category = 'technical association' ORDER BY academic_year DESC, id DESC"
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

    console.log(`\n✅ Total technical association gallery records: ${rows.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addTechnicalAssociationGallery();
