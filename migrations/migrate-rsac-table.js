const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  ssl: { rejectUnauthorized: false }
};

async function migrateRSACTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database successfully');

    // Start transaction
    await connection.beginTransaction();

    // Create RSAC table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS rsac_items (
        id INT NOT NULL AUTO_INCREMENT,
        date DATE NOT NULL,
        content TEXT NOT NULL,
        link VARCHAR(255) NOT NULL,
        degree ENUM('UG', 'PG') NOT NULL,
        type ENUM('syllabus', 'regulations', 'academic-calendar') NOT NULL,
        posted_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        deleted_at DATETIME DEFAULT NULL,
        PRIMARY KEY (id),
        INDEX idx_type (type),
        INDEX idx_degree (degree),
        INDEX idx_deleted_at (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('RSAC table created successfully');

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
migrateRSACTable();