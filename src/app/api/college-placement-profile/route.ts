import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

// GET: List all profiles with optional filtering
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get('college_id');
    const department = searchParams.get('department');

    let query = 'SELECT * FROM college_placement_profiles WHERE is_active = true';
    const params: any[] = [];

    if (collegeId) {
      query += ' AND college_id = ?';
      params.push(parseInt(collegeId));
    }

    if (department) {
      query += ' AND department = ?';
      params.push(department);
    }

    query += ' ORDER BY first_name ASC';

    const profiles = await db.query(query, params);
    return NextResponse.json({ success: true, data: profiles });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch profiles' }, { status: 500 });
  }
}

// POST: Create new profile
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      college_id, first_name, last_name, designation, department, bio, profile_photo,
      contact_email, contact_phone, office_phone, office_extension, office_address, office_room_number,
      linkedin_url, twitter_url, facebook_url, website_url,
      experience_years, qualifications, specialization, research_interests,
      students_placed, average_placement_package, highest_package, companies_collaborated,
      achievements, awards, publications, join_date
    } = body;

    const result: any = await db.query(
      `INSERT INTO college_placement_profiles 
      (college_id, first_name, last_name, designation, department, bio, profile_photo,
       contact_email, contact_phone, office_phone, office_extension, office_address, office_room_number,
       linkedin_url, twitter_url, facebook_url, website_url,
       experience_years, qualifications, specialization, research_interests,
       students_placed, average_placement_package, highest_package, companies_collaborated,
       achievements, awards, publications, join_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        college_id, first_name, last_name, designation, department, bio, profile_photo,
        contact_email, contact_phone, office_phone, office_extension, office_address, office_room_number,
        linkedin_url, twitter_url, facebook_url, website_url,
        experience_years, qualifications, specialization, research_interests,
        students_placed, average_placement_package, highest_package, companies_collaborated,
        achievements, awards, publications, join_date
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId || result[0]?.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create profile' }, { status: 500 });
  }
}
