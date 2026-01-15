const mysql = require('mysql2/promise');

async function checkDatabase() {
    const dbConfig = {
        host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
    };
    
    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // Check if users table exists
        console.log('Checking users table...');
        const [tables] = await connection.execute(`SHOW TABLES LIKE 'users'`);
        console.log('Users table exists:', tables.length > 0);
        
        if (tables.length > 0) {
            // Check admin users
            const [users] = await connection.execute(`
                SELECT id, email, role, status, is_active 
                FROM users 
                WHERE role IN ('admin', 'super_admin') 
                LIMIT 5
            `);
            console.log('Admin users found:', users.length);
            users.forEach(user => {
                console.log(`- ID: ${user.id}, Email: ${user.email}, Role: ${user.role}, Status: ${user.status}, Active: ${user.is_active}`);
            });
            
            // Check specific admin user
            const [adminUser] = await connection.execute(`
                SELECT id, email, role, status, is_active 
                FROM users 
                WHERE email = 'admin@svec.education'
            `);
            console.log('\nSpecific admin@svec.education user:', adminUser.length > 0 ? adminUser[0] : 'Not found');
        }
        
        // Check AIML tables
        console.log('\nChecking AIML tables...');
        const [aimlTables] = await connection.execute(`SHOW TABLES LIKE 'aiml_%'`);
        console.log('AIML tables found:', aimlTables.length);
        aimlTables.slice(0, 5).forEach(table => {
            console.log(`- ${table[Object.keys(table)[0]]}`);
        });
        
        await connection.end();
        
    } catch (error) {
        console.error('Database check error:', error.message);
    }
}

checkDatabase();