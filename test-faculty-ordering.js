const mysql = require('mysql2/promise');

async function testFacultyOrdering() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Test the new ordering query
    const [faculty] = await connection.execute(
      `SELECT name, designation FROM faculty_profiles WHERE dept = ? AND (status = "approved" OR status IS NULL) 
       ORDER BY 
         CASE designation
           WHEN 'Professor & HOD' THEN 1
           WHEN 'Professor & Dean(Student Affairs)' THEN 2
           WHEN 'Assoc. Professor' THEN 3
           WHEN 'Sr. Asst. Professor' THEN 4
           WHEN 'Asst. Professor' THEN 5
           ELSE 6
         END,
         name`,
      ['EEE']
    );
    
    console.log('\n=== EEE Faculty Ordered by Designation Hierarchy ===');
    let currentDesignation = '';
    faculty.forEach((row, index) => {
      if (row.designation !== currentDesignation) {
        currentDesignation = row.designation;
        console.log(`\n--- ${currentDesignation} ---`);
      }
      console.log(`${index + 1}. ${row.name}`);
    });

    console.log(`\n✅ Total faculty: ${faculty.length}`);
    
    // Group by designation for summary
    const designationGroups = faculty.reduce((groups, member) => {
      const designation = member.designation;
      if (!groups[designation]) groups[designation] = [];
      groups[designation].push(member.name);
      return groups;
    }, {});

    console.log('\n=== Faculty Count by Designation ===');
    Object.entries(designationGroups).forEach(([designation, members]) => {
      console.log(`${designation}: ${members.length} faculty`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

testFacultyOrdering();