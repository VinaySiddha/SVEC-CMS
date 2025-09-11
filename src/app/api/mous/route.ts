import { NextRequest, NextResponse } from "next/server";
import { getAllMOUs, getMOUsByDepartment } from "@/utils/mou-utils";
import { query } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'mous');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/mous
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    
    let mous;
    if (dept) {
      mous = await getMOUsByDepartment(dept);
    } else {
      mous = await getAllMOUs();
    }
    
    return NextResponse.json(mous);
  } catch (error: any) {
    console.error('Error fetching MOUs:', error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch MOUs" },
      { status: 500 }
    );
  }
}

// POST /api/mous
export async function POST(req: NextRequest) {
  try {
    // For this implementation, we're not checking authentication
    // In a real application, you would add authentication check here
    // e.g., const session = await getServerSession(authOptions);
    
    // Parse form data
    const formData = await req.formData();
    const dept = formData.get('dept') as string;
    const organization_name = formData.get('organization_name') as string;
    const from_date = formData.get('from_date') as string;
    const to_date = formData.get('to_date') as string;
    const documentFile = formData.get('document_file') as File;
    
    // Validate required fields
    if (!dept || !organization_name) {
      return NextResponse.json(
        { error: "Department and organization name are required" },
        { status: 400 }
      );
    }
    
    // Check document file
    if (!documentFile) {
      return NextResponse.json(
        { error: "Document file is required" },
        { status: 400 }
      );
    }
    
    // Check file size (max 5MB)
    if (documentFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Document file size should be less than 5MB" },
        { status: 400 }
      );
    }
    
    // Check file type
    if (documentFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: "Only PDF documents are allowed" },
        { status: 400 }
      );
    }
    
    // Save the file
    const uploadsDir = await ensureUploadDir();
    const fileName = `mou_${uuidv4()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);
    
    const buffer = Buffer.from(await documentFile.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Save to database
    const [result] = await query<any>(
      `INSERT INTO mous (dept, organization_name, from_date, to_date, document_url) 
       VALUES (?, ?, ?, ?, ?)`,
      [dept, organization_name, from_date || null, to_date || null, fileName]
    );
    
    const id = result.insertId;
    
    // Fetch the created MOU
    const [newMOU] = await query<any>(
      `SELECT id, dept, organization_name, from_date, to_date, document_url, created_at, updated_at 
       FROM mous WHERE id = ?`,
      [id]
    );
    
    return NextResponse.json(newMOU, { status: 201 });
  } catch (error: any) {
    console.error('Error creating MOU:', error);
    return NextResponse.json(
      { error: error.message || "Failed to create MOU" },
      { status: 500 }
    );
  }
}
