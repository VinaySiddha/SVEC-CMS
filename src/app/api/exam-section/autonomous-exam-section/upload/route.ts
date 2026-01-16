import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import db from '@/lib/db';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;
    const degree = formData.get('degree') as string;
    const content = formData.get('content') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds limit' },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    if (!degree || !['UG', 'PG'].includes(degree)) {
      return NextResponse.json(
        { error: 'Invalid degree' },
        { status: 400 }
      );
    }

    const validTypes = [
      'examination_rules',
      'notifications', 
      'time_tables',
      'revaluation_results',
      'Regular',
      'Supply',
      'Fee Notification',
      'Circular',
      'Timetable',
      'Rules'
    ];
    
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const baseDir = join(process.cwd(), 'public', 'autonomous-exam-section');
    const typeDir = join(baseDir, type);
    const degreeDir = join(typeDir, degree);

    for (const dir of [baseDir, typeDir, degreeDir]) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${type}_${degree}_${timestamp}_${randomString}.pdf`;
    const filePath = join(degreeDir, fileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    const publicUrl = `/autonomous-exam-section/${type}/${degree}/${fileName}`;

    try {
      const currentDate = new Date().toISOString().split('T')[0];
      
      const query = `
        INSERT INTO autonomous_exam_section (date, type, degree, content, link, posteddate)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const dbResult = await db.query(query, [
        currentDate,
        type,
        degree,
        content,
        publicUrl,
        currentDate
      ]);

    } catch (dbError) {
    }

    return NextResponse.json({
      success: true,
      link: publicUrl,
      message: 'File uploaded successfully',
      fileSize: Math.round(file.size / 1024)
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}