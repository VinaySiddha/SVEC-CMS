import { NextApiRequest, NextApiResponse } from 'next';
import { getModulesForDept } from '@/lib/module-schemas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
  
  try {
    const { dept, role } = req.query;
    
    if (!dept || typeof dept !== 'string') {
      return res.status(400).json({ message: 'Department is required' });
    }
    
    const userRole = typeof role === 'string' ? role : 'dept_admin';
    const modules = getModulesForDept(dept, userRole);
    
    // Add status for each module
    const departmentModules = modules.map(module => ({
      ...module,
      // In a real app, you might check for pending approvals count for each module
      pendingCount: Math.floor(Math.random() * 5), // Mock pending count
    }));
    
    return res.status(200).json({
      modules: departmentModules,
      department: dept,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
