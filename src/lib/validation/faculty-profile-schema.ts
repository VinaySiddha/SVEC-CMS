import { z } from 'zod';

// Faculty Profile Schema
export const facultyProfileSchema = z.object({
  dept: z.string({
    required_error: "Department is required"
  }),
  name: z.string({
    required_error: "Name is required"
  }).min(2, "Name must be at least 2 characters"),
  qualification: z.string().optional(),
  designation: z.string().optional(),
  profile: z
    .instanceof(File, { message: "Please upload a valid file" })
    .refine(
      (file) => file.size <= 2 * 1024 * 1024, 
      "File size must be less than 2MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "Only JPEG and PNG files are allowed"
    )
    .optional()
});

export type FacultyProfileFormData = z.infer<typeof facultyProfileSchema>;

// Response schema for Faculty Profile API
export const facultyProfileResponseSchema = z.object({
  id: z.number(),
  dept: z.string(),
  name: z.string(),
  qualification: z.string().nullable(),
  designation: z.string().nullable(),
  profile_url: z.string().nullable(),
  status: z.enum(["pending", "approved", "rejected"]),
  created_at: z.string(),
  updated_at: z.string()
});

export type FacultyProfileResponse = z.infer<typeof facultyProfileResponseSchema>;

// API List Response
export const apiListResponseSchema = z.object({
  data: z.array(facultyProfileResponseSchema),
  meta: z.object({
    total: z.number(),
    limit: z.number(),
    page: z.number()
  })
});

export type ApiListResponse = z.infer<typeof apiListResponseSchema>;
