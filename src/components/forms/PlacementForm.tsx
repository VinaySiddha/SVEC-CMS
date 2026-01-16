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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Form schema for placement
const placementSchema = z.object({
  dept: z.string().min(1, 'Department is required'),
  student_name: z.string().min(1, 'Student name is required'),
  roll_number: z.string().min(1, 'Roll number is required'),
  company_name: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  package: z.coerce.number().min(0, 'Package must be a positive number').optional(),
  placement_date: z.string().min(1, 'Placement date is required'),
  placement_type: z.enum(['on-campus', 'off-campus', 'internship']),
  academic_year: z.string().min(1, 'Academic year is required'),
  batch: z.string().min(1, 'Batch is required'),
});

type FormValues = z.infer<typeof placementSchema>;

interface PlacementFormProps {
  dept?: string;
  initialData?: Partial<FormValues>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PlacementForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: PlacementFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(placementSchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      student_name: initialData?.student_name || '',
      roll_number: initialData?.roll_number || '',
      company_name: initialData?.company_name || '',
      position: initialData?.position || '',
      package: initialData?.package || undefined,
      placement_date: initialData?.placement_date || '',
      placement_type: initialData?.placement_type || 'on-campus',
      academic_year: initialData?.academic_year || '',
      batch: initialData?.batch || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (['image/jpeg', 'image/png'].includes(file.type)) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select a JPEG or PNG image file');
        e.target.value = '';
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('dept', data.dept);
      formData.append('student_name', data.student_name);
      formData.append('roll_number', data.roll_number);
      formData.append('company_name', data.company_name);
      formData.append('position', data.position);
      formData.append('package', data.package?.toString() || '');
      formData.append('placement_date', data.placement_date);
      formData.append('placement_type', data.placement_type);
      formData.append('academic_year', data.academic_year);
      formData.append('batch', data.batch);

      // Append image file if provided
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const url = initialData 
        ? `/api/placements/${initialData.dept}/${initialData.roll_number}` 
        : '/api/placements';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save placement record');
      }

      toast.success(initialData ? 'Placement updated successfully' : 'Placement created successfully');
      form.reset();
      setImagePreview(null);
      setSelectedFile(null);
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
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science and Engineering</SelectItem>
                    <SelectItem value="cse-ai">CSE (Artificial Intelligence)</SelectItem>
                    <SelectItem value="cse-ds">CSE (Data Science)</SelectItem>
                    <SelectItem value="ece">Electronics and Communication Engineering</SelectItem>
                    <SelectItem value="eee">Electrical and Electronics Engineering</SelectItem>
                    <SelectItem value="civil">Civil Engineering</SelectItem>
                    <SelectItem value="mech">Mechanical Engineering</SelectItem>
                    <SelectItem value="mba">Master of Business Administration</SelectItem>
                    <SelectItem value="aiml">Artificial Intelligence and Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="student_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roll_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number</FormLabel>
                <FormControl>
                  <Input placeholder="20A91A0501" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Google Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package (LPA)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="12.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placement_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placement Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placement_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placement Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select placement type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="on-campus">On Campus</SelectItem>
                    <SelectItem value="off-campus">Off Campus</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="academic_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academic Year</FormLabel>
                <FormControl>
                  <Input placeholder="2023-24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch</FormLabel>
                <FormControl>
                  <Input placeholder="2020-24" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="student-image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Student Image
          </label>
          <Input
            id="student-image"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="border rounded-md overflow-hidden w-32 h-32">
              <img
                src={imagePreview}
                alt="Student Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Upload student image (JPEG or PNG format)
          </p>
        </div>

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
