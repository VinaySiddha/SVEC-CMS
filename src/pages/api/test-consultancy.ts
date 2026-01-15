import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');
  
  console.log('Test API called - this should appear in console');
  
  return res.status(200).json({
    success: true,
    message: 'API endpoint is working',
    timestamp: new Date().toISOString(),
    testData: [
      { id: 1, project_title: 'Test Project 1' },
      { id: 2, project_title: 'Test Project 2' }
    ]
  });
}