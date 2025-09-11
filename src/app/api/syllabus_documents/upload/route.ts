import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { parseMultipartForm, saveFile } from '@/utils/file-upload';
import { isValidSyllabusType } from '@/utils/syllabus-utils';

/**
 * Upload syllabus document file
 * POST /api/syllabus_documents/upload
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const user = await requireAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Parse multipart form data
    const { fields, files } = await parseMultipartForm(req);
    
    // Validate required fields
    if (!fields.dept) {
      return NextResponse.json({ error: 'Department is required' }, { status: 400 });
    }
    
    if (!fields.type) {
      return NextResponse.json({ error: 'Document type is required' }, { status: 400 });
    }
    
    // Validate document type against department rules
    if (!isValidSyllabusType(fields.dept, fields.type)) {
      return NextResponse.json(
        { error: `Document type '${fields.type}' is not allowed for department '${fields.dept}'` },
        { status: 400 }
      );
    }
    
    // Get the file
    const file = files.file;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    
    // Save the file
    const result = await saveFile(file, `syllabus/${fields.dept}`, {
      fileType: 'documents',
      // Add academic year to filename for better organization
      fileName: fields.academic_year 
        ? `${fields.type}_${fields.academic_year.replace('-', '_')}_${file.name}`
        : `${fields.type}_${file.name}`
    });
    
    // Check for errors
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    // Return the file path
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      fileName: result.fileName,
      filePath: result.filePath 
    });
    
  } catch (error) {
    console.error('Error uploading syllabus document:', error);
    return NextResponse.json(
      { error: 'Failed to upload syllabus document' },
      { status: 500 }
    );
  }
}
