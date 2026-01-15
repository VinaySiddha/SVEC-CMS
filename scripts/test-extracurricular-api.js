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

async function testExtracurricularAPI() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('✅ Connected to database\n');

    const rows = await connection.query(
      "SELECT id, dept, category, academic_year, gallery, title FROM cai_hackathons_gallery WHERE category = 'extracurricular activities' ORDER BY academic_year DESC"
    );

    const [data] = rows;

    // Group by academic_year and concatenate gallery URLs
    const groupedByYear = {};
    data.forEach((row) => {
      if (!groupedByYear[row.academic_year]) {
        groupedByYear[row.academic_year] = {
          academic_year: row.academic_year,
          dept: row.dept,
          category: row.category,
          gallery: [],
          title: row.title
        };
      }
      groupedByYear[row.academic_year].gallery.push(row.gallery);
    });

    // Transform gallery arrays to comma-separated strings
    const result = Object.values(groupedByYear).map((item) => ({
      ...item,
      gallery: item.gallery.join(',')
    }));

    console.log('📋 Testing /api/cai-extra-curricular-gallery response:\n');
    console.log(JSON.stringify(result, null, 2));
    console.log(`\n✅ Total gallery groups by year: ${result.length}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    if (connection) {
      connection.release();
    }
    await pool.end();
  }
}

testExtracurricularAPI();
