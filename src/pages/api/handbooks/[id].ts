import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Mock S3 implementation for local development
const mockS3 = {
  async uploadFile(file: formidable.File, key: string): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const fileName = `${Date.now()}-${path.basename(file.originalFilename || 'file')}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Copy the file to the uploads directory
    await fs.promises.copyFile(file.filepath, filePath);
    
    // Return public URL
    return `/uploads/${fileName}`;
  },
  
  async deleteFile(url: string): Promise<void> {
    if (!url.startsWith('/uploads/')) return;
    
    const fileName = url.split('/uploads/')[1];
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
};

// Parse form data with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: NextApiRequest) {
  return new Promise<{ fields: any; files: any }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

// Database operations for handbooks
const handbooks = {
  async getAll(dept?: string) {
    try {
      // In a real application, this would be a database query
      // For now, we'll simulate data
      const mockHandbooks = [
        {
          id: '1',
          dept: 'cse',
          title: 'Computer Science Engineering Handbook',
          edition: '2023-24',
          document_url: '/uploads/cse-handbook.pdf',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          dept: 'ece',
          title: 'Electronics Engineering Handbook',
          edition: '2023-24',
          document_url: '/uploads/ece-handbook.pdf',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      
      if (dept && dept !== 'all') {
        return mockHandbooks.filter(h => h.dept === dept);
      }
      
      return mockHandbooks;
    } catch (error) {
      throw error;
    }
  },
  
  async getById(id: string) {
    try {
      // In a real application, this would be a database query
      const mockHandbooks = await this.getAll();
      return mockHandbooks.find(h => h.id === id);
    } catch (error) {
      throw error;
    }
  },
  
  async update(id: string, data: any, file?: formidable.File) {
    try {
      // In a real application, this would update the database
      const handbook = await this.getById(id);
      
      if (!handbook) {
        throw new Error('Handbook not found');
      }
      
      let document_url = data.document_url || handbook.document_url;
      
      if (file) {
        // Delete old file if it exists
        if (handbook.document_url) {
          await mockS3.deleteFile(handbook.document_url);
        }
        
        // Upload new file
        document_url = await mockS3.uploadFile(file, `handbooks/${id}`);
      }
      
      return {
        ...handbook,
        dept: data.dept || handbook.dept,
        title: data.title || handbook.title,
        edition: data.edition || handbook.edition,
        document_url,
        updated_at: new Date().toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
  
  async delete(id: string) {
    try {
      // In a real application, this would delete from the database
      const handbook = await this.getById(id);
      
      if (!handbook) {
        throw new Error('Handbook not found');
      }
      
      // Delete file if it exists
      if (handbook.document_url) {
        await mockS3.deleteFile(handbook.document_url);
      }
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid handbook ID' });
  }

  switch (method) {
    case 'GET':
      try {
        const handbook = await handbooks.getById(id);
        
        if (!handbook) {
          return res.status(404).json({ message: 'Handbook not found' });
        }
        
        res.status(200).json(handbook);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch handbook' });
      }
      break;

    case 'PUT':
      try {
        const { fields, files } = await parseFormData(req);
        const file = files.document as formidable.File | undefined;
        
        const handbook = await handbooks.update(
          id,
          {
            dept: fields.dept?.[0],
            title: fields.title?.[0],
            edition: fields.edition?.[0],
            document_url: fields.document_url?.[0],
          },
          file
        );
        
        res.status(200).json(handbook);
      } catch (error: any) {
        
        if (error.message === 'Handbook not found') {
          return res.status(404).json({ message: 'Handbook not found' });
        }
        
        res.status(500).json({ message: 'Failed to update handbook' });
      }
      break;

    case 'DELETE':
      try {
        await handbooks.delete(id);
        res.status(200).json({ success: true });
      } catch (error: any) {
        
        if (error.message === 'Handbook not found') {
          return res.status(404).json({ message: 'Handbook not found' });
        }
        
        res.status(500).json({ message: 'Failed to delete handbook' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
