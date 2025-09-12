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

// Form schema for laboratory
const laboratorySchema = z.object({
  dept: z.string().min(1, 'Department is required'),
  lab_name: z.string().min(1, 'Lab name is required'),
  lab_code: z.string().optional(),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1').optional(),
  usage: z.string().optional(),
  softwares: z.string().optional(),
  equipments: z.string().optional(),
  location: z.string().optional(),
  incharge: z.string().optional(),
});

type FormValues = z.infer<typeof laboratorySchema>;

interface LaboratoryFormProps {
  dept?: string;
  initialData?: Partial<FormValues>;
  onSuccess: () => void;
  onCancel: () => void;
}

export function LaboratoryForm({
  dept,
  initialData,
  onSuccess,
  onCancel,
}: LaboratoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(laboratorySchema),
    defaultValues: {
      dept: initialData?.dept || dept || '',
      lab_name: initialData?.lab_name || '',
      lab_code: initialData?.lab_code || '',
      capacity: initialData?.capacity || undefined,
      usage: initialData?.usage || '',
      softwares: initialData?.softwares || '',
      equipments: initialData?.equipments || '',
      location: initialData?.location || '',
      incharge: initialData?.incharge || '',
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
      formData.append('lab_name', data.lab_name);
      formData.append('lab_code', data.lab_code || '');
      formData.append('capacity', data.capacity?.toString() || '');
      formData.append('usage', data.usage || '');
      formData.append('softwares', data.softwares || '');
      formData.append('equipments', data.equipments || '');
      formData.append('location', data.location || '');
      formData.append('incharge', data.incharge || '');

      // Append image file if provided
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const url = initialData 
        ? `/api/laboratories/${initialData.dept}` 
        : '/api/laboratories';
      
      const method = initialData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save laboratory');
      }

      toast.success(initialData ? 'Laboratory updated successfully' : 'Laboratory created successfully');
      form.reset();
      setImagePreview(null);
      setSelectedFile(null);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
      console.error('Error submitting laboratory:', error);
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
            name="lab_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lab Name</FormLabel>
                <FormControl>
                  <Input placeholder="Programming Lab" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lab_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lab Code</FormLabel>
                <FormControl>
                  <Input placeholder="CSE-LAB-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="60" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Block A, Floor 2, Room 201" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lab Incharge</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lab-image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Lab Image
          </label>
          <Input
            id="lab-image"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="border rounded-md overflow-hidden w-full max-w-md h-48">
              <img
                src={imagePreview}
                alt="Lab Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Upload lab image (JPEG or PNG format)
          </p>
        </div>

        <FormField
          control={form.control}
          name="usage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description of lab usage and purpose..."
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
          name="softwares"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Softwares</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List of software installed in the lab..."
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
          name="equipments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List of equipment available in the lab..."
                  className="resize-none"
                  rows={3}
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
