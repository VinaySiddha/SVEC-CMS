const mysql = require('mysql2/promise');

async function seedColleges() {
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

    // Clear existing test data
    await connection.execute('DELETE FROM college_facilities WHERE college_id IN (SELECT id FROM colleges WHERE code LIKE "TEST%" OR code LIKE "SEED%")');
    await connection.execute('DELETE FROM college_departments WHERE college_id IN (SELECT id FROM colleges WHERE code LIKE "TEST%" OR code LIKE "SEED%")');
    await connection.execute('DELETE FROM colleges WHERE code LIKE "TEST%" OR code LIKE "SEED%"');
    console.log('✓ Cleared existing seed data');

    const sampleColleges = [
      {
        name: 'Sri Vasavi Engineering College',
        short_name: 'SVEC',
        code: 'SVEC01',
        type: 'Engineering',
        affiliation: 'AICTE',
        university: 'JNTUK',
        accreditation: 'NBA, NAAC',
        naac_grade: 'A+',
        nirf_ranking: 150,
        email: 'info@srivasaviengg.ac.in',
        phone: '+91-8813-234567',
        website: 'https://srivasaviengg.ac.in',
        address: 'Pedatadepalli, Tadepalligudem',
        city: 'Tadepalligudem',
        state: 'Andhra Pradesh',
        country: 'India',
        pincode: '534101',
        principal_name: 'Dr. Principal Name',
        principal_email: 'principal@srivasaviengg.ac.in',
        principal_phone: '+91-9876543210',
        established_year: 1997,
        autonomous: true,
        coed: 'Co-Educational',
        total_students: 4500,
        total_faculty: 280,
        total_departments: 8,
        campus_area: 45.5,
        hostel_capacity: 2000,
        library_books: 75000,
        status: 'Active',
        description: 'Premier engineering college providing quality technical education.',
        vision: 'To be a center of excellence in technical education and research.',
        mission: 'To impart quality education and foster innovation in engineering and technology.'
      },
      {
        name: 'Indian Institute of Technology Bombay',
        short_name: 'IIT Bombay',
        code: 'IITB01',
        type: 'Engineering',
        affiliation: 'MHRD',
        university: 'IIT Bombay',
        accreditation: 'NAAC, NBA',
        naac_grade: 'A++',
        nirf_ranking: 3,
        email: 'office@iitb.ac.in',
        phone: '+91-22-2572-2545',
        website: 'https://www.iitb.ac.in',
        address: 'Powai',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pincode: '400076',
        principal_name: 'Dr. Subhasis Chaudhuri',
        principal_email: 'director@iitb.ac.in',
        principal_phone: '+91-22-2572-2222',
        established_year: 1958,
        autonomous: true,
        coed: 'Co-Educational',
        total_students: 12000,
        total_faculty: 650,
        total_departments: 16,
        campus_area: 550.0,
        hostel_capacity: 8000,
        library_books: 500000,
        status: 'Active',
        description: 'Premier institute of engineering and technology in India.',
        vision: 'To be a fountainhead of new science and technology to serve the needs of the country.',
        mission: 'To create an ambience in which new ideas and creativity flourish and from which the leaders and innovators of tomorrow emerge.'
      },
      {
        name: 'Delhi University',
        short_name: 'DU',
        code: 'DU001',
        type: 'Arts',
        affiliation: 'UGC',
        university: 'University of Delhi',
        accreditation: 'NAAC',
        naac_grade: 'A+',
        nirf_ranking: 12,
        email: 'info@du.ac.in',
        phone: '+91-11-2766-7859',
        website: 'https://www.du.ac.in',
        address: 'Delhi University Road',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        pincode: '110007',
        principal_name: 'Prof. Yogesh Singh',
        principal_email: 'vc@du.ac.in',
        principal_phone: '+91-11-2766-6969',
        established_year: 1922,
        autonomous: false,
        coed: 'Co-Educational',
        total_students: 280000,
        total_faculty: 9000,
        total_departments: 86,
        campus_area: 1200.0,
        hostel_capacity: 15000,
        library_books: 1500000,
        status: 'Active',
        description: 'One of Indias premier universities offering diverse academic programs.',
        vision: 'To promote excellence in teaching, learning and research.',
        mission: 'To provide transformative education that develops critical thinking and leadership skills.'
      },
      {
        name: 'All India Institute of Medical Sciences',
        short_name: 'AIIMS',
        code: 'AIIMS01',
        type: 'Medical',
        affiliation: 'Ministry of Health',
        university: 'AIIMS',
        accreditation: 'MCI, NAAC',
        naac_grade: 'A++',
        nirf_ranking: 1,
        email: 'info@aiims.edu',
        phone: '+91-11-2658-8500',
        website: 'https://www.aiims.edu',
        address: 'Ansari Nagar',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        pincode: '110029',
        principal_name: 'Dr. M. Srinivas',
        principal_email: 'director@aiims.ac.in',
        principal_phone: '+91-11-2658-8641',
        established_year: 1956,
        autonomous: true,
        coed: 'Co-Educational',
        total_students: 4000,
        total_faculty: 1500,
        total_departments: 42,
        campus_area: 208.0,
        hostel_capacity: 2500,
        library_books: 200000,
        status: 'Active',
        description: 'Premier medical institution providing healthcare education and research.',
        vision: 'To serve the country as a nucleus for nurturing excellence in all facets of healthcare.',
        mission: 'To develop patterns of teaching in undergraduate and postgraduate medical education in all its branches.'
      },
      {
        name: 'Indian Institute of Management Ahmedabad',
        short_name: 'IIM Ahmedabad',
        code: 'IIMA01',
        type: 'Management',
        affiliation: 'MHRD',
        university: 'IIM Ahmedabad',
        accreditation: 'NAAC, AMBA',
        naac_grade: 'A++',
        nirf_ranking: 1,
        email: 'admissions@iima.ac.in',
        phone: '+91-79-6632-4469',
        website: 'https://www.iima.ac.in',
        address: 'Vastrapur',
        city: 'Ahmedabad',
        state: 'Gujarat',
        country: 'India',
        pincode: '380015',
        principal_name: 'Prof. Errol DSouza',
        principal_email: 'director@iima.ac.in',
        principal_phone: '+91-79-6632-4446',
        established_year: 1961,
        autonomous: true,
        coed: 'Co-Educational',
        total_students: 1800,
        total_faculty: 120,
        total_departments: 9,
        campus_area: 100.0,
        hostel_capacity: 1200,
        library_books: 250000,
        status: 'Active',
        description: 'Leading business school providing world-class management education.',
        vision: 'To be a world-class business school.',
        mission: 'To develop effective practicing managers, accomplished researchers and successful entrepreneurs.'
      },
      {
        name: 'Loyola College',
        short_name: 'Loyola',
        code: 'LC001',
        type: 'Arts',
        affiliation: 'UGC',
        university: 'University of Madras',
        accreditation: 'NAAC',
        naac_grade: 'A',
        nirf_ranking: 45,
        email: 'info@loyolacollege.edu',
        phone: '+91-44-2817-8200',
        website: 'https://loyolacollege.edu',
        address: 'Sterling Road, Nungambakkam',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India',
        pincode: '600034',
        principal_name: 'Dr. A. Thomas Anchukandam',
        principal_email: 'principal@loyolacollege.edu',
        principal_phone: '+91-44-2817-8250',
        established_year: 1925,
        autonomous: true,
        coed: 'Co-Educational',
        total_students: 8000,
        total_faculty: 450,
        total_departments: 18,
        campus_area: 25.0,
        hostel_capacity: 800,
        library_books: 180000,
        status: 'Active',
        description: 'Jesuit institution known for academic excellence and social commitment.',
        vision: 'To be a center of academic excellence that transforms individuals and society.',
        mission: 'To provide holistic education that develops competent and committed individuals.'
      }
    ];

    for (let i = 0; i < sampleColleges.length; i++) {
      const college = sampleColleges[i];
      
      const insertResult = await connection.execute(
        `INSERT INTO colleges (
          name, short_name, code, type, affiliation, university,
          accreditation, naac_grade, nirf_ranking,
          email, phone, website,
          address, city, state, country, pincode,
          principal_name, principal_email, principal_phone,
          established_year, autonomous, coed,
          total_students, total_faculty, total_departments,
          campus_area, hostel_capacity, library_books,
          status, description, vision, mission,
          created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?, ?,
          NOW(), NOW()
        )`,
        [
          college.name, college.short_name, college.code, college.type, 
          college.affiliation, college.university, college.accreditation, 
          college.naac_grade, college.nirf_ranking, college.email, college.phone, 
          college.website, college.address, college.city, college.state, 
          college.country, college.pincode, college.principal_name, 
          college.principal_email, college.principal_phone, college.established_year, 
          college.autonomous, college.coed, college.total_students, 
          college.total_faculty, college.total_departments, college.campus_area, 
          college.hostel_capacity, college.library_books, college.status, 
          college.description, college.vision, college.mission
        ]
      );

      const collegeId = insertResult[0].insertId;

      // Add sample departments for each college
      const departments = college.type === 'Engineering' ? [
        'Computer Science Engineering',
        'Electronics and Communication Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Electrical Engineering'
      ] : college.type === 'Medical' ? [
        'Medicine',
        'Surgery',
        'Pediatrics',
        'Gynecology'
      ] : college.type === 'Management' ? [
        'Finance',
        'Marketing',
        'Operations',
        'Human Resources'
      ] : [
        'English',
        'History',
        'Economics',
        'Political Science'
      ];

      for (const deptName of departments) {
        await connection.execute(
          `INSERT INTO college_departments (
            college_id, department_name, department_code,
            total_students, total_faculty, established_year,
            created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            collegeId,
            deptName,
            deptName.split(' ').map(word => word.charAt(0)).join(''),
            Math.floor(Math.random() * 500) + 100,
            Math.floor(Math.random() * 30) + 10,
            college.established_year + Math.floor(Math.random() * 10)
          ]
        );
      }

      // Add sample facilities
      const facilities = [
        { name: 'Central Library', type: 'Academic' },
        { name: 'Computer Lab', type: 'Academic' },
        { name: 'Sports Complex', type: 'Sports' },
        { name: 'Boys Hostel', type: 'Hostel' },
        { name: 'Girls Hostel', type: 'Hostel' },
        { name: 'Medical Center', type: 'Medical' },
        { name: 'Cafeteria', type: 'Other' }
      ];

      for (const facility of facilities) {
        await connection.execute(
          `INSERT INTO college_facilities (
            college_id, facility_name, facility_type,
            capacity, is_available, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            collegeId,
            facility.name,
            facility.type,
            Math.floor(Math.random() * 1000) + 100,
            true
          ]
        );
      }

      console.log(`✓ Inserted college: ${college.name}`);
    }

    console.log(`\n✅ Successfully seeded ${sampleColleges.length} colleges with departments and facilities!`);
    
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

seedColleges();