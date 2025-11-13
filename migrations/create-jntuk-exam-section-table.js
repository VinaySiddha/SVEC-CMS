const mysql = require('mysql2/promise');

// Database configuration
const config = {
  host: process.env.MYSQL_HOST || '62.72.31.209',
  user: process.env.MYSQL_USER || 'cmsuser',
  password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
  database: 'svec_cms',
  port: process.env.MYSQL_PORT || 3306,
};

async function createTable() {
  const connection = await mysql.createConnection(config);

  try {
    console.log('🔍 Creating exam_section table for JNTUK...');

    // Create the exam_section table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS exam_section (
        sno INT AUTO_INCREMENT PRIMARY KEY,
        date DATE NOT NULL,
        content LONGTEXT NOT NULL,
        degree ENUM('UG', 'PG') NOT NULL,
        type VARCHAR(100) NOT NULL,
        link VARCHAR(500) NULL,
        posteddate DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.query(createTableQuery);
    console.log('✅ Table exam_section created successfully');

    // Check if table has data
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM exam_section');
    const count = countResult[0].count;

    if (count === 0) {
      console.log('📝 Seeding sample JNTUK exam data...');
      
      // Sample JNTUK data
      const sampleData = [
        {
          date: '2024-12-15',
          content: 'B.Tech I Year I Semester Regular/Supply Examinations Time Table - December 2024',
          degree: 'UG',
          type: 'timetable',
          link: 'https://jntuk.edu.in/uploads/timetable_btech_1_1_dec2024.pdf',
          posteddate: '2024-12-11'
        },
        {
          date: '2024-12-20',
          content: 'B.Tech II Year I Semester Regular/Supply Examinations Time Table - December 2024',
          degree: 'UG',
          type: 'timetable',
          link: 'https://jntuk.edu.in/uploads/timetable_btech_2_1_dec2024.pdf',
          posteddate: '2024-12-11'
        },
        {
          date: '2024-12-18',
          content: 'M.Tech I Year I Semester Regular/Supply Examinations Time Table - December 2024',
          degree: 'PG',
          type: 'timetable',
          link: 'https://jntuk.edu.in/uploads/timetable_mtech_1_1_dec2024.pdf',
          posteddate: '2024-12-11'
        },
        {
          date: '2024-12-10',
          content: 'B.Tech IV Year II Semester Regular/Supply Results - November 2024',
          degree: 'UG',
          type: 'Results',
          link: 'https://jntuk.edu.in/uploads/results_btech_4_2_nov2024.pdf',
          posteddate: '2024-12-10'
        },
        {
          date: '2024-12-08',
          content: 'M.Tech II Year Regular/Supply Results - November 2024',
          degree: 'PG',
          type: 'Results',
          link: 'https://jntuk.edu.in/uploads/results_mtech_2_nov2024.pdf',
          posteddate: '2024-12-08'
        },
        {
          date: '2024-12-05',
          content: 'Examination Fee Notification for December 2024 Session',
          degree: 'UG',
          type: 'Fee Notifications',
          link: 'https://jntuk.edu.in/uploads/fee_notification_dec2024.pdf',
          posteddate: '2024-12-05'
        },
        {
          date: '2024-12-03',
          content: 'PG Examination Fee Notification for December 2024 Session',
          degree: 'PG',
          type: 'Fee Notifications',
          link: 'https://jntuk.edu.in/uploads/pg_fee_notification_dec2024.pdf',
          posteddate: '2024-12-03'
        },
        {
          date: '2024-11-30',
          content: 'B.Tech III Year II Semester Revaluation Results - November 2024',
          degree: 'UG',
          type: 'Revaluation Results',
          link: 'https://jntuk.edu.in/uploads/reval_btech_3_2_nov2024.pdf',
          posteddate: '2024-11-30'
        }
      ];

      // Insert sample data
      let inserted = 0;
      for (const data of sampleData) {
        try {
          const query = `
            INSERT INTO exam_section (date, content, degree, type, link, posteddate)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          await connection.query(query, [data.date, data.content, data.degree, data.type, data.link, data.posteddate]);
          inserted++;
        } catch (error) {
          console.warn(`⚠️  Failed to insert item:`, error.message);
        }
      }
      
      console.log(`✅ Successfully inserted ${inserted}/${sampleData.length} records`);
    } else {
      console.log(`⚠️  Table already has ${count} records. Skipping seed data.`);
    }

    // Display current data
    const [allData] = await connection.query(`
      SELECT type, degree, COUNT(*) as count 
      FROM exam_section 
      GROUP BY type, degree
    `);
    
    console.log('\\n📊 Current data in exam_section:');
    allData.forEach(row => {
      console.log(`   ${row.degree} - ${row.type}: ${row.count} records`);
    });

    console.log('\\n✅ JNTUK exam_section setup completed successfully');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

createTable();