const mysql = require('mysql2/promise');

async function seedCAIBOSMinutes() {
    const connection = await mysql.createConnection({
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    });

    try {
        console.log('Seeding CAI BOS Minutes data...');

        const bosMinutes = [
            { 
                meeting_no: '1st', 
                meeting_date: '2024-03-15', 
                file_url: 'https://example.com/cai-bos-minutes-1.pdf' 
            },
            { 
                meeting_no: '2nd', 
                meeting_date: '2024-06-20', 
                file_url: 'https://example.com/cai-bos-minutes-2.pdf' 
            },
            { 
                meeting_no: '3rd', 
                meeting_date: '2024-09-10', 
                file_url: 'https://example.com/cai-bos-minutes-3.pdf' 
            },
            { 
                meeting_no: '4th', 
                meeting_date: '2024-12-05', 
                file_url: 'https://example.com/cai-bos-minutes-4.pdf' 
            }
        ];

        // Clear existing data
        await connection.execute('DELETE FROM cai_bos_minutes');

        // Insert new data
        for (const minute of bosMinutes) {
            await connection.execute(
                'INSERT INTO cai_bos_minutes (meeting_no, meeting_date, file_url, dept) VALUES (?, ?, ?, ?)',
                [minute.meeting_no, minute.meeting_date, minute.file_url, 'cse-ai']
            );
        }

        console.log(`Successfully seeded ${bosMinutes.length} CAI BOS minutes records`);

        // Verify insertion
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM cai_bos_minutes');
        console.log('Total BOS minutes records in database:', rows[0].count);

    } catch (error) {
        console.error('Error seeding CAI BOS minutes:', error);
    } finally {
        await connection.end();
    }
}

seedCAIBOSMinutes();