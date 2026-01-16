"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import LoadingSpinner from "../LoadingSpinner";
import { X, Save } from 'lucide-react';

// Schema for college form validation
const collegeSchema = z.object({
  name: z.string().min(1, { message: "College name is required" }),
  short_name: z.string().optional(),
  code: z.string().min(2, { message: "College code is required (min 2 characters)" }),
  type: z.enum(['Engineering', 'Arts', 'Science', 'Commerce', 'Medical', 'Law', 'Management', 'Other']),
  affiliation: z.string().optional(),
  university: z.string().optional(),
  accreditation: z.string().optional(),
  naac_grade: z.enum(['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Accredited']),
  nirf_ranking: z.number().optional().nullable(),
  
  // Contact Information
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  fax: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  
  // Address Information
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  
  // Administrative Information
  principal_name: z.string().optional(),
  principal_email: z.string().email().optional().or(z.literal('')),
  principal_phone: z.string().optional(),
  
  // Establishment Information
  established_year: z.number().min(1800).max(new Date().getFullYear()).optional().nullable(),
  autonomous: z.boolean().optional(),
  coed: z.enum(['Co-Educational', 'Men Only', 'Women Only']),
  
  // Academic Information
  total_students: z.number().min(0).optional().nullable(),
  total_faculty: z.number().min(0).optional().nullable(),
  total_departments: z.number().min(0).optional().nullable(),
  
  // Infrastructure
  campus_area: z.number().min(0).optional().nullable(),
  hostel_capacity: z.number().min(0).optional().nullable(),
  library_books: z.number().min(0).optional().nullable(),
  
  // Status and Description
  status: z.enum(['Active', 'Inactive', 'Affiliated', 'Autonomous']),
  logo_url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
});

type CollegeFormValues = z.infer<typeof collegeSchema>;

interface CollegeFormProps {
  college?: Partial<CollegeFormValues & { id: number }>;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function CollegeForm({ college, onSuccess, onCancel }: CollegeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      name: college?.name || '',
      short_name: college?.short_name || '',
      code: college?.code || '',
      type: college?.type || 'Engineering',
      affiliation: college?.affiliation || '',
      university: college?.university || '',
      accreditation: college?.accreditation || '',
      naac_grade: college?.naac_grade || 'Not Accredited',
      nirf_ranking: college?.nirf_ranking || null,
      
      email: college?.email || '',
      phone: college?.phone || '',
      fax: college?.fax || '',
      website: college?.website || '',
      
      address: college?.address || '',
      city: college?.city || '',
      state: college?.state || '',
      country: college?.country || 'India',
      pincode: college?.pincode || '',
      
      principal_name: college?.principal_name || '',
      principal_email: college?.principal_email || '',
      principal_phone: college?.principal_phone || '',
      
      established_year: college?.established_year || null,
      autonomous: college?.autonomous || false,
      coed: college?.coed || 'Co-Educational',
      
      total_students: college?.total_students || null,
      total_faculty: college?.total_faculty || null,
      total_departments: college?.total_departments || null,
      
      campus_area: college?.campus_area || null,
      hostel_capacity: college?.hostel_capacity || null,
      library_books: college?.library_books || null,
      
      status: college?.status || 'Active',
      logo_url: college?.logo_url || '',
      description: college?.description || '',
      vision: college?.vision || '',
      mission: college?.mission || '',
    },
  });

  const onSubmit = async (data: CollegeFormValues) => {
    try {
      setIsSubmitting(true);
      
      const url = college?.id ? `/api/colleges/${college.id}` : '/api/colleges';
      const method = college?.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to save college';
        try {
          const error = await response.json();
          errorMessage = error?.error || errorMessage;
        } catch (e) {
          // If response is not JSON, keep default error message
        }
        throw new Error(errorMessage);
      }

      toast.success(college?.id ? 'College updated successfully' : 'College created successfully');
      onSuccess();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save college');
    } finally {
      setIsSubmitting(false);
    }
  };

  const collegeTypes = ['Engineering', 'Arts', 'Science', 'Commerce', 'Medical', 'Law', 'Management', 'Other'];
  const naacGrades = ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Accredited'];
  const coedOptions = ['Co-Educational', 'Men Only', 'Women Only'];
  const statusOptions = ['Active', 'Inactive', 'Affiliated', 'Autonomous'];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal'
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {college?.id ? 'Edit College' : 'Add New College'}
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Sri Vasavi Engineering College" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="short_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Name</FormLabel>
                  <FormControl>
                    <Input placeholder="SVEC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="SVEC01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select college type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {collegeTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input placeholder="AICTE" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input placeholder="JNTUK" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accreditation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accreditation</FormLabel>
                  <FormControl>
                    <Input placeholder="NBA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* NAAC and Rankings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="naac_grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NAAC Grade</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NAAC grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {naacGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nirf_ranking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIRF Ranking</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="100" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="info@college.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91-40-12345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://college.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address Information */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Complete address..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Tadepalligudem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="534101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Principal Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="principal_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Principal Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="principal_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="principal@college.edu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="principal_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principal Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+91-9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Establishment and Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="established_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="1995" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {coedOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autonomous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Autonomous</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="total_students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Students</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="5000" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_faculty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Faculty</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="300" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_departments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Departments</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="8" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Infrastructure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="campus_area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campus Area (Acres)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01"
                      placeholder="45.5" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hostel_capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostel Capacity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="2000" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="library_books"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Library Books</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="50000" 
                      {...field} 
                      value={field.value || ''} 
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Logo URL */}
          <FormField
            control={form.control}
            name="logo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/logo.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description, Vision, Mission */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description about the college..." 
                    className="min-h-[80px]" 
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
              name="vision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vision</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="College vision statement..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mission"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mission</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="College mission statement..." 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {college?.id ? 'Update College' : 'Create College'}
                </div>
              )}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
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