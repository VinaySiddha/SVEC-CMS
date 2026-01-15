import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  // Only allow GET requests with seed query parameter
  if (req.method !== 'GET' || req.query.seed !== 'true') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    // Clear existing data
    await connection.execute('DELETE FROM ece_physical_facilities');

    // Insert sample data with correct category field
    const sampleData = [
      // Class Rooms
      ['class_room', 'Class Room - A1', 'Modern classroom with smart board and AC', null],
      ['class_room', 'Class Room - A2', 'Spacious classroom with proper ventilation', null],
      ['class_room', 'Class Room - B1', 'Well-equipped classroom with projector facility', null],
      
      // Class Time Tables
      ['class_time_table', '2024-25 Class Time Table', null, 'https://example.com/timetable-2024.pdf'],
      ['class_time_table', '2023-24 Class Time Table', null, 'https://example.com/timetable-2023.pdf'],
      
      // Laboratories
      ['laboratories', 'Microprocessor Lab', 'Lab equipped with 8085 and 8086 microprocessor kits', null],
      ['laboratories', 'Digital Logic Design Lab', 'FPGA and CPLD boards for digital design experiments', null],
      ['laboratories', 'Embedded Systems Lab', 'ARM boards and microcontroller development kits', null],
      ['laboratories', 'Communication Systems Lab', 'Equipment for analog and digital communication experiments', null],
      ['laboratories', 'VLSI Design Lab', 'Xilinx tools and design workstations', null],
      
      // Library
      ['library', 'ECE Department Library', 'Exclusive department library with reference materials', null],
    ];

    for (const [category, title, description, fileUrl] of sampleData) {
      await connection.execute(
        'INSERT INTO ece_physical_facilities (category, title, description, file_url) VALUES (?, ?, ?, ?)',
        [category, title, description, fileUrl]
      );
    }

    res.status(200).json({ 
      success: true, 
      message: 'Physical facilities data seeded successfully', 
      count: sampleData.length 
    });
  } catch (error) {
    console.error('Error seeding data:', error);
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
