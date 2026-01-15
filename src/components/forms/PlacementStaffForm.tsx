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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Faculty name is required' }),
  designation: z.string().min(1, { message: 'Designation is required' }),
  branch: z.string().optional(),
  email: z.string().email({ message: 'Valid email is required' }),
});

type FormValues = z.infer<typeof formSchema>;

interface PlacementStaff {
  id: number;
  name: string;
  designation: string;
  branch: string;
  email: string;
}

interface PlacementStaffFormProps {
  staff?: PlacementStaff;
  onSuccess: () => void;
  onCancel?: () => void;
}

const branches = [
  { value: 'CSE', label: 'Computer Science Engineering' },
  { value: 'ECE', label: 'Electronics & Communication Engineering' },
  { value: 'EEE', label: 'Electrical & Electronics Engineering' },
  { value: 'MECH', label: 'Mechanical Engineering' },
  { value: 'CIVIL', label: 'Civil Engineering' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'AIML', label: 'AI & Machine Learning' },
  { value: 'DS', label: 'Data Science' },
  { value: 'MBA', label: 'MBA' },
  { value: 'PLACEMENT', label: 'Placement Cell' },
];

export function PlacementStaffForm({ staff, onSuccess, onCancel }: PlacementStaffFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: staff
      ? {
          name: staff.name,
          designation: staff.designation,
          branch: staff.branch || '',
          email: staff.email,
        }
      : {
          name: '',
          designation: '',
          branch: '',
          email: '',
        },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const url = staff 
        ? `/api/placement/staff/${staff.id}`
        : '/api/placement/staff';
      const method = staff ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to save staff member';
        try {
          const error = await response.json();
          console.error('Staff API error response:', error);
          errorMessage = error?.error || errorMessage;
        } catch (e) {
          // If response is not JSON, keep default error message
          console.error('Staff API error: response not JSON', e);
        }
        throw new Error(errorMessage);
      }

      toast.success(staff ? 'Staff member updated successfully' : 'Staff member added successfully');
      form.reset();
      onSuccess();
    } catch (error) {
      console.error('Error saving staff member:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save staff member');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {staff ? 'Edit Staff Member' : 'Add New Staff Member'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter faculty name" 
                    {...field} 
                  />
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
                  <Input 
                    placeholder="e.g., Assistant Professor, Associate Professor" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email ID</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="faculty@srivasaviengg.ac.in" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : staff ? 'Update Staff' : 'Add Staff'}
            </Button>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}