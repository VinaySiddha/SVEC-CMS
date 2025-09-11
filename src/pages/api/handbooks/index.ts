import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

// Configure real S3 client for production
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock-key',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock-secret',
  },
});

// Use environment variable to determine if we should use real S3 or mock
const useRealS3 = process.env.USE_REAL_S3 === 'true';

// Parse form data with formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: NextApiRequest) {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
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
      console.error('Error fetching handbooks:', error);
      throw error;
    }
  },
  
  async getById(id: string) {
    try {
      // In a real application, this would be a database query
      const mockHandbooks = await this.getAll();
      return mockHandbooks.find(h => h.id === id);
    } catch (error) {
      console.error(`Error fetching handbook with ID ${id}:`, error);
      throw error;
    }
  },
  
  async create(data: any, file?: formidable.File) {
    try {
      // In a real application, this would insert into a database
      const id = uuidv4();
      let document_url = '';
      
      if (file) {
        if (useRealS3) {
          const key = `handbooks/${id}/${file.originalFilename}`;
          const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
            Key: key,
            Body: fs.createReadStream(file.filepath),
            ContentType: file.mimetype || 'application/pdf',
          });
          
          await s3Client.send(command);
          
          // Generate a signed URL valid for 1 hour
          const getObjectCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
            Key: key,
          });
          
          document_url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
        } else {
          // Use mock implementation for local development
          document_url = await mockS3.uploadFile(file, `handbooks/${id}`);
        }
      }
      
      return {
        id,
        dept: data.dept,
        title: data.title,
        edition: data.edition,
        document_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error creating handbook:', error);
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
          if (useRealS3) {
            // Extract key from URL
            const urlParts = handbook.document_url.split('/');
            const key = urlParts.slice(3).join('/');
            
            const deleteCommand = new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
              Key: key,
            });
            
            await s3Client.send(deleteCommand);
          } else {
            await mockS3.deleteFile(handbook.document_url);
          }
        }
        
        // Upload new file
        if (useRealS3) {
          const key = `handbooks/${id}/${file.originalFilename}`;
          const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
            Key: key,
            Body: fs.createReadStream(file.filepath),
            ContentType: file.mimetype || 'application/pdf',
          });
          
          await s3Client.send(command);
          
          // Generate a signed URL valid for 1 hour
          const getObjectCommand = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
            Key: key,
          });
          
          document_url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
        } else {
          // Use mock implementation for local development
          document_url = await mockS3.uploadFile(file, `handbooks/${id}`);
        }
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
      console.error(`Error updating handbook with ID ${id}:`, error);
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
        if (useRealS3) {
          // Extract key from URL
          const urlParts = handbook.document_url.split('/');
          const key = urlParts.slice(3).join('/');
          
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME || 'mock-bucket',
            Key: key,
          });
          
          await s3Client.send(deleteCommand);
        } else {
          await mockS3.deleteFile(handbook.document_url);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error(`Error deleting handbook with ID ${id}:`, error);
      throw error;
    }
  },
};

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const dept = req.query.dept as string | undefined;
        const data = await handbooks.getAll(dept);
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch handbooks' });
      }
      break;

    case 'POST':
      try {
        const { fields, files } = await parseFormData(req);
        const file = files.document as formidable.File | undefined;
        
        const handbook = await handbooks.create({
          dept: fields.dept?.[0],
          title: fields.title?.[0],
          edition: fields.edition?.[0],
        }, file);
        
        res.status(201).json(handbook);
      } catch (error) {
        console.error('Error creating handbook:', error);
        res.status(500).json({ message: 'Failed to create handbook' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
