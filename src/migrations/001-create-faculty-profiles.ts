/**
 * Migration: Create Faculty Profiles Table
 * 
 * This migration adds the faculty_profiles table for storing faculty information.
 */

import { query } from '@/lib/db';

export async function migrate() {
  
  try {
    // Create faculty_profiles table
    await query(`
      CREATE TABLE IF NOT EXISTS faculty_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        qualification VARCHAR(100) NULL,
        designation VARCHAR(100) NULL,
        email VARCHAR(100) NULL,
        phone VARCHAR(20) NULL,
        bio TEXT NULL,
        research_interests TEXT NULL,
        profile_url VARCHAR(255) NULL,
        joining_date DATE NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    return true;
  } catch (error) {
    return false;
  }
}

export async function rollback() {
  
  try {
    await query('DROP TABLE IF EXISTS faculty_profiles');
    return true;
  } catch (error) {
    return false;
  }
}
