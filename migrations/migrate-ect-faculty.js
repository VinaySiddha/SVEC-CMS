const mysql = require('mysql2/promise');

const faculty = [
    { name: "Dr.E.Kusuma Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" },
    { name: "Mr. P. Nagaraju", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.P.Nagaraju.pdf" },
    { name: "Mr. P.V.V.Rajesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20P.V.V.Rajesh.pdf" },
    { name: "Mr. K.Pasipalana Rao", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20K.Pasipalana%20Rao.pdf" },
    { name: "Ms. M. Neelima", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Ms.%20M.%20Neelima.pdf" },
    { name: "Mr. B. V. V Bhargav", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECT_Mr.%20V%20VBhargavBikkani.pdf" }
  ];

  const nonTeachingFaculty = [
    { name: "Mr.M.V.V.Satyanarayana", designation: "Lab Tech." },
    { name: "Mr.Sk.Mastan Vali(Shabbir)", designation: "Lab Tech." },
    { name: "Mr.Y.Narasimha Rao", designation: "Lab Tech." },
    { name: "Mr.G.Jani Babu", designation: "Lab Tech." },
    { name: "Mr.M.Naga Kavya", designation: "Lab Tech." },
    { name: "Mr.P.Naresh", designation: "Lab Tech." },
    { name: "Mr.G.S.C.V.Padmakar", designation: "D.E.O" },
    { name: "Ms.G.Kalyani Durga", designation: "D.E.O" },
    { name: "Mr.M.Sai Naveen Kumar", designation: "Attender" },
    { name: "Mr.B.Srinivisa Rao", designation: "Attender" },
    { name: "Mr.L.Phani Pallavi", designation: "Attender" },
  ];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTFaculty() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        qualification VARCHAR(255),
        designation VARCHAR(255),
        profileUrl VARCHAR(500),
        is_teaching BOOLEAN NOT NULL DEFAULT TRUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_faculty table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_faculty');
    console.log('🗑️ Cleared existing ECT faculty records');

    // Insert faculty data
    let successCount = 0;
    let errorCount = 0;

    for (const item of faculty) {
      try {
        await connection.execute(
          `INSERT INTO ect_faculty (name, qualification, designation, profileUrl, is_teaching, created_at) VALUES (?, ?, ?, ?, ?, NOW())`,
          [item.name, item.qualification, item.designation, item.profileUrl, true]
        );
        console.log(`✅ Inserted: ${item.name}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.name}: ${error.message}`);
        errorCount++;
      }
    }

    for (const item of nonTeachingFaculty) {
        try {
          await connection.execute(
            `INSERT INTO ect_faculty (name, designation, is_teaching, created_at) VALUES (?, ?, ?, NOW())`,
            [item.name, item.designation, false]
          );
          console.log(`✅ Inserted: ${item.name}`);
          successCount++;
        } catch (error) {
          console.log(`❌ Error inserting ${item.name}: ${error.message}`);
          errorCount++;
        }
      }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} faculty records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${faculty.length + nonTeachingFaculty.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_faculty');
    console.log(`📋 Total faculty records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTFaculty()
    .then(() => {
      console.log('🎉 ECT Faculty migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTFaculty };
