import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

// Mapping of department keys to their faculty table names
const FACULTY_TABLES: Record<string, string> = {
  'cse': 'cse_faculty',
  'cse-ai': 'cai_faculty',
  'cst': 'cst_faculty',
  'ece': 'ece_faculty',
  'ect': 'ect_faculty',
  'eee': 'eee_faculty',
  'mech': 'mech_faculty',
  'civil': 'civil_faculty',
  'aiml': 'aiml_faculty',
  'cds': 'ds_faculty',
  'mba': 'mba_faculty',
  'bsh': 'bsh_faculty',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dept: string }> }
) {
  try {
    const { dept } = await params;

    // Validate department
    const tableName = FACULTY_TABLES[dept];
    if (!tableName) {
      return NextResponse.json(
        { error: 'Invalid department' },
        { status: 400 }
      );
    }

    console.log(`[Faculty API] Fetching faculty from ${tableName}`);

    // Query faculty data sorted by designation and date of joining
    let sql = `SELECT * FROM ${tableName} ORDER BY name ASC`;
    
    // Try with standard field names first, but be flexible
    try {
      const rows = await query<RowDataPacket[]>(sql);
      
      console.log(`[Faculty API] Retrieved ${rows.length} faculty members from ${tableName}`);

      // Normalize field names to be consistent
      const normalizedFaculty = rows.map((row: any) => ({
        id: row.id,
        name: row.name || row.title || '',
        qualification: row.qualification || '',
        designation: row.designation || '',
        profile_url: row.profile_url || row.profileUrl || row.image_url || null,
        date_of_joining: row.date_of_joining || row.dateOfJoining || null,
        email: row.email || null,
        phone: row.phone || null,
        department: dept,
      }));

      return NextResponse.json(normalizedFaculty);
    } catch (error) {
      console.warn(`[Faculty API] Error with query, attempting with flexible column selection:`, error);
      
      // Fallback: Get all columns and normalize them
      const sql2 = `SELECT * FROM ${tableName} LIMIT 1000`;
      const rows = await query<RowDataPacket[]>(sql2);

      const normalizedFaculty = rows.map((row: any) => ({
        id: row.id,
        name: row.name || row.title || '',
        qualification: row.qualification || '',
        designation: row.designation || '',
        profile_url: row.profile_url || row.profileUrl || row.image_url || null,
        date_of_joining: row.date_of_joining || row.dateOfJoining || null,
        email: row.email || null,
        phone: row.phone || null,
        department: dept,
      }));

      return NextResponse.json(normalizedFaculty);
    }
  } catch (error) {
    console.error('[Faculty API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch faculty data' },
      { status: 500 }
    );
  }
}
