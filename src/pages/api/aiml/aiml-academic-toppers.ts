import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

type BatchRow = {
  id: number;
  dept: string;
  batch: string;
  title: string;
  pdf_url: string;
  description: string | null;
};

type StatRow = {
  id: number;
  dept: string;
  academic_year: string;
  particulars: string;
  students_benefited: number;
  scholarship_amount: number;
};

type ApiResponse = {
  dept: string;
  batches: BatchRow[];
  stats: StatRow[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const { dept } = req.query;

  if (!dept || typeof dept !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid dept parameter' });
  }

  // Create a single connection (no pool)
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
        user: 'cmsuser',
        password: 'V@savi@2001',
        database: 'svec_cms'
  });

  try {
    // Query batches table
   const [batchesRaw] = await connection.execute(
  `SELECT id, dept, batch, title, pdf_url, description
     FROM academic_toppers_batches
    WHERE dept = ?
    ORDER BY batch DESC`,
  [dept]
);
const batches = batchesRaw as BatchRow[];

const [statsRaw] = await connection.execute(
  `SELECT id, dept, academic_year, particulars,
          students_benefited, scholarship_amount
     FROM academic_toppers_stats
    WHERE dept = ?
    ORDER BY academic_year DESC`,
  [dept]
);
const stats = statsRaw as StatRow[];

    // Send response
    res.status(200).json({
      dept,
      batches,
      stats,
    });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Always close the connection
    await connection.end();
  }
}
