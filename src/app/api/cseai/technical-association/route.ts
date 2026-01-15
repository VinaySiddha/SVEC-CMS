import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const department = searchParams.get('dept') || 'cseai';
        const activityType = searchParams.get('activity_type');
        const dataType = searchParams.get('type') || 'activities'; // 'activities', 'coordinators', 'events', 'gallery'
        const activityId = searchParams.get('activity_id');

        let sql = '';
        const params: (string | number)[] = [];

        // CSE-AI table prefix
        const prefix = 'cai_';

        switch (dataType) {
            case 'coordinators':
                // Fetch coordinators for a specific activity or all
                sql = `
                    SELECT id, activity_id, name, designation, role, email, phone, order_seq, created_at
                    FROM ${prefix}activity_coordinators
                `;
                if (activityId) {
                    sql += ` WHERE activity_id = ?`;
                    params.push(activityId);
                }
                sql += ` ORDER BY order_seq ASC, name ASC`;
                break;

            case 'events':
                // Fetch events for a specific activity or all
                sql = `
                    SELECT id, activity_id, academic_year, event_title, event_date, description, file_url, image_url, created_at
                    FROM ${prefix}activity_events
                `;
                if (activityId) {
                    sql += ` WHERE activity_id = ?`;
                    params.push(activityId);
                } else if (searchParams.has('academic_year')) {
                    sql += ` WHERE academic_year = ?`;
                    params.push(searchParams.get('academic_year')!);
                }
                sql += ` ORDER BY event_date DESC, created_at DESC`;
                break;

            case 'gallery':
                // Fetch gallery images for a specific activity or all
                sql = `
                    SELECT id, activity_id, academic_year, image_url, image_title, description, order_seq, created_at
                    FROM ${prefix}activity_gallery
                `;
                if (activityId) {
                    sql += ` WHERE activity_id = ?`;
                    params.push(activityId);
                } else if (searchParams.has('academic_year')) {
                    sql += ` WHERE academic_year = ?`;
                    params.push(searchParams.get('academic_year')!);
                }
                sql += ` ORDER BY order_seq ASC, created_at DESC`;
                break;

            case 'activities':
            default:
                // Fetch main technical association activities
                sql = `
                    SELECT id, activity_name, category, academic_year, description, faculty_coordinator_name, 
                           faculty_coordinator_designation, image_url, status, created_at, updated_at
                    FROM ${prefix}extracurricular_activities
                    WHERE status = 'active'
                `;

                if (activityType) {
                    sql += ` AND category = ?`;
                    params.push(activityType);
                }

                sql += ` ORDER BY created_at DESC`;
                break;
        }

        const result = await query(sql, params);

        return NextResponse.json({
            success: true,
            type: dataType,
            department,
            data: result
        });
    } catch (error) {
        console.error('Error fetching technical association data:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch technical association data', error: String(error) },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const dataType = searchParams.get('type') || 'activities';
        const body = await request.json();

        const prefix = 'cai_';
        let sql = '';
        let params: (string | number | boolean)[] = [];

        switch (dataType) {
            case 'coordinators':
                sql = `
                    INSERT INTO ${prefix}activity_coordinators 
                    (activity_id, name, designation, role, email, phone, order_seq)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                params = [
                    body.activity_id,
                    body.name,
                    body.designation || null,
                    body.role,
                    body.email || null,
                    body.phone || null,
                    body.order_seq || 0
                ];
                break;

            case 'events':
                sql = `
                    INSERT INTO ${prefix}activity_events 
                    (activity_id, academic_year, event_title, event_date, description, file_url, image_url)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                params = [
                    body.activity_id,
                    body.academic_year,
                    body.event_title,
                    body.event_date || null,
                    body.description || null,
                    body.file_url || null,
                    body.image_url || null
                ];
                break;

            case 'gallery':
                sql = `
                    INSERT INTO ${prefix}activity_gallery 
                    (activity_id, academic_year, image_url, image_title, description, order_seq)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                params = [
                    body.activity_id,
                    body.academic_year || null,
                    body.image_url,
                    body.image_title || null,
                    body.description || null,
                    body.order_seq || 0
                ];
                break;

            default:
                return NextResponse.json(
                    { success: false, message: 'Invalid data type' },
                    { status: 400 }
                );
        }

        const result = await query(sql, params);

        return NextResponse.json({
            success: true,
            type: dataType,
            message: 'Record created successfully',
            id: (result as any).insertId
        });
    } catch (error) {
        console.error('Error creating technical association record:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to create record', error: String(error) },
            { status: 500 }
        );
    }
}
