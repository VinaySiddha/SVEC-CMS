const mysql = require('mysql2/promise');

async function seedCAIStaff() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Seeding CAI Non-Teaching Staff data...');

        const nonTeachingStaff = [
            { name: 'Mr. K. Venkat Rao', designation: 'Office Assistant' },
            { name: 'Ms. L. Madhavi', designation: 'Administrative Assistant' },
            { name: 'Mr. M. Suresh', designation: 'Clerical Assistant' },
            { name: 'Ms. N. Sailaja', designation: 'Data Entry Operator' },
            { name: 'Mr. O. Ramesh', designation: 'Office Attendant' },
            { name: 'Ms. P. Kavitha', designation: 'Record Keeper' }
        ];

        // Clear existing data
        await connection.execute('DELETE FROM cai_staff');

        // Insert new data
        for (const staff of nonTeachingStaff) {
            await connection.execute(
                'INSERT INTO cai_staff (name, designation) VALUES (?, ?)',
                [staff.name, staff.designation]
            );
        }

        console.log(`Successfully seeded ${nonTeachingStaff.length} CAI non-teaching staff records`);

        // Verify insertion
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM cai_staff');
        console.log('Total non-teaching staff records in database:', rows[0].count);

    } catch (error) {
        console.error('Error seeding CAI staff:', error);
    } finally {
        await connection.end();
    }
}

seedCAIStaff();