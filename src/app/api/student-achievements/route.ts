import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { studentAchievementSchema } from '@/utils/student-achievements-utils';
import { query } from '@/lib/db';

// GET: Fetch all student achievements or filter by department/type/program
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const type = searchParams.get('type');
    const program = searchParams.get('program');
    const limit = searchParams.get('limit');

    // Build the WHERE clause based on provided filters
    let whereClause = '';
    const params: any[] = [];

    if (dept) {
      whereClause += 'dept = ?';
      params.push(dept);
    }

    if (type) {
      whereClause += whereClause ? ' AND type = ?' : 'type = ?';
      params.push(type);
    }

    if (program) {
      whereClause += whereClause ? ' AND program = ?' : 'program = ?';
      params.push(program);
    }

    // Construct the query with filters and limit
    let queryString = 'SELECT * FROM student_achievements';
    if (whereClause) {
      queryString += ` WHERE ${whereClause}`;
    }
    queryString += ' ORDER BY created_at DESC';
    
    if (limit) {
      queryString += ' LIMIT ?';
      params.push(parseInt(limit));
    }

    const achievements = await query<any>(queryString, params);
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error fetching student achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch student achievements' }, { status: 500 });
  }
}

// POST: Create a new student achievement
export async function POST(request: NextRequest) {
  try {
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
        dept: formData.get('dept'),
        type: formData.get('type'),
        title: formData.get('title'),
        name: formData.get('name'),
        roll_number: formData.get('roll_number'),
        program: formData.get('program') || 'na',
        cgpa: formData.get('cgpa') ? parseFloat(formData.get('cgpa') as string) : null,
        score: formData.get('score'),
        guide_name: formData.get('guide_name'),
        batch: formData.get('batch'),
      };
    } else {
      // Handle JSON data
      achievementData = await request.json();
    }

    // Validate data with Zod
    const { id, proof_url, ...dataToValidate } = achievementData;
    const validatedData = studentAchievementSchema.parse(dataToValidate);

    // Handle file upload if we have one
    let proofFilePath = '';
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
    }

    // Insert data into the database
    const insertQuery = `
      INSERT INTO student_achievements 
      (dept, type, title, name, roll_number, program, cgpa, score, guide_name, batch, proof_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      proofFilePath || validatedData.proof_url || null
    ];

    const result = await query<any>(insertQuery, values);
    const insertId = result[0]?.insertId;

    // Fetch and return the created achievement
    const newAchievement = await query<any>('SELECT * FROM student_achievements WHERE id = ?', [insertId]);
    return NextResponse.json(newAchievement[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating student achievement:', error);
    
    // Return validation errors or generic error
    if (error.errors) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to create student achievement' }, { status: 500 });
  }
}
