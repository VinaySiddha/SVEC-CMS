const mysql = require('mysql2/promise');
require('dotenv').config();

// MOUs with Industries
const mouData = [
    {
        dept: 'cseai',
        organization_name: 'Roland Institute of Technology,Berhampur',
        description: 'Academic collaboration and research partnership',
        start_date: '2025-05-10',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Mou Roland Principal sir sign.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Pennant Technologies Pvt Ltd',
        description: 'Skill development and training programs',
        start_date: '2024-11-06',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/MOU with Pennant Technologies Pvt Ltd.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Blumin Software & Training Consultancy LLP',
        description: 'Industry-academia collaboration for skill development',
        start_date: '2024-06-18',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Blumin MOU.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Zscaler Academic Alliance Program',
        description: 'Technology partnership and student training',
        start_date: '2023-12-08',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/ZScalar_MOU.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'New Leaf Learning Solutions',
        description: 'Skill development and research collaboration',
        start_date: '2023-10-01',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/SVEC- New Leaf 1-10-2023.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'NIT AP',
        description: 'Academic and research collaboration',
        start_date: '2022-12-31',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/1 NITAP_MOU with activities.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Alteryx SparkED Partner',
        description: 'Industry-academia collaboration for skill development',
        start_date: '2022-12-30',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/578_Alteryx SparkEd Partner_Sri Vasavi Engineering College.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Juniper Networks',
        description: 'Technology partnership and student training',
        start_date: '2022-11-30',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Juniper MOU.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Celonis Academic Alliance',
        description: 'Research and training collaboration',
        start_date: '2022-11-11',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Celonis.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Palo Alto Networks Cyber Security Academy',
        description: 'Industry-academia partnership for cybersecurity training',
        start_date: '2022-11-08',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Paaloalto.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Blue Prism Academia Program',
        description: 'Automation and robotics training',
        start_date: '2022-11-01',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Sri Vasavi Engineering College.pdf',
        status: 'approved'
    },
    {
        dept: 'cseai',
        organization_name: 'Eduskills',
        description: 'Industry-academia collaboration for skill development',
        start_date: '2022-10-31',
        end_date: null,
        document_url: 'https://srivasaviengg.ac.in/uploads/csemous/Eduskills MOU with PICS.pdf',
        status: 'approved'
    }
];

async function migrateMOUs() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });
        console.log('Connected to MySQL database');

        // Insert MOUs
        for (const mou of mouData) {
            await connection.execute(
                `INSERT INTO mous 
                (dept, organization_name, description, start_date, end_date, document_url, status, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [mou.dept, mou.organization_name, mou.description, mou.start_date, mou.end_date, mou.document_url, mou.status]
            );
            console.log(`Inserted MOU: ${mou.organization_name}`);
        }

        console.log('MOU migration completed successfully!');

    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        if (connection) await connection.end();
        console.log('Database connection closed');
    }
}

migrateMOUs();
