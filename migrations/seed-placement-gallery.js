const mysql = require('mysql2/promise');

async function seedPlacementGallery() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'svecedu'
    });

    console.log('Connected to database');

    // Sample placement gallery images
    const galleryImages = [
      {
        dept: 'placement',
        title: 'Campus Placement Drive 2024',
        image_url: '/uploads/placement-gallery/campus-drive-2024.jpg',
        caption: 'Students attending the annual campus placement drive with top recruiters'
      },
      {
        dept: 'placement',
        title: 'Industry Interaction Session',
        image_url: '/uploads/placement-gallery/industry-session.jpg',
        caption: 'Interactive session between students and industry experts'
      },
      {
        dept: 'placement',
        title: 'Mock Interview Training',
        image_url: '/uploads/placement-gallery/mock-interview.jpg',
        caption: 'Students participating in mock interview sessions'
      },
      {
        dept: 'placement',
        title: 'Placement Success Stories',
        image_url: '/uploads/placement-gallery/success-stories.jpg',
        caption: 'Celebrating our students\' successful placements'
      },
      {
        dept: 'placement',
        title: 'Resume Building Workshop',
        image_url: '/uploads/placement-gallery/resume-workshop.jpg',
        caption: 'Workshop on effective resume writing and presentation skills'
      }
    ];

    for (const image of galleryImages) {
      await connection.execute(
        `INSERT INTO placement_gallery (dept, title, image_url, caption, created_at, updated_at) 
         VALUES (?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE 
         title = VALUES(title), 
         caption = VALUES(caption), 
         updated_at = NOW()`,
        [image.dept, image.title, image.image_url, image.caption]
      );
    }

    console.log(`✓ Inserted ${galleryImages.length} placement gallery images`);

    console.log('\n✓ Placement gallery seeded successfully!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

seedPlacementGallery();