import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    console.log('🔍 Testing syllabus data fetch from cai_syllabus...');

    // Test direct query
    const [syllabusRecords]: any = await connection.execute(
      'SELECT id, type, title, fileUrl, academic_year FROM cai_syllabus ORDER BY academic_year DESC, type ASC'
    );

    console.log(`✅ Query successful. Found ${syllabusRecords.length} records`);

    res.status(200).json({
      success: true,
      message: 'Syllabus data fetched successfully',
      count: syllabusRecords.length,
      data: syllabusRecords,
      columns: ['id', 'type', 'title', 'fileUrl', 'academic_year'],
      expectedFormat: {
        id: 'number',
        type: 'string (R18, R20, R23, V20)',
        title: 'string',
        fileUrl: 'string (URL)',
        academic_year: 'string (YYYY-YY format)'
      }
    });
  } catch (error) {
    console.error('❌ Error fetching syllabus data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch syllabus data',
      message: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Verify cai_syllabus table exists in database',
        'Check database credentials',
        'Verify required columns: id, type, title, fileUrl, academic_year'
      ]
    });
  } finally {
    await connection.end();
  }
}
