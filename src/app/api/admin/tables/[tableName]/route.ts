import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const dbConfig = {
  host: process.env.DB_HOST || '62.72.31.209',
  user: process.env.DB_USER || 'cmsuser',
  password: process.env.DB_PASSWORD || 'V@savi@2001',
  database: process.env.DB_NAME || 'svec_cms',
};

// Allowed file types by field type
const ALLOWED_FILE_TYPES: { [key: string]: { extensions: string[]; mimeTypes: string[] } } = {
  'image_file': {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
  },
  'pdf_file': {
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf']
  },
  'document_file': {
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'],
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain']
  }
};

// Map field names to their expected file types
const FIELD_FILE_TYPE_MAP: { [key: string]: string } = {
  'profile_url': 'image_file',
  'profileUrl': 'image_file',
  'image_url': 'image_file',
  'photo_url': 'image_file',
  'image': 'image_file',
  'banner': 'image_file',
  'banner_url': 'image_file',
  'hod_image_url': 'image_file',
  'pdf_url': 'pdf_file',
  'document': 'document_file',
  'document_url': 'document_file',
  'file_url': 'document_file',
  'attachment': 'document_file',
  'file': 'document_file',
  'link': 'document_file'
};

const validateFileType = (filename: string, mimeType: string, fieldName: string): { valid: boolean; error?: string } => {
  const fileType = FIELD_FILE_TYPE_MAP[fieldName];
  if (!fileType) {
    // If field not in map, allow any file
    return { valid: true };
  }

  const allowed = ALLOWED_FILE_TYPES[fileType];
  if (!allowed) {
    return { valid: true };
  }

  const fileExtension = '.' + filename.split('.').pop()?.toLowerCase();
  const fileMimeType = mimeType.toLowerCase();

  const isValidExtension = allowed.extensions.some(ext => fileExtension === ext.toLowerCase());
  const isValidMimeType = allowed.mimeTypes.some(mt => fileMimeType === mt);

  if (!isValidExtension || !isValidMimeType) {
    return {
      valid: false,
      error: `File type not allowed for ${fieldName}. Allowed: ${allowed.extensions.join(', ')}`
    };
  }

  return { valid: true };
};
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const resolvedParams = await params;
    const tableName = resolvedParams.tableName;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100'); // Increased default to 100
    const search = searchParams.get('search') || '';
    
    const offset = (page - 1) * limit;

    const connection = await mysql.createConnection(dbConfig);

    // First, get table columns
    const [columnsResult] = await connection.execute(
      `SHOW COLUMNS FROM ${tableName}`
    );
    const columns = (columnsResult as any[]).map(col => col.Field);

    // Build search condition
    let searchCondition = '';
    let queryParams: any[] = [];
    
    if (search) {
      const searchableColumns = columns.filter(col => 
        !col.includes('id') && !col.includes('date') && !col.includes('time')
      );
      
      if (searchableColumns.length > 0) {
        searchCondition = `WHERE ${searchableColumns.map(col => `${col} LIKE ?`).join(' OR ')}`;
        queryParams = searchableColumns.map(() => `%${search}%`);
      }
    }

    // Get total count
    const [countResult] = await connection.execute(
      `SELECT COUNT(*) as total FROM ${tableName} ${searchCondition}`,
      queryParams
    );
    const total = (countResult as any[])[0].total;

    // Get paginated records
    const [records] = await connection.execute(
      `SELECT * FROM ${tableName} ${searchCondition} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`,
      queryParams
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      data: {
        records: records as any[],
        columns,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching table data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch table data' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string }> }
) {
  try {
    const resolvedParams = await params;
    const tableName = resolvedParams.tableName;
    
    let data: any = {};
    const uploadedFiles: { [key: string]: string } = {};

    // Check if request is FormData
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      // Extract regular fields and files
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Validate file type
          const validation = validateFileType(value.name, value.type, key);
          if (!validation.valid) {
            return NextResponse.json(
              { success: false, error: validation.error },
              { status: 400 }
            );
          }

          // Save file
          const uploadDir = join(process.cwd(), 'public', 'uploads');
          if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
          }

          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(2, 8);
          const fileName = `${timestamp}_${randomStr}_${value.name.replace(/[^a-z0-9._-]/gi, '_').toLowerCase()}`;
          const filePath = join(uploadDir, fileName);
          
          const bytes = await value.arrayBuffer();
          await writeFile(filePath, Buffer.from(bytes));
          
          uploadedFiles[key] = `/uploads/${fileName}`;
          data[key] = `/uploads/${fileName}`;
        } else {
          data[key] = value;
        }
      }
    } else {
      // Regular JSON request
      data = await request.json();
    }

    const connection = await mysql.createConnection(dbConfig);

    // Get table columns to validate data
    const [columnsResult] = await connection.execute(
      `SHOW COLUMNS FROM ${tableName}`
    );
    const columns = (columnsResult as any[]).map(col => col.Field);
    const insertableColumns = columns.filter(col => col !== 'id' && !col.includes('created_at') && !col.includes('updated_at'));

    // Prepare insert data
    const insertData: any = {};
    insertableColumns.forEach(col => {
      if (data[col] !== undefined) {
        insertData[col] = data[col];
      }
    });

    if (Object.keys(insertData).length === 0) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'No valid data provided' },
        { status: 400 }
      );
    }

    // Insert record
    const fields = Object.keys(insertData);
    const values = Object.values(insertData);
    const placeholders = fields.map(() => '?').join(', ');

    try {
      const [result] = await connection.execute(
        `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`,
        values
      );

      const insertId = (result as any).insertId;

      // Verify that file URLs were properly saved if files were uploaded
      if (Object.keys(uploadedFiles).length > 0) {
        const [verifyResult] = await connection.execute(
          `SELECT * FROM ${tableName} WHERE id = ?`,
          [insertId]
        );
        
        const savedRecord = (verifyResult as any[])[0];
        
        // Check if any file URLs are missing from the saved record
        const missingUrls = [];
        for (const [fieldName, fileUrl] of Object.entries(uploadedFiles)) {
          if (!savedRecord[fieldName] || savedRecord[fieldName] !== fileUrl) {
            missingUrls.push({ field: fieldName, expectedUrl: fileUrl });
          }
        }

        if (missingUrls.length > 0) {
          console.warn('Warning: File URLs not properly saved to database', {
            recordId: insertId,
            tableName,
            missingUrls
          });

          // Attempt to update the missing URLs
          for (const { field, expectedUrl } of missingUrls) {
            try {
              await connection.execute(
                `UPDATE ${tableName} SET ${field} = ? WHERE id = ?`,
                [expectedUrl, insertId]
              );
            } catch (updateError) {
              console.error(`Failed to update ${field} for record ${insertId}:`, updateError);
            }
          }
        }
      }

      await connection.end();

      return NextResponse.json({
        success: true,
        data: {
          id: insertId,
          message: 'Record created successfully',
          filesUploaded: Object.keys(uploadedFiles).length,
          uploadedFiles: uploadedFiles
        }
      });
    } catch (insertError) {
      console.error('Error inserting record:', insertError);
      throw insertError;
    }

  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create record', details: String(error) },
      { status: 500 }
    );
  }
}