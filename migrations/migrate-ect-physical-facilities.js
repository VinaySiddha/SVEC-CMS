const mysql = require('mysql2/promise');

const physicalFacilitiesData = [
  // Class Rooms & Class Time Tables
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Rooms',
    title: 'Class Rooms with ICT Enabled Facilities',
    description: 'Class Rooms with ICT Enabled Facilities',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/Class%20Rooms%20Photos.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'ECE Master Timetable A.Y for II Sem 2022-23',
    description: 'ECE Master Timetable A.Y for II Sem 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%202nd%20SEM%20%20MasterTime%20Tables.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'ECE Master Timetable A.Y for I Sem 2022-23',
    description: 'ECE Master Timetable A.Y for I Sem 2022-23',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%201st%20SEM%20%20MasterTime%20Tables.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'ECE Master Timetable A.Y for II Sem 2021-22',
    description: 'ECE Master Timetable A.Y for II Sem 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%202nd%20SEM%20%20Master%20Time%20Tables.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'ECE Master Timetable A.Y for I Sem 2021-22',
    description: 'ECE Master Timetable A.Y for I Sem 2021-22',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%201st%20SEM%20%20MasterTime%20Tables.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'B.Tech IV Semester Timetable 2020-21 wef(21-03-2022)',
    description: 'B.Tech IV Semester Timetable 2020-21 wef(21-03-2022)',
    url: 'https://srivasaviengg.ac.in/uploads/ece/IV%20Semester%20Time%20Table%202020-21wef%2021-03-2022.pdf',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Class Time Tables',
    title: 'B.Tech VII Semester Timetable A.Y for I 2021-22 wef(04-10-2021)',
    description: 'B.Tech VII Semester Timetable A.Y for I 2021-22 wef(04-10-2021)',
    url: 'https://srivasaviengg.ac.in/uploads/ece/VII%20Semester%20Time%20Table%202020-21wef%2004-10-2021.pdf',
    additional_data: null
  },
  // Images for Class Rooms
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 1',
    description: 'Physical Facility Image 1',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.37%20AM.jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 2',
    description: 'Physical Facility Image 2',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.38%20AM%20(1).jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 3',
    description: 'Physical Facility Image 3',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.42%20AM.jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 4',
    description: 'Physical Facility Image 4',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.41%20AM%20(1).jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 5',
    description: 'Physical Facility Image 5',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.41%20AM.jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 6',
    description: 'Physical Facility Image 6',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.40%20AM%20(1).jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 7',
    description: 'Physical Facility Image 7',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.40%20AM.jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 8',
    description: 'Physical Facility Image 8',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.39%20AM%20(1).jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 9',
    description: 'Physical Facility Image 9',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.39%20AM.jpeg',
    additional_data: null
  },
  {
    category: 'Class Rooms & Class Time Tables',
    subcategory: 'Images',
    title: 'Physical Facility Image 10',
    description: 'Physical Facility Image 10',
    url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/WhatsApp%20Image%202024-02-08%20at%2011.35.38%20AM%20(2).jpeg',
    additional_data: null
  },
  // Laboratories
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Xilinx University CPLD Boards, Spartan-3E FPGA Boards',
    description: 'Xilinx University CPLD Boards, Spartan-3E FPGA Boards',
    url: '#',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 & OMAP L138)',
    description: 'Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 & OMAP L138)',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Analog & Digital Communication Kits',
    description: 'Analog & Digital Communication Kits',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Digital Storage Oscilloscopes GDS 1102U',
    description: 'Digital Storage Oscilloscopes GDS 1102U',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Microwave Benches (X-Band)',
    description: 'Microwave Benches (X-Band)',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Optical Communication Trainer Kits',
    description: 'Optical Communication Trainer Kits',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713',
    description: 'Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'MicroController Trainer and Development Boards',
    description: 'MicroController Trainer and Development Boards',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Universal IC Tester',
    description: 'Universal IC Tester',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'Antenna Trainer Kit',
    description: 'Antenna Trainer Kit',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Equipment Available',
    title: 'RIGO Spectrum Analyzer With Tracking Generator',
    description: 'RIGO Spectrum Analyzer With Tracking Generator',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: "Mentor Graphic's Higher Education Programme 1 (HEP 1) @ 75 User",
    description: "Mentor Graphic's Higher Education Programme 1 (HEP 1) @ 75 User",
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: 'MATLAB R2018b version with Different Tool Boxes @ 100 User',
    description: 'MATLAB R2018b version with Different Tool Boxes @ 100 User',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: 'Labtek Spice Simulation Software @ Unlimited User',
    description: 'Labtek Spice Simulation Software @ Unlimited User',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: 'Code Composer Studio Software 3.0 @ Unlimited User',
    description: 'Code Composer Studio Software 3.0 @ Unlimited User',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: 'Xilinx System Edition Software 12.2i @ 25 User',
    description: 'Xilinx System Edition Software 12.2i @ 25 User',
    url: null,
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Major Software Available',
    title: 'HFSS Antenna tool @ 1 User research version and 5 Users Academic version',
    description: 'HFSS Antenna tool @ 1 User research version and 5 Users Academic version',
    url: null,
    additional_data: null
  },
  // Images for Laboratories
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 1',
    description: 'Lab Facility Image 1',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%204.JPG',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 2',
    description: 'Lab Facility Image 2',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%205.JPG',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 3',
    description: 'Lab Facility Image 3',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab-1.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 4',
    description: 'Lab Facility Image 4',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab--.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 5',
    description: 'Lab Facility Image 5',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac3.jpg',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 6',
    description: 'Lab Facility Image 6',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac4.jpg',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 7',
    description: 'Lab Facility Image 7',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 8',
    description: 'Lab Facility Image 8',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm7.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 9',
    description: 'Lab Facility Image 9',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm6.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 10',
    description: 'Lab Facility Image 10',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-3.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 11',
    description: 'Lab Facility Image 11',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/IOT%20LAB.jpg',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 12',
    description: 'Lab Facility Image 12',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-4.gif',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 13',
    description: 'Lab Facility Image 13',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/Isaac%20Asimov%20Space%20Centre.jpg',
    additional_data: null
  },
  {
    category: 'Laboratories',
    subcategory: 'Images',
    title: 'Lab Facility Image 14',
    description: 'Lab Facility Image 14',
    url: 'https://srivasaviengg.ac.in/image/ece%20images/SPLab.jpg',
    additional_data: null
  },
  // Department Library
  {
    category: 'Department Library',
    subcategory: 'Images',
    title: 'Department Library Image 1',
    description: 'Department Library Image 1',
    url: 'https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib.JPG',
    additional_data: null
  },
  {
    category: 'Department Library',
    subcategory: 'Images',
    title: 'Department Library Image 2',
    description: 'Department Library Image 2',
    url: 'https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib1.JPG',
    additional_data: null
  },
  {
    category: 'Department Library',
    subcategory: 'Description',
    title: 'Library Description',
    description: 'The department runs an exclusive department Library to the benefit of Faculty as well as students.',
    url: null,
    additional_data: JSON.stringify([
      { academic_year: '2018-2019', no_of_titles: 454, no_of_volumes: 594 },
      { academic_year: '2017-2018', no_of_titles: 454, no_of_volumes: 594 },
      { academic_year: '2016-2017', no_of_titles: 437, no_of_volumes: 585 },
      { academic_year: '2015-2016', no_of_titles: 329, no_of_volumes: 532 },
      { academic_year: '2014-2015', no_of_titles: 248, no_of_volumes: 532 },
      { academic_year: '2013-2014', no_of_titles: 203, no_of_volumes: 498 },
      { academic_year: '2012-2013', no_of_titles: 167, no_of_volumes: 477 }
    ])
  },
  {
    category: 'Department Library',
    subcategory: 'Faculty Incharge',
    title: 'Faculty Incharge',
    description: 'Faculty Incharge',
    url: null,
    additional_data: JSON.stringify({
      phone: '9010146496',
      email: 'hyma_369@yahoo.co.in'
    })
  }
];

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function migrateECTPhysicalFacilities() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ect_physical_facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        subcategory VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500),
        additional_data JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ ect_physical_facilities table created/verified successfully');

    // Clear existing data (optional)
    await connection.execute('DELETE FROM ect_physical_facilities');
    console.log('🗑️ Cleared existing ECT physical facilities records');

    // Insert physical facilities data
    let successCount = 0;
    let errorCount = 0;

    for (const item of physicalFacilitiesData) {
      try {
        await connection.execute(
          `INSERT INTO ect_physical_facilities (category, subcategory, title, description, url, additional_data, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [item.category, item.subcategory, item.title, item.description, item.url, item.additional_data]
        );
        console.log(`✅ Inserted: ${item.title}`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error inserting ${item.title}: ${error.message}`);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successfully inserted: ${successCount} physical facilities records`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total processed: ${physicalFacilitiesData.length}`);

    // Verify the data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM ect_physical_facilities');
    console.log(`📋 Total physical facilities records in database: ${rows[0].count}`);

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECTPhysicalFacilities()
    .then(() => {
      console.log('🎉 ECT Physical Facilities migration completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateECTPhysicalFacilities, physicalFacilitiesData };
