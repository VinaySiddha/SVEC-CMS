const mysql = require('mysql2/promise');

async function createEEESyllabusTable() {
  let connection;
  
  try {
    // Database connection
    connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    console.log('✅ Connected to database successfully!');

    // Step 1: Create EEE_Syllabus table
    console.log('\n=== Creating EEE_Syllabus Table ===');
    
    // Check if table exists first
    const [existingTable] = await connection.execute(
      "SHOW TABLES LIKE 'EEE_Syllabus'"
    );

    if (existingTable.length > 0) {
      console.log('⚠️  EEE_Syllabus table already exists. Dropping and recreating...');
      await connection.execute('DROP TABLE EEE_Syllabus');
    }

    // Create the new table
    await connection.execute(`
      CREATE TABLE EEE_Syllabus (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        document_url VARCHAR(255) NOT NULL,
        type ENUM('btech', 'mtech', 'diploma') NOT NULL DEFAULT 'btech',
        academic_year VARCHAR(16) NOT NULL,
        semester VARCHAR(20) NULL,
        regulation VARCHAR(20) NULL,
        program VARCHAR(100) NULL,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        INDEX idx_type (type),
        INDEX idx_regulation (regulation),
        INDEX idx_semester (semester),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('✅ EEE_Syllabus table created successfully');

    // Step 2: Migrate data from syllabus_documents table
    console.log('\n=== Migrating EEE Syllabus Data ===');
    
    // Fetch EEE data from syllabus_documents
    const [eeeData] = await connection.execute(`
      SELECT 
        title,
        description,
        document_url,
        type,
        academic_year,
        semester,
        regulation,
        created_at,
        updated_at
      FROM syllabus_documents 
      WHERE dept = 'EEE' AND status = 'approved'
      ORDER BY regulation DESC, type, semester
    `);

    console.log(`Found ${eeeData.length} EEE syllabus records to migrate`);

    if (eeeData.length > 0) {
      // Insert data into new table
      const insertQuery = `
        INSERT INTO EEE_Syllabus 
        (title, description, document_url, type, academic_year, semester, regulation, program, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)
      `;

      let migratedCount = 0;
      for (const record of eeeData) {
        // Determine program based on type and title
        let program = null;
        if (record.type === 'mtech') {
          if (record.title.includes('Power Systems')) {
            program = 'Power Systems';
          } else if (record.title.includes('Power Electronics')) {
            program = 'Power Electronics';
          }
        } else if (record.type === 'btech') {
          program = 'Electrical and Electronics Engineering';
        }

        await connection.execute(insertQuery, [
          record.title,
          record.description,
          record.document_url,
          record.type,
          record.academic_year,
          record.semester,
          record.regulation,
          program,
          record.created_at,
          record.updated_at
        ]);
        
        migratedCount++;
        console.log(`✅ Migrated: ${record.title}`);
      }

      console.log(`\n🎉 Successfully migrated ${migratedCount} records to EEE_Syllabus table`);
    }

    // Step 3: Verify migration
    console.log('\n=== Verifying Migration ===');
    const [verifyCount] = await connection.execute('SELECT COUNT(*) as count FROM EEE_Syllabus');
    console.log(`Total records in EEE_Syllabus: ${verifyCount[0].count}`);

    // Show breakdown by type and regulation
    const [breakdown] = await connection.execute(`
      SELECT type, regulation, COUNT(*) as count 
      FROM EEE_Syllabus 
      GROUP BY type, regulation 
      ORDER BY regulation DESC, type
    `);
    
    console.log('\nBreakdown by Type and Regulation:');
    breakdown.forEach(row => {
      console.log(`- ${row.type.toUpperCase()} ${row.regulation}: ${row.count} documents`);
    });

    // Show M.Tech programs
    const [mtechPrograms] = await connection.execute(`
      SELECT program, COUNT(*) as count 
      FROM EEE_Syllabus 
      WHERE type = 'mtech' 
      GROUP BY program
    `);
    
    if (mtechPrograms.length > 0) {
      console.log('\nM.Tech Programs:');
      mtechPrograms.forEach(row => {
        console.log(`- ${row.program}: ${row.count} documents`);
      });
    }

    console.log('\n🎉 EEE_Syllabus table creation and migration completed successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed.');
    }
  }
}

// Run the migration
createEEESyllabusTable().catch(console.error);