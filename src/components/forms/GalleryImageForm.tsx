import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GalleryImage } from '@/types/gallery-images';
import { toast } from 'sonner';
import Image from 'next/image';

const formSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  caption: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GalleryImageFormProps {
  galleryImage?: GalleryImage;
  departments: { id: string; name: string }[];
  onSuccess: () => void;
}

export function GalleryImageForm({
  galleryImage,
  departments,
  onSuccess,
}: GalleryImageFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(galleryImage?.image_url || null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: galleryImage
      ? {
          dept: galleryImage.dept,
          title: galleryImage.title,
          caption: galleryImage.caption || '',
        }
      : {
          dept: '',
          title: '',
          caption: '',
        },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      // Check if we're adding a new image and no image was selected
      if (!galleryImage && !imageFile) {
        toast.error('Please select an image');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('dept', values.dept);
      formData.append('title', values.title);
      
      if (values.caption) {
        formData.append('caption', values.caption);
      }

      if (imageFile) {
        formData.append('image', imageFile);
      } else if (galleryImage && !imageFile) {
        formData.append('image_url', galleryImage.image_url);
      }

      // If we're editing an existing image, include the ID
      if (galleryImage?.id) {
        formData.append('id', galleryImage.id);
      }

      const url = galleryImage
        ? `/api/gallery/${galleryImage.id}`
        : '/api/gallery';
      
      const method = galleryImage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save image');
      }

      const result = await response.json();
      
      // Verify that image_url is present in the response
      if (!result.image_url) {
        throw new Error('Image URL not returned from server');
      }

      toast.success(galleryImage ? 'Image updated successfully' : 'Image added successfully');
      onSuccess();
    } catch (error) {
      console.error('Error saving gallery image:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImagePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        control={form.control}
        name="dept"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Department</FormLabel>
            <FormControl>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter image title"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem className="space-y-2">
        <FormLabel>Image</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept="image/*"
            disabled={isLoading}
            onChange={handleImageChange}
          />
        </FormControl>
        <FormMessage />
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
            <div className="relative h-48 w-full border rounded-md overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        )}
      </FormItem>

      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Caption (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter image caption"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="mr-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            Saving...
          </>
        ) : galleryImage ? 'Update Image' : 'Add Image'}
      </Button>
    </form>
  );
}
