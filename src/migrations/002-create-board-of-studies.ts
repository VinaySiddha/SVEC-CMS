/**
 * Migration: Create Board of Studies Table
 * 
 * This migration adds the board_of_studies table for storing BoS documents and information.
 */

import { query } from '@/lib/db';

export async function migrate() {
  console.log('Running migration: Create board_of_studies table');
  
  try {
    // Create board_of_studies table
    await query(`
      CREATE TABLE IF NOT EXISTS board_of_studies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        document_url VARCHAR(255) NULL,
        academic_year VARCHAR(16) NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Successfully created board_of_studies table');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}

export async function rollback() {
  console.log('Rolling back migration: Create board_of_studies table');
  
  try {
    await query('DROP TABLE IF EXISTS board_of_studies');
    console.log('Successfully rolled back board_of_studies table creation');
    return true;
  } catch (error) {
    console.error('Rollback failed:', error);
    return false;
  }
}
