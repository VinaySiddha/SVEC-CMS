import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn, formatFileSize } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-hot-toast";
import { Issue } from "@/types/issues";
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Schema for issue form validation
const issueFormSchema = z.object({
  issue: z.string().min(2, {
    message: "Issue must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  document: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.size <= MAX_FILE_SIZE, {
      message: `File size should be less than 5MB.`,
    })
    .optional(),
});

type IssueFormValues = z.infer<typeof issueFormSchema>;

interface IssueFormProps {
  deptId: string;
  issue?: Issue;
  onSuccess: () => void;
}

export function IssueForm({ deptId, issue, onSuccess }: IssueFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Convert the date string to a Date object for the form
  const defaultValues: Partial<IssueFormValues> = issue
    ? {
        issue: issue.issue,
        date: new Date(issue.date),
      }
    : {
        date: new Date(),
      };

  const form = useForm<IssueFormValues>({
    resolver: zodResolver(issueFormSchema),
    defaultValues,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("document", file);
    }
  };

  const onSubmit = async (data: IssueFormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append("issue", data.issue);
      formData.append("date", format(data.date, "yyyy-MM-dd"));

      if (selectedFile) {
        formData.append("document", selectedFile);
      }

      // If editing an existing issue, include the ID
      if (issue) {
        formData.append("id", issue.id);
      }

      const apiUrl = `/api/departments/${deptId}/issues`;
      const response = await fetch(apiUrl, {
        method: issue ? "PUT" : "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success(issue ? "Issue updated successfully" : "Issue added successfully");
        onSuccess();
        form.reset();
        setSelectedFile(null);
      } else {
        toast.error(result.message || "Failed to save issue");
      }
    } catch (error) {
      toast.error("Failed to save issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the issue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Issue Date</FormLabel>
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
                        format(field.value, "PPP")
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
                    selected={field.value}
                    onSelect={(date: Date | undefined) => field.onChange(date)}
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

        <FormField
          control={form.control}
          name="document"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Supporting Document</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    {...field}
                  />
                  {selectedFile && (
                    <div className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </div>
                  )}
                  {issue?.document_url && !selectedFile && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Current document:
                      </span>
                      <a
                        href={issue.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View Document
                      </a>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Optional. Upload supporting documents (max 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : issue ? "Update Issue" : "Add Issue"}
        </Button>
      </form>
    </div>
  );
}
