import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// Allowed modules
const ALLOWED_MODULES = ['carousel', 'officer', 'team', 'charts', 'category', 'logos', 'pdf'];

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 300 * 1024; // 300 KB
const MAX_PDF_SIZE = 1024 * 1024; // 1 MB

// Allowed file types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_PDF_TYPE = 'application/pdf';

// File extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const PDF_EXTENSION = '.pdf';

export async function POST(request: NextRequest) {
    try {
        // Parse form data
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const module = formData.get('module') as string | null;

        // Validate file presence
        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided. Please upload a file.' },
                { status: 400 }
            );
        }

        // Validate module
        if (!module || !ALLOWED_MODULES.includes(module)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid module. Allowed modules: ${ALLOWED_MODULES.join(', ')}`
                },
                { status: 400 }
            );
        }

        // Get file details
        const fileType = file.type;
        const fileSize = file.size;
        const fileName = file.name;
        const fileExtension = path.extname(fileName).toLowerCase();

        // Determine if file is image or PDF
        const isImage = ALLOWED_IMAGE_TYPES.includes(fileType);
        const isPDF = fileType === ALLOWED_PDF_TYPE;

        // Validate file type
        if (!isImage && !isPDF) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid file type. Allowed types: Images (jpg, jpeg, png, webp) or PDF`
                },
                { status: 400 }
            );
        }

        // Validate file extension matches type
        if (isImage && !IMAGE_EXTENSIONS.includes(fileExtension)) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Invalid file extension for image. Allowed: ${IMAGE_EXTENSIONS.join(', ')}`
                },
                { status: 400 }
            );
        }

        if (isPDF && fileExtension !== PDF_EXTENSION) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid file extension for PDF. Expected: .pdf'
                },
                { status: 400 }
            );
        }

        // Validate file size
        if (isImage && fileSize > MAX_IMAGE_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Image size exceeds maximum limit. Max allowed: 300 KB, uploaded: ${(fileSize / 1024).toFixed(2)} KB`
                },
                { status: 400 }
            );
        }

        if (isPDF && fileSize > MAX_PDF_SIZE) {
            return NextResponse.json(
                {
                    success: false,
                    error: `PDF size exceeds maximum limit. Max allowed: 1 MB, uploaded: ${(fileSize / 1024).toFixed(2)} KB`
                },
                { status: 400 }
            );
        }

        // Create upload directory path
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'placement', module);

        // Create directory if it doesn't exist
        if (!existsSync(uploadDir)) {
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (mkdirError) {
                console.error('Error creating directory:', mkdirError);
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Failed to create upload directory. Please try again.'
                    },
                    { status: 500 }
                );
            }
        }

        // Generate unique filename with timestamp
        const timestamp = Date.now();
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueFileName = `${timestamp}_${sanitizedFileName}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        // Convert file to buffer and write to disk
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            await writeFile(filePath, buffer);
        } catch (writeError) {
            console.error('Error writing file:', writeError);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Failed to save file. Please try again.'
                },
                { status: 500 }
            );
        }

        // Generate public URL
        const publicUrl = `/uploads/placement/${module}/${uniqueFileName}`;

        // Return success response
        return NextResponse.json(
            {
                success: true,
                url: publicUrl,
                filename: uniqueFileName,
                size: fileSize,
                type: fileType
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'An unexpected error occurred during file upload. Please try again.'
            },
            { status: 500 }
        );
    }
}
