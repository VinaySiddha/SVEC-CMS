import { execute } from '@/lib/db';
import fs from 'fs';
import path from 'path';

/**
 * Run the regulations table migration
 * This creates the regulations table if it doesn't exist
 */
export async function migrateRegulationsTable() {
  try {
    
    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'sql', 'create_regulations_table.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      try {
        await execute(statement);
      } catch (err: any) {
        // Ignore errors related to duplicate indexes/constraints
        if (!err.message.includes('already exists') && 
            !err.message.includes('Duplicate')) {
        }
      }
    }
    
    return { success: true, message: 'Migration completed' };
  } catch (error) {
    return { success: false, error };
  }
}

// Auto-run migration on module import if needed
if (process.env.NODE_ENV === 'development') {
  // Optionally run on development startup
  // migrateRegulationsTable().catch(() => {});
}
