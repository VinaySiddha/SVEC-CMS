// Migration: Create college_placement_profiles table with enhanced fields
const db = require('../src/lib/db');

async function migrate() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS college_placement_profiles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      college_id INT NOT NULL,
      
      -- Personal Information
      first_name VARCHAR(64) NOT NULL,
      last_name VARCHAR(64) NOT NULL,
      designation VARCHAR(128) NOT NULL,
      department VARCHAR(128),
      bio TEXT,
      profile_photo VARCHAR(256),
      
      -- Contact Information
      contact_email VARCHAR(128) NOT NULL,
      contact_phone VARCHAR(32) NOT NULL,
      office_phone VARCHAR(32),
      office_extension VARCHAR(16),
      
      -- Office Address
      office_address TEXT,
      office_room_number VARCHAR(32),
      
      -- Social Media & Web
      linkedin_url VARCHAR(256),
      twitter_url VARCHAR(256),
      facebook_url VARCHAR(256),
      website_url VARCHAR(256),
      
      -- Professional Information
      experience_years INT,
      qualifications TEXT,
      specialization VARCHAR(256),
      research_interests TEXT,
      
      -- Achievement & Stats
      students_placed INT DEFAULT 0,
      average_placement_package DECIMAL(10, 2),
      highest_package DECIMAL(10, 2),
      companies_collaborated INT DEFAULT 0,
      achievements TEXT,
      awards TEXT,
      publications TEXT,
      
      -- Status & Metadata
      is_active BOOLEAN DEFAULT true,
      join_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      
      FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
      INDEX idx_college_id (college_id),
      INDEX idx_email (contact_email),
      INDEX idx_is_active (is_active)
    );
  `);
  console.log('✓ Created college_placement_profiles table with enhanced fields');
}

migrate().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
