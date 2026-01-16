"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { X, Plus, CalendarIcon } from "lucide-react";
import { AssociationEvent } from "@/types/associations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Define form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Association name must be at least 2 characters",
  }),
  role: z.string().min(2, {
    message: "Role is required",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }),
  proof: z.any().optional(),
  events: z.array(
    z.object({
      title: z.string().min(2, "Event title is required"),
      date: z.string().min(1, "Event date is required"),
      description: z.string().min(5, "Event description is required"),
      image_url: z.string().optional(),
    })
  ).optional(),
});

type AssociationFormValues = z.infer<typeof formSchema>;

interface AssociationFormProps {
  deptId: string;
  association?: any;
  initialData?: any; // For backward compatibility
  isEdit?: boolean;
  onSuccess: () => void;
}

export function AssociationForm({ deptId, association, initialData, isEdit, onSuccess }: AssociationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Support both association and initialData props for backward compatibility
  const associationData = association || initialData;
  const [uploadedEventImages, setUploadedEventImages] = useState<{
    [key: number]: File;
  }>({});

  // Initialize form with default values
  const defaultValues: Partial<AssociationFormValues> = {
    name: associationData?.name || "",
    role: associationData?.role || "",
    description: associationData?.description || "",
    events: associationData?.events || [],
  };

  const form = useForm<AssociationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Setup field array for dynamic events
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "events",
  });

  // Handle main proof file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("proof", file);
    }
  };

  // Handle event image selection
  const handleEventImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedEventImages((prev) => ({ ...prev, [index]: file }));
    }
  };

  // Add a new event to the form
  const handleAddEvent = () => {
    append({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
      image_url: "",
    });
  };

  // Submit the form data
  const onSubmit = async (data: AssociationFormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      formData.append("description", data.description);

      // Add main proof file if selected
      if (selectedFile) {
        formData.append("proof", selectedFile);
      }

      // Handle events data
      if (data.events && data.events.length > 0) {
        // Add all events as a JSON string
        formData.append("events", JSON.stringify(data.events));

        // Add event images if any
        Object.entries(uploadedEventImages).forEach(([index, file]) => {
          formData.append(`eventImage_${index}`, file);
        });
      }

      // Include the association ID if editing an existing record
      if (associationData?.id) {
        formData.append("id", associationData.id);
        
        const response = await fetch(`/api/departments/${deptId}/associations`, {
          method: "PUT",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Association updated successfully");
          onSuccess();
        } else {
          toast.error(result.message || "Failed to update association");
        }
      } else {
        // Create new association
        const response = await fetch(`/api/departments/${deptId}/associations`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          toast.success("Association added successfully");
          form.reset();
          setSelectedFile(null);
          setUploadedEventImages({});
          onSuccess();
        } else {
          toast.error(result.message || "Failed to add association");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">
          {association ? "Edit Association" : "New Association"}
        </CardTitle>
        <CardDescription>
          {association
            ? "Update an existing student association or club"
            : "Add a new student association or club"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Association Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Association Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., IEEE Student Chapter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Faculty Coordinator"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the association's purpose and activities"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Proof File Upload */}
            <FormField
              control={form.control}
              name="proof"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supporting Document (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  {selectedFile && (
                    <p className="text-sm text-gray-500">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                  {associationData?.proof_url && !selectedFile && (
                    <div className="mt-2">
                      <a
                        href={associationData.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View existing document
                      </a>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Events Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Association Events</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddEvent}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Event
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-4 text-gray-500 border border-dashed rounded-md">
                  No events added yet. Click "Add Event" to begin.
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="p-4 border rounded-md relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0"
                        onClick={() => remove(index)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove event</span>
                      </Button>

                      <h4 className="font-medium mb-3">Event {index + 1}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Event Title */}
                        <FormField
                          control={form.control}
                          name={`events.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Event name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Event Date */}
                        <FormField
                          control={form.control}
                          name={`events.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Date</FormLabel>
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
                                        <span>Pick a date</span>
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
                                    disabled={(date: Date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Event Description */}
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name={`events.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe the event"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Event Image Upload */}
                      <div className="mt-4">
                        <FormLabel className="block mb-2 text-sm font-medium">
                          Event Image (Optional)
                        </FormLabel>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleEventImageChange(e, index)}
                          className="mb-2"
                        />
                        {uploadedEventImages[index] && (
                          <p className="text-sm text-gray-500">
                            Selected: {uploadedEventImages[index].name}
                          </p>
                        )}
                        {form.getValues(`events.${index}.image_url`) &&
                          !uploadedEventImages[index] && (
                            <div className="mt-1">
                              <a
                                href={form.getValues(`events.${index}.image_url`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                View existing image
                              </a>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <CardFooter className="px-0 pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : association ? (
                  "Update Association"
                ) : (
                  "Add Association"
                )}
              </Button>
            </CardFooter>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
