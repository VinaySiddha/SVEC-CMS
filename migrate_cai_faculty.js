const mysql = require('mysql2/promise');

// CAI Faculty data to insert
const caifaculty = [
    { name: "Dr. G. Loshma", qualification: "Ph.D.", designation: "Head & Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr.G.Loshma.pdf" },
    { name: "Dr. E. Aswani Kumar", qualification: "Ph.D.", designation: "Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. E. Aswani Kumar.pdf" },
    { name: "Mrs. A. Leelavathi", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.%20Leelavathi.pdf" },
    { name: "Mr. R.L. Phani Kumar", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_R.L. Phani Kumar.pdf" },
    { name: "Mr. M. Subba Rao", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. M. Subba Rao.pdf" },
    { name: "Mr. P. V. V. Satyanarayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P. V. V Satya Narayana.pdf" },
    { name: "Mr. V. Rama Narayana", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. V. Rama Narayana.pdf" },
    { name: "Mrs. V. Radha", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mrs. V. Radha.pdf" },
    { name: "Mr. A. Rajesh", qualification: "M.Tech, (Ph.D.)", designation: "Sr. Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_A.Rajesh.pdf" },
    { name: "Mr. D. Ayyappa", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. D. Ayyappa.pdf" },
    { name: "Mr. M. Yesu Sekharam", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_M. Y. SEKHARAM.pdf" },
    { name: "Mrs. K. Durga Saranya", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. K. Durga Saranya.pdf" },
    { name: "Mr. Shaik Moulali", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Sk. Moulali.pdf" },
    { name: "Mrs. P. Ujwala Sai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_P. Ujwala.pdf" },
    { name: "Mrs. M. Kiranmai", qualification: "M.Tech", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Ms. M. Kiranmai.pdf" },
    { name: "Mr. V. Thinakaran", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr .V. Thinakaran.pdf" },
    { name: "Mr. P. Seshu Kumar", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. P Seshu Kumar.pdf" },
    { name: "Mrs. G. Kalyani", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. G Kalyani.pdf" },
    { name: "Mrs. Pratyusha Ch.", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Ms. Prathyusha Ch.pdf" },
    { name: "Mr. A. Reddy Chaitanya", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Dr. Jagadish Kumar K B", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Dr. Jagadish Kumar KB.pdf" },
    { name: "Mr. Nishanth N S", qualification: "M.E.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr.Nisanth N S.pdf" },
    { name: "Mr. B. V. V. Bhargav", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Bhargav-BVV.pdf" },
    { name: "Mr. V. Jaya Rama Krishna", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. V. Jayaramakrishna.pdf" },
    { name: "Dr. M. Vishnuvardhan", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Dr. M Vishnuvardhan.pdf" },
    { name: "Mrs. Jane Rose", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Dr. J. Kondala Rao", qualification: "Ph.D.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mr. K. Jyothi.pdf" },
    { name: "Mrs. Balaji Rohitha", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_DS_Mrs. B. Rohitha.pdf" },
    { name: "Mr. Jewaliddin Shaik", qualification: "M.Tech, (Ph.D.)", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/CAI_Mr. Reddy Chaitanya A.pdf" },
    { name: "Ms. Sneha Pradhan", qualification: "M.Tech.", designation: "Asst. Professor", profileUrl: "https://srivasaviengg.ac.in/faculty_profile/AIM_Mrs. P. Sneha.pdf" }
];

async function migrateFacultyData() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Connected to database');

        /* // Clear existing CSE faculty data
         await connection.execute('DELETE FROM faculty_profiles WHERE dept = ?', ['cse']);
         console.log('Cleared existing CSE faculty data');
     */
        // Insert faculty data
        for (const faculty of caifaculty) {
            try {
                await connection.execute(`
          INSERT INTO faculty_profiles (
            name, qualification, designation, profile_url, dept, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, NOW())
        `, [
                    faculty.name,
                    faculty.qualification,
                    faculty.designation,
                    faculty.profileUrl,
                    'cai',
                    'approved'
                ]);
                console.log(`Inserted: ${faculty.name}`);
            } catch (e) {
                console.log(`Error inserting ${faculty.name}:`, e.message);
            }
        }

        /*// Insert sample labs
        const labs = [
            {
                lab_name: 'James Gosling Lab',
                dept: 'cai',
                configurations: 'Intel Core i7 processors, 8GB RAM, Windows 11, Visual Studio, Eclipse IDE',
                labs_usage: 'Programming, Software Development, Object-Oriented Programming'
            },
            {
                lab_name: 'AI Research Lab',
                dept: 'cai',
                configurations: 'High-end GPUs, Python, TensorFlow, PyTorch, Jupyter Notebooks',
                labs_usage: 'Machine Learning, Deep Learning, AI Research Projects'
            },
            {
                lab_name: 'Data Science Lab',
                dept: 'cai',
                configurations: 'R Studio, Python, Tableau, Apache Spark, Big Data Tools',
                labs_usage: 'Data Analytics, Statistical Analysis, Business Intelligence'
            }
        ];

        await connection.execute('DELETE FROM labs WHERE dept = ?', ['cai']);
        console.log('Cleared existing CSE lab data');

        for (const lab of labs) {
            try {
                await connection.execute(`
          INSERT INTO labs (
            lab_name, dept, configurations, labs_usage, status, created_at
          ) VALUES (?, ?, ?, ?, ?, NOW())
        `, [
                    lab.lab_name,
                    lab.dept,
                    lab.configurations,
                    lab.labs_usage,
                    'active'
                ]);
                console.log(`Inserted lab: ${lab.lab_name}`);
            } catch (e) {
                console.log(`Error inserting lab ${lab.lab_name}:`, e.message);
            }
        }

        // Insert sample faculty achievements
        const facultyAchievements = [
            {
                dept: 'cai',
                type: 'Awards',
                title: 'Best Research Paper Award 2024',
                description: 'Dr. D. Jaya Kumari received best research paper award at International Conference on AI'
            },
            {
                dept: 'cai',
                type: 'Awards',
                title: 'Outstanding Teaching Award',
                description: 'Dr. V. Venkateswara Rao recognized for excellence in teaching and student mentorship'
            },
            {
                dept: 'cai',
                type: 'Publications',
                title: 'Machine Learning in Healthcare Systems',
                description: 'Published research paper on ML applications in healthcare by Dr. K. Shirin Bhanu'
            }
        ];

        await connection.execute('DELETE FROM faculty_achievements WHERE dept = ?', ['cse']);
        console.log('Cleared existing CSE faculty achievements');

        for (const achievement of facultyAchievements) {
            try {
                await connection.execute(`
          INSERT INTO faculty_achievements (
            dept, type, title, description, approved, created_at
          ) VALUES (?, ?, ?, ?, ?, NOW())
        `, [
                    achievement.dept,
                    achievement.type,
                    achievement.title,
                    achievement.description,
                    1
                ]);
                console.log(`Inserted faculty achievement: ${achievement.title}`);
            } catch (e) {
                console.log(`Error inserting achievement ${achievement.title}:`, e.message);
            }
        }

        // Insert sample student achievements
        const studentAchievements = [
            {
                dept: 'cse',
                type: 'Competitions',
                title: 'First Prize in National Coding Competition',
                name: 'Alice Johnson',
                roll_number: '21A91A0501',
                program: 'btech',
                batch: '2021-25',
                cgpa: 9.2
            },
            {
                dept: 'cse',
                type: 'Student Research Projects',
                title: 'Best Project Award - AI Healthcare Solution',
                name: 'Priya Sharma',
                roll_number: '21A91A0502',
                program: 'btech',
                batch: '2021-25',
                cgpa: 9.5
            },
            {
                dept: 'cse',
                type: 'Internship',
                title: 'Google Summer of Code 2024',
                name: 'Rahul Kumar',
                roll_number: '21A91A0503',
                program: 'btech',
                batch: '2021-25',
                cgpa: 9.0
            }
        ];

        await connection.execute('DELETE FROM student_achievements WHERE dept = ?', ['cse']);
        console.log('Cleared existing CSE student achievements');

        for (const achievement of studentAchievements) {
            try {
                await connection.execute(`
          INSERT INTO student_achievements (
            dept, type, title, name, roll_number, program, batch, cgpa, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `, [
                    achievement.dept,
                    achievement.type,
                    achievement.title,
                    achievement.name,
                    achievement.roll_number,
                    achievement.program,
                    achievement.batch,
                    achievement.cgpa
                ]);
                console.log(`Inserted student achievement: ${achievement.title}`);
            } catch (e) {
                console.log(`Error inserting achievement ${achievement.title}:`, e.message);
            }
        }

        // Insert sample workshops
        const workshops = [
            {
                dept: 'cai',
                title: 'Machine Learning Workshop',
                date_from: '2024-03-01',
                date_to: '2024-03-03',
                description: 'Comprehensive workshop on ML algorithms and applications'
            },
            {
                dept: 'cai',
                title: 'Web Development Bootcamp',
                date_from: '2024-02-15',
                date_to: '2024-02-19',
                description: 'Intensive bootcamp on modern web development technologies'
            },
            {
                dept: 'cai',
                title: 'Cybersecurity Seminar',
                date_from: '2024-01-20',
                date_to: '2024-01-20',
                description: 'One-day seminar on latest cybersecurity trends and practices'
            }
        ];

        await connection.execute('DELETE FROM workshops WHERE dept = ?', ['cse']);
        console.log('Cleared existing CSE workshops');

        for (const workshop of workshops) {
            try {
                await connection.execute(`
          INSERT INTO workshops (
            dept, title, date_from, date_to, description, created_at
          ) VALUES (?, ?, ?, ?, ?, NOW())
        `, [
                    workshop.dept,
                    workshop.title,
                    workshop.date_from,
                    workshop.date_to,
                    workshop.description
                ]);
                console.log(`Inserted workshop: ${workshop.title}`);
            } catch (e) {
                console.log(`Error inserting workshop ${workshop.title}:`, e.message);
            }
        }

        console.log('✅ Faculty data migration completed successfully!');*/

    } catch (error) {
        console.error('❌ Error during migration:', error);
    } finally {
        await connection.end();
    }
}

migrateFacultyData();
