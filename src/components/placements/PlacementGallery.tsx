"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import LoadingSpinner from "../LoadingSpinner";
import { useToast } from "../ui/use-toast";
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import Image from 'next/image';

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  caption: string | null;
}

interface PlacementGalleryProps {
  deptId: string;
  isAdmin?: boolean;
  onRefresh?: () => void;
}

export default function PlacementGallery({ deptId, isAdmin = false, onRefresh }: PlacementGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/departments/${deptId}/placements`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      
      const data = await response.json();
      setImages(data.gallery || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, [deptId]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/departments/${deptId}/placement-gallery`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete gallery image');
      }
      
      // Remove the deleted item from the state
      setImages(prev => {
        const newImages = prev.filter(item => item.id !== id);
        // Adjust current index if needed
        if (currentIndex >= newImages.length) {
          setCurrentIndex(Math.max(0, newImages.length - 1));
        }
        return newImages;
      });
      
      toast({
        title: "Success",
        description: "Gallery image deleted successfully",
      });
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery image",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center py-8 text-muted-foreground">
            No gallery images available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          {/* Main image */}
          <div className="relative w-full aspect-video">
            <Image
              src={currentImage.image_url}
              alt={currentImage.title}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300"
              priority
            />
            
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <h3 className="text-lg font-semibold">{currentImage.title}</h3>
              {currentImage.caption && (
                <p className="text-sm mt-1">{currentImage.caption}</p>
              )}
            </div>
            
            {/* Navigation buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white ml-2"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full bg-black bg-opacity-30 hover:bg-opacity-50 text-white mr-2"
                onClick={handleNext}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </Button>
            </div>
            
            {/* Delete button for admin */}
            {isAdmin && (
              <div className="absolute top-2 right-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this image from the gallery.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDelete(currentImage.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
          
          {/* Pagination indicators */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 p-2">
            {images.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
