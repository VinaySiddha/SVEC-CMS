import mysql from 'mysql2/promise';

async function setupDSSeminarHalls() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Setting up DS Physical Facilities (Seminar Halls)...');

    // Check if seminar halls data already exists
    const [existingSeminars] = await connection.execute(
      'SELECT COUNT(*) as count FROM ds_physical_facilities WHERE category = ?',
      ['Seminar Halls']
    );

    if (existingSeminars[0].count === 0) {
      // Insert Seminar Halls data
      await connection.execute(`
        INSERT INTO \`ds_physical_facilities\` (\`category\`, \`title\`, \`description\`, \`document_url\`) VALUES
        ('Seminar Halls', 'Seminar Hall 1 - ICT Enabled', 'Well equipped seminar hall with projection facilities and interactive boards', 'https://srivasaviengg.ac.in/uploads/ds/seminar_hall_1.pdf'),
        ('Seminar Halls', 'Seminar Hall 2 - Conference Room', 'Advanced conference facility with video conferencing setup and high-speed connectivity', 'https://srivasaviengg.ac.in/uploads/ds/seminar_hall_2.pdf'),
        ('Seminar Halls', 'Seminar Hall 3 - Meeting Room', 'Small meeting room with basic ICT facilities for group discussions', 'https://srivasaviengg.ac.in/uploads/ds/seminar_hall_3.pdf'),
        ('Seminar Halls', 'Seminar Halls with ICT Enabled Facilities', 'Complete seminar hall facilities overview', 'https://srivasaviengg.ac.in/uploads/ds/DS_Seminar_Halls.pdf')
      `);
      console.log('✓ Inserted Seminar Halls data');
    } else {
      console.log('✓ Seminar Halls data already exists');
    }

    console.log('✓ DS Physical Facilities (Seminar Halls) setup completed successfully');
  } catch (error) {
    console.error('Error setting up DS Physical Facilities:', error);
  } finally {
    await connection.end();
    process.exit(0);
  }
}

setupDSSeminarHalls();
