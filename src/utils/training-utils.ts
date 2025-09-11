import { query } from '@/lib/db';
import { uploadFile, deleteFile } from './file-upload';
import { Training } from '@/types/trainings';

export interface TrainingFormData {
  title: string;
  provider: string;
  hours: number;
  date_from: string;
  date_to: string;
  certificate?: File;
}

/**
 * Create the trainings table in the database
 */
export async function createTrainingsTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS trainings (
      id VARCHAR(36) PRIMARY KEY,
      dept VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      provider VARCHAR(255) NOT NULL,
      hours INT NOT NULL,
      date_from DATE NOT NULL,
      date_to DATE NOT NULL,
      certificate_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await query(createTableSQL);
    console.log('Trainings table created successfully');
    return { success: true, message: 'Trainings table created successfully' };
  } catch (error) {
    console.error('Error creating trainings table:', error);
    return { success: false, message: `Error creating trainings table: ${error}` };
  }
}

/**
 * Get all trainings for a specific department
 */
export async function getTrainings(deptId: string) {
  try {
    const trainings = await query(
      'SELECT * FROM trainings WHERE dept = ? ORDER BY date_from DESC',
      [deptId]
    );
    return { success: true, trainings };
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return { success: false, message: `Error fetching trainings: ${error}`, trainings: [] };
  }
}

/**
 * Get a specific training by ID
 */
export async function getTraining(deptId: string, trainingId: string) {
  try {
    const results = await query(
      'SELECT * FROM trainings WHERE id = ? AND dept = ?',
      [trainingId, deptId]
    );

    if (Array.isArray(results) && results.length > 0) {
      return { success: true, training: results[0] };
    } else {
      return { success: false, message: 'Training not found', training: null };
    }
  } catch (error) {
    console.error('Error fetching training:', error);
    return { success: false, message: `Error fetching training: ${error}`, training: null };
  }
}

/**
 * Create a new training entry
 */
export async function createTraining(
  deptId: string, 
  data: TrainingFormData,
  certificateFile?: File
) {
  try {
    const { title, provider, hours, date_from, date_to } = data;
    const id = crypto.randomUUID();
    
    // Upload certificate if provided
    let certificateUrl = null;
    if (certificateFile) {
      const uploadResult = await uploadFile(certificateFile, { 
        directory: `trainings/${deptId}/${id}`,
        fileType: 'documents'
      });
      if (uploadResult.success) {
        certificateUrl = uploadResult.url;
      }
    }
    
    // Insert into database
    const result = await query(
      `INSERT INTO trainings 
       (id, dept, title, provider, hours, date_from, date_to, certificate_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, deptId, title, provider, hours, date_from, date_to, certificateUrl]
    );
    
    return { 
      success: true, 
      message: 'Training created successfully',
      training: {
        id,
        dept: deptId,
        title,
        provider,
        hours,
        date_from,
        date_to,
        certificate_url: certificateUrl,
      }
    };
  } catch (error) {
    console.error('Error creating training:', error);
    return { success: false, message: `Error creating training: ${error}` };
  }
}

/**
 * Update an existing training entry
 */
export async function updateTraining(
  deptId: string,
  trainingId: string,
  data: TrainingFormData,
  certificateFile?: File
) {
  try {
    // Get current training data to compare
    const currentTraining = await getTraining(deptId, trainingId);
    if (!currentTraining.success) {
      return { success: false, message: 'Training not found' };
    }
    
    const { title, provider, hours, date_from, date_to } = data;
    const training = currentTraining.training as Training;
    
    // Handle certificate upload if new file provided
    let certificateUrl = training.certificate_url;
    if (certificateFile) {
      // Delete old certificate if exists
      if (certificateUrl) {
        await deleteFile(certificateUrl);
      }
      
      // Upload new certificate
      const uploadResult = await uploadFile(certificateFile, {
        directory: `trainings/${deptId}/${trainingId}`,
        fileType: 'documents'
      });
      if (uploadResult.success) {
        certificateUrl = uploadResult.url;
      }
    }
    
    // Update database
    await query(
      `UPDATE trainings 
       SET title = ?, provider = ?, hours = ?, date_from = ?, date_to = ?, certificate_url = ?
       WHERE id = ? AND dept = ?`,
      [title, provider, hours, date_from, date_to, certificateUrl, trainingId, deptId]
    );
    
    return { 
      success: true, 
      message: 'Training updated successfully',
      training: {
        id: trainingId,
        dept: deptId,
        title,
        provider,
        hours,
        date_from,
        date_to,
        certificate_url: certificateUrl,
      }
    };
  } catch (error) {
    console.error('Error updating training:', error);
    return { success: false, message: `Error updating training: ${error}` };
  }
}

/**
 * Delete a training entry
 */
export async function deleteTraining(deptId: string, trainingId: string) {
  try {
    // Get current training data
    const currentTraining = await getTraining(deptId, trainingId);
    if (!currentTraining.success) {
      return { success: false, message: 'Training not found' };
    }
    
    const training = currentTraining.training as Training;
    
    // Delete certificate if exists
    if (training.certificate_url) {
      await deleteFile(training.certificate_url);
    }
    
    // Delete from database
    await query('DELETE FROM trainings WHERE id = ? AND dept = ?', [trainingId, deptId]);
    
    return { success: true, message: 'Training deleted successfully' };
  } catch (error) {
    console.error('Error deleting training:', error);
    return { success: false, message: `Error deleting training: ${error}` };
  }
}
