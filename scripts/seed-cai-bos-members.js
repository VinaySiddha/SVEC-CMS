const mysql = require('mysql2/promise');

async function seedBosMembersData() {
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
            'SELECT COUNT(*) as total FROM cai_bos_members WHERE dept = ?',
            ['cseai']
        );
        console.log('BOS members before seeding:', countBefore[0].total);

        // Insert sample data
        const insertQuery = `
            INSERT INTO cai_bos_members (dept, name, designation, organization, position_in_job) VALUES
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
            'cseai', 'Dr. D Jaya Kumari', 'Professor & HOD', 'Dept of CSE, SVEC', 'Chairperson',
            'cseai', 'Dr. A Krishna Mohan', 'Professor of CSE', 'JNTUK, Kakinada', 'University Nominee',
            'cseai', 'Dr. R.B.V Subramaanyam', 'Professor of CSE', 'NITW', 'Academic Expert',
            'cseai', 'Dr. S Pallam Setty', 'Professor of CSE', 'Andhra University', 'Academic Expert',
            'cseai', 'Mr. SrinivasaRaju Vuppalapati', 'Senior Consultant', 'MSR IT Services LLP', 'Industry Expert',
            'cseai', 'Mr. Eedala Rambabu', 'Member of Technical Staff2', 'Amadeus, Bangalore', 'Alumni CSE Dept',
            'cseai', 'Prof. B Vishnuvardhan', 'Associate Professor', 'Dept of CSE, SVEC', 'Faculty Member',
            'cseai', 'Prof. M Srinivas', 'Assistant Professor', 'Dept of CSE, SVEC', 'Faculty Member'
        ];

        await connection.execute(insertQuery, values);
        console.log('✓ Successfully inserted 8 BOS member records');

        // Verify insertion
        const [countAfter] = await connection.execute(
            'SELECT COUNT(*) as total FROM cai_bos_members WHERE dept = ?',
            ['cseai']
        );
        console.log('Total BOS members after seeding:', countAfter[0].total);

        // Display inserted data
        const [members] = await connection.execute(
            'SELECT id, name, designation, organization, position_in_job FROM cai_bos_members WHERE dept = ? ORDER BY id',
            ['cseai']
        );
        
        console.log('\n--- Board of Studies Members ---');
        members.forEach((member, index) => {
            console.log(`${index + 1}. ${member.name}`);
            console.log(`   Designation: ${member.designation}`);
            console.log(`   Organization: ${member.organization}`);
            console.log(`   Position: ${member.position_in_job}`);
        });

        console.log('\n✓ Seeding completed successfully!');
        console.log('The board of studies section should now display the BOS members data.');

    } catch (error) {
        console.error('Error during seeding:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

seedBosMembersData();
