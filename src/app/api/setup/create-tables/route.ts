import { NextRequest, NextResponse } from 'next/server';
import { execute } from '@/lib/db';
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to create necessary tables
 * GET /api/setup/create-tables
 */
export async function GET(req: NextRequest) {
  try {
    // Create syllabus_documents table
    await execute(`
      CREATE TABLE IF NOT EXISTS syllabus_documents (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        file_url VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'btech',
        academic_year VARCHAR(10) NOT NULL,
        semester VARCHAR(10) NULL,
        regulation VARCHAR(10) NULL,
        department VARCHAR(50) NOT NULL,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        INDEX idx_department (department),
        INDEX idx_type (type),
        INDEX idx_academic_year (academic_year),
        INDEX fk_syllabus_created_by_idx (created_by),
        CONSTRAINT fk_syllabus_created_by
          FOREIGN KEY (created_by)
          REFERENCES users (id)
          ON DELETE NO ACTION
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    // Create student_research table
    await execute(`
      CREATE TABLE IF NOT EXISTS student_research (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        students JSON NOT NULL,
        supervisor VARCHAR(100) NULL,
        research_type VARCHAR(50) NOT NULL,
        academic_year VARCHAR(10) NOT NULL,
        publication_link VARCHAR(255) NULL,
        thumbnail_url VARCHAR(255) NULL,
        status ENUM('ongoing', 'completed', 'published') NOT NULL DEFAULT 'ongoing',
        department VARCHAR(50) NOT NULL,
        is_featured BOOLEAN NOT NULL DEFAULT FALSE,
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_by BIGINT UNSIGNED NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        INDEX idx_department (department),
        INDEX idx_research_type (research_type),
        INDEX idx_academic_year (academic_year),
        INDEX idx_status (status),
        INDEX fk_research_created_by_idx (created_by),
        CONSTRAINT fk_research_created_by
          FOREIGN KEY (created_by)
          REFERENCES users (id)
          ON DELETE NO ACTION
          ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Tables created successfully'
    });
  } catch (error) {
    console.error('Error creating tables:', error);
    return NextResponse.json(
      { error: 'Failed to create tables', details: (error as Error).message },
      { status: 500 }
    );
  }
}
