import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { workshopSchema } from '@/utils/workshops-utils';
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

// GET /api/workshops - Get all workshops with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const limitParam = searchParams.get('limit');
    
    let sql = 'SELECT * FROM workshops WHERE 1=1';
    const params: any[] = [];

    if (dept) {
      sql += ' AND dept = ?';
      params.push(dept);
    }

    sql += ' ORDER BY date_from DESC';

    if (limitParam) {
      const limit = parseInt(limitParam);
      sql += ' LIMIT ?';
      params.push(limit);
    }

    const workshops = await query(sql, params);
    
    // Parse JSON gallery field
    const formattedWorkshops = Array.isArray(workshops) 
      ? workshops.map((item: any) => ({
          ...item,
          gallery: item.gallery ? JSON.parse(item.gallery) : []
        }))
      : [];
      
    return NextResponse.json(formattedWorkshops);
  } catch (error: any) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch workshops' }, { status: 500 });
  }
}

// POST /api/workshops - Create a new workshop
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const description = formData.get('description') as string;
    const reportFile = formData.get('report_file') as File;
    
    // Get gallery files (multiple files)
    const galleryFiles: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('gallery_') && value instanceof File && value.size > 0) {
        galleryFiles.push(value as File);
      }
    }
    
    // Create data object for validation
    const workshopData = {
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
    
    let report_url = '';
    let gallery: string[] = [];
    
    // Upload report file if provided
    if (reportFile && reportFile instanceof File) {
      try {
        const uploadsDir = await ensureUploadDir();
        const fileExt = reportFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write file to disk
        const buffer = Buffer.from(await reportFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Set URL for database (relative to public)
        report_url = `/uploads/workshops/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload report' }, 
          { status: 500 }
        );
      }
    }
    
    // Upload gallery images if provided
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
    
    // Insert into database
    const insertQuery = `
      INSERT INTO workshops 
      (dept, title, date_from, date_to, description, report_url, gallery) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await query(insertQuery, [
      dept,
      title,
      date_from,
      date_to,
      description,
      report_url,
      JSON.stringify(gallery),
    ]);
    
    // Assuming result is an object with affectedRows or similar property
    // or an array where the first element contains insertId
    const insertId = Array.isArray(result) && result.length > 0 && result[0] !== null && typeof result[0] === 'object' && 'insertId' in (result[0] as any) 
      ? (result[0] as any).insertId 
      : (typeof result === 'object' && result !== null && 'insertId' in (result as any) 
          ? (result as any).insertId 
          : null);
    
    if (!insertId) {
      throw new Error('Failed to insert workshop data');
    }
    
    // Fetch the newly created workshop
    const newWorkshop = await query(
      'SELECT * FROM workshops WHERE id = ?', 
      [insertId]
    );
    
    if (Array.isArray(newWorkshop) && newWorkshop.length > 0 && newWorkshop[0] !== null) {
      // Parse JSON gallery field for response
      const workshopData = newWorkshop[0] as any;
      const formattedWorkshop = {
        ...workshopData,
        gallery: workshopData.gallery ? JSON.parse(workshopData.gallery) : []
      };
      
      return NextResponse.json(formattedWorkshop, { status: 201 });
    }
    
    throw new Error('Failed to retrieve the newly created workshop');
  } catch (error: any) {
    console.error('Error creating workshop:', error);
    return NextResponse.json({ error: error.message || 'Failed to create workshop' }, { status: 500 });
  }
}
