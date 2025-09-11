import { NextRequest, NextResponse } from 'next/server';
import { CrudFactory } from '@/lib/crudFactory';
import { entityConfigMap } from '@/lib/entityConfig';
import { requireAuth, AuthUser } from '@/lib/auth';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';
import { query } from '@/lib/db';

// Create a CRUD handler for faculty profiles
const facultyProfileHandler = new CrudFactory(entityConfigMap.faculty_profiles);

// Define the type for database query results
interface CountResult {
  total: number;
}

interface DbResult {
  insertId: number;
  affectedRows: number;
}

// Fix typescript issues with MySQL results
type MySQLCountResult = {
  total: number;
};

type MySQLInsertResult = {
  insertId: number;
  affectedRows: number;
};

/**
 * GET /api/faculty_profiles
 * Lists all faculty profiles with filtering, pagination, and sorting
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 10;
    const dept = searchParams.get('dept');
    
    // Authenticate user
    const authHeader = req.headers.get('authorization');
    let user: AuthUser | null = null;
    
    if (authHeader) {
      // Use auth header if provided (for API calls)
      try {
        user = await requireAuth(req);
      } catch (e) {
        // Continue as public user if auth fails
      }
    }
    
    // Build query conditions
    let conditions = ['deleted_at IS NULL'];
    let params: any[] = [];
    
    // Filter by department if specified
    if (dept) {
      conditions.push('dept = ?');
      params.push(dept);
    }
    
    // Show only approved profiles for public users
    if (!user) {
      conditions.push('status = ?');
      params.push('approved');
    }
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Get total count
    const countResults = await query<{total: number}>(
      `SELECT COUNT(*) as total FROM faculty_profiles WHERE ${conditions.join(' AND ')}`,
      params
    );
    const total = Array.isArray(countResults) && countResults.length > 0 
      ? (countResults[0] as {total: number}).total 
      : 0;
    
    // Get profiles
    const profiles = await query(
      `SELECT * FROM faculty_profiles 
       WHERE ${conditions.join(' AND ')} 
       ORDER BY name ASC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    
    // Return response
    return NextResponse.json({
      data: profiles,
      meta: {
        total,
        page,
        limit
      }
    });
  } catch (error: any) {
    console.error('Error getting faculty profiles:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve faculty profiles' },
      { status: error.status || 500 }
    );
  }
}

/**
 * POST /api/faculty_profiles
 * Creates a new faculty profile
 */
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Parse multipart form data
    const { fields, files } = await parseMultipartForm(req);
    
    // Validate required fields
    if (!fields.dept) {
      return NextResponse.json({ error: 'Department is required' }, { status: 400 });
    }
    
    if (!fields.name || fields.name.length < 2) {
      return NextResponse.json({ error: 'Name is required and must be at least 2 characters' }, { status: 400 });
    }
    
    // Prepare data for insertion
    const profileData: {
      dept: string;
      name: string;
      qualification: string | null;
      designation: string | null;
      profile_url: string | null;
      status: string;
    } = {
      dept: fields.dept,
      name: fields.name,
      qualification: fields.qualification || null,
      designation: fields.designation || null,
      profile_url: null,
      status: 'pending'
    };
    
    // Handle profile photo upload if provided
    if (files.profile) {
      const result = await saveFile(files.profile, 'faculty-profiles');
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      profileData.profile_url = result.fileName;
    }
    
    // Insert into database
    const insertResult = await query<{insertId: number}>(
      `INSERT INTO faculty_profiles 
       (dept, name, qualification, designation, profile_url, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        profileData.dept,
        profileData.name,
        profileData.qualification,
        profileData.designation,
        profileData.profile_url,
        profileData.status
      ]
    );
    
    // Get the inserted ID
    const insertId = Array.isArray(insertResult) && insertResult.length > 0 
      ? (insertResult[0] as {insertId: number}).insertId
      : 0;
      
    if (!insertId) {
      throw new Error('Failed to insert faculty profile');
    }
    
    // Get the inserted profile
    const profiles = await query(
      'SELECT * FROM faculty_profiles WHERE id = ?', 
      [insertId]
    );
    
    const profile = Array.isArray(profiles) && profiles.length > 0 
      ? profiles[0] 
      : null;
    
    return NextResponse.json({ 
      message: 'Faculty profile created successfully',
      data: profile
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating faculty profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create faculty profile' },
      { status: error.status || 500 }
    );
  }
}

/**
 * PUT /api/faculty_profiles?id=1
 * Updates an existing faculty profile
 */
export async function PUT(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Get profile ID from query parameters
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }
    
    // Check if profile exists
    const existingProfiles = await query('SELECT * FROM faculty_profiles WHERE id = ?', [id]);
    
    if (!Array.isArray(existingProfiles) || existingProfiles.length === 0) {
      return NextResponse.json({ error: 'Faculty profile not found' }, { status: 404 });
    }
    
    // Parse multipart form data
    const { fields, files } = await parseMultipartForm(req);
    
    // Validate required fields
    if (fields.dept === '') {
      return NextResponse.json({ error: 'Department cannot be empty' }, { status: 400 });
    }
    
    if (fields.name && fields.name.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 });
    }
    
    // Prepare update fields and values
    const updateFields: string[] = [];
    const updateValues: any[] = [];
    
    // Only update fields that are provided
    if (fields.dept !== undefined) {
      updateFields.push('dept = ?');
      updateValues.push(fields.dept);
    }
    
    if (fields.name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(fields.name);
    }
    
    if (fields.qualification !== undefined) {
      updateFields.push('qualification = ?');
      updateValues.push(fields.qualification || null);
    }
    
    if (fields.designation !== undefined) {
      updateFields.push('designation = ?');
      updateValues.push(fields.designation || null);
    }
    
    if (fields.status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(fields.status);
    }
    
    // Handle profile photo upload if provided
    if (files.profile) {
      const result = await saveFile(files.profile, 'faculty-profiles');
      
      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      
      updateFields.push('profile_url = ?');
      updateValues.push(result.fileName);
    }
    
    // If no fields to update, return early
    if (updateFields.length === 0) {
      return NextResponse.json({ 
        message: 'No changes to update',
        data: existingProfiles[0]
      });
    }
    
    // Add updated_at timestamp
    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    
    // Add ID to the end of values array
    updateValues.push(id);
    
    // Update database
    await query(
      `UPDATE faculty_profiles 
       SET ${updateFields.join(', ')}
       WHERE id = ?`,
      updateValues
    );
    
    // Get the updated profile
    const updatedProfiles = await query('SELECT * FROM faculty_profiles WHERE id = ?', [id]);
    const updatedProfile = Array.isArray(updatedProfiles) && updatedProfiles.length > 0 
      ? updatedProfiles[0] 
      : null;
    
    return NextResponse.json({ 
      message: 'Faculty profile updated successfully',
      data: updatedProfile
    });
  } catch (error: any) {
    console.error('Error updating faculty profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update faculty profile' },
      { status: error.status || 500 }
    );
  }
}

/**
 * DELETE /api/faculty_profiles?id=1
 * Soft deletes an existing faculty profile
 */
export async function DELETE(req: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(req);
    
    // Get profile ID from query parameters
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }
    
    // Check if profile exists
    const existingProfiles = await query('SELECT * FROM faculty_profiles WHERE id = ?', [id]);
    
    if (!Array.isArray(existingProfiles) || existingProfiles.length === 0) {
      return NextResponse.json({ error: 'Faculty profile not found' }, { status: 404 });
    }
    
    // Soft delete by setting deleted_at timestamp
    await query(
      'UPDATE faculty_profiles SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({ 
      message: 'Faculty profile deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting faculty profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete faculty profile' },
      { status: error.status || 500 }
    );
  }
}
