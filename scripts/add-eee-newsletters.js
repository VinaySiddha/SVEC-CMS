const mysql = require('mysql2/promise');

const config = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function addEEENewsletters() {
  const connection = await mysql.createConnection(config);
  
  try {
    console.log('✓ Connected to database\n');

    const eeeNewsletters = [
      {
        dept: 'eee',
        volume: '15',
        issue: '4',
        year: '2024',
        title: 'EEE Newsletter Volume 15 Issue 4 - December 2024',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_15_Issue_4_2024.pdf'
      },
      {
        dept: 'eee',
        volume: '15',
        issue: '3',
        year: '2024',
        title: 'EEE Newsletter Volume 15 Issue 3 - September 2024',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_15_Issue_3_2024.pdf'
      },
      {
        dept: 'eee',
        volume: '15',
        issue: '2',
        year: '2024',
        title: 'EEE Newsletter Volume 15 Issue 2 - June 2024',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_15_Issue_2_2024.pdf'
      },
      {
        dept: 'eee',
        volume: '15',
        issue: '1',
        year: '2024',
        title: 'EEE Newsletter Volume 15 Issue 1 - March 2024',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_15_Issue_1_2024.pdf'
      },
      {
        dept: 'eee',
        volume: '14',
        issue: '4',
        year: '2023',
        title: 'EEE Newsletter Volume 14 Issue 4 - December 2023',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_14_Issue_4_2023.pdf'
      },
      {
        dept: 'eee',
        volume: '14',
        issue: '3',
        year: '2023',
        title: 'EEE Newsletter Volume 14 Issue 3 - September 2023',
        file_url: '/uploads/eee/newsletters/Newsletter_Volume_14_Issue_3_2023.pdf'
      }
    ];

    console.log(`📝 Adding ${eeeNewsletters.length} EEE newsletters...\n`);

    for (const newsletter of eeeNewsletters) {
      await connection.execute(
        'INSERT INTO eee_newsletters (dept, volume, issue, year, title, file_url) VALUES (?, ?, ?, ?, ?, ?)',
        [newsletter.dept, newsletter.volume, newsletter.issue, newsletter.year, newsletter.title, newsletter.file_url]
      );
      console.log(`✅ Added: ${newsletter.title}`);
    }

    // Verify the data
    console.log('\n📋 Verifying EEE newsletters:');
    const [result] = await connection.query('SELECT * FROM eee_newsletters WHERE dept = "eee" ORDER BY year DESC, volume DESC, issue DESC');
    console.log(`✓ Total EEE records: ${result.length}`);
    result.forEach((row, i) => {
      console.log(`  ${i + 1}. [${row.year}] Vol ${row.volume} Issue ${row.issue}: ${row.title}`);
    });

    console.log('\n✅ EEE Newsletters Setup Complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

addEEENewsletters();
