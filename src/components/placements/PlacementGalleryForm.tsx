"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";
import { X, Plus } from 'lucide-react';

// Schema for gallery form validation
const galleryItemSchema = z.object({
  title: z.string().min(3, { message: "Title is required (min 3 characters)" }),
  caption: z.string().optional(),
});

type GalleryItemFormValues = z.infer<typeof galleryItemSchema>;

interface PlacementGalleryFormProps {
  deptId: string;
  onSuccess: () => void;
}

export default function PlacementGalleryForm({ deptId, onSuccess }: PlacementGalleryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<GalleryItemFormValues>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: {
      title: '',
      caption: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Reset the input value by creating a new ref
    const fileInput = document.getElementById('galleryImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (data: GalleryItemFormValues) => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('caption', data.caption || '');
      formData.append('image', imageFile);

      const response = await fetch(`/api/departments/${deptId}/placement-gallery`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add gallery image');
      }

      toast({
        title: "Success!",
        description: "Gallery image added successfully",
      });
      
      form.reset();
      clearImage();
      onSuccess();
    } catch (error) {
      console.error('Error submitting gallery image:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add gallery image",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Placement Gallery Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Placement Drive 2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Students during campus placement drive" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel htmlFor="galleryImage">Image</FormLabel>
              <Input 
                id="galleryImage" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              
              {imagePreview && (
                <div className="relative mt-4 inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-h-64 max-w-full rounded-md" 
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isSubmitting || !imageFile}
            >
              {isSubmitting ? <LoadingSpinner /> : 'Upload Image'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
