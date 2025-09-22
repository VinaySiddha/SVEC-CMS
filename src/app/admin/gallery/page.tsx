"use client";

import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryImage } from '@/types/gallery-images';
import { GalleryImagesList } from '@/components/lists/GalleryImagesList';
import { GalleryImageForm } from '@/components/forms/GalleryImageForm';
import LoadingOverlay from '@/components/LoadingOverlay';

type ActiveTabType = 'list' | 'add' | 'edit';

export default function GalleryAdmin() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('list');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('all');

  // Fetch images when the component mounts or when the selected department changes
  useEffect(() => {
    fetchImages();
  }, [selectedDept]);

  // Fetch images from the API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const url = selectedDept === 'all' 
        ? '/api/gallery' 
        : `/api/gallery?dept=${selectedDept}`;
        
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle editing an image
  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setActiveTab('edit');
  };

  return (
    <div className="container mx-auto py-6">
      {loading && <LoadingOverlay isLoading={loading} />}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Gallery Images</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTabType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="list">Image List</TabsTrigger>
              <TabsTrigger value="add">Add New Image</TabsTrigger>
              <TabsTrigger value="edit" disabled={!selectedImage}>Edit Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="pt-4">
              <GalleryImagesList 
                departments={[
                  { id: 'all', name: 'All Departments' },
                  { id: 'cse', name: 'Computer Science Engineering' },
                  { id: 'ece', name: 'Electronics & Communication Engineering' },
                  { id: 'eee', name: 'Electrical & Electronics Engineering' },
                  { id: 'mech', name: 'Mechanical Engineering' },
                  { id: 'civil', name: 'Civil Engineering' },
                  { id: 'aiml', name: 'AI & ML' },
                  { id: 'ds', name: 'Data Science' },
                  { id: 'it', name: 'Information Technology' },
                  { id: 'mba', name: 'MBA' },
                  { id: 'general', name: 'General' }
                ]}
                onEdit={handleEdit}
              />
            </TabsContent>
            
            <TabsContent value="add" className="pt-4">
              <GalleryImageForm 
                departments={[
                  { id: 'cse', name: 'Computer Science Engineering' },
                  { id: 'ece', name: 'Electronics & Communication Engineering' },
                  { id: 'eee', name: 'Electrical & Electronics Engineering' },
                  { id: 'mech', name: 'Mechanical Engineering' },
                  { id: 'civil', name: 'Civil Engineering' },
                  { id: 'aiml', name: 'AI & ML' },
                  { id: 'ds', name: 'Data Science' },
                  { id: 'it', name: 'Information Technology' },
                  { id: 'mba', name: 'MBA' },
                  { id: 'general', name: 'General' }
                ]}
                onSuccess={() => {
                  fetchImages();
                  setActiveTab('list');
                }}
              />
            </TabsContent>
            
            <TabsContent value="edit" className="pt-4">
              {selectedImage && (
                <GalleryImageForm 
                  galleryImage={selectedImage}
                  departments={[
                    { id: 'cse', name: 'Computer Science Engineering' },
                    { id: 'ece', name: 'Electronics & Communication Engineering' },
                    { id: 'eee', name: 'Electrical & Electronics Engineering' },
                    { id: 'mech', name: 'Mechanical Engineering' },
                    { id: 'civil', name: 'Civil Engineering' },
                    { id: 'aiml', name: 'AI & ML' },
                    { id: 'ds', name: 'Data Science' },
                    { id: 'it', name: 'Information Technology' },
                    { id: 'mba', name: 'MBA' },
                    { id: 'general', name: 'General' }
                  ]}
                  onSuccess={() => {
                    fetchImages();
                    setSelectedImage(null);
                    setActiveTab('list');
                  }}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
