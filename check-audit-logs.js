/**
 * Quick audit logs table checker
 */
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser', 
  password: 'V@savi@2001',
  database: 'svec_cms',
  port: 3306
};

async function checkAuditLogsStructure() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('Checking audit_logs table structure...');
    const [structure] = await connection.execute('DESCRIBE audit_logs');
    
    console.log('Audit logs table columns:');
    console.table(structure);
    
    return structure;
  } catch (error) {
    console.error('Error checking table structure:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkAuditLogsStructure().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch((error) => {
  console.error('Failed:', error);
  process.exit(1);
});