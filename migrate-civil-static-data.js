const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

// Static data extracted from Civil.tsx
const civilData = {
  departmentProfile: {
    department: "Civil Engineering",
    established: 2011,
    btechIntake: 60,
    mtechIntake: 18,
    hodName: "Dr. G. Radhakrishnan",
    hodDesignation: "Professor & Head of Department",
    hodPhone: "08818-284355(O)-(Ext.-377)",
    hodFax: "08818-284322",
    hodEmail: "hod_civil@srivasaviengg.ac.in",
    hodImage: "/civilhod.png",
    hodMessage: "The Department of Civil Engineering was established in the year 2011 with a vision to strive towards quality education, research and consultancy. Civil Engineering is one of the oldest and broadest engineering discipline which has been an aspect of life, since the beginning of human civilization. Efforts have been made to provide high quality technical education to students with a view to make them successful professionals. In order to attain the pre-defined objectives, focus has been made on Outcome Based Education, which facilitates the students to analyze problems, design and develop solutions and usage of modern tools, by making him/herself as an ethical Engineer with best of the kind leadership traits. Department is offering B.Tech (Civil) with an intake of 60 and M. Tech (Structural Engg.) with 18 students. Department comprises well qualified and proficient faculty to direct the students in reaching their goals.",
    overview: "The Department of Civil Engineering was established in 2011. The department offers undergraduate program in Civil Engineering with an intake of 60 students."
  },

  vision: "To be a Department that strives towards quality education,research and consultancy in Civil Engineering.",
  
  mission: [
    "To provide broad and high quality education to its students for a successful professional career.",
    "To serve the construction industry through dissemination of knowledge and technical service to rural community and professionals.",
    "To include ethics and human values, effective communication and leadership qualities among students to meet the challenge of the society."
  ],

  peos: [
    "Excel in professional career and/or higher education by acquiring knowledge in mathematics, science and civil engineering principles.",
    "Analyze real-life problems and design socially responsible and environmentally sustainable civil engineering solutions.",
    "Adapt to evolving technologies through continuous learning.",
    "Lead a successful career as a team member or as a team leader with strong professional ethics and communication skills."
  ],

  pos: [
    {
      title: "Engineering Knowledge",
      description: "Apply knowledge of mathematics, science, engineering fundamentals, and civil engineering principles to solve complex engineering problems."
    },
    {
      title: "Problem Analysis", 
      description: "Identify, formulate, research literature, and analyze complex engineering problems to arrive at substantiated conclusions using principles of mathematics, natural sciences, and engineering sciences."
    },
    {
      title: "Design/Development of Solutions",
      description: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations."
    },
    {
      title: "Modern Tool Usage",
      description: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools for complex engineering activities with an understanding of the limitations."
    }
  ],

  psos: [
    "Apply standard practices and strategies in construction management using modern surveying tools to deliver quality infrastructure.",
    "Apply the fundamentals of civil engineering to solve engineering problems in interdisciplinary domains.",
    "Develop sustainable solutions for real-world problems in structural engineering, geotechnical engineering, transportation engineering, and water resources engineering."
  ],

  courses: [
    {
      course: "B.Tech-Civil Engineering",
      eligibility: "AP EAPCET",
      duration: "4 Years",
      intake: "60"
    }
  ],

  salientFeatures: [
    "Experienced and dedicated faculty members with specializations in various domains",
    "State-of-the-art laboratories with modern equipment and tools",
    "Strong industry-institute interaction through consultancy services",
    "Research culture fostering innovation and intellectual growth",
    "Active student technical association (IEI Students Chapter)",
    "Regular workshops, field visits, and training programs",
    "Focus on practical learning through field visits and site experiences",
    "Consultancy services in material testing and structural design"
  ],

  faculty: [
    { name: "Dr.G.Radhakrishnan", qualification: "ME,Ph.D", designation: "Professor & HOD", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_G%20RADHAKRISHNAN%20PROFILE.pdf" },
    { name: "Mr. V.L.D Prasad Reddy", qualification: "M.E.", designation: "Assistant Professor & ACE", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_V%20L%20D%20Prasad%20Reddy.pdf" },
    { name: "Mr. J.Vijaya Chandra", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_VIJAYA%20CHANDRA%20PROFILE.pdf" },
    { name: "Mr. B.HemaSundar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_B%20HEMASUNDAR.pdf" },
    { name: "Mr. M.Prem Kumar Raju", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_M%20PREM%20KUMAR%20RAJU%20PROFILE.pdf" },
    { name: "Mr. K.Gowtham Kumar", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Gowtham%20Kumar.pdf" },
    { name: "Mr. E Hanuman Sai Gupta", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/CE_E%20Hanuman%20Sai%20Gupta.pdf" },
    { name: "Ms. B.Rohitha", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_ROHITHA%20PROFILE.pdf" },
    { name: "Ms. Ch.Sumaja", qualification: "M.Tech", designation: "Assistant Professor", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_CH%20Sumaja.pdf" },
    { name: "Mr. K.J.Ganapathi", qualification: "B.Tech", designation: "Lecturer", profileUrl: "http://srivasaviengg.ac.in/faculty_profile/civil_Kaigala%20J%20Ganapathi.pdf" }
  ],

  nonTeachingFaculty: [
    { name: "Mr. A.N.V.Ravi Kumar", designation: "Lab Technician" },
    { name: "Mr. P.V.S.Krishna Prasad", designation: "Lab Technician" },
    { name: "Mr. M.Abraham Lincoln", designation: "Lab Technician" },
    { name: "Mr. M.Sasi Kumar", designation: "Lab Technician" },
    { name: "Mr. T.V.V.Satyanarayana", designation: "DEO" },
    { name: "Ms. B.M.G.A.Bhargav", designation: "Attender" }
  ],

  library: {
    description: "Department Library offers a variety of books related to Civil Engineering. Reference books of various subjects are procured. Various Competitive Books are available to satisfy the thirst of the students. Books are issued to students and staff. Students can access the Library facility according to their convenience any time round-the-clock.",
    titles: 244,
    volumes: 352,
    facultyIncharge: "Mr. M.Prem Kumar Raju, Asst. Professor",
    image: "/images/departments/ce/cse-lib.jpg"
  },

  technicalAssociation: {
    name: "INSTITUTION OF ENGINEERING (INDIA) Students' Chapter",
    established: 2017,
    initialMembers: 117,
    description: "In this institution, INSTITUTION OF ENGINEERING (INDIA) students' chapter was opened in Civil Engineering Department in the year 2017 with 117 student members. It is promoting co-operation amongst students and faculty for advancement and dissemination of knowledge in the field of Civil Engineering.",
    committee: ["K.J.Ganapathi", "N.G.Lokesh", "T.Teja", "Y.Harika"],
    images: [
      "/images/departments/ce/civil_ie_img2.jpg",
      "/images/departments/ce/civil_ie_img3.jpg"
    ]
  },

  laboratories: [
    { name: "Strength of Materials Lab", image: "/images/departments/ce/civil_adslab.jpg" },
    { name: "CAD & GIS Lab", image: "/images/departments/ce/civil_cadlab.jpg" },
    { name: "Concrete Technology Lab", image: "/images/departments/ce/civil_ctlab.jpg" },
    { name: "Engineering Geology Lab", image: "/images/departments/ce/civil_gtlab.jpg" },
    { name: "Surveying Lab", image: "/images/departments/ce/civil_sllab.jpg" },
    { name: "Fluid Mechanics and Hydraulic Machinery Lab", image: "/images/departments/ce/civil_fmlab.jpg" },
    { name: "Water and Waste Water Engineering Lab", image: "/images/departments/ce/civil_waterlab.jpg" },
    { name: "Advanced Structural Engineering Lab", image: "/images/departments/ce/civil_adslab.jpg" },
    { name: "Geotechnical Engineering Lab", image: "/images/departments/ce/civil_geolab.jpg" },
    { name: "Transportation Engineering Lab", image: "/images/departments/ce/civil_telab.jpg" }
  ],

  syllabus: {
    btech: [
      { version: "V20", url: "https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V20%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" },
      { version: "V18", url: "https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20B.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" }
    ],
    mtech: [
      { version: "V21", url: "https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V21%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" },
      { version: "V18", url: "https://srivasaviengg.ac.in/civil_guest_workshops_fdps_seminars/V18%20M.TECH%20COURSE%20STRUCTURE%20AND%20SYLLABUS.pdf" }
    ]
  },

  departmentConfig: {
    id: 'civil',
    name: 'Civil Engineering',
    icon: 'Buildings',
    description: 'Building the future with structural engineering, geotechnics, and sustainable infrastructure.',
    faculty: '18+',
    students: '240',
    labs: '6',
    image: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&cs=tinysrgb&w=600',
    specializations: ['Structural Engineering', 'Geotechnical Engineering', 'Water Resources', 'Transportation Engineering']
  }
};

async function migrateCivilStaticData() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Create tables first
    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS civil_department_profile (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        established_year YEAR NOT NULL,
        btech_intake INT,
        mtech_intake INT,
        hod_name VARCHAR(255),
        hod_designation VARCHAR(255),
        hod_phone VARCHAR(50),
        hod_fax VARCHAR(50),
        hod_email VARCHAR(255),
        hod_image_url VARCHAR(512),
        hod_message TEXT,
        overview TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_academic_info (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        vision TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_mission (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        mission_point TEXT NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_peos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        peo_description TEXT NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_pos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        po_title VARCHAR(255) NOT NULL,
        po_description TEXT NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_psos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        pso_description TEXT NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_courses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        eligibility VARCHAR(255),
        duration VARCHAR(100),
        intake VARCHAR(100),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_salient_features (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        feature_description TEXT NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_faculty (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        qualification VARCHAR(255),
        designation VARCHAR(255),
        profile_url VARCHAR(512),
        email VARCHAR(255),
        phone VARCHAR(50),
        order_index INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_non_teaching_staff (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255),
        order_index INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_library_info (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        description TEXT,
        total_titles INT,
        total_volumes INT,
        faculty_incharge VARCHAR(255),
        image_url VARCHAR(512),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_technical_association (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        association_name VARCHAR(255) NOT NULL,
        established_year YEAR,
        initial_members INT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_technical_association_members (
        id INT PRIMARY KEY AUTO_INCREMENT,
        association_id INT,
        member_name VARCHAR(255) NOT NULL,
        designation VARCHAR(255),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_technical_association_images (
        id INT PRIMARY KEY AUTO_INCREMENT,
        association_id INT,
        image_url VARCHAR(512) NOT NULL,
        image_caption VARCHAR(255),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_laboratories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        lab_name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(512),
        equipment TEXT,
        order_index INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS civil_syllabus (
        id INT PRIMARY KEY AUTO_INCREMENT,
        department VARCHAR(100) NOT NULL,
        program VARCHAR(50) NOT NULL,
        version VARCHAR(20) NOT NULL,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(512) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS departments_config (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dept_id VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        icon_name VARCHAR(100),
        description TEXT,
        faculty_count VARCHAR(20),
        student_count VARCHAR(20),
        lab_count VARCHAR(20),
        image_url VARCHAR(512),
        order_index INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS departments_specializations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        dept_id VARCHAR(50) NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Split and execute each CREATE TABLE statement
    const statements = createTablesSQL.split(';').filter(stmt => stmt.trim());
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }
    console.log('Tables created successfully');

    // Clear existing Civil department data
    await connection.execute('DELETE FROM civil_department_profile WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_academic_info WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_mission WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_peos WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_pos WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_psos WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_courses WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_salient_features WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_faculty WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_non_teaching_staff WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_library_info WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_technical_association WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_laboratories WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM civil_syllabus WHERE department = ?', ['Civil Engineering']);
    await connection.execute('DELETE FROM departments_config WHERE dept_id = ?', ['civil']);
    await connection.execute('DELETE FROM departments_specializations WHERE dept_id = ?', ['civil']);
    console.log('Cleared existing Civil Engineering data');

    // Insert Department Profile
    await connection.execute(`
      INSERT INTO civil_department_profile 
      (department, established_year, btech_intake, mtech_intake, hod_name, hod_designation, hod_phone, hod_fax, hod_email, hod_image_url, hod_message, overview)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        civilData.departmentProfile.department,
        civilData.departmentProfile.established,
        civilData.departmentProfile.btechIntake,
        civilData.departmentProfile.mtechIntake,
        civilData.departmentProfile.hodName,
        civilData.departmentProfile.hodDesignation,
        civilData.departmentProfile.hodPhone,
        civilData.departmentProfile.hodFax,
        civilData.departmentProfile.hodEmail,
        civilData.departmentProfile.hodImage,
        civilData.departmentProfile.hodMessage,
        civilData.departmentProfile.overview
      ]
    );
    console.log('Inserted department profile');

    // Insert Academic Info
    await connection.execute(
      'INSERT INTO civil_academic_info (department, vision) VALUES (?, ?)',
      ['Civil Engineering', civilData.vision]
    );

    // Insert Mission points
    for (let i = 0; i < civilData.mission.length; i++) {
      await connection.execute(
        'INSERT INTO civil_mission (department, mission_point, order_index) VALUES (?, ?, ?)',
        ['Civil Engineering', civilData.mission[i], i + 1]
      );
    }

    // Insert PEOs
    for (let i = 0; i < civilData.peos.length; i++) {
      await connection.execute(
        'INSERT INTO civil_peos (department, peo_description, order_index) VALUES (?, ?, ?)',
        ['Civil Engineering', civilData.peos[i], i + 1]
      );
    }

    // Insert POs
    for (let i = 0; i < civilData.pos.length; i++) {
      await connection.execute(
        'INSERT INTO civil_pos (department, po_title, po_description, order_index) VALUES (?, ?, ?, ?)',
        ['Civil Engineering', civilData.pos[i].title, civilData.pos[i].description, i + 1]
      );
    }

    // Insert PSOs
    for (let i = 0; i < civilData.psos.length; i++) {
      await connection.execute(
        'INSERT INTO civil_psos (department, pso_description, order_index) VALUES (?, ?, ?)',
        ['Civil Engineering', civilData.psos[i], i + 1]
      );
    }

    // Insert Courses
    for (let i = 0; i < civilData.courses.length; i++) {
      const course = civilData.courses[i];
      await connection.execute(
        'INSERT INTO civil_courses (department, course_name, eligibility, duration, intake, order_index) VALUES (?, ?, ?, ?, ?, ?)',
        ['Civil Engineering', course.course, course.eligibility, course.duration, course.intake, i + 1]
      );
    }

    // Insert Salient Features
    for (let i = 0; i < civilData.salientFeatures.length; i++) {
      await connection.execute(
        'INSERT INTO civil_salient_features (department, feature_description, order_index) VALUES (?, ?, ?)',
        ['Civil Engineering', civilData.salientFeatures[i], i + 1]
      );
    }

    // Insert Faculty
    for (let i = 0; i < civilData.faculty.length; i++) {
      const faculty = civilData.faculty[i];
      await connection.execute(
        'INSERT INTO civil_faculty (department, name, qualification, designation, profile_url, order_index) VALUES (?, ?, ?, ?, ?, ?)',
        ['Civil Engineering', faculty.name, faculty.qualification, faculty.designation, faculty.profileUrl, i + 1]
      );
    }

    // Insert Non-Teaching Staff
    for (let i = 0; i < civilData.nonTeachingFaculty.length; i++) {
      const staff = civilData.nonTeachingFaculty[i];
      await connection.execute(
        'INSERT INTO civil_non_teaching_staff (department, name, designation, order_index) VALUES (?, ?, ?, ?)',
        ['Civil Engineering', staff.name, staff.designation, i + 1]
      );
    }

    // Insert Library Info
    await connection.execute(`
      INSERT INTO civil_library_info (department, description, total_titles, total_volumes, faculty_incharge, image_url)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        'Civil Engineering',
        civilData.library.description,
        civilData.library.titles,
        civilData.library.volumes,
        civilData.library.facultyIncharge,
        civilData.library.image
      ]
    );

    // Insert Technical Association
    const [taResult] = await connection.execute(`
      INSERT INTO civil_technical_association (department, association_name, established_year, initial_members, description)
      VALUES (?, ?, ?, ?, ?)`,
      [
        'Civil Engineering',
        civilData.technicalAssociation.name,
        civilData.technicalAssociation.established,
        civilData.technicalAssociation.initialMembers,
        civilData.technicalAssociation.description
      ]
    );
    
    const associationId = taResult.insertId;

    // Insert Technical Association Members
    for (let i = 0; i < civilData.technicalAssociation.committee.length; i++) {
      await connection.execute(
        'INSERT INTO civil_technical_association_members (association_id, member_name, order_index) VALUES (?, ?, ?)',
        [associationId, civilData.technicalAssociation.committee[i], i + 1]
      );
    }

    // Insert Technical Association Images
    for (let i = 0; i < civilData.technicalAssociation.images.length; i++) {
      await connection.execute(
        'INSERT INTO civil_technical_association_images (association_id, image_url, order_index) VALUES (?, ?, ?)',
        [associationId, civilData.technicalAssociation.images[i], i + 1]
      );
    }

    // Insert Laboratories
    for (let i = 0; i < civilData.laboratories.length; i++) {
      const lab = civilData.laboratories[i];
      await connection.execute(
        'INSERT INTO civil_laboratories (department, lab_name, image_url, order_index) VALUES (?, ?, ?, ?)',
        ['Civil Engineering', lab.name, lab.image, i + 1]
      );
    }

    // Insert Syllabus
    for (let i = 0; i < civilData.syllabus.btech.length; i++) {
      const syl = civilData.syllabus.btech[i];
      await connection.execute(
        'INSERT INTO civil_syllabus (department, program, version, name, url) VALUES (?, ?, ?, ?, ?)',
        ['Civil Engineering', 'btech', syl.version, `B.Tech - ${syl.version} Syllabus`, syl.url]
      );
    }

    for (let i = 0; i < civilData.syllabus.mtech.length; i++) {
      const syl = civilData.syllabus.mtech[i];
      await connection.execute(
        'INSERT INTO civil_syllabus (department, program, version, name, url) VALUES (?, ?, ?, ?, ?)',
        ['Civil Engineering', 'mtech', syl.version, `M.Tech - ${syl.version} Syllabus`, syl.url]
      );
    }

    // Insert Department Configuration
    await connection.execute(`
      INSERT INTO departments_config (dept_id, name, icon_name, description, faculty_count, student_count, lab_count, image_url, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        civilData.departmentConfig.id,
        civilData.departmentConfig.name,
        civilData.departmentConfig.icon,
        civilData.departmentConfig.description,
        civilData.departmentConfig.faculty,
        civilData.departmentConfig.students,
        civilData.departmentConfig.labs,
        civilData.departmentConfig.image,
        4 // Civil is typically the 4th department
      ]
    );

    // Insert Specializations
    for (let i = 0; i < civilData.departmentConfig.specializations.length; i++) {
      await connection.execute(
        'INSERT INTO departments_specializations (dept_id, specialization, order_index) VALUES (?, ?, ?)',
        [civilData.departmentConfig.id, civilData.departmentConfig.specializations[i], i + 1]
      );
    }

    console.log('✅ All Civil Engineering static data migrated successfully!');
    console.log('📊 Summary:');
    console.log(`- Department Profile: 1 record`);
    console.log(`- Vision: 1 record`);
    console.log(`- Mission: ${civilData.mission.length} records`);
    console.log(`- PEOs: ${civilData.peos.length} records`);
    console.log(`- POs: ${civilData.pos.length} records`);
    console.log(`- PSOs: ${civilData.psos.length} records`);
    console.log(`- Courses: ${civilData.courses.length} records`);
    console.log(`- Salient Features: ${civilData.salientFeatures.length} records`);
    console.log(`- Faculty: ${civilData.faculty.length} records`);
    console.log(`- Non-Teaching Staff: ${civilData.nonTeachingFaculty.length} records`);
    console.log(`- Library: 1 record`);
    console.log(`- Technical Association: 1 record with ${civilData.technicalAssociation.committee.length} members and ${civilData.technicalAssociation.images.length} images`);
    console.log(`- Laboratories: ${civilData.laboratories.length} records`);
    console.log(`- Syllabus: ${civilData.syllabus.btech.length + civilData.syllabus.mtech.length} records`);
    console.log(`- Department Config: 1 record with ${civilData.departmentConfig.specializations.length} specializations`);

  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run migration
if (require.main === module) {
  migrateCivilStaticData()
    .then(() => {
      console.log('Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateCivilStaticData, civilData };