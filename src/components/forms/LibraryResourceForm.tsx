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
import { LibraryResource, ResourceType } from '@/types/library-resources';
import { toast } from 'sonner';

const CURRENT_YEAR = new Date().getFullYear();

const formSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }),
  resource_type: z.enum(['Book', 'Journal', 'Magazine', 'QuestionBank', 'Other'], {
    required_error: 'Resource type is required',
  }),
  title: z.string().min(1, { message: 'Title is required' }),
  author: z.string().min(1, { message: 'Author/Publisher is required' }),
  year: z
    .number({ required_error: 'Year is required' })
    .int()
    .min(1900, { message: 'Year must be 1900 or later' })
    .max(CURRENT_YEAR, { message: `Year cannot be later than ${CURRENT_YEAR}` }),
  inventory_no: z.string().min(1, { message: 'Inventory number is required' }),
});

type FormValues = z.infer<typeof formSchema>;

interface LibraryResourceFormProps {
  resource?: LibraryResource;
  departments: { id: string; name: string }[];
  onSuccess: () => void;
}

export function LibraryResourceForm({
  resource,
  departments,
  onSuccess,
}: LibraryResourceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: resource
      ? {
          dept: resource.dept,
          resource_type: resource.resource_type,
          title: resource.title,
          author: resource.author,
          year: resource.year,
          inventory_no: resource.inventory_no,
        }
      : {
          dept: '',
          resource_type: 'Book' as ResourceType,
          title: '',
          author: '',
          year: CURRENT_YEAR,
          inventory_no: '',
        },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('dept', values.dept);
      formData.append('resource_type', values.resource_type);
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('year', values.year.toString());
      formData.append('inventory_no', values.inventory_no);

      if (fileUpload) {
        formData.append('file', fileUpload);
      } else if (resource && resource.file_url) {
        formData.append('file_url', resource.file_url);
      }

      // If we're editing an existing resource, include the ID
      if (resource?.id) {
        formData.append('id', resource.id);
      }

      const url = resource
        ? `/api/library-resources/${resource.id}`
        : '/api/library-resources';
      
      const method = resource ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save resource');
      }

      const result = await response.json();
      toast.success(resource ? 'Resource updated successfully' : 'Resource added successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save resource');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
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
        name="resource_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resource Type</FormLabel>
            <FormControl>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Resource Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Book">Book</SelectItem>
                  <SelectItem value="Journal">Journal</SelectItem>
                  <SelectItem value="Magazine">Magazine</SelectItem>
                  <SelectItem value="QuestionBank">Question Bank</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
                placeholder="Enter title"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Author/Publisher</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter author or publisher name"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="year"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Publication Year</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1900}
                max={CURRENT_YEAR}
                placeholder="Enter publication year"
                disabled={isLoading}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || CURRENT_YEAR)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="inventory_no"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inventory Number</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter inventory number"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormItem className="space-y-2">
        <FormLabel>Resource File (Optional)</FormLabel>
        <FormControl>
          <Input
            type="file"
            disabled={isLoading}
            onChange={handleFileChange}
          />
        </FormControl>
        <FormMessage />
        {resource && resource.file_url && !fileUpload && (
          <div className="text-sm text-muted-foreground">
            Current file: <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">View file</a>
          </div>
        )}
      </FormItem>

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
        ) : resource ? 'Update Resource' : 'Add Resource'}
      </Button>
    </form>
  );
}
