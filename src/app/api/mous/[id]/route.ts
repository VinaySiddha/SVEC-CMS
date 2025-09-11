import { NextRequest, NextResponse } from "next/server";
import { getMOUById } from "@/utils/mou-utils";
import { query } from "@/lib/db";
import path from "path";
import fs from "fs/promises";

// GET /api/mous/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const mou = await getMOUById(id);
    
    if (!mou) {
      return NextResponse.json(
        { error: "MOU not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(mou);
  } catch (error: any) {
    console.error(`Error fetching MOU ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch MOU" },
      { status: 500 }
    );
  }
}

// PUT /api/mous/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if MOU exists
    const existingMOU = await getMOUById(id);
    if (!existingMOU) {
      return NextResponse.json(
        { error: "MOU not found" },
        { status: 404 }
      );
    }
    
    // Parse form data
    const formData = await req.formData();
    const dept = formData.get('dept') as string;
    const organization_name = formData.get('organization_name') as string;
    const from_date = formData.get('from_date') as string;
    const to_date = formData.get('to_date') as string;
    const documentFile = formData.get('document_file') as File | null;
    
    // Validate required fields
    if (!dept || !organization_name) {
      return NextResponse.json(
        { error: "Department and organization name are required" },
        { status: 400 }
      );
    }
    
    // Update database record
    let fileName = existingMOU.document_url;
    
    // If there's a new document file, process it
    if (documentFile) {
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
      
      // Save the new file
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'mous');
      fileName = `mou_${Date.now()}.pdf`;
      const filePath = path.join(uploadsDir, fileName);
      
      const buffer = Buffer.from(await documentFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      
      // Delete the old file if it exists
      try {
        const oldFilePath = path.join(uploadsDir, existingMOU.document_url);
        await fs.unlink(oldFilePath);
      } catch (err) {
        // Ignore error if file doesn't exist
        console.warn(`Could not delete old file: ${existingMOU.document_url}`);
      }
    }
    
    // Update the database record
    await query(
      `UPDATE mous 
       SET dept = ?, organization_name = ?, from_date = ?, to_date = ?, document_url = ?, updated_at = NOW() 
       WHERE id = ?`,
      [dept, organization_name, from_date || null, to_date || null, fileName, id]
    );
    
    // Get updated record
    const updatedMOU = await getMOUById(id);
    
    return NextResponse.json(updatedMOU);
  } catch (error: any) {
    console.error(`Error updating MOU ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to update MOU" },
      { status: 500 }
    );
  }
}

// DELETE /api/mous/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Get MOU to find the file to delete
    const mou = await getMOUById(id);
    
    if (!mou) {
      return NextResponse.json(
        { error: "MOU not found" },
        { status: 404 }
      );
    }
    
    // Soft delete the record
    await query(
      `UPDATE mous SET deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    
    // We're not actually deleting the file in case it needs to be recovered
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error deleting MOU ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to delete MOU" },
      { status: 500 }
    );
  }
}
