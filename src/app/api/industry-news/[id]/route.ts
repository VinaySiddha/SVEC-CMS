import { NextRequest, NextResponse } from "next/server";
import { getIndustryNewsById } from "@/utils/industry-news-utils";
import { query } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// GET /api/industry-news/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const news = await getIndustryNewsById(id);
    
    if (!news) {
      return NextResponse.json(
        { error: "Industry news item not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(news);
  } catch (error: any) {
    console.error(`Error fetching industry news ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch industry news" },
      { status: 500 }
    );
  }
}

// PUT /api/industry-news/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Check if news item exists
    const existingNews = await getIndustryNewsById(id);
    if (!existingNews) {
      return NextResponse.json(
        { error: "Industry news item not found" },
        { status: 404 }
      );
    }
    
    // Parse form data
    const formData = await req.formData();
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const organization = formData.get('organization') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string || null;
    const documentFile = formData.get('document_file') as File | null;
    const removeDocument = formData.get('remove_document') === 'true';
    
    // Validate required fields
    if (!dept || !title || !organization || !date) {
      return NextResponse.json(
        { error: "Department, title, organization, and date are required" },
        { status: 400 }
      );
    }
    
    // Update database record
    let document_url = existingNews.document_url;
    
    // Handle document removal
    if (removeDocument && !documentFile) {
      document_url = null;
      
      // Delete existing file if it exists
      if (existingNews.document_url) {
        try {
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'industry-news');
          const filePath = path.join(uploadsDir, existingNews.document_url);
          await fs.unlink(filePath);
        } catch (err) {
          console.warn(`Could not delete file: ${existingNews.document_url}`);
        }
      }
    }
    
    // If there's a new document file, process it
    if (documentFile) {
      // Check file size (max 10MB)
      if (documentFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Document file size should be less than 10MB" },
          { status: 400 }
        );
      }
      
      // Save the new file
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'industry-news');
      const fileName = `industry_news_${uuidv4()}${path.extname(documentFile.name)}`;
      const filePath = path.join(uploadsDir, fileName);
      
      const buffer = Buffer.from(await documentFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);
      
      // Delete the old file if it exists
      if (existingNews.document_url) {
        try {
          const oldFilePath = path.join(uploadsDir, existingNews.document_url);
          await fs.unlink(oldFilePath);
        } catch (err) {
          console.warn(`Could not delete old file: ${existingNews.document_url}`);
        }
      }
      
      document_url = fileName;
    }
    
    // Update the database record
    await query(
      `UPDATE industry_news 
       SET dept = ?, title = ?, organization = ?, date = ?, description = ?, document_url = ?, updated_at = NOW() 
       WHERE id = ?`,
      [dept, title, organization, date, description, document_url, id]
    );
    
    // Get updated record
    const updatedNews = await getIndustryNewsById(id);
    
    return NextResponse.json(updatedNews);
  } catch (error: any) {
    console.error(`Error updating industry news ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to update industry news" },
      { status: 500 }
    );
  }
}

// DELETE /api/industry-news/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Get news item to find the file to delete
    const news = await getIndustryNewsById(id);
    
    if (!news) {
      return NextResponse.json(
        { error: "Industry news item not found" },
        { status: 404 }
      );
    }
    
    // Soft delete the record
    await query(
      `UPDATE industry_news SET deleted_at = NOW() WHERE id = ?`,
      [id]
    );
    
    // We're not actually deleting the file in case it needs to be recovered
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`Error deleting industry news ${params.id}:`, error);
    return NextResponse.json(
      { error: error.message || "Failed to delete industry news" },
      { status: 500 }
    );
  }
}
