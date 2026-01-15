import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { facilityId, imageUrl, imageIndex } = req.body;
    
    if (!facilityId || !imageUrl || imageIndex === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Connect to database
    const connection = await mysql.createConnection({
      host: '62.72.31.209',
      user: 'cmsuser',
      password: 'V@savi@2001',
      database: 'svec_cms'
    });

    try {
      // Get current gallery
      const [rows] = await connection.execute(
        'SELECT gallery FROM cai_physical_facilities WHERE id = ?',
        [facilityId]
      );

      if ((rows as any[]).length === 0) {
        await connection.end();
        return res.status(404).json({ error: 'Facility not found' });
      }

      const currentRecord = (rows as any[])[0];
      
      if (!Array.isArray(currentRecord.gallery) || currentRecord.gallery.length === 0) {
        await connection.end();
        return res.status(400).json({ error: 'No gallery images found' });
      }

      // Remove the image from the array
      const updatedGallery = currentRecord.gallery.filter((_: string, index: number) => index !== imageIndex);

      // Update database
      await connection.execute(
        'UPDATE cai_physical_facilities SET gallery = ? WHERE id = ?',
        [JSON.stringify(updatedGallery), facilityId]
      );

      await connection.end();

      // Delete the physical file
      try {
        const filePath = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log('✅ Physical file deleted:', filePath);
        } else {
          console.log('⚠️ File not found:', filePath);
        }
      } catch (fileError) {
        console.error('⚠️ Error deleting physical file:', fileError);
        // Don't fail the request if file deletion fails
      }

      console.log('✅ Image deleted successfully from gallery');
      res.status(200).json({ 
        message: 'Image deleted successfully',
        updatedGallery 
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('❌ Delete error:', error);
    res.status(500).json({ 
      error: 'Delete failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}