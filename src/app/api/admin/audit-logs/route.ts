import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/auth';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin or super admin
    if (decoded.role !== 'admin' && decoded.role !== 'super_admin') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;
    const action = searchParams.get('action') || 'all';
    const department = searchParams.get('department') || 'all';
    const days = parseInt(searchParams.get('days') || '7');
    const search = searchParams.get('search') || '';
    const exportData = searchParams.get('export') === 'true';

    // Build WHERE clause
    let whereClause = `WHERE al.created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)`;
    let params: any[] = [];

    if (action !== 'all') {
      whereClause += ' AND al.action = ?';
      params.push(action);
    }

    if (department !== 'all') {
      whereClause += ' AND al.department = ?';
      params.push(department);
    }

    if (search) {
      whereClause += ' AND (u.username LIKE ? OR al.action LIKE ? OR al.resource_type LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // If exporting, return CSV data
    if (exportData) {
      const logs = await query<RowDataPacket[]>(`
        SELECT 
          al.created_at,
          u.username,
          al.action,
          al.resource_type,
          al.resource_id,
          al.department,
          al.ip_address,
          al.old_values,
          al.new_values
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        ${whereClause}
        ORDER BY al.created_at DESC
      `, params);

      // Convert to CSV
      const csvHeaders = ['Timestamp', 'Username', 'Action', 'Resource Type', 'Resource ID', 'Department', 'IP Address', 'Old Values', 'New Values'];
      const csvData = [csvHeaders.join(',')];
      
      logs.forEach((log: any) => {
        const row = [
          new Date(log.created_at).toISOString(),
          log.username || 'Unknown',
          log.action,
          log.resource_type,
          log.resource_id || '',
          log.department || '',
          log.ip_address || '',
          log.old_values ? JSON.stringify(log.old_values).replace(/"/g, '""') : '',
          log.new_values ? JSON.stringify(log.new_values).replace(/"/g, '""') : ''
        ];
        csvData.push(row.map(field => `"${field}"`).join(','));
      });

      return new NextResponse(csvData.join('\n'), {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    // Get total count for pagination
    const countResult = await query<RowDataPacket[]>(`
      SELECT COUNT(*) as total
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ${whereClause}
    `, params);

    const total = countResult[0]?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Get paginated logs
    const logs = await query<RowDataPacket[]>(`
      SELECT 
        al.id,
        al.user_id,
        u.username,
        al.action,
        al.resource_type,
        al.resource_id,
        al.department,
        al.old_values,
        al.new_values,
        al.ip_address,
        al.user_agent,
        al.created_at
      FROM audit_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ${whereClause}
      ORDER BY al.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, limit, offset]);

    return NextResponse.json({
      success: true,
      logs: logs || [],
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });

  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}