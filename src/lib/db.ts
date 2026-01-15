/**
 * Database utility module for MySQL operations
 * 
 * This module provides a connection pool and utility functions for database operations.
 * It uses environment variables for configuration and supports prepared statements and transactions.
 */

import mysql, { Pool, PoolConnection, RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2/promise';

// Store the pool as a variable that can be recreated
let pool: Pool | null = null;

/**
 * Get the database configuration from environment variables
 */
function getDbConfig() {
  return {
    host: process.env.MYSQL_HOST || '62.72.31.209',
    user: process.env.MYSQL_USER || 'cmsuser',
    password: process.env.MYSQL_PASSWORD || 'V@savi@2001',
    database: 'svec_cms', // Hardcoded database name
    port: Number(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 3,  // Minimum needed connections
    queueLimit: 10,
    // MySQL2 specific options
    connectTimeout: 5000,  // 5 seconds timeout
    idleTimeout: 10000, // 10 seconds idle timeout - aggressive cleanup
    enableKeepAlive: true,
    keepAliveInitialDelay: 5000 // 5 seconds
  };
}

/**
 * Get or create the connection pool
 * This ensures we always use the latest configuration
 */
export function getPool(): Pool {
  if (!pool) {
    console.log('Creating new database connection pool');
    const config = getDbConfig();
    console.log('Database config:', { 
      ...config, 
      password: config.password ? '****' : '' 
    });
    pool = mysql.createPool(config);
  }
  return pool;
}

/**
 * Execute a query and return the results with retry logic
 * 
 * @example
 * // Get all active users from a department
 * const users = await query<User>('SELECT * FROM users WHERE dept = ? AND is_active = ?', ['cse', true]);
 * 
 * @template T Type of the returned rows
 * @param sql SQL query string with ? placeholders for parameters
 * @param params Array of parameters to substitute in the query
 * @returns Promise resolving to an array of result objects
 */
export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  let lastError: any;
  const maxRetries = 5;  // Increase retries
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Database query attempt ${attempt}/${maxRetries}`);
      
      // Get the pool and execute the query with prepared statement
      const [rows] = await getPool().execute<RowDataPacket[]>(sql, params || []);
      
      console.log(`Query successful on attempt ${attempt}`);
      // Type assertion - we're confident this will match the expected type T
      return rows as T[];
    } catch (error: any) {
      lastError = error;
      console.error(`Database query error on attempt ${attempt}:`, error.code, error.message);
      
      // If this is a connection timeout, network error, or too many connections, try to recreate the pool
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ER_CON_COUNT_ERROR') {
        console.log('Connection error detected, resetting pool...');
        resetPool();
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s, 32s
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } else {
        // For other errors, don't retry
        break;
      }
    }
  }
  
  console.error('All query attempts failed:', lastError);
  throw lastError;
}

/**
 * Execute a statement that modifies data (INSERT, UPDATE, DELETE) with retry logic
 * 
 * @example
 * // Insert a new user
 * const result = await execute(
 *   'INSERT INTO users (username, email, password_hash, department, role) VALUES (?, ?, ?, ?, ?)',
 *   ['john_doe', 'john@example.com', 'hashed_password', 'cse', 'dept']
 * );
 * console.log(`Inserted user with ID: ${result.insertId}`);
 * 
 * @param sql SQL statement string
 * @param params Array of parameters to substitute in the statement
 * @returns Promise resolving to result object containing affectedRows, insertId, etc.
 */
export async function execute<T>(sql: string, params?: any[]): Promise<ResultSetHeader> {
  let lastError: any;
  const maxRetries = 5;  // Increase retries
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Database execute attempt ${attempt}/${maxRetries}`);
      
      // Get the pool and execute the statement with prepared statement
      const [result] = await getPool().execute<ResultSetHeader>(sql, params || []);
      
      console.log(`Execute successful on attempt ${attempt}`);
      return result;
    } catch (error: any) {
      lastError = error;
      console.error(`Database execute error on attempt ${attempt}:`, error.code, error.message);
      
      // If this is a connection timeout, network error, or too many connections, try to recreate the pool
      if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.code === 'ENOTFOUND' || error.code === 'ER_CON_COUNT_ERROR') {
        console.log('Connection error detected, resetting pool...');
        resetPool();
        
        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s, 32s
          console.log(`Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } else {
        // For other errors, don't retry
        break;
      }
    }
  }
  
  console.error('All execute attempts failed:', lastError);
  throw lastError;
}

/**
 * Execute multiple queries within a transaction
 * 
 * @example
 * // Transfer credits between users
 * await withTransaction(async (connection) => {
 *   await connection.execute('UPDATE users SET credits = credits - ? WHERE id = ?', [100, senderId]);
 *   await connection.execute('UPDATE users SET credits = credits + ? WHERE id = ?', [100, receiverId]);
 * });
 * 
 * @param callback Function that receives a connection and performs database operations
 * @returns Promise that resolves when the transaction is complete
 */
export async function withTransaction<T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> {
  // Get a connection from the pool
  const connection = await getPool().getConnection();
  
  try {
    // Begin transaction
    await connection.beginTransaction();
    
    // Execute the callback function with the connection
    const result = await callback(connection);
    
    // If no errors, commit the transaction
    await connection.commit();
    
    return result;
  } catch (error) {
    // If any error, rollback the transaction
    await connection.rollback();
    console.error('Transaction error:', error);
    // Re-throw the error for handling by the caller
    throw error;
  } finally {
    // Always release the connection back to the pool
    connection.release();
  }
}

/**
 * Reset the pool - useful for testing
 */
export function resetPool(): void {
  if (pool) {
    pool.end().catch(console.error);
    pool = null;
    console.log('Database connection pool reset');
  }
}

/**
 * Close all connections in the pool
 * Useful for graceful shutdown of the application
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('Database connection pool closed');
  }
}

// Export default object for ESM compatibility
export default {
  query,
  execute,
  withTransaction,
  getPool,
  resetPool,
  closePool
};
