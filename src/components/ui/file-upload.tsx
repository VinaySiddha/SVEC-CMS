'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  currentUrl?: string;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
}

export function FileUpload({ 
  onUploadComplete, 
  currentUrl, 
  accept = "image/*", 
  maxSize = 5,
  label = "Upload Image"
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (accept === "image/*" && !file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPEG, PNG, WebP)');
      return;
    }

    setUploading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'faculty-photo');

      // Upload file
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      
      if (result.success && result.url) {
        setPreviewUrl(result.url);
        onUploadComplete(result.url);
        toast.success('File uploaded successfully');
      } else {
        throw new Error('No URL returned from upload');
      }
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept === "image/*" ? "image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" : accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Upload area */}
      {!previewUrl ? (
        <div 
          onClick={handleClick}
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:border-muted-foreground/50 transition-colors"
        >
          <div className="flex flex-col items-center text-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">
              {accept === "image/*" ? "JPEG, PNG, WebP" : accept} up to {maxSize}MB
            </p>
          </div>
        </div>
      ) : (
        /* Preview area */
        <div className="relative">
          <div className="border rounded-lg p-4">
            <div className="flex items-start gap-4">
              {accept === "image/*" && (
                <img 
                  src={previewUrl} 
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{previewUrl}</p>
                <p className="text-xs text-muted-foreground">File uploaded successfully</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload button (alternative to drag/drop) */}
      <div className="flex gap-2">
        <Button 
          type="button"
          variant="outline" 
          onClick={handleClick}
          disabled={uploading}
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
          ) : (
            <ImageIcon className="h-4 w-4 mr-2" />
          )}
          {uploading ? 'Uploading...' : 'Choose File'}
        </Button>
        
        {previewUrl && (
          <Button 
            type="button"
            variant="outline" 
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
