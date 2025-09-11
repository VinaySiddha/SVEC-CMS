import { NextApiRequest, NextApiResponse } from 'next';
import { FacultyProfile } from './index';
import { fileStorage } from '@/lib/file-storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Create the handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Import the handler from index
  const indexHandler = await import('./index');
  return indexHandler.default(req, res);
}
