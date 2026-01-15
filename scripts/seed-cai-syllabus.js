const mysql = require('mysql2/promise');

async function seedSyllabusData() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: '62.72.31.209',
            user: 'cmsuser',
            password: 'V@savi@2001',
            database: 'svec_cms'
        });

        console.log('Connected to database');

        // Check current count
        const [countBefore] = await connection.execute(
            'SELECT COUNT(*) as total FROM cai_syllabus'
        );
        console.log('Syllabus records before seeding:', countBefore[0].total);

        // Insert sample data
        const insertQuery = `
            INSERT INTO cai_syllabus (id, type, title, fileUrl, academic_year) VALUES
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?),
            (?, ?, ?, ?, ?)
        `;

        const values = [
            1, 'R20', 'CSE (AI&ML) R20 Syllabus', '#', '2023-24',
            2, 'R20', 'I Year I Semester Syllabus', '#', '2023-24',
            3, 'R20', 'I Year II Semester Syllabus', '#', '2023-24',
            4, 'R20', 'II Year I Semester Syllabus', '#', '2023-24',
            5, 'R20', 'II Year II Semester Syllabus', '#', '2023-24',
            6, 'R20', 'III Year I Semester Syllabus', '#', '2023-24',
            7, 'R20', 'III Year II Semester Syllabus', '#', '2023-24',
            8, 'R20', 'IV Year I Semester Syllabus', '#', '2023-24'
        ];

        await connection.execute(insertQuery, values);
        console.log('✓ Successfully inserted 8 syllabus records');

        // Verify insertion
        const [countAfter] = await connection.execute(
            'SELECT COUNT(*) as total FROM cai_syllabus'
        );
        console.log('Total syllabus records after seeding:', countAfter[0].total);

        // Display inserted data
        const [syllabusRecords] = await connection.execute(
            'SELECT id, type, title, academic_year FROM cai_syllabus ORDER BY id'
        );
        
        console.log('\n--- Syllabus Records ---');
        syllabusRecords.forEach((record, index) => {
            console.log(`${index + 1}. ${record.title} (${record.type}) - ${record.academic_year}`);
        });

        console.log('\n✓ Seeding completed successfully!');
        console.log('The syllabus section should now display the syllabus data.');

    } catch (error) {
        console.error('Error during seeding:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

seedSyllabusData();