import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query, execute, withTransaction } from '@/lib/db';
import { requireAuth, AuthUser } from '@/lib/auth';
import { validateModuleAccess } from '@/lib/validation/accessValidation';

/**
 * Types for CRUD operations
 */

export type CrudConfig<T> = {
  /** Table name in the database */
  tableName: string;
  
  /** Entity name for messages and logs (e.g., "faculty profile") */
  entityName: string;
  
  /** Unique identifier field(s) */
  keyFields: string[];
  
  /** Fields allowed for insert/update */
  allowedFields: string[];
  
  /** Validation schema */
  zodSchema: z.ZodType<T>;
  
  /** Whether entities are scoped to departments */
  departmentScoped: boolean;
  
  /** Module type for permissions */
  moduleType: string;
  
  /** Whether to use admin approval flow */
  requiresApproval: boolean;
  
  /** Custom field mappings (field -> db column) */
  fieldMappings?: Record<string, string>;
  
  /** Default sort field */
  defaultSortField?: string;
};

/**
 * CRUD factory for creating standardized API handlers
 */
export class CrudFactory<T> {
  private config: CrudConfig<T>;
  
  constructor(config: CrudConfig<T>) {
    this.config = config;
  }
  
  /**
   * List items with filtering
   */
  public list = async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const department = url.searchParams.get('dept');
      const status = url.searchParams.get('status');
      const isActive = url.searchParams.get('is_active');
      const limit = parseInt(url.searchParams.get('limit') || '100', 10);
      const offset = parseInt(url.searchParams.get('offset') || '0', 10);
      const sortBy = url.searchParams.get('sort') || this.config.defaultSortField || 'created_at';
      const sortOrder = url.searchParams.get('order')?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      
      // Build query conditions
      let conditions = ['deleted_at IS NULL'];
      const params = [];
      
      // Apply department filter if configured for department scoping
      if (this.config.departmentScoped && department) {
        conditions.push('department = ?');
        params.push(department);
      }
      
      // Apply status filter if provided
      if (status) {
        conditions.push('status = ?');
        params.push(status);
      }
      
      // Apply is_active filter if provided
      if (isActive !== null) {
        conditions.push('is_active = ?');
        params.push(isActive === '1' || isActive === 'true');
      }
      
      // Get items with pagination
      const items = await query(`
        SELECT * FROM ${this.config.tableName}
        WHERE ${conditions.join(' AND ')}
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ? OFFSET ?
      `, [...params, limit, offset]);
      
      // Get total count for pagination
      const [countResult] = await query<{total: number}>(`
        SELECT COUNT(*) as total FROM ${this.config.tableName}
        WHERE ${conditions.join(' AND ')}
      `, params);
      
      return NextResponse.json({
        items,
        meta: {
          total: countResult.total,
          limit,
          offset,
          hasMore: offset + items.length < countResult.total
        }
      });
    } catch (error) {
      console.error(`Error listing ${this.config.entityName}:`, error);
      return NextResponse.json(
        { error: `Failed to fetch ${this.config.entityName} items` },
        { status: 500 }
      );
    }
  }
  
  /**
   * Create a new item
   */
  public create = async (req: NextRequest) => {
    try {
      // Check authentication
      const user = await requireAuth(req);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // Validate module access
      const moduleValidation = validateModuleAccess(this.config.moduleType, user);
      if (!moduleValidation.isValid) {
        return moduleValidation.response;
      }
      
      // Parse and validate request body
      const body = await req.json();
      const validationResult = this.config.zodSchema.safeParse(body);
      
      if (!validationResult.success) {
        return NextResponse.json(
          { error: validationResult.error.errors[0].message },
          { status: 400 }
        );
      }
      
      const data = validationResult.data as Record<string, any>;
      
      // Determine department (admin can specify department, dept users use their own)
      const department = user.role === 'admin' && body.department 
        ? body.department 
        : user.department;
        
      if (this.config.departmentScoped && !department) {
        return NextResponse.json(
          { error: 'Department is required' },
          { status: 400 }
        );
      }
      
      // Set initial status based on approval requirement
      const initialStatus = this.config.requiresApproval ? 'pending' : 'approved';
      
      // Build insert fields and values
      const insertFields: string[] = [];
      const insertParams: any[] = [];
      const placeholders: string[] = [];
      
      // Add all allowed fields from the request
      for (const field of this.config.allowedFields) {
        // Skip undefined fields
        if (data[field] === undefined) continue;
        
        // Map field name to DB column if mapping exists
        const dbColumn = this.config.fieldMappings?.[field] || field;
        insertFields.push(dbColumn);
        insertParams.push(data[field]);
        placeholders.push('?');
      }
      
      // Add standard fields
      if (this.config.departmentScoped) {
        insertFields.push('department');
        insertParams.push(department);
        placeholders.push('?');
      }
      
      insertFields.push('status', 'created_by', 'is_active');
      insertParams.push(initialStatus, user.id, data.is_active !== undefined ? data.is_active : true);
      placeholders.push('?', '?', '?');
      
      // Execute the insert within a transaction if approval is needed
      let insertId: number = 0;
      
      if (this.config.requiresApproval) {
        await withTransaction(async (connection) => {
          // Insert the main record
          const [result] = await connection.execute<any>(`
            INSERT INTO ${this.config.tableName} (${insertFields.join(', ')})
            VALUES (${placeholders.join(', ')})
          `, insertParams);
          
          insertId = result.insertId;
          
          // Create admin approval record
          await connection.execute(`
            INSERT INTO admin_approvals
              (module, record_id, status, comments)
            VALUES
              (?, ?, 'pending', ?)
          `, [this.config.tableName, insertId, `New ${this.config.entityName} created by ${user.username}`]);
        });
      } else {
        // Simple insert without approval
        const result = await execute<{ insertId: number }>(`
          INSERT INTO ${this.config.tableName} (${insertFields.join(', ')})
          VALUES (${placeholders.join(', ')})
        `, insertParams);
        
        insertId = result.insertId;
      }
      
      // Fetch the created item
      const [item] = await query(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ?
      `, [insertId]);
      
      return NextResponse.json({ 
        message: `${this.config.entityName} created successfully${this.config.requiresApproval ? ' and pending approval' : ''}`,
        item
      }, { status: 201 });
      
    } catch (error) {
      console.error(`Error creating ${this.config.entityName}:`, error);
      return NextResponse.json(
        { error: `Failed to create ${this.config.entityName}` },
        { status: 500 }
      );
    }
  }
  
  /**
   * Update an existing item
   */
  public update = async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    try {
      // Check authentication
      const user = await requireAuth(req);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // Validate module access
      const moduleValidation = validateModuleAccess(this.config.moduleType, user);
      if (!moduleValidation.isValid) {
        return moduleValidation.response;
      }
      
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: `Invalid ${this.config.entityName} ID` }, 
          { status: 400 }
        );
      }
      
      // Parse and validate request body
      const body = await req.json();
      // Cast to any to access partial() which exists on Zod objects but TypeScript doesn't recognize it
      const schema = this.config.zodSchema as any;
      const validationResult = schema.partial().safeParse(body);
      
      if (!validationResult.success) {
        return NextResponse.json(
          { error: validationResult.error.errors[0].message },
          { status: 400 }
        );
      }
      
      const data = validationResult.data as Record<string, any>;
      
      // Check if item exists and can be updated
      const [existingItem] = await query<Record<string, any>>(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ? AND deleted_at IS NULL
      `, [id]);
      
      if (!existingItem) {
        return NextResponse.json(
          { error: `${this.config.entityName} not found` },
          { status: 404 }
        );
      }
      
      // Check department access if department-scoped
      if (this.config.departmentScoped && 
          user.role !== 'admin' && 
          existingItem.department !== user.department) {
        return NextResponse.json(
          { error: `You don't have permission to update this ${this.config.entityName}` },
          { status: 403 }
        );
      }
      
      // Check if item can be updated based on status
      if (existingItem.status === 'approved' && user.role !== 'admin') {
        return NextResponse.json(
          { error: `Cannot update an approved ${this.config.entityName}. Please request a new revision.` },
          { status: 403 }
        );
      }
      
      // Build update fields and values
      const updateFields = [];
      const updateParams = [];
      
      // Add all allowed fields from the request
      for (const field of this.config.allowedFields) {
        // Skip undefined fields
        if (data[field] === undefined) continue;
        
        // Map field name to DB column if mapping exists
        const dbColumn = this.config.fieldMappings?.[field] || field;
        updateFields.push(`${dbColumn} = ?`);
        updateParams.push(data[field]);
      }
      
      // Skip update if no fields to update
      if (updateFields.length === 0) {
        return NextResponse.json({ 
          message: 'No changes detected',
          item: existingItem
        });
      }
      
      // Add standard fields for update
      updateFields.push('updated_at = NOW()');
      
      // Add ID as the last parameter
      updateParams.push(id);
      
      // Execute update
      await execute(`
        UPDATE ${this.config.tableName}
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `, updateParams);
      
      // Fetch updated item
      const [updatedItem] = await query(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ?
      `, [id]);
      
      return NextResponse.json({ 
        message: `${this.config.entityName} updated successfully`,
        item: updatedItem
      });
      
    } catch (error) {
      console.error(`Error updating ${this.config.entityName}:`, error);
      return NextResponse.json(
        { error: `Failed to update ${this.config.entityName}` },
        { status: 500 }
      );
    }
  }
  
  /**
   * Soft delete an item
   */
  public remove = async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    try {
      // Check authentication
      const user = await requireAuth(req);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // Validate module access
      const moduleValidation = validateModuleAccess(this.config.moduleType, user);
      if (!moduleValidation.isValid) {
        return moduleValidation.response;
      }
      
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: `Invalid ${this.config.entityName} ID` }, 
          { status: 400 }
        );
      }
      
      // Check if item exists and can be deleted
      const [existingItem] = await query<Record<string, any>>(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ? AND deleted_at IS NULL
      `, [id]);
      
      if (!existingItem) {
        return NextResponse.json(
          { error: `${this.config.entityName} not found` },
          { status: 404 }
        );
      }
      
      // Check department access if department-scoped
      if (this.config.departmentScoped && 
          user.role !== 'admin' && 
          existingItem.department !== user.department) {
        return NextResponse.json(
          { error: `You don't have permission to delete this ${this.config.entityName}` },
          { status: 403 }
        );
      }
      
      // Soft delete the item
      await execute(`
        UPDATE ${this.config.tableName}
        SET 
          deleted_at = NOW(), 
          status = 'rejected',
          updated_at = NOW()
        WHERE id = ?
      `, [id]);
      
      return NextResponse.json({ 
        message: `${this.config.entityName} deleted successfully`
      });
      
    } catch (error) {
      console.error(`Error deleting ${this.config.entityName}:`, error);
      return NextResponse.json(
        { error: `Failed to delete ${this.config.entityName}` },
        { status: 500 }
      );
    }
  }
  
  /**
   * Submit an item for approval
   */
  public submitForApproval = async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    try {
      // Check authentication
      const user = await requireAuth(req);
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      // Validate module access
      const moduleValidation = validateModuleAccess(this.config.moduleType, user);
      if (!moduleValidation.isValid) {
        return moduleValidation.response;
      }
      
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: `Invalid ${this.config.entityName} ID` }, 
          { status: 400 }
        );
      }
      
      // Check if item exists
      const [existingItem] = await query<Record<string, any>>(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ? AND deleted_at IS NULL
      `, [id]);
      
      if (!existingItem) {
        return NextResponse.json(
          { error: `${this.config.entityName} not found` },
          { status: 404 }
        );
      }
      
      // Check department access if department-scoped
      if (this.config.departmentScoped && 
          user.role !== 'admin' && 
          existingItem.department !== user.department) {
        return NextResponse.json(
          { error: `You don't have permission to submit this ${this.config.entityName} for approval` },
          { status: 403 }
        );
      }
      
      // Check if already submitted
      if (existingItem.status !== 'draft') {
        return NextResponse.json(
          { error: `This ${this.config.entityName} is already ${existingItem.status}` },
          { status: 400 }
        );
      }
      
      // Parse request body for comments
      const body = await req.json();
      const comments = body.comments || `Submitted ${this.config.entityName} for approval`;
      
      // Update status and create approval record
      await withTransaction(async (connection) => {
        // Update status to pending
        await connection.execute(`
          UPDATE ${this.config.tableName}
          SET status = 'pending', updated_at = NOW()
          WHERE id = ?
        `, [id]);
        
        // Create admin approval record
        await connection.execute(`
          INSERT INTO admin_approvals
            (module, record_id, status, comments)
          VALUES
            (?, ?, 'pending', ?)
        `, [this.config.tableName, id, comments]);
      });
      
      // Fetch updated item
      const [updatedItem] = await query(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ?
      `, [id]);
      
      return NextResponse.json({ 
        message: `${this.config.entityName} submitted for approval successfully`,
        item: updatedItem
      });
      
    } catch (error) {
      console.error(`Error submitting ${this.config.entityName} for approval:`, error);
      return NextResponse.json(
        { error: `Failed to submit ${this.config.entityName} for approval` },
        { status: 500 }
      );
    }
  }
  
  /**
   * Get a specific item by ID
   */
  public getById = async (req: NextRequest, { params }: { params: Record<string, string> }) => {
    try {
      const id = parseInt(params.id, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: `Invalid ${this.config.entityName} ID` }, 
          { status: 400 }
        );
      }
      
      // Get the item
      const [item] = await query(`
        SELECT * FROM ${this.config.tableName}
        WHERE id = ? AND deleted_at IS NULL
      `, [id]);
      
      if (!item) {
        return NextResponse.json(
          { error: `${this.config.entityName} not found` },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ item });
      
    } catch (error) {
      console.error(`Error fetching ${this.config.entityName}:`, error);
      return NextResponse.json(
        { error: `Failed to fetch ${this.config.entityName}` },
        { status: 500 }
      );
    }
  }
}
