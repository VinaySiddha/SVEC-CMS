import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';
import { facultyAchievementSchema } from '@/utils/faculty-achievements-utils';
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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

// GET /api/faculty-achievements - Get all faculty achievements with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const type = searchParams.get('type');
    const approvedParam = searchParams.get('approved');
    const limitParam = searchParams.get('limit');
    
    let sql = 'SELECT * FROM faculty_achievements WHERE 1=1';
    const params: any[] = [];

    if (dept) {
      sql += ' AND dept = ?';
      params.push(dept);
    }

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (approvedParam !== null) {
      const approved = approvedParam === 'true';
      sql += ' AND approved = ?';
      params.push(approved ? 1 : 0);
    }

    sql += ' ORDER BY id DESC';

    if (limitParam) {
      const limit = parseInt(limitParam);
      sql += ' LIMIT ?';
      params.push(limit);
    }

    const achievements = await query(sql, params);
    
    // Convert approved from 0/1 to boolean
    const formattedAchievements = Array.isArray(achievements) 
      ? achievements.map((item: any) => ({
          ...item,
          approved: item.approved === 1
        }))
      : [];
    
    return NextResponse.json(formattedAchievements);
  } catch (error: any) {
    console.error('Error fetching faculty achievements:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch faculty achievements' }, { status: 500 });
  }
}

// POST /api/faculty-achievements - Create a new faculty achievement
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract fields
    const dept = formData.get('dept') as string;
    const type = formData.get('type') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const proofFile = formData.get('proof_file') as File;
    
    // Create data object for validation
    const achievementData = {
      dept,
      type,
      title,
      description,
      approved: false,  // New achievements are not approved by default
    };
    
    // Validate data
    const validationResult = facultyAchievementSchema.safeParse(achievementData);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors.map(e => `${e.path}: ${e.message}`).join(', ');
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    
    let proof_url = '';
    
    // Upload proof if provided
    if (proofFile && proofFile instanceof File) {
      try {
        const uploadsDir = await ensureUploadDir();
        const fileExt = proofFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        
        // Write file to disk
        const buffer = Buffer.from(await proofFile.arrayBuffer());
        await writeFile(filePath, buffer);
        
        // Set URL for database (relative to public)
        proof_url = `/uploads/faculty-achievements/${fileName}`;
      } catch (uploadError: any) {
        return NextResponse.json(
          { error: uploadError.message || 'Failed to upload proof' }, 
          { status: 500 }
        );
      }
    }
    
    // Insert into database
    const insertQuery = `
      INSERT INTO faculty_achievements 
      (dept, type, title, description, proof_url, approved) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const result = await query(insertQuery, [
      dept,
      type,
      title,
      description,
      proof_url,
      0,  // not approved
    ]);
    
    // Assuming result is an object with affectedRows or similar property
    // or an array where the first element contains insertId
    const insertId = Array.isArray(result) && result.length > 0 && result[0] !== null && typeof result[0] === 'object' && 'insertId' in (result[0] as any) 
      ? (result[0] as any).insertId 
      : (typeof result === 'object' && result !== null && 'insertId' in (result as any) 
          ? (result as any).insertId 
          : null);
    
    if (!insertId) {
      throw new Error('Failed to insert faculty achievement data');
    }
    
    // Fetch the newly created achievement
    const newAchievement = await query(
      'SELECT * FROM faculty_achievements WHERE id = ?', 
      [insertId]
    );
    
    if (Array.isArray(newAchievement) && newAchievement.length > 0 && newAchievement[0] !== null) {
      // Convert approved from 0/1 to boolean
      const achievement = newAchievement[0] as any;
      const formattedAchievement = {
        ...achievement,
        approved: achievement.approved === 1
      };
      
      return NextResponse.json(formattedAchievement, { status: 201 });
    }
    
    throw new Error('Failed to retrieve the newly created faculty achievement');
  } catch (error: any) {
    console.error('Error creating faculty achievement:', error);
    return NextResponse.json({ error: error.message || 'Failed to create faculty achievement' }, { status: 500 });
  }
}
