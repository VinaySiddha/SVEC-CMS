// API endpoint for department configurations
import mysql from 'mysql2/promise';

const dbConfig = {
  host: '62.72.31.209',
  user: 'cmsuser',
  password: 'V@savi@2001',
  database: 'svec_cms'
};

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const { dept_id } = query;

    if (dept_id) {
      // Get specific department configuration
      const [deptRows] = await connection.execute(
        'SELECT * FROM departments_config WHERE dept_id = ? AND status = ? ORDER BY id DESC LIMIT 1',
        [dept_id, 'active']
      );

      if (deptRows.length === 0) {
        return res.status(404).json({ 
          success: false, 
          error: 'Department not found' 
        });
      }

      const dept = deptRows[0];

      // Get specializations
      const [specRows] = await connection.execute(
        'SELECT specialization FROM departments_specializations WHERE dept_id = ? ORDER BY order_index',
        [dept_id]
      );

      const departmentConfig = {
        id: dept.dept_id,
        name: dept.name,
        icon: dept.icon_name,
        description: dept.description,
        faculty: dept.faculty_count,
        students: dept.student_count,
        labs: dept.lab_count,
        image: dept.image_url,
        specializations: specRows.map(row => row.specialization)
      };

      return res.status(200).json({
        success: true,
        data: departmentConfig
      });

    } else {
      // Get all department configurations
      const [deptRows] = await connection.execute(
        'SELECT * FROM departments_config WHERE status = ? ORDER BY order_index',
        ['active']
      );

      const departments = [];

      for (const dept of deptRows) {
        // Get specializations for this department
        const [specRows] = await connection.execute(
          'SELECT specialization FROM departments_specializations WHERE dept_id = ? ORDER BY order_index',
          [dept.dept_id]
        );

        departments.push({
          id: dept.dept_id,
          name: dept.name,
          icon: dept.icon_name,
          description: dept.description,
          faculty: dept.faculty_count,
          students: dept.student_count,
          labs: dept.lab_count,
          image: dept.image_url,
          specializations: specRows.map(row => row.specialization)
        });
      }

      return res.status(200).json({
        success: true,
        data: departments
      });
    }

  } catch (error) {
    console.error('Department Config API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal Server Error'
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}