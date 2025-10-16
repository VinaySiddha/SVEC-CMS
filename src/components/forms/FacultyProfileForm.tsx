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
import { FacultyProfile } from '@/pages/api/faculty-profiles';

// Form schema for faculty profiles
const facultyProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  qualification: z.string().min(1, 'Qualification is required'),
  experience: z.coerce.number().min(0, 'Experience must be a positive number'),
  specializations: z.string().min(1, 'Specializations are required'),
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof facultyProfileSchema>;

interface FacultyProfileFormProps {
  dept: string;
  initialData?: FacultyProfile;
  onSuccess: () => void;
  onCancel?: () => void;
}

export function FacultyProfileForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: FacultyProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.photo || null
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(facultyProfileSchema),
    defaultValues: {
      name: initialData?.name || '',
      designation: initialData?.designation || '',
      qualification: initialData?.qualification || '',
      experience: initialData?.experience || 0,
      specializations: initialData?.specializations || '',
      email: initialData?.email || '',
    },
  });

  // Handle file input change for photo preview
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(initialData?.photo || null);
    }
  };

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Add form fields
      formData.append('dept', dept);
      formData.append('name', values.name);
      formData.append('designation', values.designation);
      formData.append('qualification', values.qualification);
      formData.append('experience', String(values.experience));
      formData.append('specializations', values.specializations);
      formData.append('email', values.email);

      // Add photo file if selected
      if (values.photo && values.photo.length > 0) {
        formData.append('photo', values.photo[0]);
      } else if (initialData?.photo) {
        formData.append('photo', initialData.photo);
      }

      // Add CV file if selected
      if (values.cv && values.cv.length > 0) {
        formData.append('cv', values.cv[0]);
      } else if (initialData?.cv) {
        formData.append('cv', initialData.cv);
      }

      // Send request to API
      const url = initialData
        ? `/api/faculty-profiles/${initialData.id}`
        : '/api/faculty-profiles';
        
      const token = localStorage.getItem('sessionId');
      
      const response = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Something went wrong');
      }

      const result = await response.json();

      toast.success(
        initialData
          ? 'Faculty profile updated successfully'
          : 'Faculty profile created successfully'
      );
      
      if (onSuccess) {
        onSuccess(result.data || result);
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      console.error('Error submitting faculty profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Professor, Associate Professor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="qualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Ph.D. in Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience (years)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specializations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specializations</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. Machine Learning, Database Systems"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Comma-separated list of specialization areas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => {
                        onChange(e.target.files);
                        handlePhotoChange(e);
                      }}
                      {...fieldProps}
                    />
                    {photoPreview && (
                      <div className="border rounded-md overflow-hidden w-40 h-40">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>Upload a professional photo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cv"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>CV/Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => onChange(e.target.files)}
                    {...fieldProps}
                  />
                </FormControl>
                <FormDescription>Upload CV in PDF format (optional)</FormDescription>
                <FormMessage />
                {initialData?.cv && (
                  <div className="pt-2">
                    <a
                      href={initialData.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View current CV
                    </a>
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
