const mysql = require('mysql2/promise');

const workshopsData = [
  // Workshops/SOC (type: 'workshop_soc')
  {
    type: 'workshop_soc',
    year: '2022-23',
    title: 'Workshops/SOC organized during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%20%202022-23%20(1).pdf',
  },
  {
    type: 'workshop_soc',
    year: '2021-22',
    title: 'Workshops/SOC organized during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%202021-22%20(1).pdf',
  },
  {
    type: 'workshop_soc',
    year: '2019-20',
    title: 'Workshops organized during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%20_2019-20.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2018-19',
    title: 'Workshops organized during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%202018-19.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2017-18',
    title: 'Workshops organized during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202017-18.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2016-17',
    title: 'Workshops organized during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202016-17.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2015-16',
    title: 'Workshops organized during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202015-16.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2014-15',
    title: 'Workshops organized during the Academic Year 2014-15',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202014-15.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2012-13',
    title: 'Workshops organized during the Academic Year 2012-13',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202012-13.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2011-12',
    title: 'Workshops organized during the Academic Year 2011-12',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202011-12.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'APSSDC- Workshop on web development using DJANGO',
    url: 'https://srivasaviengg.ac.in/uploads/ece/APSSDC-%20Workshop%20on%20web%20development%20using%20DJANGO.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'APSSDC -Web designing using react JS',
    url: 'https://srivasaviengg.ac.in/uploads/ece/APSSDC%20-Web%20designing%20using%20react%20JS.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'Two Day -Workshop on Design and Analysis of Antenna using CST microwave studio software tool',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'One week SOC on Basic Digital Circuit Design with VHDL and QuestaSim Tool SEC-C-',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'Three-day Hands-on workshop Embedded System Design',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Three-day%20Hands-on%20workshop%20Embedded%20System%20Design.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'One week workshop on Arduino with scratch',
    url: 'https://srivasaviengg.ac.in/uploads/ece/One%20week%20workshop%20on%20Arduino%20with%20scratch.pdf',
  },
  {
    type: 'workshop_soc',
    year: null,
    title: 'One-week Skill Oriented program on sensor interfacing and cloud computing',
    url: 'https://srivasaviengg.ac.in/uploads/ece/One-week%20Skill%20Oriented%20program%20on%20sensor%20interfacing%20and%20cloud%20computing%20(1).pdf',
  },
  {
    type: 'workshop_soc',
    year: '2017-12-21',
    title: 'Workshop on "SCILAB- Applications in Engineering & Technology", in association with APSSDC under IETE Students Forum (ISF), 21st to 23rd Dec-2017',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SCI_LAB_Workshop_2017.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2017-12-06',
    title: 'Workshop on "Design and Simulation of Antennas & Microwave Devices using HFSS" , 6th & 7th Dec-2017',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/HFSS_Workshop_2017.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2017-02-22',
    title: 'Workshop on Arduino-Device Interfacing Conducted on 22nd & 23rd February 2017 for II B. Tech ECE Students Under IETE Student Forum (ISF)',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20Arduino%20Device%20Interfacing%20for%20IInd%20Years.pdf',
  },
  {
    type: 'workshop_soc',
    year: '2017-02-06',
    title: 'Workshop on ROBOTICS and IOT Conducted on 6th & 7th February 2017 for III B. Tech ECE Students Under IETE Student Forum (ISF)',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20IOT%20&%20Robotics%20for%20%20III%20rd%20Years.pdf',
  },

  // Workshops/SOC Gallery (type: 'gallery')
  ...[
    "guestlecture_img1.jpg",
    "guestlecture_img2.jpg",
    "guestlecture_img3.jpg",
    "guestlecture_img4.jpg",
    "fdp_1.jpg",
    "fdp_2.jpg",
    "fdp_3.jpg",
    "fdp_4.jpg",
    "IOEA_1.jpg",
    "IOEA_2.jpg",
    "IOEA_3.jpg",
    "IOEA_4.jpg"
  ].map((img, idx) => ({
    type: 'gallery',
    year: null,
    title: `Workshops/SOC Gallery PIC ${idx + 1}`,
    url: `https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/${img}`,
  })),

  // Guest Lectures (type: 'guest_lecture')
  {
    type: 'guest_lecture',
    year: '2022-23',
    title: 'Guest Lectures Organized during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20conducted%20%20in%202021-22.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2021-22',
    title: 'Guest Lectures Organized during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2019-20.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2019-20',
    title: 'Guest Lectures Organized during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20Conducted_2018-19.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2018-19',
    title: 'Guest Lectures Organized during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2017-18.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2017-18',
    title: 'Guest Lectures Organized during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2016-17.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2016-17',
    title: 'Guest Lectures Organized during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2015-16.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2015-16',
    title: 'Guest Lectures Organized during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2014-15.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2014-15',
    title: 'Guest Lectures Organized during the Academic Year 2014-15',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2012-13.pdf',
  },
  {
    type: 'guest_lecture',
    year: '2013-14',
    title: 'Guest Lectures Organized during the Academic Year 2013-14',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2011-12.pdf',
  },
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEWorkshopsGL() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_worshops_gl (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        year VARCHAR(32),
        title VARCHAR(512) NOT NULL,
        url VARCHAR(512),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_worshops_gl table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_worshops_gl');
    console.log('🗑️ Cleared existing workshops/guest lectures records');

    // Insert data
    let successCount = 0;
    let errorCount = 0;

    for (const item of workshopsData) {
      try {
        await connection.execute(
          `INSERT INTO ece_worshops_gl (type, year, title, url, created_at) VALUES (?, ?, ?, ?, NOW())`,
          [item.type, item.year, item.title, item.url]
        );
        console.log(`✅ Inserted: [${item.type}] ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting [${item.type}] ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${workshopsData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_worshops_gl');
    console.log(`📋 Total records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEWorkshopsGL()
    .then(() => {
      console.log('🎉 ECE Workshops/SOC/Guest Lectures migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEWorkshopsGL, workshopsData };