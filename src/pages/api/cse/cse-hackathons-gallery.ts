import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Query from cse_hackathons_gallery table - fetch hackathon, laboratories, and placements categories
      const rows: any = await executeQuery(
        "SELECT id, dept, category, academic_year, gallery, title FROM cse_hackathons_gallery WHERE category IN ('hackathon', 'laboratories', 'placements') ORDER BY category ASC, academic_year DESC"
      );
      
      
      // Transform: Group multiple gallery records by category + academic_year into comma-separated URLs
      const groupedByYearAndCategory: Record<string, any> = {};
      
      (rows as any[]).forEach((row: any) => {
        // Use both category and academic_year as key to preserve category
        const key = `${row.category}_${row.academic_year}`;
        if (!groupedByYearAndCategory[key]) {
          groupedByYearAndCategory[key] = {
            category: row.category,
            academic_year: row.academic_year,
            dept: row.dept,
            gallery: [],
            title: row.title
          };
        }
        if (row.gallery) {
          groupedByYearAndCategory[key].gallery.push(row.gallery);
        }
      });
      
      // Convert back to array and format gallery as comma-separated string
      const hackathonsGallery = Object.values(groupedByYearAndCategory).map((item: any) => ({
        ...item,
        gallery: item.gallery.join(',')
      }));
      
      
      res.status(200).json(hackathonsGallery);
    } 
    else if (req.method === 'POST') {
      const { dept, academic_year, title, gallery, category = 'hackathon' } = req.body;
      
      // Insert individual gallery record
      const result: any = await executeQuery(
        "INSERT INTO cse_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, ?, ?, ?, ?)",
        [dept || 'cse-ai', category, academic_year, title || null, gallery]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Hackathons gallery entry created successfully',
        id: result.insertId 
      });
    }
    else if (req.method === 'PUT') {
      const { id, dept, academic_year, title, gallery, category = 'hackathon' } = req.body;
      
      await executeQuery(
        "UPDATE cse_hackathons_gallery SET dept = ?, category = ?, academic_year = ?, title = ?, gallery = ? WHERE id = ?",
        [dept || 'cse-ai', category, academic_year, title || null, gallery, id]
      );
      
      res.status(200).json({ 
        success: true, 
        message: 'Hackathons gallery entry updated successfully' 
      });
    }
    else if (req.method === 'DELETE') {
      const { id } = req.body;
      
      await executeQuery("DELETE FROM cse_hackathons_gallery WHERE id = ?", [id]);
      
      res.status(200).json({ 
        success: true, 
        message: 'Hackathons gallery entry deleted successfully' 
      });
    }
    else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
