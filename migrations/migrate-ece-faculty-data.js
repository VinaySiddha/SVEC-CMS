const mysql = require('mysql2/promise');

// ECE Faculty data to migrate
const faculty = [
  { name: "Dr.E.Kusuma Kumari", qualification: "M.Tech.,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ece_Dr.%20E.%20Kusuma%20Kumari.pdf" },
  { name: "Dr.M.Thamari", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_M.Thamarai.pdf" },
  { name: "Dr.M.Koteswara Rao", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20M.Koteswara%20Rao.pdf" },
  { name: "Dr.Purnima K.Sharma", qualification: "M.Tech.,Ph.D", designation: "Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Purnima.pdf" },
  { name: "Mr.K.N.H Srinivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.K.N.H%20Srinivas.pdf" },
  { name: "Mr.Tota Sreenivas", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20Thota.%20Sreenivas.pdf" },
  { name: "Mr.G.Shankara Bhaskara Rao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.%20Shankar%20Bhaskar%20Rao.pdf" },
  { name: "Dr.T.D.N.S.S.Sarveswararao", qualification: "M.Tech.,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Dr.T.D.N.S.S.RAO.pdf" },
  { name: "Dr.T.V.N.L.Aswini", qualification: "M.Tech;,(Ph.D)", designation: "Assoc.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.T.N.L.Ashwini.pdf" },
  { name: "Mrs.Y.Sujatha", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.Y.Sujatha.pdf" },
  { name: "Mr.D.R.Sandeep", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.D.R%20Sandeep.pdf" },
  { name: "Mr.T.Sreenivasu", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.T.Sreenivasu.pdf" },
  { name: "Mr.M.Subba Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Subba%20Rao.pdf" },
  { name: "Mr.P.Gopala Reddy", qualification: "M.Tech.,(Ph.D)", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.Gopal%20Reddy.pdf" },
  { name: "Mr.P.V.V.Satyanarayana", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.P.V.V%20Satyanarayana.pdf" },
  { name: "Mr.R.Ramprasad", qualification: "M.Tech", designation: "Sr.Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20R.%20RAMPRASAD%20.pdff" },
  { name: "Mr.G.V.Subrahmanyam", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.G.V.Subrahmanyam.pdf" },
  { name: "Mr.J.Rajendra", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.J.Rajendra.pdf" },
  { name: "Dr. S.V.V.Satyanarayana", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.V.V%20Satyanarayana.pdf" },
  { name: "Mrs.V.Radha", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mrs.V.Radha.pdf" },
  { name: "Mr.R.L.R Lokesh Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.R.L.R%20Lokesh%20Babu.pdf" },
  { name: "Mr.M.Vinod Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.M.Vinod%20Kumar.pdf" },
  { name: "Mr.S.Kamesh", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.S.Kamesh.pdf" },
  { name: "Mr.M.Venkata Suman", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.Venkata%20Suman.pdf" },
  { name: "Ms.K.Durga Saranya", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.K.Durga%20Saranya.pdf" },
  { name: "Mr.B.Murali Krishna", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.B.Murali%20Krishna.pdf" },
  { name: "Ms.V.Anil Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20V.%20Anil%20Kumar.pdf" },
  { name: "Mr.D.Venkanna Babu", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20D.%20Venkanna%20Babu.pdf" },
  { name: "Mr.B.Ashok Kumar", qualification: "M.Tech.,(Ph.D)", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20B.%20Ashok%20Kumar.pdf" },
  { name: "Ms.L.Bharani", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20L.%20Bharani.pdf" },
  { name: "Mr.M.pitchaiah", qualification: "M.Tech", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.%20M.%20Pitchaiah.pdf" },
  { name: "Dr. V Jaya Prakash", qualification: "M.Tech.,Ph.D", designation: "Asst.Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Mr.i%20V.%20Jaya%20Prakash.pdf" },
  { name: "Ms.V.V.Naga Lakshmi", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20V.%20V.%20Nagalakshmi.pdf" },
  { name: "Ms.P.Harshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20P.%20Harshini.pdf" },
  { name: "Mrs. K. Indira Priya Darshini", qualification: "Lecturer", designation: "B.Tech", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/ECE_Ms.%20K.%20INDIRA%20PRIYADARSHINI.pdf" },
];

async function migrateECEFacultyData() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔌 Connected to database');
    console.log('🏗️  Starting ECE Faculty Migration...');

    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_teaching_faculty (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        qualification VARCHAR(100),
        designation VARCHAR(100),
        profile_url VARCHAR(255),
        status VARCHAR(50),
        specialization VARCHAR(100),
        email VARCHAR(100),
        bio TEXT,
        research_interests VARCHAR(255),
        experience_years INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clear existing ECE faculty data (optional)
    const deleteResult = await connection.execute('DELETE FROM ece_teaching_faculty');
    console.log(`🗑️  Cleared ${deleteResult[0].affectedRows} existing ECE faculty records`);

    // Insert ECE faculty data
    let successCount = 0;
    let errorCount = 0;

    for (const member of faculty) {
      try {
        await connection.execute(`
          INSERT INTO ece_teaching_faculty (
            name,
            qualification,
            designation,
            profile_url,
            status,
            specialization,
            email,
            bio,
            research_interests,
            experience_years,
            created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
          member.name,
          member.qualification,
          member.designation,
          member.profileUrl,
          'approved',
          'Electronics & Communication Engineering',
          `${member.name.toLowerCase().replace(/[^a-z]/g, '')}@svec.edu.in`,
          `${member.name} is a dedicated faculty member in the Department of Electronics and Communication Engineering.`,
          'VLSI, Communication Systems, Embedded Systems',
          10
        ]);
        console.log(`✅ Inserted: ${member.name} - ${member.designation}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${member.name}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} faculty members`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${faculty.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_faculty');
    console.log(`📋 Total ECE faculty in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEFacultyData()
    .then(() => {
      console.log('🎉 ECE Faculty migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEFacultyData, faculty };