import { query } from '@/lib/db';
import { uploadFile, deleteFile } from '@/utils/file-upload';
import { Issue } from '@/types/issues';

export interface IssueFormData {
  issue: string;
  date: string;
  document?: File;
}

/**
 * Create the issues table in the database
 */
export async function createIssuesTable() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS issues (
      id VARCHAR(36) PRIMARY KEY,
      dept VARCHAR(100) NOT NULL,
      issue VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      document_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

  try {
    await query(createTableSQL);
    return { success: true, message: 'Issues table created successfully' };
  } catch (error) {
    return { success: false, message: `Error creating issues table: ${error}` };
  }
}

/**
 * Get all issues for a specific department
 */
export async function getIssues(deptId: string) {
  try {
    const issues = await query<Issue[]>(
      'SELECT * FROM issues WHERE dept = ? ORDER BY date DESC',
      [deptId]
    );
    return { success: true, issues };
  } catch (error) {
    return { success: false, message: `Error fetching issues: ${error}`, issues: [] };
  }
}

/**
 * Get a specific issue by ID
 */
export async function getIssue(deptId: string, issueId: string) {
  try {
    const results = await query<Issue[]>(
      'SELECT * FROM issues WHERE id = ? AND dept = ?',
      [issueId, deptId]
    );

    if (results && results.length > 0) {
      return { success: true, issue: results[0] };
    } else {
      return { success: false, message: 'Issue not found', issue: null };
    }
  } catch (error) {
    return { success: false, message: `Error fetching issue: ${error}`, issue: null };
  }
}

/**
 * Create a new issue entry
 */
export async function createIssue(
  deptId: string, 
  data: IssueFormData,
  documentFile?: File
) {
  try {
    const { issue, date } = data;
    const id = crypto.randomUUID();
    
    // Upload document if provided
    let documentUrl = null;
    if (documentFile) {
      const uploadResult = await uploadFile(documentFile, { 
        directory: `issues/${deptId}/${id}`,
        fileType: 'documents'
      });
      if (uploadResult.success) {
        documentUrl = uploadResult.url;
      }
    }
    
    // Insert into database
    await query(
      `INSERT INTO issues 
       (id, dept, issue, date, document_url) 
       VALUES (?, ?, ?, ?, ?)`,
      [id, deptId, issue, date, documentUrl]
    );
    
    return { 
      success: true, 
      message: 'Issue created successfully',
      issue: {
        id,
        dept: deptId,
        issue,
        date,
        document_url: documentUrl,
      }
    };
  } catch (error) {
    return { success: false, message: `Error creating issue: ${error}` };
  }
}

/**
 * Update an existing issue entry
 */
export async function updateIssue(
  deptId: string,
  issueId: string,
  data: IssueFormData,
  documentFile?: File
) {
  try {
    // Get current issue data
    const currentIssue = await getIssue(deptId, issueId);
    if (!currentIssue.success || !currentIssue.issue) {
      return { success: false, message: 'Issue not found' };
    }
    
    const { issue, date } = data;
    
    // Handle document upload if new file provided
    let documentUrl = currentIssue.issue.document_url;
    if (documentFile) {
      // Delete old document if exists
      if (documentUrl) {
        await deleteFile(documentUrl);
      }
      
      // Upload new document
      const uploadResult = await uploadFile(documentFile, {
        directory: `issues/${deptId}/${issueId}`,
        fileType: 'documents'
      });
      if (uploadResult.success) {
        documentUrl = uploadResult.url;
      }
    }
    
    // Update database
    await query(
      `UPDATE issues 
       SET issue = ?, date = ?, document_url = ?
       WHERE id = ? AND dept = ?`,
      [issue, date, documentUrl, issueId, deptId]
    );
    
    return { 
      success: true, 
      message: 'Issue updated successfully',
      issue: {
        id: issueId,
        dept: deptId,
        issue,
        date,
        document_url: documentUrl,
      }
    };
  } catch (error) {
    return { success: false, message: `Error updating issue: ${error}` };
  }
}

/**
 * Delete an issue entry
 */
export async function deleteIssue(deptId: string, issueId: string) {
  try {
    // Get current issue data
    const currentIssue = await getIssue(deptId, issueId);
    if (!currentIssue.success || !currentIssue.issue) {
      return { success: false, message: 'Issue not found' };
    }
    
    // Delete document if exists
    if (currentIssue.issue.document_url) {
      await deleteFile(currentIssue.issue.document_url);
    }
    
    // Delete from database
    await query('DELETE FROM issues WHERE id = ? AND dept = ?', [issueId, deptId]);
    
    return { success: true, message: 'Issue deleted successfully' };
  } catch (error) {
    return { success: false, message: `Error deleting issue: ${error}` };
  }
}
