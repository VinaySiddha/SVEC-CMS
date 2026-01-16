/**
 * Migration: Create Board of Studies Table
 * 
 * This migration adds the board_of_studies table for storing BoS documents and information.
 */

import { query } from '@/lib/db';

export async function migrate() {
  
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
    
    return true;
  } catch (error) {
    return false;
  }
}

export async function rollback() {
  
  try {
    await query('DROP TABLE IF EXISTS board_of_studies');
    return true;
  } catch (error) {
    return false;
  }
}
