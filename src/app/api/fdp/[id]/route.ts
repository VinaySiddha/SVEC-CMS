import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { fdpSchema } from '@/utils/fdp-utils';
import path from "path";
import fs from "fs";

// GET /api/fdp/[id] - Get a specific FDP
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const fdp = await query(
      'SELECT * FROM faculty_development_programs WHERE id = ?',
      [id]
    );
    
    if (!fdp || fdp.length === 0) {
      return NextResponse.json(
        { error: `FDP with ID ${id} not found` }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(fdp[0]);
  } catch (error: any) {
    console.error(`Error fetching FDP with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to fetch FDP with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}

// PUT /api/fdp/[id] - Update a specific FDP
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const formData = await request.formData();
    
    // Check if FDP exists
    const existingFdp = await query(
      'SELECT * FROM faculty_development_programs WHERE id = ?',
      [id]
    );
    
    if (!existingFdp || existingFdp.length === 0) {
      return NextResponse.json(
        { error: `FDP with ID ${id} not found` }, 
        { status: 404 }
      );
    }

    // Type assertion for existingFdp
    const existingFdpData = existingFdp[0] as any;

    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const faculty_name = formData.get('faculty_name') as string;
    const organizer = formData.get('organizer') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const certificateFile = formData.get('certificate_file') as File | null;
    const removeFile = formData.get('remove_certificate') === 'true';
    
    // Create data object for validation
    const fdpData = {
      id,
      dept,
      title,
      faculty_name,
      organizer,
      date_from,
      date_to,
      certificate_url: existingFdpData.certificate_url,
    };
    
    // Validate data
    const validationResult = fdpSchema.safeParse(fdpData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let certificate_url = existingFdpData.certificate_url;
    
    // Handle certificate file operations
    if (removeFile) {
      // Remove old file if it exists
      if (certificate_url) {
        const oldFilePath = path.join(process.cwd(), 'public', certificate_url);
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (error) {
          console.error('Error deleting old file:', error);
          // Continue anyway
        }
      }
      certificate_url = '';
    }
    
    if (certificateFile && certificateFile instanceof File) {
      // Upload new file
      try {
        // Remove old file if it exists
        if (certificate_url) {
          const oldFilePath = path.join(process.cwd(), 'public', certificate_url);
          try {
            if (fs.existsSync(oldFilePath)) {
              fs.unlinkSync(oldFilePath);
            }
          } catch (error) {
            console.error('Error deleting old file:', error);
            // Continue anyway
          }
        }
        
        // Create directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'fdp');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        // Generate filename and save file
        const fileExt = certificateFile.name.split('.').pop();
        const fileName = `${Date.now()}-${id}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        const buffer = Buffer.from(await certificateFile.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        
        certificate_url = `/uploads/fdp/${fileName}`;
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || 'Failed to upload certificate' }, 
          { status: 500 }
        );
      }
    }
    
    // Update database
    const updateQuery = `
      UPDATE faculty_development_programs 
      SET dept = ?, title = ?, faculty_name = ?, organizer = ?, 
          date_from = ?, date_to = ?, certificate_url = ?
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      dept,
      title,
      faculty_name,
      organizer,
      date_from,
      date_to,
      certificate_url,
      id,
    ]);
    
    // Fetch the updated FDP
    const updatedFdp = await query(
      'SELECT * FROM faculty_development_programs WHERE id = ?',
      [id]
    );
    
    return NextResponse.json(updatedFdp[0]);
  } catch (error: any) {
    console.error(`Error updating FDP with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to update FDP with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}

// DELETE /api/fdp/[id] - Delete a specific FDP
export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if FDP exists and get certificate URL
    const existingFdp = await query(
      'SELECT certificate_url FROM faculty_development_programs WHERE id = ?',
      [id]
    );
    
    if (!existingFdp || existingFdp.length === 0) {
      return NextResponse.json(
        { error: `FDP with ID ${id} not found` }, 
        { status: 404 }
      );
    }
    
    // Type assertion for existingFdp and get certificate URL
    const existingFdpData = existingFdp[0] as any;
    const certificate_url = existingFdpData.certificate_url;
    if (certificate_url) {
      const filePath = path.join(process.cwd(), 'public', certificate_url);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        // Continue with deletion anyway
      }
    }
    
    // Delete from database
    await query(
      'DELETE FROM faculty_development_programs WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error deleting FDP with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to delete FDP with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}
