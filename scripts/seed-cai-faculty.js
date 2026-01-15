const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function seedFacultyData() {
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
            'SELECT COUNT(*) as total FROM cai_faculty'
        );
        console.log('Faculty records before seeding:', countBefore[0].total);

        // Insert sample data
        const insertQuery = `
            INSERT INTO cai_faculty (name, qualification, designation, profileUrl) VALUES
            ('Dr. D Jaya Kumari', 'Ph.D', 'Professor & HOD', '#'),
            ('Dr. A Krishna Mohan', 'Ph.D', 'Professor', '#'),
            ('Dr. R.B.V Subramaanyam', 'Ph.D', 'Associate Professor', '#'),
            ('Dr. S Pallam Setty', 'Ph.D', 'Associate Professor', '#'),
            ('Prof. B Vishnuvardhan', 'M.Tech', 'Associate Professor', '#'),
            ('Prof. M Srinivas', 'M.Tech', 'Assistant Professor', '#'),
            ('Dr. P Srinivasa Rao', 'Ph.D', 'Associate Professor', '#'),
            ('Prof. M Sowjanya', 'M.Tech', 'Assistant Professor', '#'),
            ('Prof. K Rajesh', 'M.Tech', 'Assistant Professor', '#'),
            ('Prof. G Praveen Kumar', 'M.Tech', 'Assistant Professor', '#')
        `;

        await connection.execute(insertQuery);
        console.log('✓ Successfully inserted 10 faculty records');

        // Verify insertion
        const [countAfter] = await connection.execute(
            'SELECT COUNT(*) as total FROM cai_faculty'
        );
        console.log('Total faculty records after seeding:', countAfter[0].total);

        // Display inserted data
        const [faculty] = await connection.execute(
            'SELECT id, name, designation, qualification FROM cai_faculty ORDER BY id'
        );
        
        console.log('\n--- Inserted Faculty Members ---');
        faculty.forEach((member, index) => {
            console.log(`${index + 1}. ${member.name} - ${member.designation}`);
        });

        console.log('\n✓ Seeding completed successfully!');
        console.log('The teaching faculty section should now display the faculty data.');

    } catch (error) {
        console.error('Error during seeding:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

seedFacultyData();
