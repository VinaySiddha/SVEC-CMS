import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { table, dept = 'ds' } = req.query;

      if (!table) {
        return res.status(400).json({ error: 'Table name is required' });
      }

      // Sanitize table name to prevent SQL injection
      const tableName = String(table).match(/^[a-zA-Z0-9_]*$/) ? String(table) : null;
      if (!tableName) {
        return res.status(400).json({ error: 'Invalid table name' });
      }

      // Query with dept filter if the column exists
      let query = `SELECT * FROM \`${tableName}\``;
      const params: any[] = [];

      // Try to filter by dept if available
      try {
        const rows: any = await executeQuery(query);
        res.status(200).json(rows);
      } catch (error: any) {
        console.error('Query error:', error.message);
        res.status(500).json({
          error: 'Failed to query table',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
