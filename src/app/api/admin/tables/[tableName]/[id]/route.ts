import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { unlink, writeFile, mkdir } from 'fs/promises';
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
  { params }: { params: Promise<{ tableName: string; id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { tableName, id } = resolvedParams;

    const connection = await mysql.createConnection(dbConfig);

    // Get single record
    const [records] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    await connection.end();

    const record = (records as any[])[0];
    
    if (!record) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: record
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch record' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string; id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { tableName, id } = resolvedParams;
    
    let data: any = {};

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

    // Get the existing record to check for files to delete
    const [existingRecords] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    const existingRecord = (existingRecords as any[])[0];

    // Get table columns to validate data
    const [columnsResult] = await connection.execute(
      `SHOW COLUMNS FROM ${tableName}`
    );
    const columns = (columnsResult as any[]).map(col => col.Field);
    const updatableColumns = columns.filter(col => col !== 'id' && !col.includes('created_at'));

    // Prepare update data
    const updateData: any = {};
    const fileColumns = [
      'profileUrl', 'profile_url', 'image_url', 'photo_url', 'attachment', 
      'document', 'file_url', 'pdf_url', 'link', 'document_url', 'file',
      'hod_image_url', 'image', 'banner', 'banner_url'
    ];

    updatableColumns.forEach(col => {
      if (data[col] !== undefined) {
        updateData[col] = data[col];

        // If a file column is being updated, delete the old file
        if (existingRecord && fileColumns.some(fcol => fcol.toLowerCase() === col.toLowerCase())) {
          const oldFileUrl = existingRecord[col];
          if (oldFileUrl && data[col] !== oldFileUrl) {
            // File has been replaced, delete old file
            if (!oldFileUrl.startsWith('http')) {
              try {
                const filePath = join(process.cwd(), 'public', oldFileUrl.replace(/^\//, ''));
                unlink(filePath).catch(err => {
                  // Continue even if deletion fails
                });
              } catch (error) {
              }
            }
          }
        }
      }
    });

    if (Object.keys(updateData).length === 0) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'No valid data provided' },
        { status: 400 }
      );
    }

    // Update record
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const fileFieldsBeingUpdated = fields.filter(f => fileColumns.some(fc => fc.toLowerCase() === f.toLowerCase()));

    try {
      const [result] = await connection.execute(
        `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
        [...values, id]
      );

      if ((result as any).affectedRows === 0) {
        await connection.end();
        return NextResponse.json(
          { success: false, error: 'Record not found' },
          { status: 404 }
        );
      }

      // Verify file URLs were properly saved if files were updated
      if (fileFieldsBeingUpdated.length > 0) {
        const [verifyResult] = await connection.execute(
          `SELECT * FROM ${tableName} WHERE id = ?`,
          [id]
        );
        
        const savedRecord = (verifyResult as any[])[0];
        const missingUrls = [];

        for (const field of fileFieldsBeingUpdated) {
          const expectedUrl = updateData[field];
          if (expectedUrl && (!savedRecord[field] || savedRecord[field] !== expectedUrl)) {
            missingUrls.push({ field, expectedUrl });
          }
        }

        if (missingUrls.length > 0) {
          // Attempt to update the missing URLs
          for (const { field, expectedUrl } of missingUrls) {
            try {
              await connection.execute(
                `UPDATE ${tableName} SET ${field} = ? WHERE id = ?`,
                [expectedUrl, id]
              );
            } catch (updateError) {
            }
          }
        }
      }

      await connection.end();

      return NextResponse.json({
        success: true,
        data: {
          message: 'Record updated successfully',
          filesUpdated: fileFieldsBeingUpdated.length
        }
      });
    } catch (updateError) {
      await connection.end();
      return NextResponse.json(
        { success: false, error: 'Failed to update record', details: String(updateError) },
        { status: 500 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process record update', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ tableName: string; id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { tableName, id } = resolvedParams;

    const connection = await mysql.createConnection(dbConfig);

    // Get the record first to extract file URLs
    const [records] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    const record = (records as any[])[0];

    // Delete record
    const [result] = await connection.execute(
      `DELETE FROM ${tableName} WHERE id = ?`,
      [id]
    );

    await connection.end();

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    // Delete associated files if the record had file URLs
    if (record) {
      const fileColumns = [
        'profileUrl', 'profile_url', 'image_url', 'photo_url', 'attachment', 
        'document', 'file_url', 'pdf_url', 'link', 'document_url', 'file',
        'hod_image_url', 'image', 'banner', 'banner_url'
      ];

      for (const [key, value] of Object.entries(record)) {
        if (fileColumns.some(col => col.toLowerCase() === key.toLowerCase()) && value) {
          const fileUrl = value as string;
          if (fileUrl && (fileUrl.startsWith('/') || fileUrl.startsWith('http'))) {
            try {
              // Extract path from URL
              let filePath: string;
              if (fileUrl.startsWith('http')) {
                // It's a full URL, skip it
                continue;
              } else {
                // It's a relative path
                filePath = join(process.cwd(), 'public', fileUrl.replace(/^\//, ''));
              }
              
              await unlink(filePath);
            } catch (error) {
              // Continue with deletion even if file doesn't exist
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Record deleted successfully'
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete record' },
      { status: 500 }
    );
  }
}