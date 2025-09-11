/**
 * Migration: Create Syllabus Documents Table
 * 
 * This migration adds the syllabus_documents table for storing various syllabus and curriculum documents.
 */

import { query } from '@/lib/db';

export async function migrate() {
  console.log('Running migration: Create syllabus_documents table');
  
  try {
    // Create syllabus_documents table
    await query(`
      CREATE TABLE IF NOT EXISTS syllabus_documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        dept VARCHAR(50) NOT NULL,
        type ENUM('btech', 'mtech', 'soc', 'mba', 'syllabus') NOT NULL,
        description TEXT NOT NULL,
        document_url VARCHAR(255) NULL,
        academic_year VARCHAR(16) NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending' NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('Successfully created syllabus_documents table');
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    return false;
  }
}

export async function rollback() {
  console.log('Rolling back migration: Create syllabus_documents table');
  
  try {
    await query('DROP TABLE IF EXISTS syllabus_documents');
    console.log('Successfully rolled back syllabus_documents table creation');
    return true;
  } catch (error) {
    console.error('Rollback failed:', error);
    return false;
  }
}
