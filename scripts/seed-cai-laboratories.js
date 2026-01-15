const mysql = require('mysql2/promise');

async function seedCAILaboratories() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Creating CAI Laboratory data...');

        // Clear existing CAI lab data
        await connection.execute('DELETE FROM laboratories WHERE dept = ?', ['cse-ai']);

        // Insert laboratory data matching the image format
        const labConfigurations1 = [
            {
                name: 'Linus Torvalds Lab',
                model: 'HP 280PRO G9 Micro Tower',
                processor: 'Intel core TM i3-10100 CPU@3.64 GHZ',
                ram: '8.00 GB RAM',
                storage: '256.00 GB SSD',
                system_type: 'x64 – based Processor',
                monitor: '19.5" LED Monitor',
                keyboard: 'Multimedia Keyboard',
                mouse: 'Optical Mouse'
            }
        ];

        const labConfigurations2 = [
            {
                name: 'Linus Torvalds Lab',
                model: 'ACER Vertion Desktop',
                processor: 'Intel® Core™ i5-7400 CPU @ 3.00 GHz',
                ram: '4.00 GB RAM',
                storage: '1.00 TB HDD',
                system_type: 'x64 – based Processor',
                monitor: '19.5" LED Monitor',
                keyboard: 'Multimedia Keyboard',
                mouse: 'Optical Mouse'
            }
        ];

        // Insert first lab entry
        await connection.execute(
            'INSERT INTO laboratories (dept, lab_name, lab_code, configurations, capacity, `usage`, location, incharge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            ['cse-ai', 'Linus Torvalds Lab', 'CAI-LAB-01', JSON.stringify(labConfigurations1), 70, 'Programming and Software Development', 'Block A, 2nd Floor', 'Dr. AI Faculty']
        );

        // Insert second lab entry
        await connection.execute(
            'INSERT INTO laboratories (dept, lab_name, lab_code, configurations, capacity, `usage`, location, incharge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            ['cse-ai', 'Linus Torvalds Lab', 'CAI-LAB-02', JSON.stringify(labConfigurations2), 2, 'Advanced Computing', 'Block A, 2nd Floor', 'Dr. AI Faculty']
        );

        console.log('Successfully seeded CAI laboratory data');

        // Verify insertion
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM laboratories WHERE dept = ?', ['cse-ai']);
        console.log('Total CAI laboratory records:', rows[0].count);

    } catch (error) {
        console.error('Error seeding CAI laboratories:', error);
    } finally {
        await connection.end();
    }
}

seedCAILaboratories();