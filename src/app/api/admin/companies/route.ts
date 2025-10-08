import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';

// GET /api/admin/companies - Get all companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const industry = searchParams.get('industry');
    const company_type = searchParams.get('company_type');
    const is_active = searchParams.get('is_active');

    let sql = `
      SELECT 
        c.*,
        COUNT(p.id) as total_placements,
        COUNT(DISTINCT p.academic_year) as years_visited,
        MAX(p.package) as max_package_offered,
        AVG(p.package) as avg_package_offered
      FROM companies c
      LEFT JOIN placements p ON c.id = p.company_id 
        AND p.status = 'approved' 
        AND p.deleted_at IS NULL
      WHERE c.deleted_at IS NULL
    `;
    const params: string[] = [];

    if (search) {
      sql += ` AND (c.name LIKE ? OR c.industry LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (industry) {
      sql += ` AND c.industry = ?`;
      params.push(industry);
    }

    if (company_type) {
      sql += ` AND c.company_type = ?`;
      params.push(company_type);
    }

    if (is_active !== null && is_active !== undefined) {
      sql += ` AND c.is_active = ?`;
      params.push(is_active);
    }

    sql += ` GROUP BY c.id ORDER BY c.name`;

    const companies = await query(sql, params);

    // Get distinct industries and company types for filters
    const filters = await query(`
      SELECT 
        DISTINCT industry,
        DISTINCT company_type
      FROM companies 
      WHERE deleted_at IS NULL AND industry IS NOT NULL AND company_type IS NOT NULL
    `);

    const industries = await query(`
      SELECT DISTINCT industry 
      FROM companies 
      WHERE deleted_at IS NULL AND industry IS NOT NULL 
      ORDER BY industry
    `);

    const companyTypes = await query(`
      SELECT DISTINCT company_type 
      FROM companies 
      WHERE deleted_at IS NULL AND company_type IS NOT NULL 
      ORDER BY company_type
    `);

    return NextResponse.json({
      success: true,
      data: {
        companies,
        filters: {
          industries: industries.map((i: any) => i.industry),
          company_types: companyTypes.map((t: any) => t.company_type)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch companies' },
      { status: 500 }
    );
  }
}

// POST /api/admin/companies - Create new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      logo_url,
      website,
      industry,
      company_type,
      contact_person,
      contact_email,
      contact_phone,
      address,
      city,
      state,
      country,
      is_active
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Company name is required' },
        { status: 400 }
      );
    }

    // Check if company already exists
    const existing = await query(
      'SELECT id FROM companies WHERE name = ? AND deleted_at IS NULL',
      [name]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Company with this name already exists' },
        { status: 409 }
      );
    }

    const result = await execute(`
      INSERT INTO companies 
      (name, logo_url, website, industry, company_type, contact_person, 
       contact_email, contact_phone, address, city, state, country, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, logo_url, website, industry, company_type, contact_person,
      contact_email, contact_phone, address, city, state, country || 'India',
      is_active !== undefined ? is_active : true
    ]);

    return NextResponse.json({
      success: true,
      message: 'Company created successfully',
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create company' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/companies - Update company
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      logo_url,
      website,
      industry,
      company_type,
      contact_person,
      contact_email,
      contact_phone,
      address,
      city,
      state,
      country,
      is_active
    } = body;

    if (!id || !name) {
      return NextResponse.json(
        { success: false, message: 'Company ID and name are required' },
        { status: 400 }
      );
    }

    // Check if company exists
    const existing = await query(
      'SELECT id FROM companies WHERE id = ? AND deleted_at IS NULL',
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Company not found' },
        { status: 404 }
      );
    }

    // Check if another company with same name exists
    const duplicate = await query(
      'SELECT id FROM companies WHERE name = ? AND id != ? AND deleted_at IS NULL',
      [name, id]
    );

    if (duplicate.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Company with this name already exists' },
        { status: 409 }
      );
    }

    await execute(`
      UPDATE companies SET
        name = ?, logo_url = ?, website = ?, industry = ?, company_type = ?,
        contact_person = ?, contact_email = ?, contact_phone = ?, address = ?,
        city = ?, state = ?, country = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      name, logo_url, website, industry, company_type, contact_person,
      contact_email, contact_phone, address, city, state, country || 'India',
      is_active !== undefined ? is_active : true, id
    ]);

    return NextResponse.json({
      success: true,
      message: 'Company updated successfully'
    });

  } catch (error) {
    console.error('Error updating company:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update company' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/companies - Delete company (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Company ID is required' },
        { status: 400 }
      );
    }

    // Check if company has associated placements
    const placements = await query(
      'SELECT COUNT(*) as count FROM placements WHERE company_id = ? AND deleted_at IS NULL',
      [id]
    );

    if (placements[0].count > 0) {
      // Soft delete - mark as deleted but keep data
      await execute(`
        UPDATE companies SET 
          deleted_at = CURRENT_TIMESTAMP,
          is_active = FALSE
        WHERE id = ?
      `, [id]);
    } else {
      // Hard delete if no associated placements
      await execute('DELETE FROM companies WHERE id = ?', [id]);
    }

    return NextResponse.json({
      success: true,
      message: 'Company deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting company:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete company' },
      { status: 500 }
    );
  }
}