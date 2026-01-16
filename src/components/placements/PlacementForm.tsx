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
import { useToast } from "../ui/use-toast";
import LoadingSpinner from "../LoadingSpinner";

// Schema for placements form validation
const placementSchema = z.object({
  academicYear: z.string().regex(/^\d{4}-\d{4}$/, { 
    message: "Academic year must be in format YYYY-YYYY" 
  }),
  totalOffers: z.string().min(1, "Total offers is required"),
  highestPackage: z.string().min(1, "Highest package is required"),
  averagePackage: z.string().min(1, "Average package is required")
});

type PlacementFormValues = z.infer<typeof placementSchema>;

interface PlacementFormProps {
  deptId: string;
  onSuccess: () => void;
}

export default function PlacementForm({ deptId, onSuccess }: PlacementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<PlacementFormValues>({
    resolver: zodResolver(placementSchema),
    defaultValues: {
      academicYear: `${new Date().getFullYear()-1}-${new Date().getFullYear()}`,
      totalOffers: '',
      highestPackage: '',
      averagePackage: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setReportFile(e.target.files[0]);
    } else {
      setReportFile(null);
    }
  };

  const onSubmit = async (data: PlacementFormValues) => {
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      formData.append('academicYear', data.academicYear);
      formData.append('totalOffers', data.totalOffers.toString());
      formData.append('highestPackage', data.highestPackage.toString());
      formData.append('averagePackage', data.averagePackage.toString());
      
      if (reportFile) {
        formData.append('report', reportFile);
      }

      const response = await fetch(`/api/departments/${deptId}/placements`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add placement stats');
      }

      toast({
        title: "Success!",
        description: "Placement statistics added successfully",
      });
      
      form.reset();
      setReportFile(null);
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add placement stats",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Placement Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="academicYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2023-2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalOffers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Offers</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="highestPackage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Highest Package (LPA)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="averagePackage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Average Package (LPA)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel htmlFor="report">Placement Report (PDF)</FormLabel>
              <Input 
                id="report" 
                type="file" 
                accept=".pdf" 
                onChange={handleFileChange} 
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <LoadingSpinner /> : 'Submit'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
