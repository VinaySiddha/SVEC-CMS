import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const rows: any = await executeQuery(
        "SELECT id, dept, category, academic_year, gallery, title FROM aiml_hackathons_gallery WHERE category = 'extracurricular activities' ORDER BY academic_year DESC"
      );

      // Group by academic_year and concatenate gallery URLs
      const groupedByYear: Record<string, any> = {};
      rows.forEach((row: any) => {
        if (!groupedByYear[row.academic_year]) {
          groupedByYear[row.academic_year] = {
            academic_year: row.academic_year,
            dept: row.dept,
            category: row.category,
            gallery: [],
            title: row.title
          };
        }
        groupedByYear[row.academic_year].gallery.push(row.gallery);
      });

      // Transform gallery arrays to comma-separated strings
      const result = Object.values(groupedByYear).map((item: any) => ({
        ...item,
        gallery: item.gallery.join(',')
      }));

      res.status(200).json(result);
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
