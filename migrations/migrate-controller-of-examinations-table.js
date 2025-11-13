const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function migrateControllerOfExaminationsTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Start transaction
    await connection.beginTransaction();

    // Create Controller of Examinations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS controller_of_examinations (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        designation VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        photo_url VARCHAR(500),
        bio LONGTEXT,
        email VARCHAR(255),
        phone VARCHAR(20),
        office_address TEXT,
        qualifications TEXT,
        experience TEXT,
        research_interests TEXT,
        publications LONGTEXT,
        profile_url VARCHAR(500),
        social_media_links JSON,
        is_active BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME DEFAULT NULL,
        PRIMARY KEY (id),
        INDEX idx_deleted_at (deleted_at),
        INDEX idx_is_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('Controller of Examinations table created successfully');

    // Commit transaction
    await connection.commit();
    console.log('Migration completed successfully!');

  } catch (error) {
    console.error('Migration failed:', error);
    if (connection) {
      await connection.rollback();
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the migration
migrateControllerOfExaminationsTable();
