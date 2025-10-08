import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || '62.72.31.209',
  user: process.env.DB_USER || 'cmsuser',
  password: process.env.DB_PASSWORD || 'V@savi@2001',
  database: process.env.DB_NAME || 'svec_cms',
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
    const data = await request.json();

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

    const [result] = await connection.execute(
      `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES (${placeholders})`,
      values
    );

    await connection.end();

    return NextResponse.json({
      success: true,
      data: {
        id: (result as any).insertId,
        message: 'Record created successfully'
      }
    });

  } catch (error) {
    console.error('Error creating record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create record' },
      { status: 500 }
    );
  }
}