const mysql = require('mysql2/promise');
const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedPlacementData() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'svecedu'
    });

    console.log('Connected to database');

    // Insert placement staff members (based on image data)
    const staffData = [
      {
        name: 'Dr. P N V GOPALA KRISHNA',
        designation: 'Associate Professor (Mechanical) & Head - Placements',
        branch: 'ME',
        email: 'svectpo@srivasaviengg.ac.in',
        phone: '9849511367',
        office_phone: '08818-284355 (Ext:319)',
        password: 'password123'
      },
      {
        name: 'Mr. T. Dileep',
        designation: 'Asst. Professor & Placement Officer',
        branch: 'MBA',
        email: 'placements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. P. Rajesh',
        designation: 'Asst. Professor & CSE Dept. Placement Co-ordinator',
        branch: 'CSE',
        email: 'cseplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. M. Vinod Kumar',
        designation: 'Asst. Professor & ECE Dept. Placement Co-ordinator',
        branch: 'ECE',
        email: 'eceplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. Madhu Sagar',
        designation: 'Asst. Professor & EEE Dept. Placement Co-ordinator',
        branch: 'EEE',
        email: 'eeeplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. Sk. Arief',
        designation: 'Asst. Professor & ME Dept. Placement Co-ordinator',
        branch: 'ME',
        email: 'mechplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. M. Premkumar Raju',
        designation: 'Asst. Professor & CE Dept. Placement Co-ordinator',
        branch: 'CE',
        email: 'civilplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      },
      {
        name: 'Mr. Sk. Moulali',
        designation: 'Asst. Professor & AIML Dept. Placement Co-ordinator',
        branch: 'AIML',
        email: 'aimlplacements@srivasaviengg.ac.in',
        phone: '',
        office_phone: '',
        password: 'password123'
      }
    ];

    for (const staff of staffData) {
      try {
        await connection.execute(
          `INSERT INTO placement_staff (name, designation, branch, email, phone, office_phone, password_hash, is_active)
           VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
          [
            staff.name,
            staff.designation,
            staff.branch,
            staff.email,
            staff.phone,
            staff.office_phone,
            hashPassword(staff.password)
          ]
        );
        console.log(`✓ Added staff: ${staff.name}`);
      } catch (e: any) {
        if (e.code !== 'ER_DUP_ENTRY') {
          console.error(`Error adding staff ${staff.name}:`, e.message);
        }
      }
    }

    // Insert placement statistics
    const statsData = [
      {
        academic_year: '2024-25',
        category: 'UG',
        total_placed: 627,
        average_package: 6.5,
        highest_package: 15.2,
        lowest_package: 4.2,
        companies_visited: 45
      },
      {
        academic_year: '2024-25',
        category: 'PG',
        total_placed: 51,
        average_package: 8.2,
        highest_package: 18.5,
        lowest_package: 5.5,
        companies_visited: 35
      },
      {
        academic_year: '2023-24',
        category: 'UG',
        total_placed: 433,
        average_package: 6.2,
        highest_package: 14.8,
        lowest_package: 4.0,
        companies_visited: 40
      },
      {
        academic_year: '2023-24',
        category: 'PG',
        total_placed: 47,
        average_package: 7.8,
        highest_package: 17.2,
        lowest_package: 5.2,
        companies_visited: 32
      },
      {
        academic_year: '2022-23',
        category: 'UG',
        total_placed: 671,
        average_package: 6.0,
        highest_package: 14.5,
        lowest_package: 3.8,
        companies_visited: 42
      },
      {
        academic_year: '2022-23',
        category: 'PG',
        total_placed: 104,
        average_package: 8.0,
        highest_package: 18.0,
        lowest_package: 5.0,
        companies_visited: 38
      }
    ];

    for (const stat of statsData) {
      try {
        await connection.execute(
          `INSERT INTO placement_statistics (academic_year, category, total_placed, average_package, highest_package, lowest_package, companies_visited)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           total_placed = VALUES(total_placed),
           average_package = VALUES(average_package),
           highest_package = VALUES(highest_package),
           lowest_package = VALUES(lowest_package),
           companies_visited = VALUES(companies_visited)`,
          [
            stat.academic_year,
            stat.category,
            stat.total_placed,
            stat.average_package,
            stat.highest_package,
            stat.lowest_package,
            stat.companies_visited
          ]
        );
        console.log(`✓ Added statistics: ${stat.academic_year} - ${stat.category}`);
      } catch (e: any) {
        console.error(`Error adding statistics:`, e.message);
      }
    }

    // Insert placement details (branch-wise)
    const detailsData = [
      { academic_year: '2024-25', branch: 'CSE', category: 'UG', placed: 150, not_placed: 10, higher_studies: 5 },
      { academic_year: '2024-25', branch: 'ECE', category: 'UG', placed: 120, not_placed: 15, higher_studies: 8 },
      { academic_year: '2024-25', branch: 'EEE', category: 'UG', placed: 95, not_placed: 12, higher_studies: 6 },
      { academic_year: '2024-25', branch: 'ME', category: 'UG', placed: 110, not_placed: 14, higher_studies: 7 },
      { academic_year: '2024-25', branch: 'CE', category: 'UG', placed: 85, not_placed: 10, higher_studies: 4 },
      { academic_year: '2024-25', branch: 'AIML', category: 'UG', placed: 67, not_placed: 8, higher_studies: 3 },
      { academic_year: '2023-24', branch: 'CSE', category: 'UG', placed: 120, not_placed: 8, higher_studies: 4 },
      { academic_year: '2023-24', branch: 'ECE', category: 'UG', placed: 95, not_placed: 10, higher_studies: 5 },
      { academic_year: '2023-24', branch: 'EEE', category: 'UG', placed: 75, not_placed: 9, higher_studies: 4 },
      { academic_year: '2023-24', branch: 'ME', category: 'UG', placed: 88, not_placed: 11, higher_studies: 5 },
      { academic_year: '2023-24', branch: 'CE', category: 'UG', placed: 55, not_placed: 8, higher_studies: 3 }
    ];

    for (const detail of detailsData) {
      try {
        await connection.execute(
          `INSERT INTO placement_details (academic_year, branch, category, placed, not_placed, higher_studies)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           placed = VALUES(placed),
           not_placed = VALUES(not_placed),
           higher_studies = VALUES(higher_studies)`,
          [
            detail.academic_year,
            detail.branch,
            detail.category,
            detail.placed,
            detail.not_placed,
            detail.higher_studies
          ]
        );
        console.log(`✓ Added details: ${detail.academic_year} - ${detail.branch}`);
      } catch (e: any) {
        console.error(`Error adding details:`, e.message);
      }
    }

    // Insert companies
    const companiesData = [
      { name: 'Infosys', logo_url: '/uploads/companies/infosys.png', category: 'IT', industry: 'IT Services', visit_year: 2024 },
      { name: 'ZOHO', logo_url: '/uploads/companies/zoho.png', category: 'IT', industry: 'Software', visit_year: 2024 },
      { name: 'Accenture', logo_url: '/uploads/companies/accenture.png', category: 'IT', industry: 'IT Services', visit_year: 2024 },
      { name: 'Tiger Analytics', logo_url: '/uploads/companies/tiger.png', category: 'IT', industry: 'Analytics', visit_year: 2024 }
    ];

    for (const company of companiesData) {
      try {
        await connection.execute(
          `INSERT INTO placement_companies (name, logo_url, category, industry, visit_year, is_active)
           VALUES (?, ?, ?, ?, ?, true)`,
          [company.name, company.logo_url, company.category, company.industry, company.visit_year]
        );
        console.log(`✓ Added company: ${company.name}`);
      } catch (e: any) {
        if (e.code !== 'ER_DUP_ENTRY') {
          console.error(`Error adding company:`, e.message);
        }
      }
    }

    console.log('\n✓ Placement data seeding completed!');
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

seedPlacementData();
