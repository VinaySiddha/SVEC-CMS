"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2, Upload, X, FileText, FileCheck, Clock } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Resource } from "@/types/resources";

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  regulation: z.string().min(1, { message: "Regulation is required" }),
  semester: z.string().min(1, { message: "Semester is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  ppt_file: z.any().optional(),
  qbank_file: z.any().optional(),
  old_paper_file: z.any().optional()
});

type ResourceFormValues = z.infer<typeof formSchema>;

interface ResourceFormProps {
  deptId: string;
  existingResource?: Resource | null;
  onSuccess: () => void;
}

export function ResourceForm({ deptId, existingResource, onSuccess }: ResourceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPptFile, setSelectedPptFile] = useState<File | null>(null);
  const [selectedQbankFile, setSelectedQbankFile] = useState<File | null>(null);
  const [selectedOldPaperFile, setSelectedOldPaperFile] = useState<File | null>(null);

  // Regulation options
  const regulations = ["R16", "R19", "R20", "R22"];
  
  // Semester options
  const semesters = ["I-I", "I-II", "II-I", "II-II", "III-I", "III-II", "IV-I", "IV-II"];

  // Initialize the form with default values
  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingResource?.title || "",
      regulation: existingResource?.regulation || "",
      semester: existingResource?.semester || "",
      subject: existingResource?.subject || "",
    },
  });

  // Handle file selection
  const handlePptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPptFile(file);
      form.setValue("ppt_file", file);
    }
  };
  
  const handleQbankFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedQbankFile(file);
      form.setValue("qbank_file", file);
    }
  };
  
  const handleOldPaperFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedOldPaperFile(file);
      form.setValue("old_paper_file", file);
    }
  };

  // Submit the form
  const onSubmit = async (values: ResourceFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all form fields
      formData.append("dept", deptId);
      formData.append("title", values.title);
      formData.append("regulation", values.regulation);
      formData.append("semester", values.semester);
      formData.append("subject", values.subject);
      
      // Add existing ID for updates
      if (existingResource?.id) {
        formData.append("id", existingResource.id);
      }
      
      // Add files if selected
      if (selectedPptFile) {
        formData.append("ppt_file", selectedPptFile);
      } else if (existingResource?.ppt_url) {
        formData.append("ppt_url", existingResource.ppt_url);
      }
      
      if (selectedQbankFile) {
        formData.append("qbank_file", selectedQbankFile);
      } else if (existingResource?.qbank_url) {
        formData.append("qbank_url", existingResource.qbank_url);
      }
      
      if (selectedOldPaperFile) {
        formData.append("old_paper_file", selectedOldPaperFile);
      } else if (existingResource?.old_paper_url) {
        formData.append("old_paper_url", existingResource.old_paper_url);
      }
      
      // Submit the form
      const response = await fetch('/api/resources', {
        method: existingResource ? 'PATCH' : 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save resource");
      }
      
        ppt_url: data.resource.ppt_url,
        qbank_url: data.resource.qbank_url,
        old_paper_url: data.resource.old_paper_url
      });
      
      toast.success(existingResource ? "Resource updated successfully!" : "Resource added successfully!");
      onSuccess();
      
    } catch (error) {
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
                      <FormLabel>Resource Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter resource title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="regulation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regulation <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select regulation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {regulations.map(reg => (
                            <SelectItem key={reg} value={reg}>
                              {reg}
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
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester <span className="text-red-500">*</span></FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesters.map(sem => (
                            <SelectItem key={sem} value={sem}>
                              {sem}
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter subject name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* File Upload Section */}
              <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Resource Files</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Upload presentations, question banks, or old question papers
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PPT Upload */}
                  <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <h4 className="font-medium">Presentation</h4>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                          <label className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Upload PPT</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              onChange={handlePptFileChange}
                            />
                          </label>
                        </div>
                        
                        {/* Display file preview or existing url */}
                        {(selectedPptFile || existingResource?.ppt_url) && (
                          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 mt-2">
                            <FilePreview
                              file={selectedPptFile}
                              existingUrl={existingResource?.ppt_url}
                              iconComponent={<FileText className="h-4 w-4 text-blue-500" />}
                              onRemove={() => {
                                setSelectedPptFile(null);
                                form.setValue("ppt_file", undefined);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                  
                  {/* Question Bank Upload */}
                  <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-green-500" />
                        <h4 className="font-medium">Question Bank</h4>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                          <label className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Upload Q-Bank</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              onChange={handleQbankFileChange}
                            />
                          </label>
                        </div>
                        
                        {/* Display file preview or existing url */}
                        {(selectedQbankFile || existingResource?.qbank_url) && (
                          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 mt-2">
                            <FilePreview
                              file={selectedQbankFile}
                              existingUrl={existingResource?.qbank_url}
                              iconComponent={<FileCheck className="h-4 w-4 text-green-500" />}
                              onRemove={() => {
                                setSelectedQbankFile(null);
                                form.setValue("qbank_file", undefined);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                  
                  {/* Old Papers Upload */}
                  <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500" />
                        <h4 className="font-medium">Old Papers</h4>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                          <label className="flex flex-col items-center justify-center cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">Upload Papers</span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,application/pdf"
                              onChange={handleOldPaperFileChange}
                            />
                          </label>
                        </div>
                        
                        {/* Display file preview or existing url */}
                        {(selectedOldPaperFile || existingResource?.old_paper_url) && (
                          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 mt-2">
                            <FilePreview
                              file={selectedOldPaperFile}
                              existingUrl={existingResource?.old_paper_url}
                              iconComponent={<Clock className="h-4 w-4 text-amber-500" />}
                              onRemove={() => {
                                setSelectedOldPaperFile(null);
                                form.setValue("old_paper_file", undefined);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{existingResource ? "Update Resource" : "Add Resource"}</>
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
  iconComponent?: React.ReactNode;
  onRemove: () => void;
}

function FilePreview({ file, existingUrl, iconComponent, onRemove }: FilePreviewProps) {
  if (!file && !existingUrl) return null;
  
  const fileName = file 
    ? file.name 
    : existingUrl?.split('/').pop() || "Uploaded file";
  
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 truncate">
        {iconComponent || <FileText className="h-4 w-4" />}
        <span className="text-sm font-medium truncate max-w-[150px]">
          {fileName}
        </span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-gray-500 hover:text-red-500 ml-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
