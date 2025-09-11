import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { workshopSchema } from '@/utils/workshops-utils';
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'workshops');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/workshops/[id] - Get a specific workshop
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('SELECT * FROM workshops WHERE id = ?', [id]);
    
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
    
    // Parse JSON gallery field for response
    const workshopData = result[0] as any;
    const formattedWorkshop = {
      ...workshopData,
      gallery: workshopData.gallery ? JSON.parse(workshopData.gallery) : []
    };
    
    return NextResponse.json(formattedWorkshop);
  } catch (error: any) {
    console.error('Error fetching workshop:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch workshop' }, 
      { status: 500 }
    );
  }
}

// PUT /api/workshops/[id] - Update a workshop
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    // Get existing workshop to check for file changes
    const existingData = await query('SELECT * FROM workshops WHERE id = ?', [id]);
    
    if (!Array.isArray(existingData) || existingData.length === 0) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
    
    const existingWorkshop = existingData[0] as any;
    
    // Parse existing gallery
    const existingGallery = existingWorkshop.gallery ? JSON.parse(existingWorkshop.gallery) : [];
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const description = formData.get('description') as string;
    const reportFile = formData.get('report_file') as File | null;
    const removeReport = formData.get('remove_report') === 'true';
    
    // Get gallery files (multiple files)
    const galleryFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('gallery_') && value instanceof File && value.size > 0) {
        galleryFiles.push(value as File);
      }
    }
    
    // Images to remove from gallery
    const imagesToRemove: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('remove_image_') && value === 'true') {
        const imageIndex = parseInt(key.replace('remove_image_', ''), 10);
        if (!isNaN(imageIndex) && imageIndex >= 0 && imageIndex < existingGallery.length) {
          imagesToRemove.push(existingGallery[imageIndex]);
        }
      }
    }
    
    // Create data object for validation
    const workshopData = {
      id,
      dept,
      title,
      date_from,
      date_to,
      description,
    };
    
    // Validate data
    const validationResult = workshopSchema.safeParse(workshopData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let report_url = existingWorkshop.report_url;
    let gallery = [...existingGallery];
    
    // Handle report file changes
    if (removeReport && report_url) {
      try {
        const filePath = path.join(process.cwd(), 'public', report_url);
        if (fs.existsSync(filePath)) {
          await unlink(filePath);
        }
        report_url = '';
      } catch (deleteError) {
        console.error('Error deleting report file:', deleteError);
        // Continue even if delete fails
      }
    }
    
    // Upload new report file if provided
    if (reportFile && reportFile instanceof File && reportFile.size > 0) {
      try {
        // Delete old report if it exists
        if (report_url) {
          try {
            const oldFilePath = path.join(process.cwd(), 'public', report_url);
            if (fs.existsSync(oldFilePath)) {
              await unlink(oldFilePath);
            }
          } catch (deleteError) {
            console.error('Error deleting old report file:', deleteError);
            // Continue even if delete fails
          }
        }
        
        const uploadsDir = await ensureUploadDir();
        const fileExt = reportFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write new file to disk
        const buffer = Buffer.from(await reportFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Set new URL for database
        report_url = `/uploads/workshops/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload report' }, 
          { status: 500 }
        );
      }
    }
    
    // Remove specified gallery images
    if (imagesToRemove.length > 0) {
      for (const imageUrl of imagesToRemove) {
        try {
          const filePath = path.join(process.cwd(), 'public', imageUrl);
          if (fs.existsSync(filePath)) {
            await unlink(filePath);
          }
          gallery = gallery.filter(url => url !== imageUrl);
        } catch (deleteError) {
          console.error('Error deleting gallery image:', deleteError);
          // Continue even if delete fails
        }
      }
    }
    
    // Upload new gallery images
    if (galleryFiles.length > 0) {
      try {
        const uploadsDir = await ensureUploadDir();
        
        for (const file of galleryFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${uuidv4()}.${fileExt}`;
          const filePath = path.join(uploadsDir, fileName);
          
          // Write file to disk
          const buffer = Buffer.from(await file.arrayBuffer());
          await writeFile(filePath, buffer);
          
          // Add URL to gallery array
          gallery.push(`/uploads/workshops/${fileName}`);
        }
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload gallery images' }, 
          { status: 500 }
        );
      }
    }
    
    // Update database
    const updateQuery = `
      UPDATE workshops 
      SET dept = ?, title = ?, date_from = ?, date_to = ?, description = ?, 
          report_url = ?, gallery = ?
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      dept,
      title,
      date_from,
      date_to,
      description,
      report_url,
      JSON.stringify(gallery),
      id
    ]);
    
    // Fetch the updated workshop
    const updatedData = await query('SELECT * FROM workshops WHERE id = ?', [id]);
    
    if (Array.isArray(updatedData) && updatedData.length > 0) {
      // Parse JSON gallery field for response
      const workshopData = updatedData[0] as any;
      const formattedWorkshop = {
        ...workshopData,
        gallery: workshopData.gallery ? JSON.parse(workshopData.gallery) : []
      };
      
      return NextResponse.json(formattedWorkshop);
    }
    
    throw new Error('Failed to retrieve the updated workshop');
  } catch (error: any) {
    console.error('Error updating workshop:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update workshop' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/workshops/[id] - Delete a workshop
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Get existing workshop to delete associated files
    const existingData = await query('SELECT * FROM workshops WHERE id = ?', [id]);
    
    if (!Array.isArray(existingData) || existingData.length === 0) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
    
    const existingWorkshop = existingData[0] as any;
    
    // Delete report file if exists
    if (existingWorkshop.report_url) {
      try {
        const filePath = path.join(process.cwd(), 'public', existingWorkshop.report_url);
        if (fs.existsSync(filePath)) {
          await unlink(filePath);
        }
      } catch (deleteError) {
        console.error('Error deleting report file:', deleteError);
        // Continue even if file delete fails
      }
    }
    
    // Delete gallery images if any
    const gallery = existingWorkshop.gallery ? JSON.parse(existingWorkshop.gallery) : [];
    for (const imageUrl of gallery) {
      try {
        const filePath = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(filePath)) {
          await unlink(filePath);
        }
      } catch (deleteError) {
        console.error('Error deleting gallery image:', deleteError);
        // Continue even if file delete fails
      }
    }
    
    // Delete from database
    await query('DELETE FROM workshops WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true, message: 'Workshop deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting workshop:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete workshop' }, 
      { status: 500 }
    );
  }
}
