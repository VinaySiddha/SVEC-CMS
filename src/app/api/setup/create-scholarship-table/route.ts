import { NextResponse } from 'next/server';
import { createScholarshipTable } from '@/utils/scholarship-utils';

export async function GET() {
  try {
    await createScholarshipTable();
    return NextResponse.json({ message: "Scholarships table created successfully" });
  } catch (error) {
    console.error('Error creating scholarships table:', error);
    return NextResponse.json({ error: "Failed to create scholarships table" }, { status: 500 });
  }
}
