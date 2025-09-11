"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

// UI Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover } from "@/components/ui/popover";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Loader2, 
  X, 
  Plus, 
  Camera,
  Upload,
  FileText,
  Edit,
  Trash
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Types
import { Event, GalleryItem } from "@/types/events";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const ACCEPTED_DOC_TYPES = [...ACCEPTED_IMAGE_TYPES, "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const galleryItemSchema = z.object({
  url: z.string().optional(),
  caption: z.string().optional(),
  file: z.any().optional(),
  isNew: z.boolean().optional(),
});

const formSchema = z.object({
  title: z.string().min(2, "Title is required").max(255, "Title is too long"),
  category: z.enum(["cultural", "sports", "community"], {
    required_error: "Please select a category",
  }),
  date: z.string().min(1, "Date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  proof_file: z.any().optional(),
  galleryItems: z.array(galleryItemSchema).optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  deptId: string;
  event?: Event;
  initialData?: Event; // For backward compatibility
  existingEvent?: Event | null; // For newer components
  isEdit?: boolean;
  onSuccess: () => void;
}

export function EventForm({ deptId, event, initialData, existingEvent, isEdit, onSuccess }: EventFormProps) {
  // Use existingEvent if provided, otherwise fall back to event or initialData
  const eventData = existingEvent || event || initialData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProofFile, setSelectedProofFile] = useState<File | null>(null);
  
  // Parse gallery data from the event
  const parseGallery = (): GalleryItem[] => {
    if (!eventData?.gallery) return [];
    
    try {
      if (typeof eventData.gallery === 'string') {
        return JSON.parse(eventData.gallery);
      }
      return eventData.gallery;
    } catch (e) {
      console.error("Error parsing gallery data:", e);
      return [];
    }
  };
  
  // Initialize form with default values
  const defaultValues: Partial<EventFormValues> = {
    title: eventData?.title || "",
    category: (eventData?.category as "cultural" | "sports" | "community") || "cultural",
    date: eventData?.date || format(new Date(), "yyyy-MM-dd"),
    description: eventData?.description || "",
    galleryItems: parseGallery().map(item => ({
      url: item.url,
      caption: item.caption || "",
      isNew: false,
    })),
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "galleryItems",
  });

  // Add a new gallery item entry
  const addGalleryItem = () => {
    append({ 
      url: "", 
      caption: "", 
      isNew: true 
    });
  };

  // Handle gallery image upload
  const handleGalleryImageUpload = (index: number, file: File) => {
    const updatedFields = [...fields];
    if (updatedFields[index]) {
      form.setValue(`galleryItems.${index}.file`, file);
      form.setValue(`galleryItems.${index}.isNew`, true);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      form.setValue(`galleryItems.${index}.url`, previewUrl);
    }
  };

  const onSubmit = async (values: EventFormValues) => {
    try {
      setIsSubmitting(true);
      toast.loading(eventData ? "Updating event..." : "Creating event...");
      
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      formData.append("date", values.date);
      formData.append("description", values.description);
      
      // Add the proof file if selected
      if (selectedProofFile) {
        formData.append("proof_file", selectedProofFile);
      }
      
      // Process gallery items
      if (values.galleryItems && values.galleryItems.length > 0) {
        // Track how many new files we're adding
        let newFileCount = 0;
        
        values.galleryItems.forEach((item, index) => {
          // For existing images, preserve their data
          if (!item.isNew && item.url) {
            formData.append(`gallery_existing_${index}`, JSON.stringify({
              url: item.url,
              caption: item.caption || ""
            }));
          }
          
          // For new files
          if (item.isNew && item.file) {
            formData.append(`gallery_new_${newFileCount}`, item.file as File);
            formData.append(`gallery_new_${newFileCount}_caption`, item.caption || "");
            newFileCount++;
          }
        });
        
        formData.append("galleryNewCount", String(newFileCount));
        formData.append("galleryExistingCount", String(values.galleryItems.length - newFileCount));
      }

      // Include the event ID if editing an existing record
      if (eventData?.id) {
        formData.append("id", eventData.id);
        
        const response = await fetch(`/api/departments/${deptId}/events`, {
          method: "PUT",
          body: formData,
        });

        const result = await response.json();
        
        if (result.success) {
          toast.dismiss();
          toast.success("Event updated successfully");
          onSuccess();
        } else {
          toast.dismiss();
          toast.error(result.message || "Failed to update event");
        }
      } else {
        // Create new event
        const response = await fetch(`/api/departments/${deptId}/events`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        
        if (result.success) {
          toast.dismiss();
          toast.success("Event added successfully");
          onSuccess();
        } else {
          toast.dismiss();
          toast.error(result.message || "Failed to add event");
        }
      }
    } catch (error) {
      console.error("Error submitting event form:", error);
      toast.dismiss();
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }
      
      // Validate file type
      if (!ACCEPTED_DOC_TYPES.includes(file.type)) {
        toast.error("Invalid file type. Please upload a PDF, Word document, or image.");
        return;
      }
      
      setSelectedProofFile(file);
    }
  };

  // Function to validate and handle gallery file upload
  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }
      
      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image (JPEG, PNG, GIF).");
        return;
      }
      
      handleGalleryImageUpload(index, file);
    }
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Revoke all object URLs created for previews
      fields.forEach((field) => {
        if (field.isNew && field.url) {
          URL.revokeObjectURL(field.url as string);
        }
      });
    };
  }, [fields]);

  return (
    <div>
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter event title" {...field} />
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
                        <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || "cultural"}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="community">Community Service</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Event Date <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <Popover.Trigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full md:w-[240px] pl-3 text-left font-normal",
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
                        </Popover.Trigger>
                        <Popover.Content className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) =>
                              field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </Popover.Content>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter event description"
                          className="min-h-[150px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="proof_file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supporting Document</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-3">
                          <Input
                            type="file"
                            onChange={handleProofFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            className="w-full md:w-auto"
                          />
                          {eventData?.proof_url && !selectedProofFile && (
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-blue-600" />
                              <a
                                href={eventData.proof_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Current document
                              </a>
                            </div>
                          )}
                          {selectedProofFile && (
                            <div className="flex items-center">
                              <Upload className="h-5 w-5 mr-2 text-green-600" />
                              <span className="text-sm text-gray-700">
                                New: {selectedProofFile.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload a document to verify this event (PDF, Word, or images, max 5MB)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Event Gallery</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addGalleryItem}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                  
                  {fields.length === 0 && (
                    <div className="text-center py-8 border border-dashed rounded-md">
                      <Camera className="mx-auto h-10 w-10 text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">No images added yet</p>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        className="mt-2"
                        onClick={addGalleryItem}
                      >
                        Add your first image
                      </Button>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {fields.map((item, index) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative aspect-video bg-gray-100">
                          {form.getValues(`galleryItems.${index}.url`) ? (
                            <img
                              src={form.getValues(`galleryItems.${index}.url`)}
                              alt={`Gallery item ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <label className="cursor-pointer flex flex-col items-center">
                                <Camera className="h-8 w-8 text-gray-400" />
                                <span className="text-xs text-gray-500 mt-1">Add image</span>
                                <Input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleGalleryFileChange(e, index)}
                                  accept=".jpg,.jpeg,.png,.gif"
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <FormField
                            control={form.control}
                            name={`galleryItems.${index}.caption`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Add caption (optional)"
                                    {...field}
                                    className="text-sm"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </CardContent>
                        <CardFooter className="p-2 pt-0 flex justify-between">
                          {form.getValues(`galleryItems.${index}.isNew`) ? (
                            <label className="cursor-pointer text-xs text-blue-600 hover:underline flex items-center">
                              <Edit className="h-3 w-3 mr-1" />
                              Change image
                              <Input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleGalleryFileChange(e, index)}
                                accept=".jpg,.jpeg,.png,.gif"
                              />
                            </label>
                          ) : (
                            <span></span>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500"
                            onClick={() => remove(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto" 
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {eventData ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>{eventData ? "Update Event" : "Add Event"}</>
                    )}
                  </Button>
                </div>
              </form>
          </div>
        )}
      </div>
    </div>
  );
}
