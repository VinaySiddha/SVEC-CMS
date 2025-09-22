const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function migrateAllDepartmentData() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Start transaction
    await connection.beginTransaction();

    // Migrate Syllabus Documents
    await migrateSyllabusDocuments(connection);
    
    // Migrate Physical Facilities
    await migratePhysicalFacilities(connection);
    
    // Migrate Laboratories
    await migrateLaboratories(connection);
    
    // Migrate MoUs
    await migrateMoUs(connection);
    
    // Migrate Faculty Development Programs
    await migrateFDPs(connection);
    
    // Migrate Faculty Achievements
    await migrateFacultyAchievements(connection);
    
    // Migrate Workshops and Seminars
    await migrateWorkshops(connection);
    
    // Migrate Student Achievements
    await migrateStudentAchievements(connection);

    // Commit transaction
    await connection.commit();
    console.log('All department data migrated successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

async function migrateSyllabusDocuments(connection) {
  console.log('Migrating syllabus documents...');
  
  const syllabusData = [
    {
      dept: 'eee',
      type: 'btech',
      title: 'B.Tech EEE Syllabus - V20 Regulation',
      description: 'Complete B.Tech Electrical and Electronics Engineering curriculum under JNTUK V20 regulation',
      document_url: 'https://srivasaviengg.ac.in/uploads/syllabus/V20%20EEE%20Syllabus.pdf',
      academic_year: '2020-24',
      regulation: 'V20',
      status: 'approved'
    },
    {
      dept: 'eee',
      type: 'syllabus',
      title: 'EEE Department Syllabus - I & II Semester',
      description: 'First and Second semester syllabus for EEE department',
      document_url: 'https://srivasaviengg.ac.in/uploads/syllabus/V20%20EEE%20Syllabus_%20I%20&%20II%20SEM.pdf',
      academic_year: '2023-24',
      semester: 'I & II',
      regulation: 'V20',
      status: 'approved'
    },
    {
      dept: 'aiml',
      type: 'btech',
      title: 'B.Tech AI&ML Syllabus - V20 Regulation',
      description: 'Complete B.Tech Artificial Intelligence and Machine Learning curriculum',
      document_url: 'https://srivasaviengg.ac.in/uploads/syllabus/V20%20AI%20and%20AI&ML%20CS%20&%20Syllabus_%20I%20&%20II%20SEM.pdf',
      academic_year: '2020-24',
      regulation: 'V20',
      status: 'approved'
    },
    {
      dept: 'aiml',
      type: 'soc',
      title: 'SOC Syllabus 2022-23',
      description: 'Student Orientation Course syllabus for Academic Year 2022-23',
      document_url: 'https://srivasaviengg.ac.in/uploads/aiml/SOC_AIM_2022-23.pdf',
      academic_year: '2022-23',
      status: 'approved'
    }
  ];

  for (const doc of syllabusData) {
    await connection.execute(
      `INSERT INTO syllabus_documents 
       (dept, type, title, description, document_url, academic_year, semester, regulation, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [doc.dept, doc.type, doc.title, doc.description, doc.document_url, 
       doc.academic_year, doc.semester || null, doc.regulation || null, doc.status]
    );
  }
  
  console.log(`Migrated ${syllabusData.length} syllabus documents`);
}

async function migratePhysicalFacilities(connection) {
  console.log('Migrating physical facilities...');
  
  // Classrooms
  const classroomsData = [
    {
      dept: 'eee',
      room_number: 'EEE-101',
      capacity: 60,
      facilities: JSON.stringify(['ICT Enabled', 'Projector', 'Smart Board', 'AC']),
      is_ict_enabled: true,
      floor: 'Ground Floor',
      building: 'EEE Block',
      status: 'approved'
    },
    {
      dept: 'eee',
      room_number: 'EEE-102',
      capacity: 60,
      facilities: JSON.stringify(['ICT Enabled', 'Projector', 'Sound System']),
      is_ict_enabled: true,
      floor: 'Ground Floor',
      building: 'EEE Block',
      status: 'approved'
    },
    {
      dept: 'aiml',
      room_number: 'AIM-201',
      capacity: 60,
      facilities: JSON.stringify(['ICT Enabled', 'Digital Classroom', 'Smart Board']),
      is_ict_enabled: true,
      floor: 'Second Floor',
      building: 'CSE Block',
      status: 'approved'
    }
  ];

  for (const classroom of classroomsData) {
    await connection.execute(
      `INSERT INTO classrooms 
       (dept, room_number, capacity, facilities, is_ict_enabled, floor, building, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [classroom.dept, classroom.room_number, classroom.capacity, classroom.facilities,
       classroom.is_ict_enabled, classroom.floor, classroom.building, classroom.status]
    );
  }

  // Seminar Halls
  const seminarHallsData = [
    {
      dept: 'eee',
      name: 'EEE Seminar Hall',
      capacity: 150,
      facilities: JSON.stringify(['ICT Enabled', 'Audio System', 'Projector', 'AC']),
      is_ict_enabled: true,
      location: 'EEE Block, First Floor',
      area_sqft: 2000,
      status: 'approved'
    },
    {
      dept: 'aiml',
      name: 'Digital Classroom 1',
      capacity: 150,
      facilities: JSON.stringify(['ICT Enabled', 'Smart Board', 'Video Conferencing']),
      is_ict_enabled: true,
      location: 'CSE Block, Third Floor',
      area_sqft: 2200,
      status: 'approved'
    }
  ];

  for (const hall of seminarHallsData) {
    await connection.execute(
      `INSERT INTO seminar_halls 
       (dept, name, capacity, facilities, is_ict_enabled, location, area_sqft, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [hall.dept, hall.name, hall.capacity, hall.facilities,
       hall.is_ict_enabled, hall.location, hall.area_sqft, hall.status]
    );
  }

  console.log(`Migrated ${classroomsData.length} classrooms and ${seminarHallsData.length} seminar halls`);
}

async function migrateLaboratories(connection) {
  console.log('Migrating laboratories...');
  
  const laboratoriesData = [
    {
      dept: 'eee',
      lab_name: 'Electrical Machines Laboratory',
      lab_code: 'EEE-LAB-01',
      configurations: JSON.stringify({
        systems: 30,
        software: ['MATLAB', 'Proteus'],
        equipment: ['DC Motors', 'AC Motors', 'Transformers', 'Generators']
      }),
      usage: 'Practical sessions for Electrical Machines course',
      capacity: 30,
      softwares: 'MATLAB, Proteus, Power System Analysis Software',
      equipments: 'DC Motors, AC Motors, Transformers, Generators, Power Supplies',
      location: 'EEE Block, Ground Floor',
      incharge: 'Dr. Faculty Name',
      status: 'approved'
    },
    {
      dept: 'eee',
      lab_name: 'Power Electronics Laboratory',
      lab_code: 'EEE-LAB-02',
      configurations: JSON.stringify({
        systems: 25,
        software: ['PSIM', 'MATLAB'],
        equipment: ['Power Electronics Kits', 'Oscilloscopes', 'Function Generators']
      }),
      usage: 'Power Electronics experiments and projects',
      capacity: 25,
      softwares: 'PSIM, MATLAB, PSpice',
      equipments: 'Power Electronics Kits, Oscilloscopes, Function Generators, Digital Multimeters',
      location: 'EEE Block, First Floor',
      incharge: 'Prof. Faculty Name',
      status: 'approved'
    },
    {
      dept: 'aiml',
      lab_name: 'AI & Deep Learning Laboratory',
      lab_code: 'AIM-LAB-01',
      configurations: JSON.stringify({
        systems: 60,
        software: ['Python', 'TensorFlow', 'PyTorch', 'Jupyter'],
        equipment: ['High-end Workstations', 'GPU Cards', 'Servers']
      }),
      usage: 'AI and Machine Learning practical sessions under MODROBS Scheme',
      capacity: 60,
      softwares: 'Python, TensorFlow, PyTorch, Jupyter, Anaconda, OpenCV',
      equipments: 'High-end Workstations with GPU, AI Development Servers, Neural Network Processors',
      location: 'CSE Block, Second Floor',
      incharge: 'Dr. G. Loshma',
      status: 'approved'
    },
    {
      dept: 'aiml',
      lab_name: 'Programming Laboratory',
      lab_code: 'AIM-LAB-02',
      configurations: JSON.stringify({
        systems: 80,
        software: ['Python', 'Java', 'C++', 'R'],
        equipment: ['Desktop Systems', 'Servers', 'Network Equipment']
      }),
      usage: 'Programming fundamentals and algorithm implementation',
      capacity: 80,
      softwares: 'Python, Java, C++, R, MATLAB, Visual Studio',
      equipments: 'Desktop Systems, Programming Workstations, Development Servers',
      location: 'CSE Block, Ground Floor',
      incharge: 'Asst. Prof. Faculty Name',
      status: 'approved'
    }
  ];

  for (const lab of laboratoriesData) {
    await connection.execute(
      `INSERT INTO laboratories 
       (dept, lab_name, lab_code, configurations, \`usage\`, capacity, softwares, equipments, location, incharge, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [lab.dept, lab.lab_name, lab.lab_code, lab.configurations, lab.usage,
       lab.capacity, lab.softwares, lab.equipments, lab.location, lab.incharge, lab.status]
    );
  }

  console.log(`Migrated ${laboratoriesData.length} laboratories`);
}

async function migrateMoUs(connection) {
  console.log('Migrating MoUs...');
  
  const mousData = [
    {
      dept: 'eee',
      organization_name: 'NIT Andhra Pradesh',
      description: 'Academic collaboration and research partnership',
      start_date: '2023-01-01',
      end_date: '2028-01-01',
      focal_person: 'Department Head',
      benefits: 'Faculty exchange, Research collaboration, Student internships',
      status: 'approved'
    },
    {
      dept: 'eee',
      organization_name: 'APSSDC',
      description: 'Skill development and training programs',
      start_date: '2022-06-01',
      end_date: '2027-06-01',
      focal_person: 'Training Coordinator',
      benefits: 'Industry training, Certification programs, Placement support',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'NIT Andhra Pradesh',
      description: 'AI research collaboration and academic partnership',
      start_date: '2023-01-01',
      end_date: '2028-01-01',
      focal_person: 'Dr. G. Loshma',
      benefits: 'Research collaboration, Faculty development, Joint projects',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'Eduskills',
      description: 'Industry-academia collaboration for skill development',
      start_date: '2022-09-01',
      end_date: '2027-09-01',
      focal_person: 'Industry Liaison',
      benefits: 'Industry training, Certification, Internship opportunities',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'Hexaware Technologies',
      description: 'Technology partnership and student training',
      start_date: '2023-03-01',
      end_date: '2028-03-01',
      focal_person: 'Corporate Relations',
      benefits: 'Training programs, Internships, Placement opportunities',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'TCS iON',
      description: 'Online competitive examination and training platform',
      start_date: '2022-01-01',
      end_date: '2027-01-01',
      focal_person: 'Academic Coordinator',
      benefits: 'Online assessments, Certification programs, Resource sharing',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'thingTronics Pvt Ltd, Bangalore',
      description: 'IoT and embedded systems collaboration',
      start_date: '2023-06-01',
      end_date: '2028-06-01',
      focal_person: 'Technical Head',
      benefits: 'IoT training, Project collaboration, Technology transfer',
      status: 'approved'
    },
    {
      dept: 'aiml',
      organization_name: 'Alykas Innovations Pvt Ltd',
      description: 'Innovation and startup ecosystem collaboration',
      start_date: '2023-04-01',
      end_date: '2028-04-01',
      focal_person: 'Innovation Coordinator',
      benefits: 'Startup incubation, Innovation projects, Mentorship',
      status: 'approved'
    }
  ];

  for (const mou of mousData) {
    await connection.execute(
      `INSERT INTO mous 
       (dept, organization_name, description, start_date, end_date, focal_person, benefits, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [mou.dept, mou.organization_name, mou.description, mou.start_date,
       mou.end_date, mou.focal_person, mou.benefits, mou.status]
    );
  }

  console.log(`Migrated ${mousData.length} MoUs`);
}

async function migrateFDPs(connection) {
  console.log('Migrating Faculty Development Programs...');
  
  // FDPs Attended
  const fdpAttendedData = [
    {
      dept: 'aiml',
      faculty_name: 'Dr. G. Loshma',
      program_title: 'Artificial Intelligence in Education',
      organized_by: 'IIT Hyderabad',
      start_date: '2024-01-15',
      end_date: '2024-01-19',
      program_type: 'FDP',
      description: 'Faculty development program on AI applications in educational technology',
      status: 'approved'
    },
    {
      dept: 'aiml',
      faculty_name: 'Prof. Faculty Name',
      program_title: 'Machine Learning Fundamentals',
      organized_by: 'NPTEL - IIT Madras',
      start_date: '2023-08-01',
      end_date: '2023-09-30',
      program_type: 'Online Course',
      description: 'Comprehensive course on machine learning algorithms and applications',
      status: 'approved'
    },
    {
      dept: 'eee',
      faculty_name: 'Dr. Faculty Name',
      program_title: 'Renewable Energy Systems',
      organized_by: 'NIT Warangal',
      start_date: '2024-02-10',
      end_date: '2024-02-14',
      program_type: 'FDP',
      description: 'Faculty development on latest trends in renewable energy technologies',
      status: 'approved'
    }
  ];

  for (const fdp of fdpAttendedData) {
    await connection.execute(
      `INSERT INTO fdp_attended 
       (dept, faculty_name, program_title, organized_by, start_date, end_date, program_type, description, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fdp.dept, fdp.faculty_name, fdp.program_title, fdp.organized_by,
       fdp.start_date, fdp.end_date, fdp.program_type, fdp.description, fdp.status]
    );
  }

  // FDPs Conducted
  const fdpConductedData = [
    {
      dept: 'aiml',
      program_title: 'Introduction to Deep Learning',
      coordinator: 'Dr. G. Loshma',
      start_date: '2024-03-01',
      end_date: '2024-03-05',
      program_type: 'Workshop',
      resource_persons: 'Industry experts from TCS, Infosys',
      participants_count: 50,
      description: 'Hands-on workshop on deep learning frameworks and applications',
      status: 'approved'
    },
    {
      dept: 'eee',
      program_title: 'Smart Grid Technologies',
      coordinator: 'Prof. EEE Faculty',
      start_date: '2024-01-20',
      end_date: '2024-01-24',
      program_type: 'FDP',
      resource_persons: 'PGCIL experts, Academia professionals',
      participants_count: 40,
      description: 'Faculty development program on smart grid implementation and challenges',
      status: 'approved'
    }
  ];

  for (const fdp of fdpConductedData) {
    await connection.execute(
      `INSERT INTO fdp_conducted 
       (dept, program_title, coordinator, start_date, end_date, program_type, resource_persons, participants_count, description, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fdp.dept, fdp.program_title, fdp.coordinator, fdp.start_date,
       fdp.end_date, fdp.program_type, fdp.resource_persons, fdp.participants_count, fdp.description, fdp.status]
    );
  }

  console.log(`Migrated ${fdpAttendedData.length} FDPs attended and ${fdpConductedData.length} FDPs conducted`);
}

async function migrateFacultyAchievements(connection) {
  console.log('Migrating Faculty Achievements...');
  
  const achievementsData = [
    {
      dept: 'aiml',
      type: 'Publications',
      title: 'Dr. G. Loshma - AI Applications in Smart Healthcare Systems',
      description: 'Research paper published in international journal on AI applications by Dr. G. Loshma',
      proof_url: 'https://srivasaviengg.ac.in/uploads/aiml/AIM_Faculty Journal Publications_2024-25.pdf',
      approved: 1
    },
    {
      dept: 'aiml',
      type: 'Other',
      title: 'Faculty Google Cloud Professional ML Engineer Certification',
      description: 'Professional certification in machine learning engineering completed by faculty member',
      proof_url: 'https://srivasaviengg.ac.in/uploads/aiml/2024-25 AIM Faculty MOOCs Certifications.pdf',
      approved: 1
    },
    {
      dept: 'eee',
      type: 'Grants',
      title: 'DST Research Grant for Renewable Energy Project',
      description: 'Secured research funding for renewable energy storage systems project',
      proof_url: null,
      approved: 1
    },
    {
      dept: 'aiml',
      type: 'Patents',
      title: 'Dr. G. Loshma - AI-based Predictive Maintenance System',
      description: 'Patent filed for AI-based predictive maintenance in industrial systems',
      proof_url: null,
      approved: 1
    }
  ];

  for (const achievement of achievementsData) {
    await connection.execute(
      `INSERT INTO faculty_achievements 
       (dept, type, title, description, proof_url, approved) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [achievement.dept, achievement.type, achievement.title, achievement.description, achievement.proof_url, achievement.approved]
    );
  }

  console.log(`Migrated ${achievementsData.length} faculty achievements`);
}

async function migrateWorkshops(connection) {
  console.log('Migrating Workshops and Seminars...');
  
  const workshopsData = [
    {
      dept: 'aiml',
      title: 'Guest Lecture on Industry 4.0',
      date_from: '2024-03-15',
      date_to: '2024-03-15',
      description: 'Expert session on Industry 4.0 applications and AI integration conducted by industry expert from TCS',
      report_url: 'https://srivasaviengg.ac.in/uploads/aiml/Guest_Lectures_2024-25.pdf',
      gallery: null
    },
    {
      dept: 'aiml',
      title: 'SOC Program 2023-24',
      date_from: '2023-08-01',
      date_to: '2023-08-07',
      description: 'Student Orientation Course for new batch students covering 180 participants',
      report_url: 'https://srivasaviengg.ac.in/uploads/aiml/SOC_2023-2024(AIM).pdf',
      gallery: null
    },
    {
      dept: 'eee',
      title: 'Seminar on Power System Protection',
      date_from: '2024-02-20',
      date_to: '2024-02-20',
      description: 'Technical seminar on modern power system protection schemes conducted by PGCIL expert',
      report_url: null,
      gallery: null
    }
  ];

  for (const workshop of workshopsData) {
    await connection.execute(
      `INSERT INTO workshops 
       (dept, title, date_from, date_to, description, report_url, gallery) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [workshop.dept, workshop.title, workshop.date_from, workshop.date_to,
       workshop.description, workshop.report_url, workshop.gallery]
    );
  }

  console.log(`Migrated ${workshopsData.length} workshops and seminars`);
}

async function migrateStudentAchievements(connection) {
  console.log('Migrating Student Achievements...');
  
  const studentAchievementsData = [
    {
      dept: 'aiml',
      type: 'Internship',
      title: 'Virtual Internship at TCS',
      name: 'Student Name 1',
      roll_number: '21A85A0501',
      program: 'btech',
      cgpa: null,
      score: null,
      guide_name: null,
      batch: '2021-25',
      proof_url: 'https://srivasaviengg.ac.in/uploads/aiml/AIM_23-24_VIRTUAL_INTERNSHIPS_2021-25_BATCH.pdf'
    },
    {
      dept: 'aiml',
      type: 'Certifications',
      title: 'NPTEL Python Programming Certification',
      name: 'Student Name 2',
      roll_number: '22A85A0502',
      program: 'btech',
      cgpa: null,
      score: '85',
      guide_name: null,
      batch: '2022-26',
      proof_url: 'https://srivasaviengg.ac.in/uploads/aiml/AIM_23-24_CERTIFICATIONS_TABLE.pdf'
    },
    {
      dept: 'aiml',
      type: 'Student Research Projects',
      title: 'AI-based Healthcare Monitoring System',
      name: 'Student Name 3',
      roll_number: '21A85A0503',
      program: 'btech',
      cgpa: null,
      score: null,
      guide_name: 'Dr. G. Loshma',
      batch: '2021-25',
      proof_url: 'https://srivasaviengg.ac.in/uploads/aiml/2021-25%20Batch%20AI&ML%20Miniproject%20Data.pdf'
    },
    {
      dept: 'eee',
      type: 'Competitions',
      title: 'State Level Technical Paper Presentation',
      name: 'EEE Student 1',
      roll_number: '21A85A1001',
      program: 'btech',
      cgpa: null,
      score: null,
      guide_name: null,
      batch: '2021-25',
      proof_url: null
    }
  ];

  for (const achievement of studentAchievementsData) {
    await connection.execute(
      `INSERT INTO student_achievements 
       (dept, type, title, name, roll_number, program, cgpa, score, guide_name, batch, proof_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [achievement.dept, achievement.type, achievement.title, achievement.name,
       achievement.roll_number, achievement.program, achievement.cgpa, achievement.score,
       achievement.guide_name, achievement.batch, achievement.proof_url]
    );
  }

  console.log(`Migrated ${studentAchievementsData.length} student achievements`);
}

// Run the migration
migrateAllDepartmentData();