import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import FileManager from '../../../lib/fileManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms'
  });

  try {
    if (req.method === 'GET') {
      console.log('Fetching CAI physical facilities...');
      const startTime = Date.now();

      const [rows] = await connection.execute(`
        SELECT id, dept, category, title, description, file_url, gallery, lab_details 
        FROM cai_physical_facilities 
        WHERE dept = ? 
        ORDER BY category, id ASC 
        LIMIT 100
      `, ['cse-ai']);

      console.log('CAI physical facilities query time:', Date.now() - startTime, 'ms');
      console.log('CAI physical facilities records found:', (rows as any[]).length);

      res.status(200).json(rows);
      
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the record first to extract file URLs
      const [records] = await connection.execute(
        'SELECT * FROM cai_physical_facilities WHERE id = ?',
        [id]
      );
      
      if ((records as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const record = (records as any[])[0];
      
      // Delete associated files automatically
      FileManager.cleanupRecordFiles(record);
      
      // Delete the database record
      await connection.execute('DELETE FROM cai_physical_facilities WHERE id = ?', [id]);
      
      console.log(`Deleted CAI physical facilities record ${id} and associated files`);
      res.status(200).json({ message: 'Record and files deleted successfully' });
      
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updateData = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the existing record
      const [existingRecords] = await connection.execute(
        'SELECT * FROM cai_physical_facilities WHERE id = ?',
        [id]
      );
      
      if ((existingRecords as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const existingRecord = (existingRecords as any[])[0];
      
      // If file_url or gallery is being updated, automatically replace old files
      if (updateData.file_url && updateData.file_url !== existingRecord.file_url) {
        FileManager.deleteFile(existingRecord.file_url);
        console.log(`Automatically replaced old file: ${existingRecord.file_url} with: ${updateData.file_url}`);
      }
      
      if (updateData.gallery && updateData.gallery !== existingRecord.gallery) {
        FileManager.deleteFile(existingRecord.gallery);
        console.log(`Automatically replaced old gallery: ${existingRecord.gallery} with: ${updateData.gallery}`);
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
        `UPDATE cai_physical_facilities SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
      
      console.log(`Updated CAI physical facilities record ${id} with automatic file replacement`);
      res.status(200).json({ message: 'Record updated successfully, old files automatically replaced' });
      
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('Error with CAI physical facilities:', error);
    res.status(500).json({ 
      message: 'Error with CAI physical facilities data',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  } finally {
    await connection.end();
  }
}
