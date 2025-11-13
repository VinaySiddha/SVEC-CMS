const mysql = require('mysql2/promise');

async function addPlacementGalleryTable() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'svecedu'
    });

    console.log('Connected to database');

    // Create placement_gallery table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS placement_gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(100) NOT NULL DEFAULT 'placement',
        title VARCHAR(255) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        caption TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL,
        INDEX idx_dept (dept),
        INDEX idx_created_at (created_at),
        INDEX idx_deleted (deleted_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ Created placement_gallery table');

    console.log('\n✓ Placement gallery table created successfully!');
    await connection.end();
    process.exit(0);

  } catch (error) {
    console.error('Migration error:', error);
    if (connection) await connection.end();
    process.exit(1);
  }
}

addPlacementGalleryTable();