import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

// GET /api/admin/placement-statistics - Get placement statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const academic_year = searchParams.get('academic_year');

    let sql = `
      SELECT 
        ps.*,
        COUNT(p.id) as actual_placements,
        COALESCE(AVG(p.package), 0) as calculated_avg_package,
        COALESCE(MAX(p.package), 0) as calculated_max_package,
        COALESCE(MIN(p.package), 0) as calculated_min_package
      FROM placement_statistics ps
      LEFT JOIN placements p ON ps.department_code = p.department_code 
        AND ps.academic_year = p.academic_year 
        AND p.status = 'approved' 
        AND p.deleted_at IS NULL
      WHERE 1=1
    `;
    const params: string[] = [];

    if (academic_year) {
      sql += ` AND ps.academic_year = ?`;
      params.push(academic_year);
    }

    sql += ` GROUP BY ps.id ORDER BY ps.academic_year DESC, ps.department_code`;

    const statistics = await query(sql, params);

    // Get available academic years
    const years = await query(`
      SELECT DISTINCT academic_year 
      FROM placement_statistics 
      ORDER BY academic_year DESC
    `);

    return NextResponse.json({
      success: true,
      data: {
        statistics,
        available_years: years.map((y: any) => y.academic_year)
      }
    });
  } catch (error) {
    console.error('Error fetching placement statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch placement statistics' },
      { status: 500 }
    );
  }
}

// POST /api/admin/placement-statistics - Create or update placement statistics
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      academic_year,
      department_code,
      department_name,
      total_students,
      students_placed,
      highest_package,
      lowest_package,
      average_package,
      median_package,
      companies_visited,
      offers_received,
      multiple_offers
    } = body;

    if (!academic_year || !department_code || !department_name) {
      return NextResponse.json(
        { success: false, message: 'Academic year, department code, and department name are required' },
        { status: 400 }
      );
    }

    // Calculate placement percentage
    const placement_percentage = total_students > 0 ? (students_placed / total_students) * 100 : 0;

    // Check if record exists
    const existing = await query(
      'SELECT id FROM placement_statistics WHERE academic_year = ? AND department_code = ?',
      [academic_year, department_code]
    );

    let result;
    if (existing.length > 0) {
      // Update existing record
      result = await execute(`
        UPDATE placement_statistics SET
          department_name = ?,
          total_students = ?,
          students_placed = ?,
          placement_percentage = ?,
          highest_package = ?,
          lowest_package = ?,
          average_package = ?,
          median_package = ?,
          companies_visited = ?,
          offers_received = ?,
          multiple_offers = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE academic_year = ? AND department_code = ?
      `, [
        department_name, total_students, students_placed, placement_percentage,
        highest_package, lowest_package, average_package, median_package,
        companies_visited, offers_received, multiple_offers,
        academic_year, department_code
      ]);
    } else {
      // Insert new record
      result = await execute(`
        INSERT INTO placement_statistics 
        (academic_year, department_code, department_name, total_students, students_placed, 
         placement_percentage, highest_package, lowest_package, average_package, median_package,
         companies_visited, offers_received, multiple_offers)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        academic_year, department_code, department_name, total_students, students_placed,
        placement_percentage, highest_package, lowest_package, average_package, median_package,
        companies_visited, offers_received, multiple_offers
      ]);
    }

    return NextResponse.json({
      success: true,
      message: existing.length > 0 ? 'Statistics updated successfully' : 'Statistics created successfully',
      data: { id: existing.length > 0 ? existing[0].id : result.insertId }
    });

  } catch (error) {
    console.error('Error saving placement statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save placement statistics' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/placement-statistics - Delete placement statistics
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Statistics ID is required' },
        { status: 400 }
      );
    }

    await execute('DELETE FROM placement_statistics WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Statistics deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting placement statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete placement statistics' },
      { status: 500 }
    );
  }
}