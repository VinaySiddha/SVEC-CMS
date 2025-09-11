import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { studentAchievementSchema } from '@/utils/student-achievements-utils';
import { query } from '@/lib/db';

// GET: Fetch a single student achievement by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const achievements = await query<any>(
      'SELECT * FROM student_achievements WHERE id = ?',
      [id]
    );

    if (!achievements.length) {
      return NextResponse.json(
        { error: `Student achievement with ID ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(achievements[0]);
  } catch (error) {
    console.error(`Error fetching student achievement with ID ${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch student achievement' },
      { status: 500 }
    );
  }
}

// PUT: Update an existing student achievement
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if the achievement exists
    const existingAchievements = await query<any>(
      'SELECT * FROM student_achievements WHERE id = ?',
      [id]
    );
    
    if (!existingAchievements.length) {
      return NextResponse.json(
        { error: `Student achievement with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    const existingAchievement = existingAchievements[0];
    
    // Check if request is multipart (has file)
    const contentType = request.headers.get('content-type') || '';
    let achievementData;
    let proofFile;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      // Extract the file if it exists
      proofFile = formData.get('proof') as File;
      
      // Build the achievement data from form fields
      achievementData = {
        dept: formData.get('dept') || existingAchievement.dept,
        type: formData.get('type') || existingAchievement.type,
        title: formData.get('title') || existingAchievement.title,
        name: formData.get('name') || existingAchievement.name,
        roll_number: formData.get('roll_number') || existingAchievement.roll_number,
        program: formData.get('program') || existingAchievement.program,
        cgpa: formData.get('cgpa') ? parseFloat(formData.get('cgpa') as string) : existingAchievement.cgpa,
        score: formData.get('score') || existingAchievement.score,
        guide_name: formData.get('guide_name') || existingAchievement.guide_name,
        batch: formData.get('batch') || existingAchievement.batch,
        proof_url: existingAchievement.proof_url,
      };
    } else {
      // Handle JSON data
      const jsonData = await request.json();
      achievementData = {
        ...existingAchievement,
        ...jsonData,
      };
    }

    // Validate data with Zod
    const validatedData = studentAchievementSchema.parse(achievementData);

    // Handle file upload if we have one
    let proofFilePath = existingAchievement.proof_url;
    if (proofFile) {
      const bytes = await proofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'achievements');
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate a unique filename
      const fileName = `${Date.now()}-${proofFile.name.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadDir, fileName);
      
      // Save the file
      await fs.writeFile(filePath, buffer);
      proofFilePath = `/uploads/achievements/${fileName}`;
      
      // Delete old file if it exists and is not the default
      if (existingAchievement.proof_url && !existingAchievement.proof_url.includes('default')) {
        try {
          const oldFilePath = path.join(process.cwd(), 'public', existingAchievement.proof_url);
          await fs.unlink(oldFilePath);
        } catch (err) {
          console.error('Failed to delete old proof file:', err);
          // Continue with update even if file deletion fails
        }
      }
    }

    // Update data in the database
    const updateQuery = `
      UPDATE student_achievements 
      SET dept = ?, type = ?, title = ?, name = ?, roll_number = ?, 
          program = ?, cgpa = ?, score = ?, guide_name = ?, batch = ?, proof_url = ?
      WHERE id = ?
    `;

    const values = [
      validatedData.dept,
      validatedData.type,
      validatedData.title,
      validatedData.name,
      validatedData.roll_number,
      validatedData.program,
      validatedData.cgpa || null,
      validatedData.score || null,
      validatedData.guide_name || null,
      validatedData.batch || null,
      proofFilePath,
      id
    ];

    await query<any>(updateQuery, values);

    // Fetch and return the updated achievement
    const updatedAchievements = await query<any>('SELECT * FROM student_achievements WHERE id = ?', [id]);
    return NextResponse.json(updatedAchievements[0]);
  } catch (error: any) {
    console.error(`Error updating student achievement with ID ${params.id}:`, error);
    
    // Return validation errors or generic error
    if (error.errors) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to update student achievement' }, { status: 500 });
  }
}

// DELETE: Remove a student achievement
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Check if the achievement exists and get proof_url for file deletion
    const existingAchievements = await query<any>(
      'SELECT proof_url FROM student_achievements WHERE id = ?',
      [id]
    );
    
    if (!existingAchievements.length) {
      return NextResponse.json(
        { error: `Student achievement with ID ${id} not found` },
        { status: 404 }
      );
    }
    
    // Delete the record from the database
    await query<any>('DELETE FROM student_achievements WHERE id = ?', [id]);
    
    // Delete the proof file if it exists
    const proofUrl = existingAchievements[0].proof_url;
    if (proofUrl && !proofUrl.includes('default')) {
      try {
        const filePath = path.join(process.cwd(), 'public', proofUrl);
        await fs.unlink(filePath);
      } catch (err) {
        console.error('Failed to delete proof file:', err);
        // Continue with response even if file deletion fails
      }
    }
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error(`Error deleting student achievement with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete student achievement' }, { status: 500 });
  }
}
