const mysql = require('mysql2/promise');

const clubsData = [
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Space Club',
    description: 'SPACE CLUB_AICTE-SPICES',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SPICES%20Information.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 1: One Week Hands on Workshop on IoT Use Cases & Development',
    description: 'One Week Hands on Workshop on IoT Use Cases & Development',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/One%20Week%20Hands%20on%20Workshop%20on%20IoT%20Use%20Cases%20&%20Development.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 2: 8th International YOGA DAY celebrations',
    description: '8th International YOGA DAY celebrations',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%202%20details%20-merged%20PDF.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 3: One Week Handson Workshop on IoT & its Applications',
    description: 'One Week Handson Workshop on IoT & its Applications',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event-3%20Merged%20PDF.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: "Event 4: Engineer's Day Celebrations 2K22",
    description: "Engineer's Day Celebrations 2K22",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Event%204%20details%20Merged%20PDF.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 5: IOT Hackathon Program 2K23',
    description: 'IOT Hackathon Program 2K23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/IoT2HACK-2K23.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 6: under AICTE- SPICES',
    description: 'Event 6: under AICTE- SPICES',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event%20-5%20under%20AICTE-%20SPICES.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 7: One week Boot Camp Program on “Sensor Interfacing and Cloud Computing”',
    description: 'One week Boot Camp Program on “Sensor Interfacing and Cloud Computing”',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/EVENT-7%20%20Bootcamp%20program%20on%20Sensor%20Interfacing%20&%20Cloud%20Computing.pdf'
  },
  {
    club: 'SPACE CLUB_AICTE-SPICES',
    event: 'Event 8: SOC Program on VHDL & Digital Questa Sim',
    description: 'SOC Program on VHDL & Digital Questa Sim',
    url: 'https://srivasaviengg.ac.in/uploads/ece_meritscholarships/Event-8%20%20SOC%20Program%20on%20VHDL%20&%20Digital%20Questa%20Sim.pdf'
  },
  {
    club: 'E- Waste Management Refurbishing club',
    event: 'E-Waste Refurbishing Club',
    description: 'E-Waste Refurbishing Club',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/E-Waste%20Refurbishing%20Club.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEClubs() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_clubs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        club VARCHAR(100) NOT NULL,
        event VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_clubs table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_clubs');
    console.log('🗑️ Cleared existing ECE clubs records');

    // Insert clubs data
    let successCount = 0;
    let errorCount = 0;

    for (const item of clubsData) {
      try {
        await connection.execute(
          `INSERT INTO ece_clubs (club, event, description, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.club, item.event, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.event}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.event}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} club records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${clubsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_clubs');
    console.log(`📋 Total club records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEClubs()
    .then(() => {
      console.log('🎉 ECE Clubs migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEClubs, clubsData };