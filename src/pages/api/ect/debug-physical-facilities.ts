import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get table structure
    const tableStructure = await executeQuery("DESCRIBE ect_physical_facilities");
    
    // Get row count
    const countResult: any = await executeQuery("SELECT COUNT(*) as count FROM ect_physical_facilities");
    
    // Get all data
    const allData = await executeQuery("SELECT * FROM ect_physical_facilities LIMIT 100");
    
    res.status(200).json({
      message: 'Debug info for ect_physical_facilities table',
      tableStructure: tableStructure,
      rowCount: countResult?.[0]?.count || 0,
      sampleData: allData,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
}
