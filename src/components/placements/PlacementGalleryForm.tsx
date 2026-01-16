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
import { toast } from "sonner";
import LoadingSpinner from "../LoadingSpinner";
import { X, Plus, Image as ImageIcon, FileImage } from 'lucide-react';
import { Alert, AlertDescription } from "../ui/alert";

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
  const [compressionInfo, setCompressionInfo] = useState<{
    originalSize: string;
    compressedSize: string;
    compressionRatio: string;
    dimensions: string;
    format: string;
  } | null>(null);

  const form = useForm<GalleryItemFormValues>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: {
      title: '',
      caption: '',
    },
  });

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload only JPEG, PNG, or WebP images');
        return;
      }
      
      // Check file size (max 50MB for upload)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        toast.error('File too large. Maximum upload size is 50MB.');
        return;
      }
      
      setImageFile(file);
      setCompressionInfo(null); // Reset compression info
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
      setCompressionInfo(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setCompressionInfo(null);
    // Reset the input value by creating a new ref
    const fileInput = document.getElementById('galleryImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (data: GalleryItemFormValues) => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('caption', data.caption || '');
      formData.append('dept', deptId);
      formData.append('image', imageFile);

      // Show uploading toast with file size info
      const originalSize = formatFileSize(imageFile.size);
      toast.loading(`Uploading and compressing image (${originalSize})...`, {
        duration: 10000,
        description: "Processing image: resizing to 1920x700 and compressing to ~300KB"
      });

      const response = await fetch(`/api/placement/gallery`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add gallery image');
      }

      const result = await response.json();
      
      // Store compression info for display
      if (result.processingInfo) {
        setCompressionInfo(result.processingInfo);
      }

      toast.dismiss(); // Remove loading toast
      toast.success("Gallery image added and compressed successfully!", {
        description: result.processingInfo 
          ? `Reduced from ${result.processingInfo.originalSize} to ${result.processingInfo.compressedSize} (${result.processingInfo.compressionRatio} reduction)`
          : undefined
      });
      
      form.reset();
      clearImage();
      onSuccess();
    } catch (error) {
      toast.dismiss(); // Remove loading toast
      toast.error(error instanceof Error ? error.message : "Failed to add gallery image");
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
              <div className="space-y-2">
                <Input 
                  id="galleryImage" 
                  type="file" 
                  accept="image/jpeg,image/jpg,image/png,image/webp" 
                  onChange={handleFileChange} 
                />
                
                {/* Image upload info */}
                <Alert>
                  <ImageIcon className="h-4 w-4" />
                  <AlertDescription>
                    Upload images up to 50MB. They will be automatically resized to 1920x700 and compressed to ~300KB for optimal web performance.
                    <br />
                    <span className="text-sm text-muted-foreground">Supported formats: JPEG, PNG, WebP</span>
                  </AlertDescription>
                </Alert>
                
                {/* Show file info when selected */}
                {imageFile && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <FileImage className="h-4 w-4" />
                      <span className="font-medium">{imageFile.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Size: {formatFileSize(imageFile.size)} • Type: {imageFile.type}
                    </div>
                  </div>
                )}
                
                {imagePreview && (
                  <div className="relative mt-4 inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 max-w-full rounded-md border" 
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {/* Show compression info if available */}
                {compressionInfo && (
                  <Alert className="bg-green-50 border-green-200">
                    <ImageIcon className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="font-medium">Image processed successfully!</div>
                      <div className="text-sm mt-1 space-y-1">
                        <div>• Size reduced: {compressionInfo.originalSize} → {compressionInfo.compressedSize}</div>
                        <div>• Compression: {compressionInfo.compressionRatio} reduction</div>
                        <div>• Dimensions: {compressionInfo.dimensions}</div>
                        <div>• Format: {compressionInfo.format.toUpperCase()}</div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isSubmitting || !imageFile}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  Processing & Uploading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus size={16} />
                  Upload & Compress Image
                </div>
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
