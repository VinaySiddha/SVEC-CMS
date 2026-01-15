import mysql from 'mysql2/promise';

async function addLaboratoryImages() {
  const conn = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔧 Adding Laboratory Images to DS Hackathons Gallery\n');

    // Sample laboratory images
    const labImages = [
      {
        dept: 'cse-ds',
        category: 'laboratories',
        academic_year: '2024-2025',
        title: 'Linus Torvalds Lab',
        gallery: '/uploads/cse-ds/laboratories/linus_torvalds_lab_1.jpg,/uploads/cse-ds/laboratories/linus_torvalds_lab_2.jpg'
      },
      {
        dept: 'cse-ds',
        category: 'laboratories',
        academic_year: '2024-2025',
        title: 'Orange Lab',
        gallery: '/uploads/cse-ds/laboratories/orange_lab_1.jpg,/uploads/cse-ds/laboratories/orange_lab_2.jpg'
      },
      {
        dept: 'cse-ds',
        category: 'laboratories',
        academic_year: '2024-2025',
        title: 'Server Room',
        gallery: '/uploads/cse-ds/laboratories/server_room_1.jpg'
      }
    ];

    let insertCount = 0;
    for (const img of labImages) {
      await conn.execute(
        'INSERT INTO ds_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)',
        [img.dept, img.category, img.academic_year, img.title, img.gallery]
      );
      insertCount++;
      console.log(`✅ Inserted: ${img.title}`);
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Total inserted: ${insertCount} laboratory image records`);

    // Verify
    const [verify] = await conn.execute('SELECT COUNT(*) as total FROM ds_hackathons_gallery WHERE category = ?', ['laboratories']);
    console.log(`✅ Current laboratory records in DB: ${verify[0].total}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await conn.end();
  }
}

addLaboratoryImages();
