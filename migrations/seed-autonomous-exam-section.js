const mysql = require('mysql2/promise');

// Database configuration
const config = {
  host: process.env.MYSQL_HOST || '62.72.31.209',
  user: process.env.MYSQL_USER || 'cmsuser',
  password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
  database: 'svec_cms',
  port: process.env.MYSQL_PORT || 3306,
};

async function seedData() {
  const connection = await mysql.createConnection(config);

  try {
    console.log('🔍 Checking autonomous_exam_section table structure...');

    // Check if table exists and get its columns
    const [columns] = await connection.query('DESCRIBE autonomous_exam_section');
    const columnNames = columns.map(col => col.Field);
    console.log('✅ Table exists with columns:', columnNames.join(', '));

    // Sample data with the existing schema
    const sampleData = [
      // Examination Rules - UG
      {
        type: 'examination_rules',
        degree: 'UG',
        content: 'Instructions to Candidates - Students must follow all examination rules and regulations as per institutional guidelines.',
        link: 'https://srivasaviengg.ac.in/uploads/inst_to_can.pdf',
        posteddate: new Date().toISOString().split('T')[0],
      },
      {
        type: 'examination_rules',
        degree: 'UG',
        content: 'Malpractices and Punishments - Any form of malpractice during examinations will result in severe disciplinary action.',
        link: 'https://srivasaviengg.ac.in/uploads/mal_pract.pdf',
        posteddate: new Date().toISOString().split('T')[0],
      },
      {
        type: 'examination_rules',
        degree: 'UG',
        content: 'Instructions to Invigilators - Invigilators must ensure fair and transparent conduct of examinations.',
        link: 'https://srivasaviengg.ac.in/uploads/mba_auto_reg.pdf',
        posteddate: new Date().toISOString().split('T')[0],
      },

      // Examination Rules - PG
      {
        type: 'examination_rules',
        degree: 'PG',
        content: 'Instructions to Candidates (PG) - PG students must follow advanced examination rules and regulations.',
        link: 'https://srivasaviengg.ac.in/uploads/pg_inst_to_can.pdf',
        posteddate: new Date().toISOString().split('T')[0],
      },
      {
        type: 'examination_rules',
        degree: 'PG',
        content: 'Malpractices and Punishments (PG) - PG students involved in malpractice will face severe consequences.',
        link: 'https://srivasaviengg.ac.in/uploads/pg_mal_pract.pdf',
        posteddate: new Date().toISOString().split('T')[0],
      },

      // Notifications - UG
      {
        type: 'notifications',
        degree: 'UG',
        content: '2024-04-25: Examination Fee Notification for B.Tech II Semester (V23, V20 & V18) Regular & Supplementary, May-2024',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/ug/B.TechIISemester(V23,V20&V18)Regular&Supplementary,May-2024ExaminationFeeNotification.pdf',
        posteddate: '2024-04-25',
      },
      {
        type: 'notifications',
        degree: 'UG',
        content: '2024-04-25: Exam fee notification for B.Tech I Semester (V20&V18) Supplementary examinations-MAY-2024',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/ug/B.TechISemester(V20)Supply,(V18)SupplyFeeNotification-MAY-2024.pdf',
        posteddate: '2024-04-25',
      },

      // Notifications - PG
      {
        type: 'notifications',
        degree: 'PG',
        content: '2024-04-25: M.Tech Examination Fee Notification for all semesters',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_fee_notification/pg/mtech_fee_notification.pdf',
        posteddate: '2024-04-25',
      },

      // Time Tables - UG
      {
        type: 'time_tables',
        degree: 'UG',
        content: 'Timetable for II B.TECH - I SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 2-1 R16 Supply Dec 2023.pdf',
        posteddate: '2024-01-10',
      },
      {
        type: 'time_tables',
        degree: 'UG',
        content: 'Timetable for III B.TECH - I SEMESTER (R16 REGULATIONS) SUPPLEMENTARY EXAMINATIONS, DECEMBER2023',
        link: 'https://srivasaviengg.ac.in/uploads/autonomous_university_exam_timetable/ug/Timetable for Jntuk, B.Tech 3-1 R16 Supple December-2023.pdf',
        posteddate: '2024-01-10',
      },

      // Time Tables - PG
      {
        type: 'time_tables',
        degree: 'PG',
        content: 'M.Tech Examination Timetable - Semester I regular examinations',
        link: 'https://srivasaviengg.ac.in/uploads/exam_timetable/pg/mtech_sem1_timetable.pdf',
        posteddate: '2024-01-15',
      },

      // Results - UG
      {
        type: 'results',
        degree: 'UG',
        content: 'Results of I B.Tech II Semester (R16/R19/R20) Supplementary Examinations, Jan-2024',
        link: 'https://srivasaviengg.ac.in/uploads/exam_results/ug/I B Tech II Sem January 2024.pdf',
        posteddate: '2024-02-01',
      },
      {
        type: 'results',
        degree: 'UG',
        content: 'Results of I B.Tech I Semester (R16/R19/R20/R23) Regular / Supplementary Examinations, Jan-2024',
        link: 'https://srivasaviengg.ac.in/uploads/exam_results/ug/I B Tech I Sem January 2024.pdf',
        posteddate: '2024-02-02',
      },

      // Results - PG
      {
        type: 'results',
        degree: 'PG',
        content: 'M.Tech Semester I examination results - Regular and Supplementary',
        link: 'https://srivasaviengg.ac.in/uploads/exam_results/pg/mtech_sem1_results.pdf',
        posteddate: '2024-02-05',
      },

      // Revaluation Results - UG
      {
        type: 'revaluation_results',
        degree: 'UG',
        content: 'Revaluation Results - I B.Tech students - Marks obtained after revaluation process',
        link: 'https://srivasaviengg.ac.in/uploads/revaluation_results/ug/i_btech_revaluation.pdf',
        posteddate: '2024-02-15',
      },

      // Revaluation Results - PG
      {
        type: 'revaluation_results',
        degree: 'PG',
        content: 'Revaluation Results - M.Tech students - Updated grades after revaluation',
        link: 'https://srivasaviengg.ac.in/uploads/revaluation_results/pg/mtech_revaluation.pdf',
        posteddate: '2024-02-20',
      },
    ];

    // Check if data already exists
    const [existingData] = await connection.query('SELECT COUNT(*) as count FROM autonomous_exam_section');
    const count = existingData[0]?.count || 0;

    if (count === 0) {
      console.log('📝 Seeding sample data...');
      
      // Insert sample data
      let inserted = 0;
      for (const data of sampleData) {
        try {
          const query = `
            INSERT INTO autonomous_exam_section (type, degree, content, link, posteddate)
            VALUES (?, ?, ?, ?, ?)
          `;
          await connection.query(query, [data.type, data.degree, data.content, data.link, data.posteddate]);
          inserted++;
        } catch (error) {
          console.warn(`⚠️  Failed to insert item:`, error.message);
        }
      }
      
      console.log(`✅ Successfully inserted ${inserted}/${sampleData.length} records`);
    } else {
      console.log(`⚠️  Table already has ${count} records. Skipping seed data.`);
      console.log('💡 To reset and reseed, run: DELETE FROM autonomous_exam_section WHERE 1=1;');
    }

    // Display current data
    const [allData] = await connection.query(`
      SELECT type, degree, COUNT(*) as count 
      FROM autonomous_exam_section 
      GROUP BY type, degree
    `);
    
    console.log('\n📊 Current data in autonomous_exam_section:');
    allData.forEach(row => {
      console.log(`   ${row.degree} - ${row.type}: ${row.count} records`);
    });

    console.log('\n✅ Seed script completed successfully');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedData();
