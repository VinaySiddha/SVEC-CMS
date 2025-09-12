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

// Form schema for workshop
const workshopSchema = z.object({
  dept: z.string().min(1, 'Department is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().min(1, 'End date is required'),
  venue: z.string().optional(),
  resource_person: z.string().optional(),
  coordinator: z.string().optional(),
  participants_count: z.coerce.number().min(0).optional(),
  participants_type: z.string().optional(),
});

type FormValues = z.infer<typeof workshopSchema>;

interface WorkshopFormProps {
  dept?: string;
  initialData?: Partial<FormValues>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function WorkshopForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: WorkshopFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? (typeof initialData.image === 'string' ? initialData.image : null) : null
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(workshopSchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      title: initialData?.title || '',
      description: initialData?.description || '',
      start_date: initialData?.start_date || '',
      end_date: initialData?.end_date || '',
      venue: initialData?.venue || '',
      resource_person: initialData?.resource_person || '',
      coordinator: initialData?.coordinator || '',
      participants_count: initialData?.participants_count || undefined,
      participants_type: initialData?.participants_type || '',
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
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      formData.append('venue', data.venue || '');
      formData.append('resource_person', data.resource_person || '');
      formData.append('coordinator', data.coordinator || '');
      formData.append('participants_count', data.participants_count?.toString() || '');
      formData.append('participants_type', data.participants_type || '');

      // Append files if provided
      if (data.image && data.image.length > 0) {
        formData.append('image', data.image[0]);
      }
      if (data.document && data.document.length > 0) {
        formData.append('document', data.document[0]);
      }

      const url = initialData 
        ? `/api/workshops/${initialData.dept}/${initialData.title}` 
        : '/api/workshops';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save workshop');
      }

      toast.success(initialData ? 'Workshop updated successfully' : 'Workshop created successfully');
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      console.error('Error submitting workshop:', error);
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workshop Title</FormLabel>
                <FormControl>
                  <Input placeholder="Machine Learning Workshop" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                  <Input placeholder="Seminar Hall, Block A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resource_person"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource Person</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Smith, Google AI" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coordinator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coordinator</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participants_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participants Count</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="50" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="participants_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participants Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select participants type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="industry">Industry Professionals</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Workshop description and objectives..."
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
                <FormLabel>Workshop Image</FormLabel>
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
                      <div className="border rounded-md overflow-hidden w-full max-w-xs h-32">
                        <img
                          src={imagePreview}
                          alt="Workshop Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  Upload workshop image (JPEG or PNG format)
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
                <FormLabel>Workshop Document</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => onChange(e.target.files)}
                    {...fieldProps}
                  />
                </FormControl>
                <FormDescription>
                  Upload workshop brochure or agenda (PDF format)
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
