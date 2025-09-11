import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { organizedEventSchema } from '@/utils/organized-events-utils';
import path from "path";
import fs from "fs";

// GET /api/organized-events/[id] - Get a specific organized event
export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const event = await query(
      'SELECT * FROM organized_events WHERE id = ?',
      [id]
    );
    
    if (!event || event.length === 0) {
      return NextResponse.json(
        { error: `Organized event with ID ${id} not found` }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(event[0]);
  } catch (error: any) {
    console.error(`Error fetching organized event with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to fetch organized event with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}

// PUT /api/organized-events/[id] - Update a specific organized event
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const formData = await request.formData();
    
    // Check if event exists
    const existingEvent = await query(
      'SELECT * FROM organized_events WHERE id = ?',
      [id]
    );
    
    if (!existingEvent || existingEvent.length === 0) {
      return NextResponse.json(
        { error: `Organized event with ID ${id} not found` }, 
        { status: 404 }
      );
    }

    // Type assertion for existingEvent
    const existingEventData = existingEvent[0] as any;

    // Extract fields
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const organizer = formData.get('organizer') as string;
    const date_from = formData.get('date_from') as string;
    const date_to = formData.get('date_to') as string;
    const reportFile = formData.get('report_file') as File | null;
    const removeFile = formData.get('remove_report') === 'true';
    
    // Create data object for validation
    const eventData = {
      id,
      dept,
      title,
      organizer,
      date_from,
      date_to,
      report_url: existingEventData.report_url,
    };
    
    // Validate data
    const validationResult = organizedEventSchema.safeParse(eventData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let report_url = existingEventData.report_url;
    
    // Handle report file operations
    if (removeFile) {
      // Remove old file if it exists
      if (report_url) {
        const oldFilePath = path.join(process.cwd(), 'public', report_url);
        try {
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
          }
        } catch (error) {
          console.error('Error deleting old file:', error);
          // Continue anyway
        }
      }
      report_url = '';
    }
    
    if (reportFile && reportFile instanceof File) {
      // Upload new file
      try {
        // Remove old file if it exists
        if (report_url) {
          const oldFilePath = path.join(process.cwd(), 'public', report_url);
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
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'organized-events');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        // Generate filename and save file
        const fileExt = reportFile.name.split('.').pop();
        const fileName = `${Date.now()}-${id}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        const buffer = Buffer.from(await reportFile.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        
        report_url = `/uploads/organized-events/${fileName}`;
      } catch (error: any) {
        return NextResponse.json(
          { error: error.message || 'Failed to upload report' }, 
          { status: 500 }
        );
      }
    }
    
    // Update database
    const updateQuery = `
      UPDATE organized_events 
      SET dept = ?, title = ?, organizer = ?,
          date_from = ?, date_to = ?, report_url = ?
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      dept,
      title,
      organizer,
      date_from,
      date_to,
      report_url,
      id,
    ]);
    
    // Fetch the updated event
    const updatedEvent = await query(
      'SELECT * FROM organized_events WHERE id = ?',
      [id]
    );
    
    return NextResponse.json(updatedEvent[0]);
  } catch (error: any) {
    console.error(`Error updating organized event with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to update organized event with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}

// DELETE /api/organized-events/[id] - Delete a specific organized event
export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if event exists and get report URL
    const existingEvent = await query(
      'SELECT report_url FROM organized_events WHERE id = ?',
      [id]
    );
    
    if (!existingEvent || existingEvent.length === 0) {
      return NextResponse.json(
        { error: `Organized event with ID ${id} not found` }, 
        { status: 404 }
      );
    }
    
    // Type assertion for existingEvent and get report URL
    const existingEventData = existingEvent[0] as any;
    const report_url = existingEventData.report_url;
    if (report_url) {
      const filePath = path.join(process.cwd(), 'public', report_url);
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
      'DELETE FROM organized_events WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error deleting organized event with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || `Failed to delete organized event with ID ${params.id}` }, 
      { status: 500 }
    );
  }
}
