const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

const DB_CONFIG = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306,
  connectTimeout: 10000,
  acquireTimeout: 10000,
  timeout: 10000
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function printStatus(message) {
  console.log(`${colors.cyan}📋 ${message}${colors.reset}`);
}

function printSuccess(message) {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function printError(message) {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

function printWarning(message) {
  console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

async function createECETables() {
  let connection;
  try {
    printStatus('Connecting to database...');
    connection = await mysql.createConnection(DB_CONFIG);
    printSuccess('Connected to database!');

    // Read SQL script
    const sqlScriptPath = path.join(__dirname, '..', 'sql', 'create_ece_tables_from_ect.sql');
    
    if (!fs.existsSync(sqlScriptPath)) {
      printError(`SQL script not found at: ${sqlScriptPath}`);
      return;
    }

    printStatus('Reading SQL script...');
    const sqlContent = fs.readFileSync(sqlScriptPath, 'utf8');
    
    // Split by semicolons and filter out empty statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--') && !stmt.startsWith('/*'));

    console.log(`\n${colors.cyan}📊 Found ${statements.length} SQL statements to execute${colors.reset}\n`);

    let successCount = 0;
    let errorCount = 0;

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comment-only lines
      if (!statement || statement.match(/^(--|\/\*)/)) {
        continue;
      }

      try {
        printStatus(`[${i + 1}/${statements.length}] Executing statement...`);
        console.log(`   ${statement.substring(0, 80)}${statement.length > 80 ? '...' : ''}`);
        
        await connection.execute(statement);
        printSuccess(`Statement ${i + 1} executed successfully`);
        successCount++;
      } catch (error) {
        if (error.code === 'ER_TABLE_EXISTS_ERROR') {
          printWarning(`Statement ${i + 1}: Table already exists (skipped)`);
        } else {
          printError(`Statement ${i + 1} failed: ${error.message}`);
          errorCount++;
        }
      }
    }

    // Verify table creation
    printStatus('\nVerifying table creation...');
    const [tables] = await connection.execute(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'svec_cms' AND TABLE_NAME LIKE 'ece_%' ORDER BY TABLE_NAME"
    );

    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}📊 ECE Tables Created Successfully${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

    if (tables.length > 0) {
      console.log(`\n${colors.green}Total ECE tables created: ${tables.length}${colors.reset}\n`);
      tables.forEach((table, index) => {
        console.log(`${colors.cyan}${index + 1}. ${table.TABLE_NAME}${colors.reset}`);
      });
    }

    console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✅ Execution Summary${colors.reset}`);
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}Successful: ${successCount}${colors.reset}`);
    if (errorCount > 0) {
      console.log(`${colors.red}Errors: ${errorCount}${colors.reset}`);
    } else {
      console.log(`${colors.green}Errors: 0${colors.reset}`);
    }
    console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    await connection.end();
    printSuccess('Database connection closed');

  } catch (error) {
    printError(`Fatal error: ${error.message}`);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      printError('Database connection lost');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      printError('Access denied - check your credentials');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      printError('Database not found');
    }
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        // Ignore
      }
    }
  }
}

// Run the script
createECETables();
