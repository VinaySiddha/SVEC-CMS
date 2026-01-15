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

async function setupAcademicToppersGallery() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✓ Connected to MySQL database');

    // Clear existing academic toppers gallery data for ds department
    await connection.query(
      `DELETE FROM ds_hackathons_gallery WHERE category = 'academic toppers' AND dept = 'ds'`
    );
    console.log('✓ Cleared existing Academic Toppers gallery data');

    // Insert sample academic toppers gallery images
    const galleryData = [
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2024-25',
        title: 'Toppers Award Ceremony 2024-25',
        gallery: 'https://via.placeholder.com/400x300?text=Topper+2024-25'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2024-25',
        title: 'Merit Scholarship Distribution',
        gallery: 'https://via.placeholder.com/400x300?text=Merit+Scholarship+1'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2024-25',
        title: 'Achievement Recognition',
        gallery: 'https://via.placeholder.com/400x300?text=Achievement+1'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2024-25',
        title: 'Student Success Stories',
        gallery: 'https://via.placeholder.com/400x300?text=Success+Story'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2023-24',
        title: 'Topper Recognition 2023-24',
        gallery: 'https://via.placeholder.com/400x300?text=Topper+2023-24'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2023-24',
        title: 'Certificate Award',
        gallery: 'https://via.placeholder.com/400x300?text=Certificate+Award'
      },
      {
        dept: 'ds',
        category: 'academic toppers',
        academic_year: '2023-24',
        title: 'Faculty Recognition',
        gallery: 'https://via.placeholder.com/400x300?text=Faculty+Recognition'
      }
    ];

    for (const data of galleryData) {
      await connection.query(
        `INSERT INTO ds_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)`,
        [data.dept, data.category, data.academic_year, data.title, data.gallery]
      );
    }

    console.log(`✓ Inserted ${galleryData.length} Academic Toppers gallery images`);

    // Verify data
    const [results] = await connection.query(
      `SELECT * FROM ds_hackathons_gallery WHERE category = 'academic toppers' AND dept = 'ds'`
    );
    console.log(`✓ Verification: ${results.length} records found in gallery`);
    console.log('Sample records:', JSON.stringify(results.slice(0, 2), null, 2));

    console.log('\n✅ Academic Toppers Gallery Setup Complete!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
    await pool.end();
  }
}

setupAcademicToppersGallery();
