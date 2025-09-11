import { NextResponse } from 'next/server';
import { createAssociationsTable } from '@/utils/association-utils';

export async function GET() {
  try {
    await createAssociationsTable();
    return NextResponse.json({ message: "Associations table created successfully" });
  } catch (error) {
    console.error('Error creating associations table:', error);
    return NextResponse.json({ error: "Failed to create associations table" }, { status: 500 });
  }
}
