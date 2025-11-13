// Seed placement officer profiles with sample data
const db = require('../src/lib/db');

async function seedProfiles() {
  try {
    // Get the first college (assuming it exists from college seeding)
    const colleges = await db.query('SELECT id FROM colleges LIMIT 1');
    if (colleges.length === 0) {
      console.log('⚠️ No colleges found. Please seed colleges first using: node seed-colleges.js');
      process.exit(1);
    }

    const collegeId = colleges[0].id;

    const profiles = [
      {
        college_id: collegeId,
        first_name: 'P N V',
        last_name: 'GOPALA KRISHNA',
        designation: 'Associate Professor (Mechanical) & Head - Placements',
        department: 'Mechanical Engineering',
        bio: 'Dedicated placement officer with expertise in industry-academia collaboration and student career development.',
        profile_photo: 'https://via.placeholder.com/300x300?text=Dr.+Gopala+Krishna',
        contact_email: 'svectpo@srivasaviengg.ac.in',
        contact_phone: '9849511367',
        office_phone: '08818-284355',
        office_extension: '319',
        office_address: 'Sri Vasavi Engineering College, Vijayawada',
        office_room_number: 'Main Campus - Administration Block',
        linkedin_url: 'https://www.linkedin.com/in/gopala-krishna',
        experience_years: 15,
        qualifications: 'B.Tech, M.Tech, PhD',
        specialization: 'Mechanical Engineering, Industrial Management',
        research_interests: 'Manufacturing Technology, Quality Management, Career Development',
        students_placed: 450,
        average_placement_package: 6.5,
        highest_package: 25.0,
        companies_collaborated: 85,
        achievements: 'Successfully placed students in top companies like TCS, Infosys, Wipro, Microsoft, Amazon, Google, IBM, Oracle, Zoho, HCL, Accenture, Cognizant, and many more.',
        awards: 'Best Placement Officer Award 2023, Excellence in Student Career Guidance',
        publications: 'Multiple publications on placement effectiveness and industry collaboration',
        join_date: '2010-01-15',
      },
      {
        college_id: collegeId,
        first_name: 'Dr. R',
        last_name: 'SRINIVAS',
        designation: 'Associate Professor (CSE) & Co-Coordinator Placements',
        department: 'Computer Science & Engineering',
        bio: 'Technology enthusiast focused on developing industry-ready IT professionals.',
        profile_photo: 'https://via.placeholder.com/300x300?text=Dr.+Srinivas',
        contact_email: 'cse.placements@srivasaviengg.ac.in',
        contact_phone: '9876543210',
        office_phone: '08818-284355',
        office_extension: '320',
        office_address: 'Sri Vasavi Engineering College, Vijayawada',
        experience_years: 12,
        specialization: 'Computer Science, Software Engineering',
        students_placed: 520,
        average_placement_package: 7.2,
        highest_package: 28.0,
        companies_collaborated: 92,
        achievements: 'Led placement drive resulting in 95% placement rate for CSE department.',
        join_date: '2012-06-20',
      },
      {
        college_id: collegeId,
        first_name: 'Prof. K',
        last_name: 'VENKATA RAMAN',
        designation: 'Assistant Professor (ECE) & Placement Co-ordinator',
        department: 'Electronics & Communication Engineering',
        bio: 'Passionate about bridging the gap between academics and industry requirements.',
        profile_photo: 'https://via.placeholder.com/300x300?text=Prof.+Raman',
        contact_email: 'ece.placements@srivasaviengg.ac.in',
        contact_phone: '9765432109',
        office_phone: '08818-284355',
        office_extension: '321',
        office_address: 'Sri Vasavi Engineering College, Vijayawada',
        experience_years: 10,
        specialization: 'Electronics, Communication Systems',
        students_placed: 380,
        average_placement_package: 5.8,
        highest_package: 18.5,
        companies_collaborated: 65,
        achievements: 'Successfully coordinated placements for multiple batches with 90% placement success rate.',
        join_date: '2014-07-10',
      },
      {
        college_id: collegeId,
        first_name: 'Dr. A',
        last_name: 'KRISHNAMURTHY',
        designation: 'Professor (Civil) & Senior Placement Advisor',
        department: 'Civil Engineering',
        bio: 'Senior placement advisor with strong industry connections and career mentoring experience.',
        profile_photo: 'https://via.placeholder.com/300x300?text=Dr.+Krishnamurthy',
        contact_email: 'civil.placements@srivasaviengg.ac.in',
        contact_phone: '9654321098',
        office_phone: '08818-284355',
        office_extension: '322',
        office_address: 'Sri Vasavi Engineering College, Vijayawada',
        experience_years: 20,
        qualifications: 'B.Tech, M.Tech, PhD',
        specialization: 'Civil Engineering, Infrastructure Development',
        students_placed: 290,
        average_placement_package: 4.8,
        highest_package: 12.0,
        companies_collaborated: 48,
        achievements: '20 years of experience in placement coordination and student mentoring.',
        awards: 'Veteran Placement Officer Award, Academic Excellence',
        join_date: '2005-08-15',
      },
      {
        college_id: collegeId,
        first_name: 'Ms. P',
        last_name: 'LAKSHMI',
        designation: 'Assistant Professor (EEE) & Placement Officer',
        department: 'Electrical & Electronics Engineering',
        bio: 'Dedicated professional committed to student development and career advancement.',
        profile_photo: 'https://via.placeholder.com/300x300?text=Ms.+Lakshmi',
        contact_email: 'eee.placements@srivasaviengg.ac.in',
        contact_phone: '9543210987',
        office_phone: '08818-284355',
        office_extension: '323',
        office_address: 'Sri Vasavi Engineering College, Vijayawada',
        experience_years: 8,
        specialization: 'Electrical Engineering, Power Systems',
        students_placed: 310,
        average_placement_package: 5.5,
        highest_package: 16.0,
        companies_collaborated: 55,
        achievements: 'Strong track record in electronics and power sector placements.',
        join_date: '2016-09-01',
      },
    ];

    console.log('📋 Starting to seed placement profiles...\n');

    for (const profile of profiles) {
      await db.query(
        `INSERT INTO college_placement_profiles 
        (college_id, first_name, last_name, designation, department, bio, profile_photo, 
         contact_email, contact_phone, office_phone, office_extension, office_address, 
         office_room_number, linkedin_url, experience_years, qualifications, specialization, 
         research_interests, students_placed, average_placement_package, highest_package, 
         companies_collaborated, achievements, awards, publications, join_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          profile.college_id,
          profile.first_name,
          profile.last_name,
          profile.designation,
          profile.department,
          profile.bio,
          profile.profile_photo,
          profile.contact_email,
          profile.contact_phone,
          profile.office_phone,
          profile.office_extension,
          profile.office_address,
          profile.office_room_number,
          profile.linkedin_url,
          profile.experience_years,
          profile.qualifications,
          profile.specialization,
          profile.research_interests,
          profile.students_placed,
          profile.average_placement_package,
          profile.highest_package,
          profile.companies_collaborated,
          profile.achievements,
          profile.awards,
          profile.publications,
          profile.join_date,
        ]
      );
      console.log(`✓ Inserted profile: ${profile.first_name} ${profile.last_name}`);
    }

    console.log(`\n✅ Successfully seeded ${profiles.length} placement profiles!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding profiles:', error);
    process.exit(1);
  }
}

seedProfiles();
