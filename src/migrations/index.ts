/**
 * Migration Runner
 * 
 * This script runs all migrations in order to set up or update the database schema.
 */

import { closePool } from '@/lib/db';
import * as createFacultyProfiles from './001-create-faculty-profiles';
import * as createBoardOfStudies from './002-create-board-of-studies';
import * as createSyllabusDocuments from './003-create-syllabus-documents';

// List all migrations in order
const migrations = [
  createFacultyProfiles,
  createBoardOfStudies,
  createSyllabusDocuments
];

/**
 * Run all migrations in sequence
 */
async function runMigrations() {
  
  let success = true;
  
  for (let i = 0; i < migrations.length; i++) {
    const migration = migrations[i];
    
    
    const result = await migration.migrate();
    
    if (!result) {
      success = false;
      break;
    }
  }
  
  if (success) {
  } else {
  }
  
  // Close database connection
  await closePool();
  
  return success;
}

/**
 * Rollback all migrations in reverse order
 */
async function rollbackMigrations() {
  
  let success = true;
  
  for (let i = migrations.length - 1; i >= 0; i--) {
    const migration = migrations[i];
    
    
    const result = await migration.rollback();
    
    if (!result) {
      success = false;
      break;
    }
  }
  
  if (success) {
  } else {
  }
  
  // Close database connection
  await closePool();
  
  return success;
}

/**
 * Execute the migrations if this script is run directly
 */
if (require.main === module) {
  const action = process.argv[2]?.toLowerCase();
  
  if (action === 'rollback') {
    rollbackMigrations()
      .then(success => process.exit(success ? 0 : 1))
      .catch(error => {
        process.exit(1);
      });
  } else {
    runMigrations()
      .then(success => process.exit(success ? 0 : 1))
      .catch(error => {
        process.exit(1);
      });
  }
}

export { runMigrations, rollbackMigrations };
