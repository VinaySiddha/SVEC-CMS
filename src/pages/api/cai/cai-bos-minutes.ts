import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';
import FileManager from '../../../lib/fileManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Using connection pool

  try {
    if (req.method === 'GET') {
      const startTime = Date.now();
      
      const rows: any = await executeQuery(`
        SELECT id, meeting_no, meeting_date, file_url 
        FROM cai_bos_minutes 
        ORDER BY meeting_date DESC 
        LIMIT 20
      `);
      
      
      res.status(200).json(rows);
      
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the record first to extract file URLs
      const rows: any = await executeQuery(
        'SELECT * FROM cai_bos_minutes WHERE id = ?',
        [id]
      );
      
      if ((records as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const record = (records as any[])[0];
      
      // Delete associated files
      FileManager.cleanupRecordFiles(record);
      
      // Delete the database record
      await connection.execute('DELETE FROM cai_bos_minutes WHERE id = ?', [id]);
      
      res.status(200).json({ message: 'Record and files deleted successfully' });
      
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updateData = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the existing record
      const rows: any = await executeQuery(
        'SELECT * FROM cai_bos_minutes WHERE id = ?',
        [id]
      );
      
      if ((existingRecords as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const existingRecord = (existingRecords as any[])[0];
      
      // If file URL is being updated, delete the old file
      if (updateData.file_url && updateData.file_url !== existingRecord.file_url) {
        FileManager.deleteFile(existingRecord.file_url);
      }
      
      // Update the record
      const updateFields = [];
      const updateValues = [];
      
      for (const [key, value] of Object.entries(updateData)) {
        if (key !== 'id') {
          updateFields.push(`${key} = ?`);
          updateValues.push(value);
        }
      }
      
      updateValues.push(id);
      
      await connection.execute(
        `UPDATE cai_bos_minutes SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
      
      res.status(200).json({ message: 'Record updated successfully' });
      
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  } 
}
