const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to prompt user input
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Helper function to prompt password (hidden input)
function questionPassword(prompt) {
  return new Promise((resolve) => {
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    process.stdin.on('data', function(ch) {
      ch = ch + '';
      
      switch(ch) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f': // backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += ch;
          process.stdout.write('*');
          break;
      }
    });
  });
}

async function setupDatabase() {
  console.log('🚀 SVEC CMS Database Setup');
  console.log('==========================\n');

  const dbName = 'cmsuser';
  const dbHost = '62.72.31.209';
  const dbPort = 3306;

  console.log('📋 This script will:');
  console.log(`1. Create the database: ${dbName}`);
  console.log('2. Import the schema');
  console.log('3. Create sample department users\n');

  try {
    // Get MySQL credentials
    const mysqlUser = await question('📝 Enter MySQL root username (default: root): ') || 'root';
    const mysqlPassword = await questionPassword('🔒 Enter MySQL root password: ');

    console.log('🔍 Testing MySQL connection...');

    // Create connection
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: mysqlUser,
      password: mysqlPassword,
    });

    console.log('✅ MySQL connection successful!');

    // Create database
    console.log(`📊 Creating database: ${dbName}`);
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    // Use the database
    await connection.execute(`USE ${dbName}`);

    // Import schema
    console.log('📄 Importing schema...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error('schema.sql file not found');
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
      }
    }

    console.log('✅ Schema imported successfully!');

    // Create sample users
    console.log('👥 Creating sample department users...');

    const departments = [
      { code: 'cse', name: 'Computer Science and Engineering' },
      { code: 'ece', name: 'Electronics and Communication Engineering' },
      { code: 'eee', name: 'Electrical and Electronics Engineering' },
      { code: 'civil', name: 'Civil Engineering' },
      { code: 'mech', name: 'Mechanical Engineering' },
      { code: 'mba', name: 'Master of Business Administration' },
    ];

    // Create department users
    for (const dept of departments) {
      const password = `svec${dept.code}123`;
      const hashedPassword = await bcrypt.hash(password, 12);
      
      console.log(`Creating user for ${dept.name}...`);
      
      try {
        await connection.execute(`
          INSERT INTO users (username, email, password_hash, department, department_name, role) 
          VALUES (?, ?, ?, ?, ?, ?)
        `, [`${dept.code}_admin`, `${dept.code}@svecw.edu.in`, hashedPassword, dept.code, dept.name, 'dept']);
      } catch (error) {
        if (error.code !== 'ER_DUP_ENTRY') {
          throw error;
        }
      }
    }

    // Create admin user
    console.log('🔐 Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 12);
    
    try {
      await connection.execute(`
        INSERT INTO users (username, email, password_hash, department, department_name, role) 
        VALUES (?, ?, ?, ?, ?, ?)
      `, ['admin', 'admin@svecw.edu.in', adminPassword, 'admin', 'Administration', 'admin']);
    } catch (error) {
      if (error.code !== 'ER_DUP_ENTRY') {
        throw error;
      }
    }

    await connection.end();

    console.log('\n✅ Database setup completed!\n');
    console.log('📋 Sample Login Credentials (CHANGE IN PRODUCTION):');
    console.log('==================================================');
    console.log('Admin Login:');
    console.log('  Username: admin');
    console.log('  Password: admin123\n');
    
    console.log('Department Logins:');
    departments.forEach(dept => {
      console.log(`  ${dept.name}:`);
      console.log(`    Username: ${dept.code}_admin`);
      console.log(`    Password: svec${dept.code}123`);
    });

    console.log('\n⚠️  IMPORTANT SECURITY NOTES:');
    console.log('1. Change all default passwords immediately');
    console.log('2. Update JWT_SECRET in your .env.local file');
    console.log('3. Use strong passwords in production');
    console.log('4. Set up proper SSL/TLS for production\n');
    
    console.log('🔗 Next steps:');
    console.log('1. Copy .env.example to .env.local');
    console.log('2. Update database credentials in .env.local');
    console.log('3. Run: npm run dev');
    console.log('4. Visit: http://localhost:9002/auth/login');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the setup
setupDatabase();
