/**
 * Quick database structure checker
 */
import { query } from '@/lib/db';

async function checkUserTableStructure() {
  try {
    console.log('Checking users table structure...');
    const structure = await query('DESCRIBE users');
    console.log('Users table columns:');
    console.table(structure);
    
    // Also get a sample of data to see what exists
    const sampleData = await query('SELECT * FROM users LIMIT 1');
    console.log('Sample user data:', sampleData[0]);
    
    return structure;
  } catch (error) {
    console.error('Error checking table structure:', error);
    throw error;
  }
}

checkUserTableStructure().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch((error) => {
  console.error('Failed:', error);
  process.exit(1);
});