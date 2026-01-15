const mysql = require('mysql2/promise');

async function seedCAITechnicalFaculty() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Seeding CAI Technical Faculty data...');

        const technicalFaculty = [
            { name: 'Mr. A. Ravi Kumar', designation: 'Lab Assistant' },
            { name: 'Mr. B. Srinivas', designation: 'Technical Assistant' },
            { name: 'Ms. C. Lakshmi', designation: 'Lab Technician' },
            { name: 'Mr. D. Prasad', designation: 'Technical Support' },
            { name: 'Ms. E. Priya', designation: 'Lab Assistant' }
        ];

        // Clear existing data
        await connection.execute('DELETE FROM cai_technical_faculty');

        // Insert new data
        for (const faculty of technicalFaculty) {
            await connection.execute(
                'INSERT INTO cai_technical_faculty (name, designation) VALUES (?, ?)',
                [faculty.name, faculty.designation]
            );
        }

        console.log(`Successfully seeded ${technicalFaculty.length} CAI technical faculty records`);

        // Verify insertion
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM cai_technical_faculty');
        console.log('Total technical faculty records in database:', rows[0].count);

    } catch (error) {
        console.error('Error seeding CAI technical faculty:', error);
    } finally {
        await connection.end();
    }
}

seedCAITechnicalFaculty();