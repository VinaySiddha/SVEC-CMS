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
  console.log('Starting database migrations...');
  
  let success = true;
  
  for (let i = 0; i < migrations.length; i++) {
    const migration = migrations[i];
    
    console.log(`Running migration ${i + 1} of ${migrations.length}...`);
    
    const result = await migration.migrate();
    
    if (!result) {
      console.error(`Migration ${i + 1} failed. Stopping.`);
      success = false;
      break;
    }
  }
  
  if (success) {
    console.log('All migrations completed successfully!');
  } else {
    console.error('Migration process failed.');
  }
  
  // Close database connection
  await closePool();
  
  return success;
}

/**
 * Rollback all migrations in reverse order
 */
async function rollbackMigrations() {
  console.log('Rolling back all migrations...');
  
  let success = true;
  
  for (let i = migrations.length - 1; i >= 0; i--) {
    const migration = migrations[i];
    
    console.log(`Rolling back migration ${i + 1}...`);
    
    const result = await migration.rollback();
    
    if (!result) {
      console.error(`Rollback of migration ${i + 1} failed. Stopping.`);
      success = false;
      break;
    }
  }
  
  if (success) {
    console.log('All migrations rolled back successfully!');
  } else {
    console.error('Rollback process failed.');
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
        console.error('Unhandled error during rollback:', error);
        process.exit(1);
      });
  } else {
    runMigrations()
      .then(success => process.exit(success ? 0 : 1))
      .catch(error => {
        console.error('Unhandled error during migration:', error);
        process.exit(1);
      });
  }
}

export { runMigrations, rollbackMigrations };
