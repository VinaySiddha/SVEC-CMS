const mysql = require('mysql2/promise');

const fdpData = [
  // FDP Attended
  {
    type: 'attended',
    year: '2022-23',
    title: 'FDPs attended by the Faculty 2022-23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_22-23.pdf'
  },
  {
    type: 'attended',
    year: '2021-22',
    title: 'FDPs attended by the Faculty 2021-22',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_21-22.pdf'
  },
  {
    type: 'attended',
    year: '2020-21',
    title: 'FDPs attended by the Faculty 2020-21',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_faculty_certificatons_20-21.pdf'
  },
  {
    type: 'attended',
    year: '2019-20',
    title: 'FDPs attended by the Faculty 2019-20',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/ece_FDPs_19-20.pdf'
  },
  {
    type: 'attended',
    year: '2018-19',
    title: 'FDPs attended by the Faculty 2018-19',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2018-19%20FDP%20attended.pdf'
  },
  {
    type: 'attended',
    year: '2017-18',
    title: 'FDPs attended by the Faculty 2017-18',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2017-18%20FDP%20attended.pdf'
  },
  {
    type: 'attended',
    year: '2016-17',
    title: 'FDPs attended by the Faculty 2016-17',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2016-17%20FDP%20attended.pdf'
  },
  {
    type: 'attended',
    year: '2015-16',
    title: 'FDPs attended by the Faculty 2015-16',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2015-16%20FDP%20attended.pdf'
  },
  {
    type: 'attended',
    year: '2014-15',
    title: 'FDPs attended by the Faculty 2014-15',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2014-15FDP%20Attended.pdf'
  },
  {
    type: 'attended',
    year: '2013-14',
    title: 'FDPs attended by the Faculty 2013-14',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2013-2014%20FDP%20Attended.pdf'
  },
  {
    type: 'attended',
    year: '2012-13',
    title: 'FDPs attended by the Faculty 2012-13',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2012-13%20FDP%20Attended.pdf'
  },
  {
    type: 'attended',
    year: '2011-12',
    title: 'FDPs attended by the Faculty 2011-12',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/2011-12%20FDP%20attended.pdf'
  },

  // FDPs/Workshops/Training Programmes Conducted
  {
    type: 'conducted',
    year: '',
    title: 'Two Day FDP on Open source software tools for online teaching',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20FDP%20on%20Open%20source%20software%20tools%20for%20online%20teaching.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'Three Day FDP on Software tools for Research publications and patent filing',
    url: 'https://srivasaviengg.ac.in/uploads/ece/three%20Day%20FDP%20on%20Software%20tools%20for%20Research%20publications%20and%20patent%20filing.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'A Three Day National Level Online FDP on Research Trends in Signal Processing, Antennae, VLSI and IoT',
    url: 'https://srivasaviengg.ac.in/uploads/ece/A%20Three%20Day%20National%20Level%20Online%20FDP%20on%20Research%20Trends%20in%20Signal%20Processing,%20Antennae,%20VLSI%20and%20IoT.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'Two Day FEP on Antenna & wireless Communications',
    url: 'https://srivasaviengg.ac.in/uploads/ece/two%20%20Day%20FEP%20on%20Antenna%20&%20wireless%20Communications.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'Five Day FDP on IoT and Applications',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'Faculty Enablement Program on Signal and Image processing',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Faculty%20Enablement%20Program%20%20on%20Signal%20and%20Image%20processing.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'FDP on Research Challenges and Opportunities post COVID19',
    url: 'https://srivasaviengg.ac.in/uploads/ece/FDP%20on%20Research%20Challenges%20and%20Opportunities%20post%20COVID19.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'AICTE-ATAL sponsored FDP on RF Energy harvesting Antenna Design for wirless body area network',
    url: 'https://srivasaviengg.ac.in/uploads/ece/AICTE-ATAL%20sponsored%20FDP%20on%20RF%20Energy%20harvesting%20Antenna%20Design%20for%20wirless%20body%20area%20networks.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-1',
    url: 'https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20Phase-1.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-2',
    url: 'https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase-2.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-3',
    url: 'https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP-%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing.%20%20Phase%20-3.pdf'
  },
  {
    type: 'conducted',
    year: '',
    title: 'AICTE-AQIS sponsored FDP-on Research area in Bio medical singal processing. Phase-4',
    url: 'https://srivasaviengg.ac.in/uploads/ece/AICTE-AQIS%20sponsored%20FDP%20on%20Research%20area%20in%20Bio%20medical%20singal%20processing%20phase-4.pdf'
  },
  {
    type: 'conducted',
    year: '2022-23',
    title: "FDP's Conducted by the Faculty during the A.Y 2022-23",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202022-23.pdf'
  },
  {
    type: 'conducted',
    year: '2021-22',
    title: "FDP's Conducted by the Faculty during the A.Y 2021-22",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202021-22.pdf'
  },
  {
    type: 'conducted',
    year: '2020-21',
    title: "FDP's Conducted by the Faculty during the A.Y 2020-21",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202020-21.pdf'
  },
  {
    type: 'conducted',
    year: '2019-20',
    title: "FDP's Conducted by the Faculty during the A.Y 2019-20",
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/FDP%20conducted%20in%202019-20.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEFDP() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_fdp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        year VARCHAR(32),
        title VARCHAR(255) NOT NULL,
        url VARCHAR(500),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_fdp table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_fdp');
    console.log('🗑️ Cleared existing ECE FDP records');

    // Insert FDP data
    let successCount = 0;
    let errorCount = 0;

    for (const item of fdpData) {
      try {
        await connection.execute(
          `INSERT INTO ece_fdp (type, year, title, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.type, item.year, item.title, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} FDP records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${fdpData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_fdp');
    console.log(`📋 Total FDP records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEFDP()
    .then(() => {
      console.log('🎉 ECE FDP migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEFDP, fdpData };