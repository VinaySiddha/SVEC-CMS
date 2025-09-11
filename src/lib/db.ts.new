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
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: 'college_portal', // Hardcoded database name
    port: Number(process.env.MYSQL_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
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
 * Execute a query and return the results
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
  try {
    // Get the pool and execute the query with prepared statement
    const [rows] = await getPool().execute<RowDataPacket[]>(sql, params || []);
    
    // Type assertion - we're confident this will match the expected type T
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    // Re-throw the error for handling by the caller
    throw error;
  }
}

/**
 * Execute a statement that modifies data (INSERT, UPDATE, DELETE)
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
  try {
    // Get the pool and execute the statement with prepared statement
    const [result] = await getPool().execute<ResultSetHeader>(sql, params || []);
    return result;
  } catch (error) {
    console.error('Database execute error:', error);
    // Re-throw the error for handling by the caller
    throw error;
  }
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
