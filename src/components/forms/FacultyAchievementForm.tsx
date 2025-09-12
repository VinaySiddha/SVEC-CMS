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

// Form schema for faculty achievement
const facultyAchievementSchema = z.object({
  dept: z.string().min(1, 'Department is required'),
  faculty_name: z.string().min(1, 'Faculty name is required'),
  achievement_type: z.string().min(1, 'Achievement type is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  achievement_date: z.string().optional(),
  issuing_authority: z.string().optional(),
});

type FormValues = z.infer<typeof facultyAchievementSchema>;

interface FacultyAchievementFormProps {
  dept?: string;
  initialData?: Partial<FormValues>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function FacultyAchievementForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: FacultyAchievementFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(facultyAchievementSchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      faculty_name: initialData?.faculty_name || '',
      achievement_type: initialData?.achievement_type || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      achievement_date: initialData?.achievement_date || '',
      issuing_authority: initialData?.issuing_authority || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append text fields
      formData.append('dept', data.dept);
      formData.append('faculty_name', data.faculty_name);
      formData.append('achievement_type', data.achievement_type);
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('achievement_date', data.achievement_date || '');
      formData.append('issuing_authority', data.issuing_authority || '');

      // Append document file if provided
      if (data.document && data.document.length > 0) {
        formData.append('document', data.document[0]);
      }

      const url = initialData 
        ? `/api/faculty-achievements/${initialData.dept}/${initialData.title}` 
        : '/api/faculty-achievements';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save faculty achievement');
      }

      toast.success(initialData ? 'Faculty achievement updated successfully' : 'Faculty achievement created successfully');
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      console.error('Error submitting faculty achievement:', error);
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
                    <SelectItem value="bsh">Basic Sciences and Humanities</SelectItem>
                    <SelectItem value="cst">Computer Science and Technology</SelectItem>
                    <SelectItem value="ect">Electronics and Computer Technology</SelectItem>
                    <SelectItem value="aiml">Artificial Intelligence and Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="faculty_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="achievement_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achievement Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select achievement type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="award">Award</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="patent">Patent</SelectItem>
                    <SelectItem value="publication">Publication</SelectItem>
                    <SelectItem value="research">Research Grant</SelectItem>
                    <SelectItem value="fellowship">Fellowship</SelectItem>
                    <SelectItem value="recognition">Recognition</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input placeholder="Best Teacher Award" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="achievement_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Achievement Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="issuing_authority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuing Authority</FormLabel>
                <FormControl>
                  <Input placeholder="University Grants Commission" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of the achievement..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Achievement Document</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,image/jpeg,image/png"
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Upload achievement certificate or document (PDF, JPEG or PNG format)
              </FormDescription>
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
