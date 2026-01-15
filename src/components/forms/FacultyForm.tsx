'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';

const facultySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional(),
  qualification: z.string().min(2, 'Qualification is required'),
  designation: z.string().min(2, 'Designation is required'),
  specialization: z.string().optional(),
  experience_years: z.string().optional(),
  profile_url: z.string().optional(),
  bio: z.string().optional(),
  research_interests: z.string().optional(),
  publications: z.string().optional()
});

type FacultyFormData = z.infer<typeof facultySchema>;

type FacultyInitialData = Partial<FacultyFormData> & { title?: string };

interface FacultyFormProps {
  initialData?: FacultyInitialData;
  onSubmit: (data: FacultyFormData) => void;
  isLoading?: boolean;
  departmentCode: string;
}

export function FacultyForm({ initialData, onSubmit, isLoading = false, departmentCode }: FacultyFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: initialData?.name ?? initialData?.title ?? '',
      email: initialData?.email || '',
      qualification: initialData?.qualification || '',
      designation: initialData?.designation || '',
      specialization: initialData?.specialization || '',
      experience_years: initialData?.experience_years || '',
      profile_url: initialData?.profile_url || '',
      bio: initialData?.bio || '',
      research_interests: initialData?.research_interests || '',
      publications: initialData?.publications || ''
    }
  });

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      email: initialData?.email || '',
      qualification: initialData?.qualification || '',
      designation: initialData?.designation || '',
      specialization: initialData?.specialization || '',
      experience_years: initialData?.experience_years || '',
      profile_url: initialData?.profile_url || '',
      bio: initialData?.bio || '',
      research_interests: initialData?.research_interests || '',
      publications: initialData?.publications || ''
    });
  }, [initialData, reset]);

  const handleFormSubmit = (data: FacultyFormData) => {
    // Add department code to the data
    const facultyData = {
      ...data,
      title: data.name,
      department: departmentCode
    };
    onSubmit(facultyData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faculty Information</CardTitle>
        <CardDescription>
          {initialData ? 'Update faculty member details' : 'Add a new faculty member to the department'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter full name"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter email address (optional)"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Input
                id="qualification"
                {...register('qualification')}
                placeholder="e.g., Ph.D, M.Tech, B.Tech"
                disabled={isLoading}
              />
              {errors.qualification && (
                <p className="text-sm text-red-600 mt-1">{errors.qualification.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="designation">Designation *</Label>
              <Select 
                value={watch('designation')} 
                onValueChange={(value) => setValue('designation', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Sr. Assistant Professor">Sr. Assistant Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                </SelectContent>
              </Select>
              {errors.designation && (
                <p className="text-sm text-red-600 mt-1">{errors.designation.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                {...register('specialization')}
                placeholder="Enter area of specialization (optional)"
                disabled={isLoading}
              />
              {errors.specialization && (
                <p className="text-sm text-red-600 mt-1">{errors.specialization.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="experience_years">Experience (Years)</Label>
              <Input
                id="experience_years"
                {...register('experience_years')}
                placeholder="Enter years of experience (optional)"
                disabled={isLoading}
              />
              {errors.experience_years && (
                <p className="text-sm text-red-600 mt-1">{errors.experience_years.message}</p>
              )}
            </div>
          </div>

          {/* Profile Image Upload */}
          <div>
            <FileUpload
              label="Profile Photo"
              currentUrl={watch('profile_url')}
              onUploadComplete={(url) => setValue('profile_url', url)}
              accept="image/*"
              maxSize={5}
            />
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              {...register('bio')}
              placeholder="Enter faculty biography (optional)"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Research Interests */}
          <div>
            <Label htmlFor="research_interests">Research Interests</Label>
            <Textarea
              id="research_interests"
              {...register('research_interests')}
              placeholder="Enter research areas and interests (optional)"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Publications */}
          <div>
            <Label htmlFor="publications">Publications</Label>
            <Textarea
              id="publications"
              {...register('publications')}
              placeholder="Enter notable publications (optional)"
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : initialData ? 'Update Faculty' : 'Add Faculty'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
