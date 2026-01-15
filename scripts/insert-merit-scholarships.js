const mysql = require('mysql2/promise');

async function insertMeritScholarshipsData() {
  try {
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('Connected to database...');

    const insertQuery = `
      INSERT INTO cai_merit_scholarships (academic_year, particulars, students_benefited, scholarship_amount, dept) 
      VALUES 
      ('2023-2024', 'Merit Scholarship for Outstanding Academic Performance', 15, 50000, 'cseai'),
      ('2023-2024', 'Merit Scholarship for Research Excellence', 10, 75000, 'cseai'),
      ('2022-2023', 'Merit Scholarship for Academic Excellence', 20, 45000, 'cseai'),
      ('2022-2023', 'Merit Scholarship for Innovation and Projects', 12, 60000, 'cseai'),
      ('2021-2022', 'Merit Scholarship for Competitive Excellence', 18, 55000, 'cseai')
    `;

    const [result] = await connection.execute(insertQuery);
    console.log(`✅ Successfully inserted ${result.affectedRows} merit scholarship records`);

    // Verify the data was inserted
    const [rows] = await connection.execute('SELECT * FROM cai_merit_scholarships WHERE dept = "CSE-AI" ORDER BY academic_year DESC');
    console.log('\n📊 Inserted records:');
    console.table(rows);

    await connection.end();
    console.log('\n✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

insertMeritScholarshipsData();
