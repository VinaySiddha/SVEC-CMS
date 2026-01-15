import { NextApiRequest, NextApiResponse } from 'next';
import { getConnection, executeQuery } from '../../../lib/dbPool';
import FileManager from '../../../lib/fileManager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Using connection pool

  try {
    if (req.method === 'GET') {
      // Fetch BOS members from cai_bos_members table
      const rows: any = await executeQuery(
        'SELECT id, name, designation, organization, position_in_job FROM cai_bos_members WHERE dept = ? ORDER BY id ASC',
        ['cse-ai']
      );
      
      // Transform data to match expected format
      const transformedData = Array.isArray(rows) ? rows.map((row: any) => ({
        id: row.id,
        name: row.name || '',
        designation: row.designation || '',
        organization: row.organization || '',
        position_in_job: row.position_in_job || ''
      })) : [];

      res.status(200).json(transformedData);
      
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the record first to extract file URLs
      const rows: any = await executeQuery(
        'SELECT * FROM cai_bos_members WHERE id = ?',
        [id]
      );
      
      if ((records as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const record = (records as any[])[0];
      
      // Delete associated files automatically
      FileManager.cleanupRecordFiles(record);
      
      // Delete the database record
      await connection.execute('DELETE FROM cai_bos_members WHERE id = ?', [id]);
      
      console.log(`Deleted CAI BOS members record ${id} and associated files`);
      res.status(200).json({ message: 'Record and files deleted successfully' });
      
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const updateData = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'ID is required' });
      }
      
      // Get the existing record
      const rows: any = await executeQuery(
        'SELECT * FROM cai_bos_members WHERE id = ?',
        [id]
      );
      
      if ((existingRecords as any[]).length === 0) {
        return res.status(404).json({ error: 'Record not found' });
      }
      
      const existingRecord = (existingRecords as any[])[0];
      
      // If any file URL fields are being updated, automatically replace old files
      const fileFields = ['profileUrl', 'imageUrl', 'fileUrl', 'gallery'];
      for (const field of fileFields) {
        if (updateData[field] && existingRecord[field] && updateData[field] !== existingRecord[field]) {
          FileManager.deleteFile(existingRecord[field]);
          console.log(`Automatically replaced old file in ${field}: ${existingRecord[field]} with: ${updateData[field]}`);
        }
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
        `UPDATE cai_bos_members SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
      
      console.log(`Updated CAI BOS members record ${id} with automatic file replacement`);
      res.status(200).json({ message: 'Record updated successfully, old files automatically replaced' });
      
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
    
  } catch (error) {
    console.error('Error with cai_bos_members data:', error);
    res.status(500).json({ error: 'Failed to process BOS members data' });
  } 
}

