const mysql = require('mysql2/promise');

async function setupTables() {
  const dbConfig = {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms',
    port: Number(process.env.MYSQL_PORT) || 3306,
  };

  console.log('📋 SVEC-CMS Tables Setup');
  console.log('=========================\n');

  try {
    console.log('🔗 Connecting to database...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected!\n');

    // Read SQL files
    const fs = require('fs');
    const path = require('path');
    
    const sqlFiles = [
      'create_updated_regulations_table.sql',
      'create_updated_syllabus_table.sql',
      'create_updated_academic_calendars_table.sql'
    ];

    for (const file of sqlFiles) {
      console.log(`📦 Processing ${file}...`);
      const sqlPath = path.join(process.cwd(), 'sql', file);
      const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
      
      // Split by semicolon and execute each statement
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      for (const statement of statements) {
        try {
          await connection.execute(statement);
          console.log('  ✅', statement.substring(0, 50) + '...');
        } catch (err) {
          if (err.message.includes('already exists') || err.message.includes('Duplicate key name')) {
            console.log('  ℹ️  Already exists:', statement.substring(0, 50) + '...');
          } else {
            throw err;
          }
        }
      }
    }

    // Verify the tables
    const tables = ['regulations', 'syllabus', 'academic_calendars'];
    for (const table of tables) {
      const [structure] = await connection.execute(`DESCRIBE ${table}`);
      console.log(`\n📋 ${table} Table Structure:`);
      console.table(structure);
    }

    await connection.end();
    console.log('\n🎉 Setup complete! Tables are ready to use.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupTables();