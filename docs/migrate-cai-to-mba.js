#!/usr/bin/env node

/**
 * Migration Script: Copy CAI Tables to MBA Tables
 * This script removes all existing MBA tables and creates new ones based on CAI table structures
 * 
 * Usage: node migrate-cai-to-mba.js
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || '62.72.31.209',
  user: process.env.DB_USER || 'cmsuser',
  password: process.env.DB_PASSWORD || 'V@savi@2001',
  database: process.env.DB_NAME || 'svec_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// List of tables to migrate from CAI to MBA
const tablesToMigrate = [
  'workshops',
  'faculty',
  'technical_faculty',
  'technical_association',
  'non_teaching_faculty',
  'academictoppers',
  'faculty_achievements',
  'faculty_development_programs',
  'placements',
  'hackathons_gallery',
  'bos_members',
  'bos_minutes',
  'eresources',
  'hackathons',
  'newsletters',
  'merit_scholarships',
  'mous',
  'syllabus',
  'student_achievements',
  'extracurricular_activities',
  'department_overview',
  'handbooks',
  'department_library'
];

async function main() {
  let connection;
  try {
    console.log('🚀 Starting CAI to MBA Table Migration...');
    console.log(`📊 Database: ${dbConfig.database}`);
    console.log(`🔗 Host: ${dbConfig.host}`);
    console.log('');

    // Create connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');
    console.log('');

    // Step 1: Drop all existing MBA tables
    console.log('📋 Step 1: Dropping existing MBA tables...');
    for (const table of tablesToMigrate) {
      const mbaTable = `mba_${table}`;
      try {
        await connection.execute(`DROP TABLE IF EXISTS \`${mbaTable}\``);
        console.log(`  ✓ Dropped ${mbaTable}`);
      } catch (error) {
        console.log(`  ⚠ Could not drop ${mbaTable}: ${error.message}`);
      }
    }
    console.log('');

    // Step 2: Create MBA tables as copies of CAI tables
    console.log('📋 Step 2: Creating MBA tables from CAI table structures...');
    let successCount = 0;
    let failureCount = 0;

    for (const table of tablesToMigrate) {
      const caiTable = `cai_${table}`;
      const mbaTable = `mba_${table}`;
      
      try {
        // Check if CAI table exists
        const [tables] = await connection.execute(
          `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
          [dbConfig.database, caiTable]
        );

        if (tables.length > 0) {
          // Create MBA table structure like CAI table
          await connection.execute(`CREATE TABLE IF NOT EXISTS \`${mbaTable}\` LIKE \`${caiTable}\``);
          console.log(`  ✓ Created ${mbaTable} (from ${caiTable})`);
          successCount++;
        } else {
          console.log(`  ⚠ CAI table ${caiTable} not found, skipping`);
          failureCount++;
        }
      } catch (error) {
        console.log(`  ❌ Error creating ${mbaTable}: ${error.message}`);
        failureCount++;
      }
    }
    console.log('');

    // Step 3: Verification
    console.log('📋 Step 3: Verification...');
    const [mbaTableCount] = await connection.execute(
      `SELECT COUNT(*) as count FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME LIKE 'mba_%'`,
      [dbConfig.database]
    );
    const totalMbaTables = mbaTableCount[0].count;
    console.log(`  📊 Total MBA tables created: ${totalMbaTables}`);
    console.log('');

    // List all created MBA tables
    console.log('📋 Created MBA Tables:');
    const [mbaTables] = await connection.execute(
      `SELECT TABLE_NAME, TABLE_ROWS, 
              ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS size_mb
       FROM information_schema.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME LIKE 'mba_%'
       ORDER BY TABLE_NAME`,
      [dbConfig.database]
    );

    mbaTables.forEach((table, index) => {
      console.log(`  ${index + 1}. ${table.TABLE_NAME} (Rows: ${table.TABLE_ROWS || 0}, Size: ${table.size_mb} MB)`);
    });
    console.log('');

    // Summary
    console.log('✅ Migration Complete!');
    console.log(`   ✓ Successfully created: ${successCount} tables`);
    if (failureCount > 0) {
      console.log(`   ⚠ Skipped/Failed: ${failureCount} tables`);
    }
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Verify all MBA tables are created correctly');
    console.log('   2. Update module-fields.ts configuration if needed');
    console.log('   3. Test admin dashboard with MBA department');
    console.log('');

    await connection.end();
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run migration
main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
