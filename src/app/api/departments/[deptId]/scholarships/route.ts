import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { uploadFile } from '@/utils/file-upload';

export async function GET(
  req: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    
    // Get all scholarships for the department
    const scholarships = await query<any>(
      `SELECT * FROM scholarships WHERE dept = ? ORDER BY academic_year DESC, created_at DESC`,
      [deptId]
    );

    return NextResponse.json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scholarships' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { deptId: string } }
) {
  try {
    const deptId = params.deptId;
    const formData = await req.formData();
    
    const academic_year = formData.get('academic_year') as string;
    const category = formData.get('category') as string;
    const student_name = formData.get('student_name') as string;
    const amount = parseFloat(formData.get('amount') as string);
    const proofFile = formData.get('proof_file') as File | null;
    
    // Validate required fields
    if (!academic_year || !category || !student_name || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }
    
    // Upload the proof file if provided
    let proof_url = null;
    if (proofFile) {
      const uploadResult = await uploadFile(proofFile, {
        directory: 'scholarships',
        fileType: 'documents'
      });
      if (uploadResult.success) {
        proof_url = uploadResult.url;
      } else {
        return NextResponse.json(
          { error: 'Failed to upload proof file' },
          { status: 500 }
        );
      }
    }
    
    // Insert the scholarship record into the database
    await query(
      `INSERT INTO scholarships (dept, academic_year, category, student_name, amount, proof_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [deptId, academic_year, category, student_name, amount, proof_url]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding scholarship:', error);
    return NextResponse.json(
      { error: 'Failed to add scholarship' },
      { status: 500 }
    );
  }
}
