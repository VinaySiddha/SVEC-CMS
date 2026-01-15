import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
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
import { Handbook } from '@/types/handbooks';
import { toast } from 'sonner';

const formSchema = z.object({
  dept: z.string().min(1, { message: 'Department is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  edition: z.string().min(1, { message: 'Edition is required' }),
});

type FormValues = z.infer<typeof formSchema>;

interface HandbookFormProps {
  handbook?: Handbook;
  departments: { id: string; name: string }[];
  onSuccess: () => void;
}

export function HandbookForm({ handbook, departments, onSuccess }: HandbookFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: handbook
      ? {
          dept: handbook.dept,
          title: handbook.title,
          edition: handbook.edition,
        }
      : {
          dept: '',
          title: '',
          edition: '',
        },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('dept', values.dept);
      formData.append('title', values.title);
      formData.append('edition', values.edition);

      if (documentFile) {
        formData.append('document', documentFile);
      } else if (handbook && !documentFile) {
        formData.append('document_url', handbook.document_url);
      }

      // If we're editing an existing handbook, include the ID
      if (handbook?.id) {
        formData.append('id', handbook.id);
      }

      const url = handbook
        ? '/api/handbooks/' + handbook.id
        : '/api/handbooks';
      
      const method = handbook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save handbook');
      }

      toast.success(handbook ? 'Handbook updated successfully' : 'Handbook added successfully');
      onSuccess();
    } catch (error) {
      console.error('Error saving handbook:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save handbook');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
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
                  value={field.value}
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
                  placeholder="Handbook title"
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
          name="edition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edition</FormLabel>
              <FormControl>
                <Input
                  placeholder="Edition (e.g. 2023-24)"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Document (PDF)</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept=".pdf"
              disabled={isLoading}
              onChange={handleFileChange}
            />
          </FormControl>
          <FormMessage />
          {handbook && handbook.document_url && !documentFile && (
            <div className="text-sm text-muted-foreground">
              Current file: <a href={handbook.document_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">View document</a>
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
          ) : handbook ? 'Update Handbook' : 'Add Handbook'}
        </Button>
      </form>
    </Form>
  );
}
