const mysql = require('mysql2/promise');

async function addMoreHackathons() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database\n');

    // Add more hackathon events
    const newHackathons = [
      {
        dept: 'cse-ai',
        academic_year: '2023-2024',
        brochure_url: '/uploads/cse-ai/hackathons/hackathon_2023_brochure.pdf',
        winners_url: '/uploads/cse-ai/hackathons/hackathon_2023_winners.pdf',
        gallery: '/uploads/cse-ai/hackathons/2023-img1.jpg,/uploads/cse-ai/hackathons/2023-img2.jpg'
      },
      {
        dept: 'cse-ai',
        academic_year: '2024-2025',
        brochure_url: '/uploads/cse-ai/hackathons/hackathon_2024_brochure.pdf',
        winners_url: '/uploads/cse-ai/hackathons/hackathon_2024_winners.pdf',
        gallery: '/uploads/cse-ai/hackathons/2024-img1.jpg,/uploads/cse-ai/hackathons/2024-img2.jpg,/uploads/cse-ai/hackathons/2024-img3.jpg'
      }
    ];

    console.log('📝 Adding new hackathon records...\n');
    
    for (const hack of newHackathons) {
      await connection.execute(
        'INSERT INTO cai_hackathons (dept, academic_year, brochure_url, winners_url, gallery) VALUES (?, ?, ?, ?, ?)',
        [hack.dept, hack.academic_year, hack.brochure_url, hack.winners_url, hack.gallery]
      );
      console.log(`✅ Added hackathon for ${hack.academic_year}`);
    }

    // Verify all hackathons
    console.log('\n📋 Current hackathons in database:');
    const [allHacks] = await connection.execute('SELECT id, dept, academic_year FROM cai_hackathons ORDER BY id DESC');
    
    allHacks.forEach((row, idx) => {
      console.log(`${idx + 1}. ${row.academic_year} (${row.dept})`);
    });

    console.log(`\n✅ Total hackathons: ${allHacks.length}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addMoreHackathons();
