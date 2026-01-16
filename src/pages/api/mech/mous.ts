import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT id, organization_name, from_date, to_date, document_url FROM mech_mous ORDER BY from_date DESC"
      );


      // Map database columns to frontend-expected field names
      const normalized = (rows || []).map((r: any, idx: number) => {
        const result = {
          id: r.id,
          type: 'industry', // Default type for MOUs
          organization: r.organization_name,
          organization_name: r.organization_name,
          date_of_mou: r.from_date,
          validity: r.to_date,
          document_url: r.document_url,
          industry_type: '', // Will be filled from frontend if needed
        };

        return result;
      });

      res.status(200).json(normalized);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
