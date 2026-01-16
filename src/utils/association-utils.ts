import { query } from '@/lib/db';
import { uploadFile, deleteFile } from './file-upload';
import { Association, AssociationEvent } from '@/types/associations';

export interface AssociationFormData {
  name: string;
  role: string;
  description: string;
  proof?: File;
  events?: AssociationEvent[];
}

/**
 * Create the associations database table
 * @returns Operation result
 */
export async function createAssociationsTable() {
  try {
    // Check if the table already exists
    const checkTable = await query<any>(`SHOW TABLES LIKE 'associations'`);

    if (checkTable.length === 0) {
      // Create the associations table
      await query(`
        CREATE TABLE associations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          dept VARCHAR(10) NOT NULL,
          name VARCHAR(100) NOT NULL,
          role VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          proof_url VARCHAR(255),
          gallery JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      return { success: true, message: 'Associations table created successfully' };
    } else {
      return { success: true, message: 'Associations table already exists' };
    }
  } catch (error) {
    return { success: false, error: 'Failed to create associations table' };
  }
}

/**
 * Get associations for a specific department
 * @param deptId Department ID
 * @returns List of associations
 */
export async function getAssociations(deptId: string): Promise<Association[]> {
  try {
    const associations = await query<Association>(
      'SELECT * FROM associations WHERE dept = ? ORDER BY name',
      [deptId]
    );
    return associations;
  } catch (error) {
    throw error;
  }
}

/**
 * Get a specific association by ID
 * @param associationId Association ID
 * @returns Association data
 */
export async function getAssociation(associationId: number): Promise<Association | null> {
  try {
    const associations = await query<Association>(
      'SELECT * FROM associations WHERE id = ?',
      [associationId]
    );
    
    return associations.length > 0 ? associations[0] : null;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new association
 * @param deptId Department ID
 * @param data Association form data
 * @returns Operation result
 */
export async function createAssociation(
  deptId: string,
  data: AssociationFormData
): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    let proofUrl = null;
    
    // Handle file upload if proof is provided
    if (data.proof) {
      const uploadResult = await uploadFile(data.proof, {
        directory: `associations/${deptId}`,
        fileType: 'documents'
      });
      
      if (uploadResult.success && uploadResult.url) {
        proofUrl = uploadResult.url;
      } else {
        return { success: false, error: uploadResult.error || 'Failed to upload proof document' };
      }
    }
    
    // Prepare gallery data
    const gallery = data.events && data.events.length > 0 ? JSON.stringify(data.events) : null;
    
    // Insert association record
    const result = await query<any>(
      `INSERT INTO associations 
        (dept, name, role, description, proof_url, gallery) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [deptId, data.name, data.role, data.description, proofUrl, gallery]
    );
    
    // Check if the insert was successful by querying the last inserted ID
    const insertResult = await query<{id: number}>(
      'SELECT LAST_INSERT_ID() as id'
    );
    
    if (insertResult.length > 0 && insertResult[0].id) {
      return { success: true, id: insertResult[0].id };
    } else {
      return { success: false, error: 'Failed to create association record' };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while creating association' };
  }
}

/**
 * Update an existing association
 * @param associationId Association ID
 * @param data Updated association data
 * @returns Operation result
 */
export async function updateAssociation(
  associationId: number,
  data: AssociationFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get existing association
    const existing = await getAssociation(associationId);
    if (!existing) {
      return { success: false, error: 'Association not found' };
    }
    
    let proofUrl = existing.proof_url;
    
    // Handle file upload if proof is provided
    if (data.proof) {
      // Delete existing proof if it exists
      if (existing.proof_url) {
        await deleteFile(existing.proof_url);
      }
      
      const uploadResult = await uploadFile(data.proof, {
        directory: `associations/${existing.dept}`,
        fileType: 'documents'
      });
      
      if (uploadResult.success && uploadResult.url) {
        proofUrl = uploadResult.url;
      } else {
        return { success: false, error: uploadResult.error || 'Failed to upload proof document' };
      }
    }
    
    // Prepare gallery data
    const gallery = data.events && data.events.length > 0 ? JSON.stringify(data.events) : null;
    
    // Update association record
    await query(
      `UPDATE associations 
       SET name = ?, 
           role = ?, 
           description = ?, 
           proof_url = ?,
           gallery = ?
       WHERE id = ?`,
      [data.name, data.role, data.description, proofUrl, gallery, associationId]
    );
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An error occurred while updating association' };
  }
}

/**
 * Delete an association
 * @param associationId Association ID
 * @returns Operation result
 */
export async function deleteAssociation(associationId: number): Promise<{ success: boolean; error?: string }> {
  try {
    // Get existing association
    const existing = await getAssociation(associationId);
    if (!existing) {
      return { success: false, error: 'Association not found' };
    }
    
    // Delete associated file if exists
    if (existing.proof_url) {
      await deleteFile(existing.proof_url);
    }
    
    // Delete association record
    await query('DELETE FROM associations WHERE id = ?', [associationId]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An error occurred while deleting association' };
  }
}
