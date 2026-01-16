"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { GalleryImage } from '@/types/gallery-images';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import Image from 'next/image';
import LoadingOverlay from '@/components/LoadingOverlay';

// Department name mapping
const departmentNames: Record<string, string> = {
  'cse': 'Computer Science Engineering',
  'ece': 'Electronics & Communication Engineering',
  'eee': 'Electrical & Electronics Engineering',
  'mech': 'Mechanical Engineering',
  'civil': 'Civil Engineering',
  'aiml': 'AI & ML',
  'ds': 'Data Science',
  'it': 'Information Technology',
  'mba': 'MBA',
};

export default function DepartmentGallery() {
  const params = useParams();
  const deptId = (params?.deptId as string) || '';
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const departmentName = departmentNames[deptId] || deptId.toUpperCase();

  // Fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, [deptId]);

  // Fetch images from the API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const url = `/api/gallery?dept=${deptId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      {loading && <LoadingOverlay isLoading={loading} />}
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{departmentName} Gallery</h1>
        <p className="text-gray-600">Explore our collection of images from the {departmentName} department</p>
      </div>
      
      {selectedImage ? (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              &times;
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative w-full h-[60vh]">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-600 mt-1">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.length > 0 ? (
          images.map((image) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-48">
                <Image
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{image.title}</h3>
                {image.caption && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{image.caption}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : !loading ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No images available for this department.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
