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
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Loader2, 
  Upload,
  X,
  Plus,
  User,
  Trophy
} from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Hackathon, Winner } from "@/types/hackathons";
import { DayPicker } from "react-day-picker";

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  level: z.enum(["Internal", "State", "National", "International"], { 
    required_error: "Level is required"
  }),
  position: z.string().min(1, { message: "Position is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  proof_file: z.any().optional(),
  winners: z.array(z.object({
    name: z.string().min(1, { message: "Winner name is required" }),
    role: z.string().optional(),
    photo_url: z.string().optional(),
    file: z.any().optional(),
    isNew: z.boolean().optional()
  })).optional()
});

type HackathonFormValues = z.infer<typeof formSchema>;

interface HackathonFormProps {
  deptId: string;
  existingHackathon?: Hackathon | null;
  onSuccess: () => void;
}

export function HackathonForm({ deptId, existingHackathon, onSuccess }: HackathonFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProofFile, setSelectedProofFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    existingHackathon?.date ? new Date(existingHackathon.date) : undefined
  );
  
  // Parse winners data from the hackathon
  const parseWinners = (): Winner[] => {
    if (!existingHackathon?.winners) return [];
    
    if (typeof existingHackathon.winners === 'string') {
      try {
        return JSON.parse(existingHackathon.winners);
      } catch (e) {
        console.error("Error parsing winners JSON:", e);
        return [];
      }
    }
    
    return existingHackathon.winners;
  };

  // Initialize the form with default values
  const form = useForm<HackathonFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingHackathon?.title || "",
      level: existingHackathon?.level || "Internal",
      position: existingHackathon?.position || "",
      date: existingHackathon?.date ? format(new Date(existingHackathon.date), "yyyy-MM-dd") : "",
      winners: parseWinners().map(winner => ({
        ...winner,
        file: undefined,
        isNew: false
      })) || []
    },
  });
  
  // Field array for winners
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "winners"
  });

  // Handle date selection
  useEffect(() => {
    if (selectedDate) {
      form.setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate, form]);

  // Handle proof file selection
  const handleProofFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedProofFile(file);
      form.setValue("proof_file", file);
    }
  };
  
  // Handle winner photo file selection
  const handleWinnerPhotoChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedWinners = [...form.getValues("winners") || []];
      updatedWinners[index] = {
        ...updatedWinners[index],
        file,
        isNew: true
      };
      form.setValue("winners", updatedWinners);
    }
  };

  // Add a new winner field
  const addWinner = () => {
    append({ name: "", role: "", photo_url: "", file: undefined, isNew: true });
  };

  // Submit the form
  const onSubmit = async (values: HackathonFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all form fields
      formData.append("dept", deptId);
      formData.append("title", values.title);
      formData.append("level", values.level);
      formData.append("position", values.position);
      formData.append("date", values.date);
      
      // Add existing ID for updates
      if (existingHackathon?.id) {
        formData.append("id", existingHackathon.id);
      }
      
      // Add proof file if selected
      if (selectedProofFile) {
        formData.append("proof_file", selectedProofFile);
      } else if (existingHackathon?.proof_url) {
        formData.append("proof_url", existingHackathon.proof_url);
      }
      
      // Handle winners
      if (values.winners && values.winners.length > 0) {
        // Filter out empty winner entries
        const validWinners = values.winners.filter(w => w.name.trim() !== '');
        
        // Add winner photos if any
        validWinners.forEach((winner, index) => {
          if (winner.file) {
            formData.append(`winner_files`, winner.file);
            formData.append(`winner_file_indices`, index.toString());
          }
        });
        
        // Add winners data as JSON
        const winnersForSubmission = validWinners.map(({ name, role, photo_url }) => ({
          name,
          role,
          photo_url
        }));
        
        formData.append("winners", JSON.stringify(winnersForSubmission));
      }
      
      // Submit the form
      const response = await fetch('/api/hackathons', {
        method: existingHackathon ? 'PATCH' : 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save hackathon");
      }
      
      toast.success(existingHackathon ? "Hackathon updated successfully!" : "Hackathon added successfully!");
      onSuccess();
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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
                      <FormLabel>Hackathon Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hackathon title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || "Internal"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Internal">Internal</SelectItem>
                          <SelectItem value="State">State</SelectItem>
                          <SelectItem value="National">National</SelectItem>
                          <SelectItem value="International">International</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Winner, Runner-up, 1st Place" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="YYYY-MM-DD"
                            value={field.value}
                            onChange={field.onChange}
                            type="date"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Proof Upload */}
              <div className="space-y-3">
                <FormLabel>Proof of Participation/Achievement</FormLabel>
                <div className="flex items-center gap-4">
                  <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                    <label className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Upload proof</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*, application/pdf"
                        onChange={handleProofFileChange}
                      />
                    </label>
                  </div>
                  
                  {/* Display proof preview or existing file */}
                  {(selectedProofFile || existingHackathon?.proof_url) && (
                    <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2">
                      <FilePreview
                        file={selectedProofFile}
                        existingUrl={existingHackathon?.proof_url}
                        onRemove={() => {
                          setSelectedProofFile(null);
                          form.setValue("proof_file", undefined);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Winners Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Winners
                  </h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addWinner}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Winner
                  </Button>
                </div>
                
                {fields.length === 0 && (
                  <div className="text-gray-500 dark:text-gray-400 italic text-center py-6">
                    No winners added yet. Click "Add Winner" to add team members.
                  </div>
                )}
                
                {fields.map((field, index) => (
                  <Card key={field.id} className="overflow-hidden border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-md font-medium">Winner #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          className="h-8 w-8 p-0 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`winners.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="Winner name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`winners.${index}.role`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Team Leader, Developer" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div>
                          <FormLabel>Photo</FormLabel>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {form.getValues(`winners.${index}.photo_url`) ? (
                                <img 
                                  src={form.getValues(`winners.${index}.photo_url`)}
                                  alt={form.getValues(`winners.${index}.name`)}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <User className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <label className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer">
                                Upload
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={(e) => handleWinnerPhotoChange(index, e)}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{existingHackathon ? "Update Hackathon" : "Add Hackathon"}</>
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

// Helper component for file preview
interface FilePreviewProps {
  file?: File | null;
  existingUrl?: string;
  onRemove: () => void;
}

function FilePreview({ file, existingUrl, onRemove }: FilePreviewProps) {
  if (!file && !existingUrl) return null;
  
  const isPdf = file 
    ? file.type === "application/pdf" 
    : existingUrl?.toLowerCase().endsWith('.pdf');
    
  const fileName = file 
    ? file.name 
    : existingUrl?.split('/').pop() || "Uploaded file";
  
  return (
    <div className="flex items-center gap-3">
      <div className="text-sm font-medium truncate max-w-[200px]">
        {isPdf ? "📄 " : "🖼️ "}
        {fileName}
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-500 hover:text-red-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
