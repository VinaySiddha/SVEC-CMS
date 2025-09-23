const mysql = require('mysql2/promise');

const workshopGuestLectureData = [
  // Workshops/SOC Data
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops/SOC organized during the Academic Year 2022-23',
    academic_year: '2022-23',
    description: 'Workshops/SOC organized during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%20%202022-23%20(1).pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops/SOC organized during the Academic Year 2021-22',
    academic_year: '2021-22',
    description: 'Workshops/SOC organized during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20conducted%20in%202021-22%20(1).pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2019-20',
    academic_year: '2019-20',
    description: 'Workshops organized during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%20_2019-20.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2018-19',
    academic_year: '2018-19',
    description: 'Workshops organized during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,%20SOCs%20Conducted%20in%202018-19.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2017-18',
    academic_year: '2017-18',
    description: 'Workshops organized during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202017-18.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2016-17',
    academic_year: '2016-17',
    description: 'Workshops organized during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202016-17.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2015-16',
    academic_year: '2015-16',
    description: 'Workshops organized during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202015-16.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2014-15',
    academic_year: '2014-15',
    description: 'Workshops organized during the Academic Year 2014-15',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202014-15.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2012-13',
    academic_year: '2012-13',
    description: 'Workshops organized during the Academic Year 2012-13',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202012-13.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop/SOC',
    title: 'Workshops organized during the Academic Year 2011-12',
    academic_year: '2011-12',
    description: 'Workshops organized during the Academic Year 2011-12',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/workshops,seminars,FDPs%20in%202011-12.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'APSSDC- Workshop on web development using DJANGO',
    academic_year: null,
    description: 'APSSDC- Workshop on web development using DJANGO',
    url: 'https://srivasaviengg.ac.in/uploads/ece/APSSDC-%20Workshop%20on%20web%20development%20using%20DJANGO.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'APSSDC -Web designing using react JS',
    academic_year: null,
    description: 'APSSDC -Web designing using react JS',
    url: 'https://srivasaviengg.ac.in/uploads/ece/APSSDC%20-Web%20designing%20using%20react%20JS.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Two Day -Workshop on Design and Analysis of Antenna using CST microwave studio software tool',
    academic_year: null,
    description: 'Two Day -Workshop on Design and Analysis of Antenna using CST microwave studio software tool',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'SOC',
    title: 'One week SOC on Basic Digital Circuit Design with VHDL and QuestaSim Tool SEC-C-',
    academic_year: null,
    description: 'One week SOC on Basic Digital Circuit Design with VHDL and QuestaSim Tool SEC-C-',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Two%20Day%20-Workshop%20on%20Design%20and%20Analysis%20of%20Antenna%20using%20CST%20microwave%20studio%20software%20tool.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Three-day Hands-on workshop Embedded System Design',
    academic_year: null,
    description: 'Three-day Hands-on workshop Embedded System Design',
    url: 'https://srivasaviengg.ac.in/uploads/ece/Three-day%20Hands-on%20workshop%20Embedded%20System%20Design.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'One week workshop on Arduino with scratch',
    academic_year: null,
    description: 'One week workshop on Arduino with scratch',
    url: 'https://srivasaviengg.ac.in/uploads/ece/One%20week%20workshop%20on%20Arduino%20with%20scratch.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'SOC',
    title: 'One-week Skill Oriented program on sensor interfacing and cloud computing',
    academic_year: null,
    description: 'One-week Skill Oriented program on sensor interfacing and cloud computing',
    url: 'https://srivasaviengg.ac.in/uploads/ece/One-week%20Skill%20Oriented%20program%20on%20sensor%20interfacing%20and%20cloud%20computing%20(1).pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Workshop on "SCILAB- Applications in Engineering & Technology", in association with Andhra Pradesh State Skill Development Corporation (APSSDC) under IETE Students Forum (ISF), 21st to 23rd Dec-2017',
    academic_year: '2017-18',
    description: 'Workshop on "SCILAB- Applications in Engineering & Technology", in association with Andhra Pradesh State Skill Development Corporation (APSSDC) under IETE Students Forum (ISF), 21st to 23rd Dec-2017',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/SCI_LAB_Workshop_2017.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Workshop on "Design and Simulation of Antennas & Microwave Devices using HFSS" , 6th & 7th Dec-2017',
    academic_year: '2017-18',
    description: 'Workshop on "Design and Simulation of Antennas & Microwave Devices using HFSS" , 6th & 7th Dec-2017',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/HFSS_Workshop_2017.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Workshop on Arduino-Device Interfacing Conducted on 22nd & 23rd February 2017 for II B. Tech ECE Students Under IETE Student Forum (ISF)',
    academic_year: '2016-17',
    description: 'Workshop on Arduino-Device Interfacing Conducted on 22nd & 23rd February 2017 for II B. Tech ECE Students Under IETE Student Forum (ISF)',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20Arduino%20Device%20Interfacing%20for%20IInd%20Years.pdf'
  },
  {
    category: 'Workshop/SOC',
    type: 'Workshop',
    title: 'Workshop on ROBOTICS and IOT Conducted on 6th & 7th February 2017 for III B. Tech ECE Students Under IETE Student Forum (ISF)',
    academic_year: '2016-17',
    description: 'Workshop on ROBOTICS and IOT Conducted on 6th & 7th February 2017 for III B. Tech ECE Students Under IETE Student Forum (ISF)',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Workshop%20on%20IOT%20&%20Robotics%20for%20%20III%20rd%20Years.pdf'
  },

  // Guest Lectures Data
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2022-23',
    academic_year: '2022-23',
    description: 'Guest Lectures Organized during the Academic Year 2022-23',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20conducted%20%20in%202021-22.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2021-22',
    academic_year: '2021-22',
    description: 'Guest Lectures Organized during the Academic Year 2021-22',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2019-20.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2019-20',
    academic_year: '2019-20',
    description: 'Guest Lectures Organized during the Academic Year 2019-20',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest%20Lectures%20Conducted_2018-19.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2018-19',
    academic_year: '2018-19',
    description: 'Guest Lectures Organized during the Academic Year 2018-19',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2017-18.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2017-18',
    academic_year: '2017-18',
    description: 'Guest Lectures Organized during the Academic Year 2017-18',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2016-17.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2016-17',
    academic_year: '2016-17',
    description: 'Guest Lectures Organized during the Academic Year 2016-17',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2015-16.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2015-16',
    academic_year: '2015-16',
    description: 'Guest Lectures Organized during the Academic Year 2015-16',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2014-15.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2014-15',
    academic_year: '2014-15',
    description: 'Guest Lectures Organized during the Academic Year 2014-15',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2012-13.pdf'
  },
  {
    category: 'Guest Lecture',
    type: 'Guest Lecture',
    title: 'Guest Lectures Organized during the Academic Year 2013-14',
    academic_year: '2013-14',
    description: 'Guest Lectures Organized during the Academic Year 2013-14',
    url: 'https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/Guest_Lectures_Conducted_2011-12.pdf'
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTWorkshopGL() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_workshop_gl (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(50) NOT NULL,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(500) NOT NULL,
        academic_year VARCHAR(20),
        description TEXT,
        url VARCHAR(1000),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_workshop_gl table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_workshop_gl');
    console.log('🗑️ Cleared existing ECT workshop and guest lecture records');

    // Insert workshop and guest lecture data
    let successCount = 0;
    let errorCount = 0;

    for (const item of workshopGuestLectureData) {
      try {
        await connection.execute(
          `INSERT INTO ect_workshop_gl (category, type, title, academic_year, description, url, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [item.category, item.type, item.title, item.academic_year, item.description, item.url]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} workshop and guest lecture records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${workshopGuestLectureData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_workshop_gl');
    console.log(`📋 Total workshop and guest lecture records in database: ${rows[0].count}`);

    // Show breakdown by category
    const [categoryRows] = await connection.execute(`
      SELECT category, COUNT(*) as count
      FROM ect_workshop_gl
      GROUP BY category
    `);

    console.log('\n📈 Records by Category:');
    categoryRows.forEach(row => {
      console.log(`   ${row.category}: ${row.count} records`);
    });

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTWorkshopGL()
    .then(() => {
      console.log('🎉 ECT Workshop and Guest Lecture migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTWorkshopGL, workshopGuestLectureData };
