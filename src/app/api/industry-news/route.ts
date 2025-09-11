import { NextRequest, NextResponse } from "next/server";
import { getAllIndustryNews, getIndustryNewsByDepartment } from "@/utils/industry-news-utils";
import { query } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Helper function to ensure upload directory exists
async function ensureUploadDir() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'industry-news');
  try {
    await mkdir(uploadsDir, { recursive: true });
    return uploadsDir;
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
}

// GET /api/industry-news
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dept = searchParams.get('dept');
    const limitParam = searchParams.get('limit');
    const offsetParam = searchParams.get('offset');
    
    const limit = limitParam ? parseInt(limitParam) : null;
    const offset = offsetParam ? parseInt(offsetParam) : 0;
    
    let news;
    if (dept) {
      news = await getIndustryNewsByDepartment(dept, { limit, offset });
    } else {
      news = await getAllIndustryNews({ limit, offset });
    }
    
    return NextResponse.json(news);
  } catch (error: any) {
    console.error('Error fetching industry news:', error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch industry news" },
      { status: 500 }
    );
  }
}

// POST /api/industry-news
export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const formData = await req.formData();
    const dept = formData.get('dept') as string;
    const title = formData.get('title') as string;
    const organization = formData.get('organization') as string;
    const date = formData.get('date') as string;
    const description = formData.get('description') as string || null;
    const documentFile = formData.get('document_file') as File | null;
    
    // Validate required fields
    if (!dept || !title || !organization || !date) {
      return NextResponse.json(
        { error: "Department, title, organization, and date are required" },
        { status: 400 }
      );
    }
    
    let document_url = null;
    
    // Process document file if provided
    if (documentFile) {
      // Check file size (max 10MB)
      if (documentFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Document file size should be less than 10MB" },
          { status: 400 }
        );
      }
      
      // Save the file
      const uploadsDir = await ensureUploadDir();
      const fileName = `industry_news_${uuidv4()}${path.extname(documentFile.name)}`;
      const filePath = path.join(uploadsDir, fileName);
      
      const buffer = Buffer.from(await documentFile.arrayBuffer());
      await writeFile(filePath, buffer);
      
      document_url = fileName;
    }
    
    // Save to database
    const [result] = await query<any>(
      `INSERT INTO industry_news (dept, title, organization, date, description, document_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [dept, title, organization, date, description, document_url]
    );
    
    const id = result.insertId;
    
    // Fetch the created news item
    const [newItem] = await query<any>(
      `SELECT id, dept, title, organization, date, description, document_url, created_at, updated_at 
       FROM industry_news WHERE id = ?`,
      [id]
    );
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error('Error creating industry news:', error);
    return NextResponse.json(
      { error: error.message || "Failed to create industry news" },
      { status: 500 }
    );
  }
}
