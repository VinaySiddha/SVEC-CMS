import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function setupTechnicalAssociationGallery() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✓ Connected to MySQL database');

    // Clear existing technical association gallery data for ds department
    await connection.query(
      `DELETE FROM ds_hackathons_gallery WHERE category = 'technical association' AND dept = 'ds'`
    );
    console.log('✓ Cleared existing Technical Association gallery data');

    // Insert sample technical association gallery images
    const galleryData = [
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2024-25',
        title: 'Nexus Event 2024-25 - Session 1',
        gallery: 'https://via.placeholder.com/450x340?text=Nexus+Event+1'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2024-25',
        title: 'Nexus Event 2024-25 - Session 2',
        gallery: 'https://via.placeholder.com/450x340?text=Nexus+Event+2'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2024-25',
        title: 'Technical Competition 2024-25',
        gallery: 'https://via.placeholder.com/450x340?text=Tech+Competition'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2024-25',
        title: 'Workshop Session 2024-25',
        gallery: 'https://via.placeholder.com/450x340?text=Workshop+Session'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2023-24',
        title: 'Nexus Event 2023-24 - Winners Announcement',
        gallery: 'https://via.placeholder.com/450x340?text=Nexus+2023-24'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2023-24',
        title: 'Technical Workshop 2023-24',
        gallery: 'https://via.placeholder.com/450x340?text=Workshop+2023-24'
      },
      {
        dept: 'ds',
        category: 'technical association',
        academic_year: '2023-24',
        title: 'Members Meeting 2023-24',
        gallery: 'https://via.placeholder.com/450x340?text=Members+Meeting'
      }
    ];

    for (const data of galleryData) {
      await connection.query(
        `INSERT INTO ds_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)`,
        [data.dept, data.category, data.academic_year, data.title, data.gallery]
      );
    }

    console.log(`✓ Inserted ${galleryData.length} Technical Association gallery images`);

    // Verify data
    const [results] = await connection.query(
      `SELECT * FROM ds_hackathons_gallery WHERE category = 'technical association' AND dept = 'ds'`
    );
    console.log(`✓ Verification: ${results.length} records found in gallery`);
    console.log('Sample records:', JSON.stringify(results.slice(0, 2), null, 2));

    console.log('\n✅ Technical Association Gallery Setup Complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

setupTechnicalAssociationGallery();
