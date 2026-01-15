const mysql = require('mysql2/promise');

const config = {
  host: process.env.MYSQL_HOST || '62.72.31.209',
  user: process.env.MYSQL_USER || 'cmsuser',
  password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
  database: 'svec_cms',
  port: process.env.MYSQL_PORT || 3306,
};

async function insertData() {
  const connection = await mysql.createConnection(config);

  try {
    console.log('🔍 Connecting to database...');
    
    // Sample data
    const sampleData = [
      {
        date: '2025-11-16',
        type: 'Regular',
        degree: 'UG',
        content: 'Regular Examination Schedule for UG students',
        link: '/uploads/ug_regular_exam.pdf',
        posteddate: '2025-11-16'
      },
      {
        date: '2025-11-15',
        type: 'Supply',
        degree: 'UG',
        content: 'Supplementary Examination notification for UG',
        link: '/uploads/ug_supply_exam.pdf',
        posteddate: '2025-11-15'
      },
      {
        date: '2025-11-14',
        type: 'Results',
        degree: 'UG',
        content: 'UG Semester Results Published',
        link: '/uploads/ug_results.pdf',
        posteddate: '2025-11-14'
      },
      {
        date: '2025-11-16',
        type: 'Regular',
        degree: 'PG',
        content: 'Regular Examination Schedule for PG students',
        link: '/uploads/pg_regular_exam.pdf',
        posteddate: '2025-11-16'
      },
      {
        date: '2025-11-15',
        type: 'Supply',
        degree: 'PG',
        content: 'Supplementary Examination notification for PG',
        link: '/uploads/pg_supply_exam.pdf',
        posteddate: '2025-11-15'
      },
      {
        date: '2025-11-13',
        type: 'Timetable',
        degree: 'UG',
        content: 'Examination Time Table - UG Batch',
        link: '/uploads/ug_timetable.pdf',
        posteddate: '2025-11-13'
      },
      {
        date: '2025-11-12',
        type: 'Fee Notification',
        degree: 'UG',
        content: 'Examination Fee Payment Notification',
        link: '/uploads/fee_notification.pdf',
        posteddate: '2025-11-12'
      },
      {
        date: '2025-11-11',
        type: 'Circular',
        degree: 'UG',
        content: 'Important Circular regarding Examinations',
        link: '/uploads/circular.pdf',
        posteddate: '2025-11-11'
      }
    ];

    console.log('📝 Inserting sample data...');
    
    let inserted = 0;
    for (const data of sampleData) {
      try {
        const query = `
          INSERT INTO autonomous_exam_section (date, type, degree, content, link, posteddate)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.query(query, [data.date, data.type, data.degree, data.content, data.link, data.posteddate]);
        inserted++;
        console.log(`✅ Inserted: ${data.type} - ${data.degree}`);
      } catch (error) {
        console.warn(`⚠️  Failed to insert ${data.type}:`, error.message);
      }
    }

    console.log(`\n✅ Successfully inserted ${inserted}/${sampleData.length} records`);

    // Verify
    const [result] = await connection.query(
      'SELECT COUNT(*) as total FROM autonomous_exam_section'
    );
    console.log(`\n📊 Total records in table: ${result[0].total}`);

    // Show inserted records
    const [records] = await connection.query(
      'SELECT id, type, degree, content, DATE(posteddate) as posted FROM autonomous_exam_section ORDER BY posteddate DESC'
    );
    console.log('\n📋 Current data:');
    records.forEach((record, index) => {
      console.log(`${index + 1}. [${record.degree}] ${record.type} - ${record.content.substring(0, 50)}...`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

insertData();
