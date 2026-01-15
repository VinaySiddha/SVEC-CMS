import mysql from 'mysql2/promise';

// Create a pool once and reuse it
const pool = mysql.createPool({
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms',
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
});

export async function getConnection() {
  return await pool.getConnection();
}

export async function executeQuery(sql: string, values?: any[]) {
  const connection = await getConnection();
  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    connection.release();
  }
}

export default pool;
