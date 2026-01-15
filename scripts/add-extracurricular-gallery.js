const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function addExtracurricularGallery() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    const extracurricularData = [
      // 2024-2025 academic year
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/extracurricular/event-2024-img1.jpg',
        title: 'Extracurricular Activities 2024-2025'
      },
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/extracurricular/event-2024-img2.jpg',
        title: 'Extracurricular Activities 2024-2025'
      },
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2024-2025',
        gallery: '/uploads/cse-ai/extracurricular/event-2024-img3.jpg',
        title: 'Extracurricular Activities 2024-2025'
      },
      // 2023-2024 academic year
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/extracurricular/event-2023-img1.jpg',
        title: 'Extracurricular Activities 2023-2024'
      },
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/extracurricular/event-2023-img2.jpg',
        title: 'Extracurricular Activities 2023-2024'
      },
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2023-2024',
        gallery: '/uploads/cse-ai/extracurricular/event-2023-img3.jpg',
        title: 'Extracurricular Activities 2023-2024'
      },
      // 2022-2023 academic year
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2022-2023',
        gallery: '/uploads/cse-ai/extracurricular/event-2022-img1.jpg',
        title: 'Extracurricular Activities 2022-2023'
      },
      {
        dept: 'cse-ai',
        category: 'extracurricular activities',
        academic_year: '2022-2023',
        gallery: '/uploads/cse-ai/extracurricular/event-2022-img2.jpg',
        title: 'Extracurricular Activities 2022-2023'
      }
    ];

    for (const data of extracurricularData) {
      await connection.execute(
        'INSERT INTO cai_hackathons_gallery (dept, category, academic_year, gallery, title) VALUES (?, ?, ?, ?, ?)',
        [data.dept, data.category, data.academic_year, data.gallery, data.title]
      );
    }

    console.log('✅ Added extracurricular gallery records\n');

    // Verify the data was inserted
    const [rows] = await connection.execute(
      "SELECT academic_year, COUNT(*) as count FROM cai_hackathons_gallery WHERE category = 'extracurricular activities' GROUP BY academic_year ORDER BY academic_year DESC"
    );

    console.log('📊 Extracurricular Gallery Summary:');
    rows.forEach((row) => {
      console.log(`${row.academic_year}: ${row.count} images`);
    });

    const [totalRows] = await connection.execute(
      "SELECT COUNT(*) as total FROM cai_hackathons_gallery WHERE category = 'extracurricular activities'"
    );

    console.log(`\n✅ Total: ${totalRows[0].total} records`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

addExtracurricularGallery();
