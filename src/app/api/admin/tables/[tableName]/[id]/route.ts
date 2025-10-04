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
    console.error('Error fetching record:', error);
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
    const data = await request.json();

    const connection = await mysql.createConnection(dbConfig);

    // Get table columns to validate data
    const [columnsResult] = await connection.execute(
      `SHOW COLUMNS FROM ${tableName}`
    );
    const columns = (columnsResult as any[]).map(col => col.Field);
    const updatableColumns = columns.filter(col => col !== 'id' && !col.includes('created_at'));

    // Prepare update data
    const updateData: any = {};
    updatableColumns.forEach(col => {
      if (data[col] !== undefined) {
        updateData[col] = data[col];
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

    const [result] = await connection.execute(
      `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );

    await connection.end();

    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'Record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        message: 'Record updated successfully'
      }
    });

  } catch (error) {
    console.error('Error updating record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update record' },
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

    return NextResponse.json({
      success: true,
      data: {
        message: 'Record deleted successfully'
      }
    });

  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete record' },
      { status: 500 }
    );
  }
}