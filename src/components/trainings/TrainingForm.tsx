"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

// UI Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingSpinner from "@/components/LoadingSpinner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Training } from "@/types/trainings";

// Define the form validation schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters",
  }),
  provider: z.string().min(2, {
    message: "Provider name is required",
  }),
  hours: z
    .number({
      required_error: "Hours is required",
      invalid_type_error: "Hours must be a number",
    })
    .min(1, { message: "Hours must be at least 1" }),
  date_from: z.string().min(1, {
    message: "Start date is required",
  }),
  date_to: z.string().min(1, {
    message: "End date is required",
  }),
  certificate: z.any().optional(),
});

type TrainingFormValues = z.infer<typeof formSchema>;

interface TrainingFormProps {
  deptId: string;
  training?: Training;
  initialData?: Training; // For backward compatibility
  isEdit?: boolean;
  onSuccess: () => void;
}

export function TrainingForm({ deptId, training, initialData, isEdit, onSuccess }: TrainingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Support both training and initialData props for backward compatibility
  const trainingData = training || initialData;
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Set default values based on whether we're editing an existing training or creating a new one
  const defaultValues: Partial<TrainingFormValues> = {
    title: trainingData?.title || "",
    provider: trainingData?.provider || "",
    hours: trainingData?.hours || 0,
    date_from: trainingData?.date_from || format(new Date(), "yyyy-MM-dd"),
    date_to: trainingData?.date_to || format(new Date(), "yyyy-MM-dd"),
  };

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("certificate", file);
    }
  };

  const onSubmit = async (values: TrainingFormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("provider", values.provider);
      formData.append("hours", values.hours.toString());
      formData.append("date_from", values.date_from);
      formData.append("date_to", values.date_to);

      if (selectedFile) {
        formData.append("certificate", selectedFile);
      }

      if (trainingData?.id) {
        // Update existing training
        formData.append("id", trainingData.id);
        
        const response = await fetch(`/api/departments/${deptId}/trainings`, {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Training updated successfully");
          onSuccess();
        } else {
          toast.error(data.message || "Failed to update training");
        }
      } else {
        // Create new training
        const response = await fetch(`/api/departments/${deptId}/trainings`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          toast.success("Training added successfully");
          form.reset();
          setSelectedFile(null);
          onSuccess();
        } else {
          toast.error(data.message || "Failed to add training");
        }
      }
    } catch (error) {
      console.error("Error submitting training form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          {training ? "Edit Training" : "Add Training"}
        </CardTitle>
        <CardDescription>
          {training
            ? "Update training details"
            : "Add a new professional development or training course"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Training Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Training program title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Provider */}
              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Organization or institution name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hours */}
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Duration in hours"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* From Date */}
              <FormField
                control={form.control}
                name="date_from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date: Date | undefined) =>
                            field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* To Date */}
              <FormField
                control={form.control}
                name="date_to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date: Date | undefined) =>
                            field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Certificate Upload */}
              <FormField
                control={form.control}
                name="certificate"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Certificate (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a copy of the certificate or completion document
                    </FormDescription>
                    {trainingData?.certificate_url && !selectedFile && (
                      <div className="text-sm text-blue-500 mt-2">
                        <a
                          href={trainingData.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          View existing certificate
                        </a>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : training ? (
                  "Update Training"
                ) : (
                  "Add Training"
                )}
              </Button>
            </CardFooter>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
