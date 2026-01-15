import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET: Get profile by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const profiles = await db.query('SELECT * FROM college_placement_profiles WHERE id = ?', [id]);
    
    if (!profiles || profiles.length === 0) {
      return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: profiles[0] });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch profile' }, { status: 500 });
  }
}

// PUT: Update profile
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await req.json();
    
    const {
      first_name, last_name, designation, department, bio, profile_photo,
      contact_email, contact_phone, office_phone, office_extension, office_address, office_room_number,
      linkedin_url, twitter_url, facebook_url, website_url,
      experience_years, qualifications, specialization, research_interests,
      students_placed, average_placement_package, highest_package, companies_collaborated,
      achievements, awards, publications, join_date, is_active
    } = body;

    await db.query(
      `UPDATE college_placement_profiles SET
       first_name=?, last_name=?, designation=?, department=?, bio=?, profile_photo=?,
       contact_email=?, contact_phone=?, office_phone=?, office_extension=?, office_address=?, office_room_number=?,
       linkedin_url=?, twitter_url=?, facebook_url=?, website_url=?,
       experience_years=?, qualifications=?, specialization=?, research_interests=?,
       students_placed=?, average_placement_package=?, highest_package=?, companies_collaborated=?,
       achievements=?, awards=?, publications=?, join_date=?, is_active=?
       WHERE id=?`,
      [
        first_name, last_name, designation, department, bio, profile_photo,
        contact_email, contact_phone, office_phone, office_extension, office_address, office_room_number,
        linkedin_url, twitter_url, facebook_url, website_url,
        experience_years, qualifications, specialization, research_interests,
        students_placed, average_placement_package, highest_package, companies_collaborated,
        achievements, awards, publications, join_date, is_active, id
      ]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile' }, { status: 500 });
  }
}

// DELETE: Soft delete profile
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    await db.query('UPDATE college_placement_profiles SET is_active = false WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete profile' }, { status: 500 });
  }
}
