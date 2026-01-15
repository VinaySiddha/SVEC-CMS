import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      // Fetch from cai_hackathons_gallery with category = 'technical association'
      const rows: any = await executeQuery(
        "SELECT id, dept, category, academic_year, gallery, title FROM cai_hackathons_gallery WHERE category = 'technical association' ORDER BY academic_year DESC"
      );
      
      // Transform: Group multiple gallery records by academic_year into comma-separated URLs
      const groupedByYear: Record<string, any> = {};
      
      (rows as any[]).forEach((row: any) => {
        if (!groupedByYear[row.academic_year]) {
          groupedByYear[row.academic_year] = {
            academic_year: row.academic_year,
            dept: row.dept,
            category: row.category,
            gallery: [],
            title: row.title
          };
        }
        if (row.gallery) {
          groupedByYear[row.academic_year].gallery.push(row.gallery);
        }
      });
      
      // Convert back to array and format gallery as comma-separated string
      const technicalAssociationGallery = Object.values(groupedByYear).map((item: any) => ({
        ...item,
        gallery: item.gallery.join(',')
      }));
      
      res.status(200).json(technicalAssociationGallery);
    } 
    else if (req.method === 'POST') {
      const { dept, academic_year, title, gallery } = req.body;
      
      const result: any = await executeQuery(
        "INSERT INTO cai_hackathons_gallery (dept, category, academic_year, title, gallery) VALUES (?, 'technical association', ?, ?, ?)",
        [dept || 'cse-ai', academic_year, title || null, gallery]
      );
      
      res.status(201).json({ 
        success: true, 
        message: 'Technical association gallery entry created successfully',
        id: result.insertId 
      });
    }
    else if (req.method === 'PUT') {
      const { id, dept, academic_year, title, gallery } = req.body;
      
      await executeQuery(
        "UPDATE cai_hackathons_gallery SET dept = ?, academic_year = ?, title = ?, gallery = ? WHERE category='technical association' AND id = ?",
        [dept || 'cse-ai', academic_year, title || null, gallery, id]
      );
      
      res.status(200).json({ 
        success: true, 
        message: 'Technical association gallery entry updated successfully' 
      });
    }
    else if (req.method === 'DELETE') {
      const { id } = req.body;
      
      await executeQuery("DELETE FROM cai_hackathons_gallery WHERE id = ?", [id]);
      
      res.status(200).json({ 
        success: true, 
        message: 'Technical association gallery entry deleted successfully' 
      });
    }
    else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
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

