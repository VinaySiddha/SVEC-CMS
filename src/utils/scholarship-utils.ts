import { query } from '@/lib/db';
import { uploadFile, deleteFile } from './file-upload';

export type ScholarshipCategory = 'Merit' | 'Topper' | 'Other';

export interface Scholarship {
  id: number;
  dept: string;
  academic_year: string;
  category: ScholarshipCategory;
  student_name: string;
  amount: number;
  proof_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ScholarshipFormData {
  academic_year: string;
  category: ScholarshipCategory;
  student_name: string;
  amount: string;
  proof?: File;
}

/**
 * Create the scholarships database table
 * @returns Operation result
 */
export async function createScholarshipTable() {
  try {
    // Check if the table already exists
    const checkTable = await query<any>(`SHOW TABLES LIKE 'scholarships'`);

    if (checkTable.length === 0) {
      // Create the scholarships table
      await query(`
        CREATE TABLE scholarships (
          id INT AUTO_INCREMENT PRIMARY KEY,
          dept VARCHAR(10) NOT NULL,
          academic_year VARCHAR(10) NOT NULL,
          category ENUM('Merit', 'Topper', 'Other') NOT NULL,
          student_name VARCHAR(100) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          proof_url VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      return { success: true, message: 'Scholarships table created successfully' };
    } else {
      return { success: true, message: 'Scholarships table already exists' };
    }
  } catch (error) {
    return { success: false, error: 'Failed to create scholarships table' };
  }
}

/**
 * Get scholarships for a specific department
 * @param deptId Department ID
 * @returns List of scholarships
 */
export async function getScholarships(deptId: string): Promise<Scholarship[]> {
  try {
    const scholarships = await query<Scholarship>(
      'SELECT * FROM scholarships WHERE dept = ? ORDER BY academic_year DESC, category, student_name',
      [deptId]
    );
    return scholarships;
  } catch (error) {
    throw error;
  }
}

/**
 * Get a specific scholarship by ID
 * @param scholarshipId Scholarship ID
 * @returns Scholarship data
 */
export async function getScholarship(scholarshipId: number): Promise<Scholarship | null> {
  try {
    const scholarships = await query<Scholarship>(
      'SELECT * FROM scholarships WHERE id = ?',
      [scholarshipId]
    );
    
    return scholarships.length > 0 ? scholarships[0] : null;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new scholarship
 * @param deptId Department ID
 * @param data Scholarship form data
 * @returns Operation result
 */
export async function createScholarship(
  deptId: string,
  data: ScholarshipFormData
): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    let proofUrl = null;
    
    // Handle file upload if proof is provided
    if (data.proof) {
      const uploadResult = await uploadFile(data.proof, {
        directory: `scholarships/${deptId}`,
        fileType: 'documents',
        allowedFileTypes: ['application/pdf']
      });
      
      if (uploadResult.success && uploadResult.url) {
        proofUrl = uploadResult.url;
      } else {
        return { success: false, error: uploadResult.error || 'Failed to upload proof document' };
      }
    }
    
    // Insert scholarship record
    const result = await query<any>(
      `INSERT INTO scholarships 
        (dept, academic_year, category, student_name, amount, proof_url) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [deptId, data.academic_year, data.category, data.student_name, data.amount, proofUrl]
    );
    
    // Check if the insert was successful by querying the last inserted ID
    const insertResult = await query<{id: number}>(
      'SELECT LAST_INSERT_ID() as id'
    );
    
    if (insertResult.length > 0 && insertResult[0].id) {
      return { success: true, id: insertResult[0].id };
    } else {
      return { success: false, error: 'Failed to create scholarship record' };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while creating scholarship' };
  }
}

/**
 * Update an existing scholarship
 * @param scholarshipId Scholarship ID
 * @param data Updated scholarship data
 * @returns Operation result
 */
export async function updateScholarship(
  scholarshipId: number,
  data: ScholarshipFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get existing scholarship
    const existing = await getScholarship(scholarshipId);
    if (!existing) {
      return { success: false, error: 'Scholarship not found' };
    }
    
    let proofUrl = existing.proof_url;
    
    // Handle file upload if proof is provided
    if (data.proof) {
      // Delete existing proof if it exists
      if (existing.proof_url) {
        await deleteFile(existing.proof_url);
      }
      
      const uploadResult = await uploadFile(data.proof, {
        directory: `scholarships/${existing.dept}`,
        fileType: 'documents',
        allowedFileTypes: ['application/pdf']
      });
      
      if (uploadResult.success && uploadResult.url) {
        proofUrl = uploadResult.url;
      } else {
        return { success: false, error: uploadResult.error || 'Failed to upload proof document' };
      }
    }
    
    // Update scholarship record
    await query(
      `UPDATE scholarships 
       SET academic_year = ?, 
           category = ?, 
           student_name = ?, 
           amount = ?, 
           proof_url = ? 
       WHERE id = ?`,
      [data.academic_year, data.category, data.student_name, data.amount, proofUrl, scholarshipId]
    );
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An error occurred while updating scholarship' };
  }
}

/**
 * Delete a scholarship
 * @param scholarshipId Scholarship ID
 * @returns Operation result
 */
export async function deleteScholarship(scholarshipId: number): Promise<{ success: boolean; error?: string }> {
  try {
    // Get existing scholarship
    const existing = await getScholarship(scholarshipId);
    if (!existing) {
      return { success: false, error: 'Scholarship not found' };
    }
    
    // Delete associated file if exists
    if (existing.proof_url) {
      await deleteFile(existing.proof_url);
    }
    
    // Delete scholarship record
    await query('DELETE FROM scholarships WHERE id = ?', [scholarshipId]);
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'An error occurred while deleting scholarship' };
  }
}
