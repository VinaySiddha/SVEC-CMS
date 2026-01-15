#!/usr/bin/env node

/**
 * Quick setup script for regulations table
 * Run with: node setup-regulations.js
 * Or: npm run setup:regulations (if added to package.json)
 */

const mysql = require('mysql2/promise');

async function setupRegulations() {
  const dbConfig = {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms',
    port: Number(process.env.MYSQL_PORT) || 3306,
  };

  console.log('📋 SVEC-CMS Regulations Table Setup');
  console.log('=====================================\n');

  try {
    console.log('🔗 Connecting to database...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected!\n');

    // SQL statements to create the table
    const statements = [
      `CREATE TABLE IF NOT EXISTS regulations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        year VARCHAR(4) NOT NULL,
        type ENUM('B.Tech', 'M.Tech', 'M.B.A', 'M.C.A', 'Diploma') NOT NULL,
        document_url VARCHAR(512),
        academic_year VARCHAR(9) NOT NULL,
        effective_from DATE NOT NULL,
        is_current BOOLEAN DEFAULT FALSE,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        remarks TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      )`,
      `CREATE INDEX idx_regulations_type ON regulations(type)`,
      `CREATE INDEX idx_regulations_year ON regulations(year)`,
      `CREATE INDEX idx_regulations_status ON regulations(status)`,
      `CREATE INDEX idx_regulations_is_current ON regulations(is_current)`,
    ];

    console.log('📊 Creating regulations table...');
    for (const statement of statements) {
      try {
        await connection.execute(statement);
        console.log('  ✅', statement.substring(0, 50) + '...');
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log('  ℹ️  Already exists:', statement.substring(0, 50) + '...');
        } else {
          throw err;
        }
      }
    }

    console.log('\n✅ Regulations table setup completed successfully!');

    // Verify the table
    const [tables] = await connection.execute('DESCRIBE regulations');
    console.log('\n📋 Table structure:');
    console.table(tables);

    await connection.end();
    console.log('\n🎉 Setup complete! You can now use the regulations module.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupRegulations();
