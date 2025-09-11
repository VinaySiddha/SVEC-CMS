"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";

// Schema for scholarship form validation
const scholarshipSchema = z.object({
  academic_year: z.string().min(9, "Academic year format should be YYYY-YYYY"),
  category: z.enum(["Merit", "Topper", "Other"]),
  student_name: z.string().min(3, "Student name is required"),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Amount must be a positive number")
  ),
  proof_file: z.any().optional(),
});

type ScholarshipFormValues = z.infer<typeof scholarshipSchema>;

interface ScholarshipFormProps {
  deptId: string;
  onSuccess?: () => void;
}

export default function ScholarshipForm({ deptId, onSuccess }: ScholarshipFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      academic_year: getCurrentAcademicYear(),
      category: "Merit",
      student_name: "",
      amount: undefined,
    },
  });
  
  async function onSubmit(data: ScholarshipFormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append("academic_year", data.academic_year);
      formData.append("category", data.category);
      formData.append("student_name", data.student_name);
      formData.append("amount", data.amount.toString());
      
      // Add file if selected
      if (data.proof_file && data.proof_file.length > 0) {
        formData.append("proof_file", data.proof_file[0]);
      }
      
      // Submit the form data
      const response = await fetch(`/api/departments/${deptId}/scholarships`, {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add scholarship");
      }
      
      toast({
        title: "Success",
        description: "Scholarship added successfully",
        variant: "default",
      });
      
      // Reset form
      form.reset({
        academic_year: getCurrentAcademicYear(),
        category: "Merit",
        student_name: "",
        amount: undefined,
      });
      
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while adding the scholarship",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  // Helper function to generate current academic year (e.g., "2023-2024")
  function getCurrentAcademicYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // January is 0
    
    // If we're in the second half of the year (after June), use current year as start
    // Otherwise use previous year as start
    const startYear = month > 6 ? year : year - 1;
    const endYear = startYear + 1;
    
    return `${startYear}-${endYear}`;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Scholarship</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="academic_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2023-2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Merit">Merit</SelectItem>
                        <SelectItem value="Topper">Topper</SelectItem>
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
              name="student_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholarship Amount (₹)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="e.g., 10000" 
                      {...field} 
                      onChange={e => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="proof_file"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload Proof Document (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? <LoadingSpinner /> : "Add Scholarship"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
