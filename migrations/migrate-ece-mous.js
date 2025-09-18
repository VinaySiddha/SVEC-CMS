const mysql = require('mysql2/promise');

const mousData = [
  {
    organization: "Tessolve Semiconductor Test Engineering Lab for STE-SDC Course- Bangalore",
    date: "04-12-2023",
    status: "On going",
    purpose: `1. To Support Skill Oriented Training in the field of Semiconductor Test and Measurement for ECE /EEE UG Students
2. To offer Skill Development Certification Course on Semi Conductor Test Engineering
3. To Provide Placement Assistance`,
    document_url: "https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf",
    type: "industry"
  },
  {
    organization: "NIT Andhra Pradesh",
    date: "09-02-2023",
    status: "On going",
    purpose: `1.Supports research activities, proposal writing
2.Colloborative research work
3.Faculty exchange
4.Conducting expert lectures and workshops for students`,
    document_url: "https://srivasaviengg.ac.in/uploads/ece/2.%20NIT%20AP%20MOU.pdf",
    type: "industry"
  },
  {
    organization: "Edu Skills",
    date: "22-11-2022",
    status: "On going",
    purpose: "To provide training for faculty and students on Advanced technologies",
    document_url: "https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf",
    type: "industry"
  },
  {
    organization: "Electro-Pro E-waste Management",
    date: "08-06-2022",
    status: "On going",
    purpose: `1.Electro pro supports students of SVEC in designing and development of products from E-Waste.
2.Also provides training on robotics and Embedded systems for students.`,
    document_url: "https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf",
    type: "industry"
  },
  {
    organization: "EFY-Certified Electronics Skill development center",
    date: "13-6-2019",
    status: "Completed",
    purpose: `1.EFY provided 50 subscription of Electronics for you magazine for one year.
2.EFY provided DIY Kits, self learning Kits, development boards, electronic components for the students to do projects.
3.EFY provided access to 10 students for monthly EFY webinars on different topics`,
    document_url: "https://srivasaviengg.ac.in/uploads/ece/5.%20EFy%20MOU.pdf",
    type: "industry"
  },
  // Interaction with the Industry
  {
    organization: "Electro-Pro e-Waste Management, Visakapatnam",
    date: "",
    status: "Proposed",
    purpose: "Establish Electro Pro e-Waste in Campus",
    document_url: "https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Electro%20Pro%20Management.pdf",
    type: "interaction"
  },
  {
    organization: "Thing tronics company, Banglore",
    date: "",
    status: "Proposed",
    purpose: "Establish IOT lab in Campus",
    document_url: "https://srivasaviengg.ac.in/eceguest_worksemfdpfiles/MOU%20With%20Thingtronics.pdf",
    type: "interaction"
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECEMoUs() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_mous (
        id INT AUTO_INCREMENT PRIMARY KEY,
        organization VARCHAR(255) NOT NULL,
        date VARCHAR(32),
        status VARCHAR(32),
        purpose TEXT,
        document_url VARCHAR(500),
        type VARCHAR(32),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ece_mous table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ece_mous');
    console.log('🗑️ Cleared existing ECE MoUs records');

    // Insert MoUs data
    let successCount = 0;
    let errorCount = 0;

    for (const item of mousData) {
      try {
        await connection.execute(
          `INSERT INTO ece_mous (organization, date, status, purpose, document_url, type, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [item.organization, item.date, item.status, item.purpose, item.document_url, item.type]
        );
        console.log(`✅ Inserted: ${item.organization}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.organization}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} MoU records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${mousData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ece_mous');
    console.log(`📋 Total MoU records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEMoUs()
    .then(() => {
      console.log('🎉 ECE MoUs migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECEMoUs, mousData };