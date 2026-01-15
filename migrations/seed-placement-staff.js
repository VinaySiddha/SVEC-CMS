const mysql = require('mysql2/promise');

async function seedPlacementStaff() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || '62.72.31.209',
      user: process.env.MYSQL_USER || 'cmsuser',
      password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
      database: 'svec_cms',
      port: Number(process.env.MYSQL_PORT) || 3306
    });

    console.log('Connected to database');

    // Sample placement staff data
    const staffMembers = [
      {
        name: 'Dr. Rajesh Kumar',
        designation: 'Professor & Head of Placement',
        branch: 'CSE',
        email: 'rajesh.kumar@srivasaviengg.ac.in'
      },
      {
        name: 'Dr. Priya Sharma',
        designation: 'Associate Professor',
        branch: 'ECE',
        email: 'priya.sharma@srivasaviengg.ac.in'
      },
      {
        name: 'Prof. Anil Verma',
        designation: 'Assistant Professor',
        branch: 'MECH',
        email: 'anil.verma@srivasaviengg.ac.in'
      },
      {
        name: 'Dr. Meera Nair',
        designation: 'Professor',
        branch: 'EEE',
        email: 'meera.nair@srivasaviengg.ac.in'
      },
      {
        name: 'Prof. Suresh Reddy',
        designation: 'Assistant Professor',
        branch: 'CIVIL',
        email: 'suresh.reddy@srivasaviengg.ac.in'
      },
      {
        name: 'Dr. Kavitha Rao',
        designation: 'Associate Professor',
        branch: 'IT',
        email: 'kavitha.rao@srivasaviengg.ac.in'
      },
      {
        name: 'Prof. Vikram Singh',
        designation: 'Placement Coordinator',
        branch: 'PLACEMENT',
        email: 'vikram.singh@srivasaviengg.ac.in'
      },
      {
        name: 'Dr. Sunita Gupta',
        designation: 'Assistant Professor',
        branch: 'AIML',
        email: 'sunita.gupta@srivasaviengg.ac.in'
      }
    ];

    // Clear existing data first
    await connection.execute('DELETE FROM placement_staff WHERE email LIKE "%srivasaviengg.ac.in"');

    for (const staff of staffMembers) {
      await connection.execute(
        `INSERT INTO placement_staff (name, designation, branch, email, password_hash, is_active, created_at, updated_at) 
         VALUES (?, ?, ?, ?, 'default_hash', true, NOW(), NOW())`,
        [staff.name, staff.designation, staff.branch, staff.email]
      );
    }

    console.log(`✓ Inserted ${staffMembers.length} placement staff members`);

    console.log('\n✅ Placement staff seeded successfully!');
    console.log('\nSample Staff Members:');
    staffMembers.forEach((staff, index) => {
      console.log(`${index + 1}. ${staff.name} - ${staff.designation} (${staff.branch})`);
    });

    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

seedPlacementStaff();