import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { facultyAchievementSchema } from '@/utils/faculty-achievements-utils';
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { unlink } from "fs/promises";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'faculty-achievements');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/faculty-achievements/[id] - Get a specific faculty achievement
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('SELECT * FROM faculty_achievements WHERE id = ?', [id]);
    
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: 'Faculty achievement not found' }, { status: 404 });
    }
    
    // Type assertion for result[0]
    const achievementData = result[0] as any;
    
    // Convert approved from 0/1 to boolean
    const achievement = {
      ...achievementData,
      approved: achievementData.approved === 1
    };
    
    return NextResponse.json(achievement);
  } catch (error: any) {
    console.error('Error fetching faculty achievement:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch faculty achievement' }, 
      { status: 500 }
    );
  }
}

// PUT /api/faculty-achievements/[id] - Update a faculty achievement
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    // Get existing achievement to check for file changes
    const existingData = await query('SELECT * FROM faculty_achievements WHERE id = ?', [id]);
    
    if (!Array.isArray(existingData) || existingData.length === 0) {
      return NextResponse.json({ error: 'Faculty achievement not found' }, { status: 404 });
    }
    
    // Type assertion for existingData[0]
    const existingAchievement = existingData[0] as any;
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const type = formData.get('type') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const proofFile = formData.get('proof_file') as File | null;
    const approvedStr = formData.get('approved') as string | null;
    const approved = approvedStr === 'true';
    
    // Create data object for validation
    const achievementData = {
      dept,
      type,
      title,
      description,
      approved,
    };
    
    // Validate data
    const validationResult = facultyAchievementSchema.safeParse(achievementData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let proof_url = existingAchievement.proof_url;
    
    // Upload new proof file if provided
    if (proofFile && proofFile instanceof File && proofFile.size > 0) {
      try {
        const uploadsDir = await ensureUploadDir();
        const fileExt = proofFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write new file to disk
        const buffer = Buffer.from(await proofFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Delete old file if exists
        if (existingAchievement.proof_url) {
          try {
            const oldFilePath = path.join(process.cwd(), 'public', existingAchievement.proof_url);
            await unlink(oldFilePath);
          } catch (deleteError) {
            console.error('Error deleting old proof file:', deleteError);
            // Continue even if delete fails
          }
        }
        
        // Set new URL for database
        proof_url = `/uploads/faculty-achievements/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload proof' }, 
          { status: 500 }
        );
      }
    }
    
    // Update database
    const updateQuery = `
      UPDATE faculty_achievements 
      SET dept = ?, type = ?, title = ?, description = ?, proof_url = ?, approved = ?
      WHERE id = ?
    `;
    
    await query(updateQuery, [
      dept,
      type,
      title,
      description,
      proof_url,
      approved ? 1 : 0,
      id
    ]);
    
    // Fetch the updated achievement
    const updatedData = await query('SELECT * FROM faculty_achievements WHERE id = ?', [id]);
    
    if (Array.isArray(updatedData) && updatedData.length > 0) {
      // Type assertion for updatedData[0]
      const achievementData = updatedData[0] as any;
      
      // Convert approved from 0/1 to boolean
      const formattedAchievement = {
        ...achievementData,
        approved: achievementData.approved === 1
      };
      
      return NextResponse.json(formattedAchievement);
    }
    
    throw new Error('Failed to retrieve the updated faculty achievement');
  } catch (error: any) {
    console.error('Error updating faculty achievement:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update faculty achievement' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/faculty-achievements/[id] - Delete a faculty achievement
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Get existing achievement to delete associated file
    const existingData = await query('SELECT * FROM faculty_achievements WHERE id = ?', [id]);
    
    if (!Array.isArray(existingData) || existingData.length === 0) {
      return NextResponse.json({ error: 'Faculty achievement not found' }, { status: 404 });
    }
    
    // Type assertion for existingData[0]
    const existingAchievement = existingData[0] as any;
    
    // Delete associated file if exists
    if (existingAchievement.proof_url) {
      try {
        const filePath = path.join(process.cwd(), 'public', existingAchievement.proof_url);
        await unlink(filePath);
      } catch (deleteError) {
        console.error('Error deleting proof file:', deleteError);
        // Continue even if file delete fails
      }
    }
    
    // Delete from database
    await query('DELETE FROM faculty_achievements WHERE id = ?', [id]);
    
    return NextResponse.json({ success: true, message: 'Faculty achievement deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting faculty achievement:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete faculty achievement' }, 
      { status: 500 }
    );
  }
}
