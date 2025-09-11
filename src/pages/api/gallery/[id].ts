import { NextApiRequest, NextApiResponse } from 'next';
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
  async getById(id: string) {
    try {
      return mockGalleryImages.find(img => img.id === id);
    } catch (error) {
      console.error(`Error fetching gallery image with ID ${id}:`, error);
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
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid image ID' });
  }

  switch (method) {
    case 'GET':
      try {
        const image = await galleryImages.getById(id);
        
        if (!image) {
          return res.status(404).json({ message: 'Image not found' });
        }
        
        res.status(200).json(image);
      } catch (error) {
        console.error(`Error fetching gallery image with ID ${id}:`, error);
        res.status(500).json({ message: 'Failed to fetch image' });
      }
      break;

    case 'PUT':
      try {
        const { fields, files } = await parseFormData(req);
        const imageFile = files.image as formidable.File | undefined;
        
        // Validate file type if a new image is uploaded
        if (imageFile) {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
          if (!allowedTypes.includes(imageFile.mimetype || '')) {
            return res.status(400).json({ 
              message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed' 
            });
          }
        }
        
        const image = await galleryImages.update(
          id,
          {
            dept: fields.dept?.[0],
            title: fields.title?.[0],
            caption: fields.caption?.[0],
            image_url: fields.image_url?.[0],
          },
          imageFile
        );
        
        res.status(200).json(image);
      } catch (error: any) {
        console.error(`Error updating gallery image with ID ${id}:`, error);
        
        if (error.message === 'Image not found') {
          return res.status(404).json({ message: 'Image not found' });
        }
        
        res.status(500).json({ message: 'Failed to update image' });
      }
      break;

    case 'DELETE':
      try {
        await galleryImages.delete(id);
        res.status(200).json({ success: true });
      } catch (error: any) {
        console.error(`Error deleting gallery image with ID ${id}:`, error);
        
        if (error.message === 'Image not found') {
          return res.status(404).json({ message: 'Image not found' });
        }
        
        res.status(500).json({ message: 'Failed to delete image' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
