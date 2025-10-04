import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dept = searchParams.get('dept');
    const id = searchParams.get('id');

    let sqlQuery = 'SELECT * FROM faculty_profiles WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (id) {
      sqlQuery += ' AND id = ?';
      params.push(id);
    } else if (dept) {
      sqlQuery += ' AND dept = ?';
      params.push(dept);
    }

    sqlQuery += ' ORDER BY created_at DESC';

    const profiles = await query<RowDataPacket[]>(sqlQuery, params);

    return NextResponse.json({
      success: true,
      data: profiles
    });

  } catch (error) {
    console.error('Error fetching faculty profiles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const name = formData.get('name') as string;
    const qualification = formData.get('qualification') as string;
    const designation = formData.get('designation') as string;
    const profileFile = formData.get('profile') as File;

    if (!dept || !name) {
      return NextResponse.json(
        { error: 'Department and name are required' },
        { status: 400 }
      );
    }

    let profileUrl = null;

    // Handle file upload if present
    if (profileFile && profileFile.size > 0) {
      // Validate file
      if (profileFile.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ error: 'File size too large' }, { status: 400 });
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(profileFile.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

      // Create upload directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', dept, 'faculty_profiles');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const extension = profileFile.name.split('.').pop();
      const filename = `${timestamp}_${randomString}.${extension}`;
      
      // Save file
      const bytes = await profileFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      profileUrl = `/uploads/${dept}/faculty_profiles/${filename}`;
    }

    // Insert into database
    const result = await query<ResultSetHeader>(
      'INSERT INTO faculty_profiles (dept, name, qualification, designation, profile_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
      [dept, name, qualification || null, designation || null, profileUrl]
    );

    // Fetch the created profile
    const newProfile = await query<RowDataPacket[]>(
      'SELECT * FROM faculty_profiles WHERE id = ?',
      [result.insertId]
    );

    return NextResponse.json({
      success: true,
      message: 'Faculty profile created successfully',
      data: newProfile[0]
    });

  } catch (error) {
    console.error('Error creating faculty profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    const formData = await request.formData();
    
    const dept = formData.get('dept') as string;
    const name = formData.get('name') as string;
    const qualification = formData.get('qualification') as string;
    const designation = formData.get('designation') as string;
    const profileFile = formData.get('profile') as File;

    if (!dept || !name) {
      return NextResponse.json(
        { error: 'Department and name are required' },
        { status: 400 }
      );
    }

    let updateFields = [
      'dept = ?',
      'name = ?',
      'qualification = ?',
      'designation = ?',
      'updated_at = NOW()'
    ];
    let params = [dept, name, qualification || null, designation || null];

    // Handle file upload if present
    if (profileFile && profileFile.size > 0) {
      // Validate file
      if (profileFile.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ error: 'File size too large' }, { status: 400 });
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(profileFile.type)) {
        return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
      }

      // Create upload directory
      const uploadDir = join(process.cwd(), 'public', 'uploads', dept, 'faculty_profiles');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const extension = profileFile.name.split('.').pop();
      const filename = `${timestamp}_${randomString}.${extension}`;
      
      // Save file
      const bytes = await profileFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      const profileUrl = `/uploads/${dept}/faculty_profiles/${filename}`;

      updateFields.push('profile_url = ?');
      params.push(profileUrl);
    }

    params.push(id);

    // Update in database
    await query(
      `UPDATE faculty_profiles SET ${updateFields.join(', ')} WHERE id = ?`,
      params
    );

    // Fetch the updated profile
    const updatedProfile = await query<RowDataPacket[]>(
      'SELECT * FROM faculty_profiles WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Faculty profile updated successfully',
      data: updatedProfile[0]
    });

  } catch (error) {
    console.error('Error updating faculty profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const decoded = verifyToken(token);
      if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    // Soft delete
    await query(
      'UPDATE faculty_profiles SET deleted_at = NOW() WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Faculty profile deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting faculty profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}