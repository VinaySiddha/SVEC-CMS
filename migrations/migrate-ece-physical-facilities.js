const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

// All data in one structure
const physicalFacilitiesData = {
  class_rooms: [
    {
      type: 'class_room',
      title: 'Class Rooms with ICT Enabled Facilities',
      url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/Class%20Rooms%20Photos.pdf'
    }
  ],
  class_time_tables: [
    {
      type: 'class_time_table',
      title: 'ECE Master Timetable_A.Y for Sem-II 2022-23',
      url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%202nd%20SEM%20%20MasterTime%20Tables.pdf'
    },
    {
      type: 'class_time_table',
      title: 'ECE Master Timetable_A.Y for Sem-I 2022-23',
      url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2022-23%201st%20SEM%20%20MasterTime%20Tables.pdf'
    },
    {
      type: 'class_time_table',
      title: 'ECE Master Timetable_A.Y for Sem-II 2021-22',
      url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%202nd%20SEM%20%20Master%20Time%20Tables.pdf'
    },
    {
      type: 'class_time_table',
      title: 'ECE Master Timetable_A.Y for Sem-I 2021-22',
      url: 'https://srivasaviengg.ac.in/uploads/ece/physical%20facilities/2021-22%201st%20SEM%20%20Master%20Time%20Tables.pdf'
    },
    {
      type: 'class_time_table',
      title: 'B.Tech IV Semester Time Table 2020-21 wef(21-03-2022)',
      url: 'https://srivasaviengg.ac.in/uploads/ece/IV%20Semester%20Time%20Table%202020-21wef%2021-03-2022.pdf'
    },
    {
      type: 'class_time_table',
      title: 'B.Tech VII Semester Timetable_A.Y for Sem-I 2021-22 wef(04-10-2021)',
      url: 'https://srivasaviengg.ac.in/uploads/ece/VII%20Semester%20Time%20Table%202020-21wef%2004-10-2021.pdf'
    }
  ],
  lab_equipments: [
    { type: 'lab_equipment', title: "Xilinx University CPLD Boards, Spartan-3E FPGA Boards" },
    { type: 'lab_equipment', title: "Embedded System ATMEL ARM 9 Boards, HAWK Boards (ARM 9 & OMAP L138)" },
    { type: 'lab_equipment', title: "Analog & Digital Communication Kits" },
    { type: 'lab_equipment', title: "Digital Storage Oscilloscopes GDS 1102U" },
    { type: 'lab_equipment', title: "Microwave Benches (X-Band)" },
    { type: 'lab_equipment', title: "Optical Communication Trainer Kits" },
    { type: 'lab_equipment', title: "Texas Instrumentation DSP Starter Kits (DSK) TMS320C6713" },
    { type: 'lab_equipment', title: "MicroController Trainer and Development Boards" },
    { type: 'lab_equipment', title: "Universal IC Tester" },
    { type: 'lab_equipment', title: "Antenna Trainer Kit" },
    { type: 'lab_equipment', title: "RIGO Spectrum Analyzer With Tracking Generator" }
  ],
  lab_software: [
    { type: 'lab_software', title: "Mentor Graphic's Higher Education Programme 1 (HEP 1) @ 75 User" },
    { type: 'lab_software', title: "MATLAB R2018b version with Different Tool Boxes @ 100 User" },
    { type: 'lab_software', title: "Labtek Spice Simulation Software @ Unlimited User" },
    { type: 'lab_software', title: "Code Composer Studio Software 3.0 @ Unlimited User" },
    { type: 'lab_software', title: "Xilinx System Edition Software 12.2i @ 25 User" },
    { type: 'lab_software', title: "HFSS Antenna tool @ 1 User research version and 5 Users Academic version" }
  ],
  lab_images: [
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%204.JPG" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Electronic%20devices%20and%20Circuits%20Lab%205.JPG" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab-1.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Digita-Communications-Lab--.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac3.jpg" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Microprocessor-and-interfac4.jpg" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm7.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Microwave-and-Optical-Comm6.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-3.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/IOT%20LAB.jpg" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/ECAD-Lab-4.gif" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/Isaac%20Asimov%20Space%20Centre.jpg" },
    { type: 'lab_image', url: "https://srivasaviengg.ac.in/image/ece%20images/SPLab.jpg" }
  ],
  library_images: [
    { type: 'library_image', url: "https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib.JPG" },
    { type: 'library_image', url: "https://srivasaviengg.ac.in/image/ecelibrary/Deprtmnt%20Lib1.JPG" }
  ],
  library_stats: [
    { type: 'library_stat', year: "2018-2019", titles: 454, volumes: 594 },
    { type: 'library_stat', year: "2017-2018", titles: 454, volumes: 594 },
    { type: 'library_stat', year: "2016-2017", titles: 437, volumes: 585 },
    { type: 'library_stat', year: "2015-2016", titles: 329, volumes: 532 },
    { type: 'library_stat', year: "2014-2015", titles: 248, volumes: 532 },
    { type: 'library_stat', year: "2013-2014", titles: 203, volumes: 498 },
    { type: 'library_stat', year: "2012-2013", titles: 167, volumes: 477 }
  ],
  library_incharge: [
    { type: 'library_incharge', phone: "9010146496", email: "hyma_369@yahoo.co.in" }
  ]
};

async function migrateECEPhysicalFacilities() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Create a single table for all physical facilities
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ece_physical_facilities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(32) NOT NULL,
        title VARCHAR(255),
        url VARCHAR(500),
        year VARCHAR(20),
        titles INT,
        volumes INT,
        phone VARCHAR(20),
        email VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clear existing data
    await connection.execute('DELETE FROM ece_physical_facilities');

    // Insert all data
    for (const key in physicalFacilitiesData) {
      for (const item of physicalFacilitiesData[key]) {
        await connection.execute(
          `INSERT INTO ece_physical_facilities (type, title, url, year, titles, volumes, phone, email)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            item.type || null,
            item.title || null,
            item.url || null,
            item.year || null,
            item.titles || null,
            item.volumes || null,
            item.phone || null,
            item.email || null
          ]
        );
      }
    }

    console.log('🎉 ECE Physical Facilities migration completed!');
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await connection.end();
    console.log('🔐 Database connection closed');
  }
}

// Run the migration
if (require.main === module) {
  migrateECEPhysicalFacilities()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { migrateECEPhysicalFacilities };