import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads/cse-ai/physical-facilities'),
      keepExtensions: true,
      maxFileSize: 500 * 1024, // 500KB limit
    });

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads/cse-ai/physical-facilities');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const [fields, files] = await form.parse(req);
    
    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image as File;
    const facilityId = Array.isArray(fields.facilityId) ? fields.facilityId[0] : fields.facilityId;
    const oldImageUrl = Array.isArray(fields.oldImageUrl) ? fields.oldImageUrl[0] : fields.oldImageUrl;
    const imageIndex = Array.isArray(fields.imageIndex) ? fields.imageIndex[0] : fields.imageIndex;
    
    if (!imageFile || !facilityId || !oldImageUrl || imageIndex === undefined) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Validate file size
    if (imageFile.size > 500 * 1024) {
      fs.unlinkSync(imageFile.filepath);
      return res.status(400).json({ error: 'File size must be less than 500KB' });
    }

    // Validate file type
    if (!imageFile.mimetype?.startsWith('image/')) {
      fs.unlinkSync(imageFile.filepath);
      return res.status(400).json({ error: 'File must be an image' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = imageFile.originalFilename || 'image';
    const extension = path.extname(originalName);
    const newFileName = `${timestamp}_${originalName.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const newFilePath = path.join(uploadDir, newFileName);

    // Move file to final destination
    fs.renameSync(imageFile.filepath, newFilePath);

    // Generate the URL path
    const newImageUrl = `/uploads/cse-ai/physical-facilities/${newFileName}`;

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
      
      if (!Array.isArray(currentRecord.gallery)) {
        await connection.end();
        return res.status(400).json({ error: 'Invalid gallery format' });
      }

      // Replace the image at the specified index
      const updatedGallery = [...currentRecord.gallery];
      const indexNum = parseInt(imageIndex as string);
      
      if (indexNum >= 0 && indexNum < updatedGallery.length) {
        updatedGallery[indexNum] = newImageUrl;
      } else {
        await connection.end();
        return res.status(400).json({ error: 'Invalid image index' });
      }

      // Update database
      await connection.execute(
        'UPDATE cai_physical_facilities SET gallery = ? WHERE id = ?',
        [JSON.stringify(updatedGallery), facilityId]
      );

      await connection.end();

      // Delete the old physical file
      try {
        const oldFilePath = path.join(process.cwd(), 'public', oldImageUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log('✅ Old physical file deleted:', oldFilePath);
        }
      } catch (fileError) {
        console.error('⚠️ Error deleting old physical file:', fileError);
        // Don't fail the request if old file deletion fails
      }

      console.log('✅ Image replaced successfully:', newImageUrl);
      res.status(200).json({ 
        message: 'Image replaced successfully',
        imageUrl: newImageUrl,
        fileName: newFileName,
        updatedGallery
      });

    } catch (dbError) {
      await connection.end();
      throw dbError;
    }

  } catch (error) {
    console.error('❌ Replace error:', error);
    
    // Clean up any uploaded file on error
    try {
      const form = new IncomingForm();
      const [, files] = await form.parse(req);
      const imageFile = Array.isArray(files.image) ? files.image[0] : files.image as File;
      if (imageFile?.filepath && fs.existsSync(imageFile.filepath)) {
        fs.unlinkSync(imageFile.filepath);
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    res.status(500).json({ 
      error: 'Replace failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}