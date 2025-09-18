// Next.js API route for Civil Engineering department data
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);

    const dataType = query.type || 'all';

    switch (dataType) {
      case 'profile':
        const profile = await getDepartmentProfile(connection);
        return res.status(200).json({ success: true, data: profile });

      case 'academic':
        const academic = await getAcademicInfo(connection);
        return res.status(200).json({ success: true, data: academic });

      case 'faculty':
        const faculty = await getFaculty(connection);
        return res.status(200).json({ success: true, data: faculty });

      case 'library':
        const library = await getLibraryInfo(connection);
        return res.status(200).json({ success: true, data: library });

      case 'technical-association':
        const ta = await getTechnicalAssociation(connection);
        return res.status(200).json({ success: true, data: ta });

      case 'laboratories':
        const labs = await getLaboratories(connection);
        return res.status(200).json({ success: true, data: labs });

      case 'syllabus':
        const syllabus = await getSyllabus(connection);
        return res.status(200).json({ success: true, data: syllabus });

      case 'newsletters':
        const newsletters = await getNewsletters(connection);
        return res.status(200).json({ success: true, data: newsletters });

      case 'consultancy':
        const consultancy = await getConsultancy(connection);
        return res.status(200).json({ success: true, data: consultancy });

      case 'workshops':
        const workshops = await getWorkshops(connection);
        return res.status(200).json({ success: true, data: workshops });

      case 'all':
      default:
        const allData = {
          profile: await getDepartmentProfile(connection),
          academic: await getAcademicInfo(connection),
          faculty: await getFaculty(connection),
          library: await getLibraryInfo(connection),
          technicalAssociation: await getTechnicalAssociation(connection),
          laboratories: await getLaboratories(connection),
          syllabus: await getSyllabus(connection),
          newsletters: await getNewsletters(connection),
          consultancy: await getConsultancy(connection),
          workshops: await getWorkshops(connection)
        };
        return res.status(200).json({ success: true, data: allData });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Helper functions to fetch specific data
async function getDepartmentProfile(connection) {
  const [rows] = await connection.execute(
    'SELECT * FROM civil_department_profile WHERE department = ? ORDER BY id DESC LIMIT 1',
    ['Civil Engineering']
  );
  return rows[0] || null;
}

async function getAcademicInfo(connection) {
  // Get vision
  const [visionRows] = await connection.execute(
    'SELECT vision FROM civil_academic_info WHERE department = ? ORDER BY id DESC LIMIT 1',
    ['Civil Engineering']
  );

  // Get mission points
  const [missionRows] = await connection.execute(
    'SELECT mission_point FROM civil_mission WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  // Get PEOs
  const [peoRows] = await connection.execute(
    'SELECT peo_description FROM civil_peos WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  // Get POs
  const [poRows] = await connection.execute(
    'SELECT po_title, po_description FROM civil_pos WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  // Get PSOs
  const [psoRows] = await connection.execute(
    'SELECT pso_description FROM civil_psos WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  // Get Courses
  const [courseRows] = await connection.execute(
    'SELECT course_name, eligibility, duration, intake FROM civil_courses WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  // Get Salient Features
  const [featureRows] = await connection.execute(
    'SELECT feature_description FROM civil_salient_features WHERE department = ? ORDER BY order_index',
    ['Civil Engineering']
  );

  return {
    vision: visionRows[0]?.vision || null,
    mission: missionRows.map(row => row.mission_point),
    peos: peoRows.map(row => row.peo_description),
    pos: poRows.map(row => ({ title: row.po_title, description: row.po_description })),
    psos: psoRows.map(row => row.pso_description),
    courses: courseRows.map(row => ({
      course: row.course_name,
      eligibility: row.eligibility,
      duration: row.duration,
      intake: row.intake
    })),
    salientFeatures: featureRows.map(row => row.feature_description)
  };
}

async function getFaculty(connection) {
  // Get teaching faculty
  const [teachingRows] = await connection.execute(
    'SELECT name, qualification, designation, profile_url FROM civil_faculty WHERE department = ? AND status = ? ORDER BY order_index',
    ['Civil Engineering', 'active']
  );

  // Get non-teaching staff
  const [nonTeachingRows] = await connection.execute(
    'SELECT name, designation FROM civil_non_teaching_staff WHERE department = ? AND status = ? ORDER BY order_index',
    ['Civil Engineering', 'active']
  );

  return {
    teaching: teachingRows.map(row => ({
      name: row.name,
      qualification: row.qualification,
      designation: row.designation,
      profileUrl: row.profile_url
    })),
    nonTeaching: nonTeachingRows.map(row => ({
      name: row.name,
      designation: row.designation
    }))
  };
}

async function getLibraryInfo(connection) {
  const [rows] = await connection.execute(
    'SELECT * FROM civil_library_info WHERE department = ? ORDER BY id DESC LIMIT 1',
    ['Civil Engineering']
  );
  
  if (rows[0]) {
    return {
      description: rows[0].description,
      titles: rows[0].total_titles,
      volumes: rows[0].total_volumes,
      facultyIncharge: rows[0].faculty_incharge,
      image: rows[0].image_url
    };
  }
  return null;
}

async function getTechnicalAssociation(connection) {
  const [taRows] = await connection.execute(
    'SELECT * FROM civil_technical_association WHERE department = ? ORDER BY id DESC LIMIT 1',
    ['Civil Engineering']
  );

  if (!taRows[0]) return null;

  const associationId = taRows[0].id;

  // Get committee members
  const [memberRows] = await connection.execute(
    'SELECT member_name, designation FROM civil_technical_association_members WHERE association_id = ? ORDER BY order_index',
    [associationId]
  );

  // Get images
  const [imageRows] = await connection.execute(
    'SELECT image_url, image_caption FROM civil_technical_association_images WHERE association_id = ? ORDER BY order_index',
    [associationId]
  );

  return {
    name: taRows[0].association_name,
    established: taRows[0].established_year,
    initialMembers: taRows[0].initial_members,
    description: taRows[0].description,
    committee: memberRows.map(row => row.member_name),
    images: imageRows.map(row => ({
      url: row.image_url,
      caption: row.image_caption
    }))
  };
}

async function getLaboratories(connection) {
  const [rows] = await connection.execute(
    'SELECT lab_name, description, image_url, equipment FROM civil_laboratories WHERE department = ? AND status = ? ORDER BY order_index',
    ['Civil Engineering', 'active']
  );

  return rows.map(row => ({
    name: row.lab_name,
    description: row.description,
    image: row.image_url,
    equipment: row.equipment
  }));
}

async function getSyllabus(connection) {
  const [rows] = await connection.execute(
    'SELECT program, version, name, url FROM civil_syllabus WHERE department = ? ORDER BY program, version',
    ['Civil Engineering']
  );

  const syllabus = { btech: [], mtech: [] };
  
  rows.forEach(row => {
    const item = {
      version: row.version,
      name: row.name,
      url: row.url
    };
    
    if (row.program === 'btech') {
      syllabus.btech.push(item);
    } else if (row.program === 'mtech') {
      syllabus.mtech.push(item);
    }
  });

  return syllabus;
}

async function getNewsletters(connection) {
  try {
    const [rows] = await connection.execute(
      'SELECT issue, date, url FROM civil_newsletters WHERE department = ? ORDER BY date DESC',
      ['Civil']
    );
    return rows;
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    return [];
  }
}

async function getConsultancy(connection) {
  try {
    const [rows] = await connection.execute(
      'SELECT year, name, url FROM civil_consultancy WHERE department = ? ORDER BY year DESC',
      ['Civil']
    );
    return rows;
  } catch (error) {
    console.error('Error fetching consultancy:', error);
    return [];
  }
}

async function getWorkshops(connection) {
  try {
    const [rows] = await connection.execute(
      'SELECT year, name, url FROM civil_workshops WHERE department = ? ORDER BY year DESC',
      ['civil']
    );
    return rows;
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }
}
