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

// Form schema for student achievement
const studentAchievementSchema = z.object({
  dept: z.string().min(1, 'Department is required'),
  student_name: z.string().min(1, 'Student name is required'),
  roll_number: z.string().min(1, 'Roll number is required'),
  achievement_type: z.string().min(1, 'Achievement type is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  achievement_date: z.string().optional(),
  issuing_authority: z.string().optional(),
  academic_year: z.string().optional(),
});

type FormValues = z.infer<typeof studentAchievementSchema>;

interface StudentAchievementFormProps {
  dept?: string;
  initialData?: Partial<FormValues>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function StudentAchievementForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: StudentAchievementFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? (typeof initialData.image === 'string' ? initialData.image : null) : null
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(studentAchievementSchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      student_name: initialData?.student_name || '',
      roll_number: initialData?.roll_number || '',
      achievement_type: initialData?.achievement_type || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      achievement_date: initialData?.achievement_date || '',
      issuing_authority: initialData?.issuing_authority || '',
      academic_year: initialData?.academic_year || '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      formData.append('student_name', data.student_name);
      formData.append('roll_number', data.roll_number);
      formData.append('achievement_type', data.achievement_type);
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('achievement_date', data.achievement_date || '');
      formData.append('issuing_authority', data.issuing_authority || '');
      formData.append('academic_year', data.academic_year || '');

      // Append files if provided
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }
      if (data.document && data.document.length > 0) {
        formData.append('document', data.document[0]);
      }

      const url = initialData 
        ? `/api/student-achievements/${initialData.dept}/${initialData.roll_number}` 
        : '/api/student-achievements';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save student achievement');
      }

      toast.success(initialData ? 'Student achievement updated successfully' : 'Student achievement created successfully');
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
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
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                    <SelectItem value="scholarship">Scholarship</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
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
                <FormLabel>Achievement Title</FormLabel>
                <FormControl>
                  <Input placeholder="First Prize in National Coding Competition" {...field} />
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
                  <Input placeholder="IEEE Computer Society" {...field} />
                </FormControl>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Student Image</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => {
                        onChange(e.target.files);
                        handleImageChange(e);
                      }}
                      {...fieldProps}
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
                  </div>
                </FormControl>
                <FormDescription>
                  Upload student image (JPEG or PNG format)
                </FormDescription>
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
                  Upload achievement certificate (PDF, JPEG or PNG format)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
