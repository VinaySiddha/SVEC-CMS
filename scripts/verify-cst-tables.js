const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkCSTTables() {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connection successful');
    
    // List of expected CST tables
    const expectedTables = [
      'cst_faculty',
      'cst_technical_faculty', 
      'cst_non_teaching_faculty',
      'cst_student_achievements',
      'cst_faculty_achievements',
      'cst_placements',
      'cst_handbooks',
      'cst_eresources',
      'cst_syllabus',
      'cst_newsletters',
      'cst_physical_facilities',
      'cst_department_library',
      'cst_department_overview',
      'cst_bos_members',
      'cst_bos_minutes',
      'cst_extra_curricular',
      'cst_scud_activities',
      'cst_training_activities',
      'cst_faculty_development',
      'cst_hackathons',
      'cst_merit_scholarships',
      'cst_mous',
      'cst_industry_programs',
      'cst_sahaya_events'
    ];
    
    // Check which tables exist
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'cst_%'"
    );
    
    const existingTables = tables.map(row => Object.values(row)[0]);
    console.log('\n📊 CST Tables Status:');
    
    let existingCount = 0;
    let missingCount = 0;
    
    expectedTables.forEach(tableName => {
      if (existingTables.includes(tableName)) {
        console.log(`✅ ${tableName} - EXISTS`);
        existingCount++;
      } else {
        console.log(`❌ ${tableName} - MISSING`);
        missingCount++;
      }
    });
    
    // Check for any extra CST tables not in our list
    const extraTables = existingTables.filter(table => !expectedTables.includes(table));
    if (extraTables.length > 0) {
      console.log('\n📋 Additional CST tables found:');
      extraTables.forEach(table => {
        console.log(`🔍 ${table}`);
      });
    }
    
    // Summary
    console.log('\n📈 Summary:');
    console.log(`✅ Existing tables: ${existingCount}`);
    console.log(`❌ Missing tables: ${missingCount}`);
    console.log(`🔍 Extra tables: ${extraTables.length}`);
    
    // Test sample data from key tables
    console.log('\n🔍 Sample Data Check:');
    
    const testTables = ['cst_faculty', 'cst_student_achievements', 'cst_placements'];
    
    for (const tableName of testTables) {
      if (existingTables.includes(tableName)) {
        try {
          const [rows] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName}`);
          const count = rows[0].count;
          console.log(`📊 ${tableName}: ${count} records`);
          
          if (count > 0) {
            const [sample] = await connection.execute(`SELECT * FROM ${tableName} LIMIT 1`);
            console.log(`   Sample columns: ${Object.keys(sample[0]).join(', ')}`);
          }
        } catch (err) {
          console.log(`❌ ${tableName}: Error accessing table - ${err.message}`);
        }
      }
    }
    
    // Test admin user
    console.log('\n👤 CST Admin User Check:');
    try {
      const [users] = await connection.execute(
        "SELECT username, email, department, role, is_active FROM users WHERE department = 'cst' OR username = 'cst_admin'"
      );
      
      if (users.length > 0) {
        users.forEach(user => {
          console.log(`✅ User: ${user.username} (${user.email}) - Role: ${user.role} - Dept: ${user.department} - Active: ${user.is_active}`);
        });
      } else {
        console.log('❌ No CST admin users found');
      }
    } catch (err) {
      console.log(`❌ Error checking admin users: ${err.message}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the check
console.log('🚀 Starting CST Database Table Verification...\n');
checkCSTTables().then(() => {
  console.log('\n✅ Verification complete!');
  process.exit(0);
}).catch(error => {
  console.error('💥 Verification failed:', error);
  process.exit(1);
});