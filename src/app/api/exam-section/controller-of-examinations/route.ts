import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

// GET: Fetch controller profile
export async function GET(request: NextRequest) {
  try {
    const items = (await query(
      'SELECT * FROM controller_of_examinations WHERE deleted_at IS NULL AND is_active = true LIMIT 1'
    )) as any[];
    
    if (items && items.length > 0) {
      const item = items[0] as any;
      // Parse JSON fields
      if (item.social_media_links && typeof item.social_media_links === 'string') {
        item.social_media_links = JSON.parse(item.social_media_links);
      }
      return NextResponse.json({
        success: true,
        data: item
      });
    }

    return NextResponse.json({
      success: true,
      data: null,
      message: 'No controller profile found'
    });

  } catch (error) {
    console.error('Error fetching controller profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// POST: Create or update controller profile
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const {
      name,
      designation,
      title,
      photo_url,
      bio,
      email,
      phone,
      office_address,
      qualifications,
      experience,
      research_interests,
      publications,
      profile_url,
      social_media_links
    } = data;

    // Validate required fields
    if (!name || !designation) {
      return NextResponse.json(
        { error: 'Name and designation are required' },
        { status: 400 }
      );
    }

    // Convert social_media_links to JSON string if it's an object
    const socialMediaJson = typeof social_media_links === 'object' 
      ? JSON.stringify(social_media_links)
      : social_media_links || null;

    // Check if profile already exists
    const existingProfile = (await query(
      'SELECT id FROM controller_of_examinations WHERE deleted_at IS NULL LIMIT 1'
    )) as any[];

    let result: any;
    let profileId: number | null = null;
    
    if (existingProfile && existingProfile.length > 0) {
      // Update existing profile
      profileId = (existingProfile[0] as any).id;
      await execute(
        `UPDATE controller_of_examinations SET 
          name = ?, designation = ?, title = ?, photo_url = ?, bio = ?,
          email = ?, phone = ?, office_address = ?, qualifications = ?,
          experience = ?, research_interests = ?, publications = ?,
          profile_url = ?, social_media_links = ?, is_active = true
         WHERE id = ? AND deleted_at IS NULL`,
        [
          name, designation, title, photo_url, bio,
          email, phone, office_address, qualifications,
          experience, research_interests, publications,
          profile_url, socialMediaJson, profileId
        ]
      );
      result = { insertId: profileId };
    } else {
      // Create new profile
      result = await execute(
        `INSERT INTO controller_of_examinations 
         (name, designation, title, photo_url, bio, email, phone, office_address,
          qualifications, experience, research_interests, publications, profile_url,
          social_media_links, is_active) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
        [
          name, designation, title, photo_url, bio,
          email, phone, office_address, qualifications,
          experience, research_interests, publications,
          profile_url, socialMediaJson
        ]
      );
    }

    return NextResponse.json({
      success: true,
      id: (result as any).insertId,
      message: existingProfile ? 'Profile updated successfully' : 'Profile created successfully'
    });

  } catch (error) {
    console.error('Error creating/updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    );
  }
}

// DELETE: Soft delete controller profile
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await execute(
      'UPDATE controller_of_examinations SET deleted_at = NOW() WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Profile deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Failed to delete profile' },
      { status: 500 }
    );
  }
}
