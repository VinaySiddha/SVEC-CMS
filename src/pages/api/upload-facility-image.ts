import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public/uploads/cse-ai/physical-facilities'),
      keepExtensions: true,
      maxFileSize: 500 * 1024, // 500KB
      filter: ({ mimetype }) => {
        return mimetype && mimetype.startsWith('image/');
      }
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads/cse-ai/physical-facilities');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);
    
    const facilityId = fields.facilityId?.[0];
    const category = fields.category?.[0];
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!facilityId || !imageFile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = imageFile.originalFilename || 'image';
    const extension = path.extname(originalName);
    const filename = `${timestamp}_${originalName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const newFilePath = path.join(uploadDir, filename);

    // Move file to permanent location
    fs.renameSync(imageFile.filepath, newFilePath);

    // Generate URL for the uploaded image
    const imageUrl = `/uploads/cse-ai/physical-facilities/${filename}`;

    // Update database with new image URL
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
        return res.status(404).json({ error: 'Facility not found' });
      }

      const currentRecord = (rows as any[])[0];
      let updatedGallery = [];

      // Handle existing gallery
      if (currentRecord.gallery && Array.isArray(currentRecord.gallery)) {
        updatedGallery = [...currentRecord.gallery, imageUrl];
      } else {
        updatedGallery = [imageUrl];
      }

      // Update the gallery in database
      await connection.execute(
        'UPDATE cai_physical_facilities SET gallery = ? WHERE id = ?',
        [JSON.stringify(updatedGallery), facilityId]
      );

      console.log(`Image uploaded successfully for facility ${facilityId}: ${imageUrl}`);
      
      res.status(200).json({ 
        success: true, 
        imageUrl,
        message: 'Image uploaded successfully'
      });

    } finally {
      await connection.end();
    }

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file if upload failed
    if (error instanceof Error && error.message.includes('File too large')) {
      return res.status(400).json({ error: 'File size exceeds 500KB limit' });
    }
    
    res.status(500).json({ 
      error: 'Failed to upload image',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}