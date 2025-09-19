const mysql = require('mysql2/promise');
require('dotenv').config();

// Handbook migration array
const handbooks = [
    // Academic year 2025-26: I-Sem
    {
        dept: 'cseai',
        title: "III Sem V23 Regulation Handbook",
        description: "Handbook for III Semester under V23 Regulation",
        academic_year: "2025-26",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/CST_III SEM Handbook (1).pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2025-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "V Sem V23 Regulation Handbook",
        description: "Handbook for V Semester under V23 Regulation",
        academic_year: "2025-26",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/CST_V SEM Handbook.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2025-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VII Sem V20 Regulation Handbook",
        description: "Handbook for VII Semester under V20 Regulation",
        academic_year: "2025-26",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/CST_VII SEM Handbook.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2025-06-01",
        status: "published"
    },

    // Academic year 2024-25: II-Sem
    {
        dept: 'cseai',
        title: "IV Sem V23 Regulation Handbook",
        description: "Handbook for IV Semester under V23 Regulation",
        academic_year: "2024-25",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/2024-25_IV SEM Hand Book_CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2025-01-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VI Sem V20 Regulation Handbook",
        description: "Handbook for VI Semester under V20 Regulation",
        academic_year: "2024-25",
        document_url: "https://srivasaviengg.ac.in/uploads/cse_extra_activities/CST_VI Semester Handbook.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2025-01-01",
        status: "published"
    },

    // Academic year 2024-25: I-Sem
    {
        dept: 'cseai',
        title: "III Sem V20 Regulation Handbook",
        description: "Handbook for III Semester under V20 Regulation",
        academic_year: "2024-25",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CSTs.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2024-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "V Sem V20 Regulation Handbook",
        description: "Handbook for V Semester under V20 Regulation",
        academic_year: "2024-25",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/V SEM  Handbook_2024-25-CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2024-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VII Sem V20 Regulation Handbook",
        description: "Handbook for VII Semester under V20 Regulation",
        academic_year: "2024-25",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VII SEM  Handbook_2024-25-CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2024-06-01",
        status: "published"
    },

    // Academic year 2023-24: II-Sem
    {
        dept: 'cseai',
        title: "IV Sem V20 Regulation Handbook",
        description: "Handbook for IV Semester under V20 Regulation",
        academic_year: "2023-24",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/2023-24_IV SEM Hand Book_CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2024-01-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VI Sem V20 Regulation Handbook",
        description: "Handbook for VI Semester under V20 Regulation",
        academic_year: "2023-24",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VI Semester Handbook - CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2024-01-01",
        status: "published"
    },

    // Academic year 2023-24: I-Sem
    {
        dept: 'cseai',
        title: "III Sem V20 Regulation Handbook",
        description: "Handbook for III Semester under V20 Regulation",
        academic_year: "2023-24",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/III  SEM (Autonomous) Handbook - CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "V Sem V20 Regulation Handbook",
        description: "Handbook for V Semester under V20 Regulation",
        academic_year: "2023-24",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/V SEM Handbook_V20 Regulation_2023-24.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VII Sem V20 Regulation Handbook",
        description: "Handbook for VII Semester under V20 Regulation",
        academic_year: "2023-24",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VII SEM V20 Regulation HandBook_2023-24.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-06-01",
        status: "published"
    },

    // Academic year 2022-23: II-Sem
    {
        dept: 'cseai',
        title: "IV Sem V20 Regulation Handbook",
        description: "Handbook for IV Semester under V20 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/IV Sem V20 Regulation Handbook_CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-01-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VI Sem V20 Regulation Handbook",
        description: "Handbook for VI Semester under V20 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VI Sem V20 Regulation Handbook_CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-01-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VIII Sem V18 Regulation Handbook",
        description: "Handbook for VIII Semester under V18 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VIII Sem V20 Regulation Handbook_CST.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2023-01-01",
        status: "published"
    },

    // Academic year 2022-23: I-Sem
    {
        dept: 'cseai',
        title: "III Sem V20 Regulation Handbook",
        description: "Handbook for III Semester under V20 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/III SEM V20 Regulation Handbook (CST).pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2022-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "V Sem V20 Regulation Handbook",
        description: "Handbook for V Semester under V20 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/V SEM CST V20(Autonomous) Handbook.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2022-06-01",
        status: "published"
    },
    {
        dept: 'cseai',
        title: "VII Sem V18 Regulation Handbook",
        description: "Handbook for VII Semester under V18 Regulation",
        academic_year: "2022-23",
        document_url: "https://srivasaviengg.ac.in/uploads/cst/VII SEM CST V18(Autonomous) Handbook.pdf",
        cover_image_url: null,
        editor: "Academic Office",
        publish_date: "2022-06-01",
        status: "published"
    },

];

async function migrateHandbooks() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });
        console.log('✅ Connected to MySQL database');

        console.log('📥 Inserting handbook entries...');
        for (const hb of handbooks) {
            await connection.execute(
                `INSERT INTO handbooks 
         (dept,title, description, academic_year, document_url, cover_image_url, editor, publish_date, status, created_at, updated_at)
         VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [
                    hb.dept,
                    hb.title,
                    hb.description,
                    hb.academic_year,
                    hb.document_url,
                    hb.cover_image_url,
                    hb.editor,
                    hb.publish_date,
                    hb.status
                ]
            );
            console.log(`✅ Inserted: ${hb.title}`);
        }

        const [count] = await connection.execute('SELECT COUNT(*) as count FROM handbooks');
        console.log(`\n📊 Total handbooks in DB: ${count[0].count}`);
        console.log('🎉 Handbook migration completed successfully!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔒 Database connection closed');
        }
    }
}

migrateHandbooks();