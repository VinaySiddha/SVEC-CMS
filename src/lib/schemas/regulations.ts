import { z } from 'zod';

export const regulationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long").max(255, "Title must be less than 255 characters"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  year: z.string().regex(/^\d{4}$/, "Year must be a 4-digit number"),
  type: z.enum(['B.Tech', 'M.Tech', 'M.B.A', 'M.C.A', 'Diploma'], {
    errorMap: () => ({ message: "Invalid regulation type" })
  }),
  document_url: z.string().url("Invalid document URL").optional(),
  academic_year: z.string().regex(/^\d{4}-\d{4}$/, "Academic year must be in format YYYY-YYYY"),
  effective_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  is_current: z.boolean().default(false),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  remarks: z.string().optional()
});

export type Regulation = z.infer<typeof regulationSchema>;

export const regulationConfigSchema = {
  tableName: 'regulations',
  entityName: 'regulation',
  keyFields: ['id'],
  allowedFields: [
    'title',
    'description',
    'year',
    'type',
    'document_url',
    'academic_year',
    'effective_from',
    'is_current',
    'status',
    'remarks'
  ],
  zodSchema: regulationSchema,
  departmentScoped: false, // Regulations are college-wide
  requiresApproval: true,
  defaultSortField: 'year'
};