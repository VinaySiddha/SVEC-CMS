import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { GalleryImage } from '@/types/gallery-images';

// Configure API to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Mock image storage implementation for local development
const imageStorage = {
  async saveImage(file: formidable.File, key: string): Promise<string> {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'gallery');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    const fileName = `${Date.now()}-${path.basename(file.originalFilename || 'image')}`;
    const filePath = path.join(uploadsDir, fileName);
    
    // Copy the file to the uploads directory
    await fs.promises.copyFile(file.filepath, filePath);
    
    // Return public URL
    return `/uploads/gallery/${fileName}`;
  },
  
  async deleteImage(url: string): Promise<void> {
    if (!url.startsWith('/uploads/gallery/')) return;
    
    const fileName = url.split('/uploads/gallery/')[1];
    const filePath = path.join(process.cwd(), 'public', 'uploads', 'gallery', fileName);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
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

// Mock database for gallery images
let mockGalleryImages: GalleryImage[] = [
  {
    id: '1',
    dept: 'cse',
    title: 'Computer Science Lab',
    image_url: '/uploads/gallery/cse-lab.jpg',
    caption: 'Students working in the advanced computer lab',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    dept: 'ece',
    title: 'Electronics Workshop',
    image_url: '/uploads/gallery/ece-workshop.jpg',
    caption: 'ECE students in the workshop',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Database operations for gallery images
const galleryImages = {
  async getAll(dept?: string) {
    try {
      let filteredImages = [...mockGalleryImages];
      
      if (dept && dept !== 'all') {
        filteredImages = filteredImages.filter(img => img.dept === dept);
      }
      
      return filteredImages;
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      throw error;
    }
  },
  
  async getById(id: string) {
    try {
      return mockGalleryImages.find(img => img.id === id);
    } catch (error) {
      console.error(`Error fetching gallery image with ID ${id}:`, error);
      throw error;
    }
  },
  
  async create(data: any, imageFile: formidable.File) {
    try {
      const id = uuidv4();
      
      // Save the image
      const image_url = await imageStorage.saveImage(imageFile, `gallery/${id}`);
      
      const newImage: GalleryImage = {
        id,
        dept: data.dept,
        title: data.title,
        image_url,
        caption: data.caption || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      mockGalleryImages.push(newImage);
      return newImage;
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  },
  
  async update(id: string, data: any, imageFile?: formidable.File) {
    try {
      const imageIndex = mockGalleryImages.findIndex(img => img.id === id);
      
      if (imageIndex === -1) {
        throw new Error('Image not found');
      }
      
      const image = mockGalleryImages[imageIndex];
      
      let image_url = data.image_url || image.image_url;
      
      if (imageFile) {
        // Delete old image if it exists
        if (image.image_url) {
          await imageStorage.deleteImage(image.image_url);
        }
        
        // Save new image
        image_url = await imageStorage.saveImage(imageFile, `gallery/${id}`);
      }
      
      const updatedImage: GalleryImage = {
        ...image,
        dept: data.dept || image.dept,
        title: data.title || image.title,
        image_url,
        caption: data.caption !== undefined ? data.caption : image.caption,
        updated_at: new Date().toISOString(),
      };
      
      mockGalleryImages[imageIndex] = updatedImage;
      return updatedImage;
    } catch (error) {
      console.error(`Error updating gallery image with ID ${id}:`, error);
      throw error;
    }
  },
  
  async delete(id: string) {
    try {
      const imageIndex = mockGalleryImages.findIndex(img => img.id === id);
      
      if (imageIndex === -1) {
        throw new Error('Image not found');
      }
      
      const image = mockGalleryImages[imageIndex];
      
      // Delete image file if it exists
      if (image.image_url) {
        await imageStorage.deleteImage(image.image_url);
      }
      
      // Remove from mock database
      mockGalleryImages = mockGalleryImages.filter(img => img.id !== id);
      
      return { success: true };
    } catch (error) {
      console.error(`Error deleting gallery image with ID ${id}:`, error);
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
        const dept = typeof req.query.dept === 'string' ? req.query.dept : undefined;
        const images = await galleryImages.getAll(dept);
        res.status(200).json(images);
      } catch (error) {
        console.error('Error handling GET request:', error);
        res.status(500).json({ message: 'Failed to fetch gallery images' });
      }
      break;

    case 'POST':
      try {
        const { fields, files } = await parseFormData(req);
        const imageFile = files.image as formidable.File;
        
        if (!imageFile) {
          return res.status(400).json({ message: 'Image file is required' });
        }
        
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(imageFile.mimetype || '')) {
          return res.status(400).json({ 
            message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed' 
          });
        }
        
        const image = await galleryImages.create({
          dept: fields.dept?.[0],
          title: fields.title?.[0],
          caption: fields.caption?.[0],
        }, imageFile);
        
        res.status(201).json(image);
      } catch (error: any) {
        console.error('Error handling POST request:', error);
        res.status(400).json({ message: error.message || 'Failed to create image' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
