'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Form schema for department info
const departmentInfoSchema = z.object({
  dept: z.string().min(1, 'Department code is required'),
  dept_full_name: z.string().min(1, 'Department full name is required'),
  hod_name: z.string().min(1, 'HOD name is required'),
  vision: z.string().optional(),
  mission: z.string().optional(),
  about: z.string().optional(),
  contact_email: z.string().email('Invalid email address').optional().or(z.literal('')),
  contact_phone: z.string().optional(),
});

type FormValues = z.infer<typeof departmentInfoSchema>;

interface DepartmentInfoFormProps {
  dept?: string;
  initialData?: Partial<FormValues & { hod_image?: string }>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DepartmentInfoForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: DepartmentInfoFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.hod_image || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(departmentInfoSchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      dept_full_name: initialData?.dept_full_name || '',
      hod_name: initialData?.hod_name || '',
      vision: initialData?.vision || '',
      mission: initialData?.mission || '',
      about: initialData?.about || '',
      contact_email: initialData?.contact_email || '',
      contact_phone: initialData?.contact_phone || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Please select a JPEG or PNG image');
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('dept', data.dept);
      formData.append('dept_full_name', data.dept_full_name);
      formData.append('hod_name', data.hod_name);
      formData.append('vision', data.vision || '');
      formData.append('mission', data.mission || '');
      formData.append('about', data.about || '');
      formData.append('contact_email', data.contact_email || '');
      formData.append('contact_phone', data.contact_phone || '');

      // Append image file if provided
      if (selectedFile) {
        formData.append('hod_image', selectedFile);
      }

      const url = initialData 
        ? `/api/department-info/${data.dept}` 
        : '/api/department-info';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save department info');
      }

      toast.success(initialData ? 'Department info updated successfully' : 'Department info created successfully');
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., cse, ece, eee" {...field} disabled={!!initialData} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dept_full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science and Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hod_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HOD Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hod@department.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+91 12345 67890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">HOD Image</label>
          <Input
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="border rounded-md overflow-hidden w-40 h-40">
              <img
                src={imagePreview}
                alt="HOD Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Upload HOD image (JPEG or PNG format)
          </p>
        </div>

        <FormField
          control={form.control}
          name="vision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vision</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Department vision statement..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Department mission statement..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Department</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="About the department..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}
