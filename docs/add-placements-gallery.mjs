import mysql from 'mysql2/promise';

async function addPlacementsGallery() {
  const conn = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔧 Adding Placements Gallery Data to Civil Hackathons Gallery\n');

    // Sample placements gallery data
    const placementsData = [
      {
        dept: 'civil',
        category: 'placements',
        academic_year: '2023-2024',
        title: 'Placements 2023-24',
        gallery: '/uploads/civil/placements/placement_2023_1.jpg,/uploads/civil/placements/placement_2023_2.jpg,/uploads/civil/placements/placement_2023_3.jpg'
      },
      {
        dept: 'civil',
        category: 'placements',
        academic_year: '2024-2025',
        title: 'Placements 2024-25',
        gallery: '/uploads/civil/placements/placement_2024_1.jpg,/uploads/civil/placements/placement_2024_2.jpg'
      },
      {
        dept: 'civil',
        category: 'placements',
        academic_year: '2022-2023',
        title: 'Placements 2022-23',
        gallery: '/uploads/civil/placements/placement_2022_1.jpg'
      }
    ];

    let insertCount = 0;
    for (const data of placementsData) {
      await conn.execute(
        'INSERT INTO civil_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)',
        [data.dept, data.category, data.academic_year, data.title, data.gallery]
      );
      insertCount++;
      console.log(`✅ Inserted: ${data.title} (${data.academic_year})`);
    }

    console.log(`\n📊 Summary:`);
    console.log(`✅ Total inserted: ${insertCount} placements gallery records`);

    // Verify
    const [verify] = await conn.execute(
      "SELECT COUNT(*) as total, COUNT(DISTINCT academic_year) as years FROM civil_hackathons_gallery WHERE category = ?",
      ['placements']
    );
    console.log(`✅ Current placements gallery records in DB: ${verify[0].total} across ${verify[0].years} years`);

    // Show all placement records
    const [allRecords] = await conn.execute(
      'SELECT id, title, academic_year, gallery FROM civil_hackathons_gallery WHERE category = ? ORDER BY academic_year DESC',
      ['placements']
    );
    console.log('\n📋 All Placement Gallery Records:');
    console.table(allRecords);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await conn.end();
  }
}

addPlacementsGallery();
