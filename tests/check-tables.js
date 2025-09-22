const mysql = require('mysql2/promise');

async function checkTables() {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('Connected to database');

    // Check faculty_profiles table structure
    console.log('\n=== Faculty Profiles Table ===');
    const [facultyColumns] = await connection.execute('DESCRIBE faculty_profiles');
    facultyColumns.forEach(col => console.log(`${col.Field}: ${col.Type}`));

    // Check labs table structure
    console.log('\n=== Labs Table ===');
    const [labColumns] = await connection.execute('DESCRIBE labs');
    labColumns.forEach(col => console.log(`${col.Field}: ${col.Type}`));

    // Check faculty_achievements table structure
    console.log('\n=== Faculty Achievements Table ===');
    const [facultyAchColumns] = await connection.execute('DESCRIBE faculty_achievements');
    facultyAchColumns.forEach(col => console.log(`${col.Field}: ${col.Type}`));

    // Check student_achievements table structure
    console.log('\n=== Student Achievements Table ===');
    const [studentAchColumns] = await connection.execute('DESCRIBE student_achievements');
    studentAchColumns.forEach(col => console.log(`${col.Field}: ${col.Type}`));

    // Check workshops table structure
    console.log('\n=== Workshops Table ===');
    const [workshopColumns] = await connection.execute('DESCRIBE workshops');
    workshopColumns.forEach(col => console.log(`${col.Field}: ${col.Type}`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

checkTables();
