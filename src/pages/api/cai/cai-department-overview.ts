import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await query<RowDataPacket[]>(
      'SELECT * FROM cai_department_overview LIMIT 1'
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Department overview not found' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error('Error fetching department overview:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

