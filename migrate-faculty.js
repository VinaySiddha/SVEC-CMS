const mysql = require('mysql2/promise');

// Civil Faculty data to insert
const civilFaculty = [
    { name: "Dr.G.Radhakrishnan", qualification: "ME,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_G%20RADHAKRISHNAN%20PROFILE.pdf" },
    { name: "Mr. V.L.D Prasad Reddy", qualification: "M.E.", designation: "Assistant Professor & ACE", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_V%20L%20D%20Prasad%20Reddy.pdf" },
    { name: "Mr. J.Vijaya Chandra", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_VIJAYA%20CHANDRA%20PROFILE.pdf" },
    { name: "Mr. B.HemaSundar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_B%20HEMASUNDAR.pdf" },
    { name: "Mr. M.Prem Kumar Raju", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_M%20PREM%20KUMAR%20RAJU%20PROFILE.pdf" },
    { name: "Mr. K.Gowtham Kumar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Gowtham%20Kumar.pdf" },
    { name: "Mr. E Hanuman Sai Gupta", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CE_E%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Ms. B.Rohitha", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_ROHITHA%20PROFILE.pdf" },
    { name: "Ms. Ch.Sumaja", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_CH%20Sumaja.pdf" },
    { name: "Mr. K.J.Ganapathi", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Kaigala%20J%20Ganapathi.pdf" }
];


async function migrateCivilFacultyProfiles() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Connected to database');

    // Clear existing Civil faculty data
    await connection.execute('DELETE FROM faculty_profiles WHERE dept = ?', ['civil']);
    console.log('Cleared existing Civil faculty data');

    // Insert faculty data
    for (const faculty of civilFaculty) {
      try {
        await connection.execute(`
          INSERT INTO faculty_profiles (
            name, qualification, designation, profile_url, dept, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, [
          faculty.name,
          faculty.qualification,
          faculty.designation,
          faculty.profileUrl,
          'civil',
          'approved'
        ]);
        console.log(`Inserted: ${faculty.name}`);
      } catch (e) {
        console.log(`Error inserting ${faculty.name}:`, e.message);
      }
    }

    console.log('✅ Civil faculty profiles migration completed successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await connection.end();
  }
}

migrateCivilFacultyProfiles();
