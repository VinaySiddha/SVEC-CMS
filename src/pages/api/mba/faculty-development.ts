import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      let rows: any = [];
      
      // Try to query the programs table first (with year column)
      try {
        rows = await executeQuery(
          "SELECT * FROM mba_faculty_development_programs ORDER BY year DESC"
        );
      } catch (programsError) {
        console.warn('mba_faculty_development_programs query failed, trying mba_faculty_development:', programsError);
        
        // Fallback to the other table if it exists
        try {
          rows = await executeQuery(
            "SELECT * FROM mba_faculty_development ORDER BY created_at DESC"
          );
        } catch (devError) {
          console.error('Both faculty development tables failed:', devError);
          throw new Error('Could not retrieve faculty development data from either table');
        }
      }

      res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('MBA Faculty Development API Error:', error);
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
