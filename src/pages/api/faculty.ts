import mysql from 'mysql2/promise';

// Department to table mapping
const departmentTableMap: Record<string, string> = {
  'AIML': 'aiml_faculty',
  'BSH': 'bsh_faculty',
  'CIVIL': 'civil_faculty',
  'CSE': 'cse_faculty',
  'CAI': 'cai_faculty',
  'CST': 'cst_faculty',
  'DS': 'ds_faculty',
  'ECE': 'ece_faculty',
  'ECT': 'ect_faculty',
  'EEE': 'eee_faculty',
  'MBA': 'mba_faculty',
  'MECH': 'mech_faculty',
};

export default async function handler(req: any, res: any) {
  const branchName = req.query.branchName as string;

  if (!branchName) {
    return res.status(400).json({ error: 'branchName parameter is required' });
  }

  // Get the table name for the branch
  const tableName = departmentTableMap[branchName.toUpperCase()];
  if (!tableName) {
    return res.status(400).json({ error: `Invalid branch: ${branchName}` });
  }

  const connection = await mysql.createConnection({
    host: '62.72.31.209',
    user: 'cmsuser',
    password: 'V@savi@2001',
    database: 'svec_cms',
  });

  try {
    // First, check which columns exist in the table
    const [columns]: any = await connection.execute(`DESCRIBE \`${tableName}\``);
    const columnNames = columns.map((col: any) => col.Field);
    const hasDateOfJoining = columnNames.includes('date_of_joining');
    const hasProfileUrl = columnNames.includes('profileUrl');
    const hasProfileUrlUnderscore = columnNames.includes('profile_url');

    // Build SQL dynamically based on available columns
    let sql: string;
    let profileColumn = 'NULL as profileUrl'; // default if no profile column exists
    
    if (hasProfileUrl) {
      profileColumn = 'profileUrl';
    } else if (hasProfileUrlUnderscore) {
      profileColumn = 'profile_url as profileUrl';
    }
    
    if (hasDateOfJoining) {
      sql = `SELECT id, name, qualification, designation, date_of_joining, ${profileColumn} 
             FROM \`${tableName}\` 
             ORDER BY designation, date_of_joining`;
    } else {
      sql = `SELECT id, name, qualification, designation, ${profileColumn} 
             FROM \`${tableName}\` 
             ORDER BY designation, id`;
    }
    
    const [rows] = await connection.execute(sql);


    // Normalize field names
    const faculty = (rows as any[]).map((row: any) => ({
      id: row.id,
      name: row.name || '',
      qualification: row.qualification || '',
      designation: row.designation || '',
      date_of_joining: row.date_of_joining,
      profile_url: row.profileUrl,
      profileUrl: row.profileUrl,
    }));

    res.status(200).json(faculty);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch faculty data', details: error.message });
  } finally {
    await connection.end();
  }
}
