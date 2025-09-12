const mysql = require('mysql2/promise');

// EEE Faculty data to migrate
const eeeFaculty = [
  { name: "Dr.Ch.Rambabu", qualification: "Ph.D", designation: "Professor & Dean(Student Affairs)", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Dr.Ch.Rambabu206-rambabusir.pdf" },
  { name: "Dr. D. Sudha Rani", qualification: "Ph.D", designation: "Professor & HOD", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Dr.%20Sudha%20Rani%20Donepudi.pdf" },
  { name: "Dr. Chappa Anil Kumar", qualification: "Ph.D", designation: "Assoc. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Ch.Anil%20Kumar.pdf" },
  { name: "Mr. U. Chandra Rao", qualification: "M.Tech.,(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Chandra%20Rao.pdf" },
  { name: "Mr. N. Sri Harish", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_N.SriharishHarish.pdf" },
  { name: "Mr. Ch.V S R Gopala Krishna", qualification: "M.Tech(Ph.D)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/Ch.V%20S%20R%20G%20Krishna6Ch.V.S.R.%20Gopal%20Krishna.pdf" },
  { name: "Mr. K.Ramesh Babu", qualification: "M.Tech", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Ramesh%20Babu.pdf" },
  { name: "Mr. K.Suresh", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_K.Suresh.pdf" },
  { name: "Mr. M.T.V.L. Ravi Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_M.T.V.L.%20Ravi%20Kumar.pdf" },
  { name: "Mr. L. Suresh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_L.Suresh.pdf" },
  { name: "Mrs. B. Swathi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_B.Swathi.pdf" },
  { name: "Mr. S. Mahesh", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_S.Mahesh.pdf" },
  { name: "Mr. V. Hari Krishnan", qualification: "M.Tech.,(Ph.D)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Hari%20Krishnan.pdf" },
  { name: "Mrs. V.Prashanthi", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_V.%20Prashanthi.pdf" },
  { name: "Mr. U. Uday Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_U.%20Uday%20Kumar.pdf" },
  { name: "Mr. Y. Rajesh Kumar", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/eee_Y.%20Rajesh%20Kumar.pdf" }
];
async function migrateFacultyData() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔌 Connected to database');
    console.log('🏗️  Starting EEE Faculty Migration...');

    // Clear existing EEE faculty data (optional - remove if you want to keep existing data)
    const deleteResult = await connection.execute('DELETE FROM faculty_profiles WHERE dept = ?', ['eee']);
    console.log(`🗑️  Cleared ${deleteResult[0].affectedRows} existing EEE faculty records`);

    // Insert EEE faculty data
    let successCount = 0;
    let errorCount = 0;

    for (const faculty of eeeFaculty) {
      try {
        await connection.execute(`
          INSERT INTO faculty_profiles (
            name, 
            qualification, 
            designation, 
            profile_url, 
            dept, 
            status, 
            specialization,
            email,
            bio,
            research_interests,
            experience_years,
            created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
          faculty.name,
          faculty.qualification,
          faculty.designation,
          faculty.profileUrl,
          'eee',  // Department code
          'approved',  // Status
          'Electrical Engineering',  // Default specialization
          `${faculty.name.toLowerCase().replace(/[^a-z]/g, '')}@svec.edu.in`,  // Auto-generate email
          `${faculty.name} is a dedicated faculty member in the Department of Electrical and Electronics Engineering.`,  // Default bio
          'Power Systems, Control Systems, Electrical Machines',  // Default research interests
          10  // Default experience years
        ]);
        
        console.log(`✅ Inserted: ${faculty.name} - ${faculty.designation}`);
        successCount++;
        
      } catch (error) {
        console.log(`❌ Error inserting ${faculty.name}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} faculty members`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${eeeFaculty.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM faculty_profiles WHERE dept = ?', ['eee']);
    console.log(`📋 Total EEE faculty in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateFacultyData()
    .then(() => {
      console.log('🎉 EEE Faculty migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateFacultyData, eeeFaculty };

module.exports = { migrateFacultyData, eeeFaculty };