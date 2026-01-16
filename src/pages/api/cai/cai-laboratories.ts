import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();
    
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    const [rows] = await connection.execute(`
      SELECT id, lab_name, lab_code, configurations, capacity, \`usage\`, location, incharge 
      FROM laboratories 
      WHERE dept = ? 
      ORDER BY id ASC 
      LIMIT 20
    `, ['cse-ai']);

    await connection.end();
    

    // Transform data to match frontend expectations
    const transformedData = (rows as any[]).map(lab => ({
      id: lab.id,
      category: 'Laboratories',
      title: lab.lab_name,
      lab_details: lab.configurations ? (Array.isArray(lab.configurations) ? lab.configurations : [lab.configurations]).map((config: any, index: number) => ({
        ...config,
        systems: index === 0 ? lab.capacity : '02' // First entry gets main capacity, others get default
      })) : []
    }));

    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching CAI laboratories data',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
