import { z } from 'zod';
import { CrudConfig } from './crudFactory';
import { MODULE_TYPES } from './deptRules';

// Helper type for CrudConfig to handle Zod schemas properly
type AnyCrudConfig = CrudConfig<any>;

/**
 * Entity Configuration Map
 * 
 * This file contains the configuration for all entity types in the CMS.
 * Each configuration defines the schema, fields, and behavior for CRUD operations.
 */

/**
 * Faculty Profile Configuration
 */
export const facultyProfileSchema = z.object({
  name: z.string().min(2).max(100),
  designation: z.string().min(2).max(100),
  qualification: z.string().min(2).max(100),
  specialization: z.string().min(2).max(255),
  experience: z.number().int().min(0),
  email: z.string().email(),
  phone: z.string().min(10).max(15).optional(),
  bio: z.string().optional(),
  research_interests: z.array(z.string()).optional(),
  profile_image: z.string().url().optional(),
  joining_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  is_hod: z.boolean(),
  is_active: z.boolean(),
  order_index: z.number().int().min(0),
});

export type FacultyProfile = z.infer<typeof facultyProfileSchema>;

export const facultyProfileConfig: CrudConfig<FacultyProfile> = {
  tableName: 'faculty_profiles',
  entityName: 'faculty profile',
  keyFields: ['id'],
  allowedFields: [
    'name', 'designation', 'qualification', 'specialization',
    'experience', 'email', 'phone', 'bio', 'research_interests',
    'profile_image', 'joining_date', 'is_hod', 'is_active', 'order_index'
  ],
  zodSchema: facultyProfileSchema,
  departmentScoped: true,
  moduleType: MODULE_TYPES.FACULTY,
  requiresApproval: true,
  fieldMappings: {
    'research_interests': 'research_interests' // This will be JSON stored as string
  },
  defaultSortField: 'order_index'
};

/**
 * Event Configuration
 */
export const eventSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string(),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  venue: z.string().min(2).max(100),
  type: z.enum(['workshop', 'seminar', 'conference', 'fest', 'other']),
  featured_image: z.string().url().optional(),
  gallery_images: z.array(z.string().url()).optional(),
  registration_link: z.string().url().optional(),
  organizers: z.array(z.string()).optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventConfig: CrudConfig<Event> = {
  tableName: 'events',
  entityName: 'event',
  keyFields: ['id'],
  allowedFields: [
    'title', 'description', 'event_date', 'end_date', 'venue', 
    'type', 'featured_image', 'gallery_images', 'registration_link',
    'organizers', 'is_featured', 'is_active'
  ],
  zodSchema: eventSchema,
  departmentScoped: true,
  moduleType: MODULE_TYPES.EVENTS,
  requiresApproval: true,
  fieldMappings: {
    'gallery_images': 'gallery_images', // JSON stored as string
    'organizers': 'organizers' // JSON stored as string
  },
  defaultSortField: 'event_date'
};

/**
 * Announcement Configuration
 */
export const announcementSchema = z.object({
  title: z.string().min(5).max(255),
  content: z.string(),
  publish_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  expiry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  type: z.enum(['general', 'academic', 'exam', 'placement', 'urgent']),
  attachment_url: z.string().url().optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
});

export type Announcement = z.infer<typeof announcementSchema>;

export const announcementConfig: CrudConfig<Announcement> = {
  tableName: 'announcements',
  entityName: 'announcement',
  keyFields: ['id'],
  allowedFields: [
    'title', 'content', 'publish_date', 'expiry_date', 'type',
    'attachment_url', 'is_featured', 'is_active'
  ],
  zodSchema: announcementSchema,
  departmentScoped: true,
  moduleType: MODULE_TYPES.ANNOUNCEMENTS,
  requiresApproval: true,
  defaultSortField: 'publish_date'
};

/**
 * Gallery Configuration
 */
export const galleryItemSchema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().optional(),
  image_url: z.string().url(),
  thumbnail_url: z.string().url().optional(),
  type: z.enum(['image', 'video']),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  event_name: z.string().optional(),
  tags: z.array(z.string()).optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const galleryConfig: CrudConfig<GalleryItem> = {
  tableName: 'gallery',
  entityName: 'gallery item',
  keyFields: ['id'],
  allowedFields: [
    'title', 'description', 'image_url', 'thumbnail_url', 'type',
    'event_date', 'event_name', 'tags', 'is_featured', 'is_active'
  ],
  zodSchema: galleryItemSchema,
  departmentScoped: true,
  moduleType: MODULE_TYPES.GALLERY,
  requiresApproval: true,
  fieldMappings: {
    'tags': 'tags' // JSON stored as string
  },
  defaultSortField: 'created_at'
};

/**
 * Achievement Configuration
 */
export const achievementSchema = z.object({
  title: z.string().min(5).max(255),
  description: z.string(),
  achievement_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  achievement_type: z.enum(['faculty', 'student', 'department', 'college']),
  recipients: z.array(z.string()),
  image_url: z.string().url().optional(),
  source_url: z.string().url().optional(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
});

export type Achievement = z.infer<typeof achievementSchema>;

export const achievementConfig: CrudConfig<Achievement> = {
  tableName: 'achievements',
  entityName: 'achievement',
  keyFields: ['id'],
  allowedFields: [
    'title', 'description', 'achievement_date', 'achievement_type',
    'recipients', 'image_url', 'source_url', 'is_featured', 'is_active'
  ],
  zodSchema: achievementSchema,
  departmentScoped: true,
  moduleType: MODULE_TYPES.ACHIEVEMENTS,
  requiresApproval: true,
  fieldMappings: {
    'recipients': 'recipients' // JSON stored as string
  },
  defaultSortField: 'achievement_date'
};

/**
 * Board of Studies Configuration
 */
export const boardOfStudiesSchema = z.object({
  dept: z.string().min(1).max(50),
  description: z.string().min(10),
  document_url: z.string().url().optional(),
  academic_year: z.string().max(16).optional(),
  // Make sure status is not optional by providing a default value
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});

export type BoardOfStudies = z.infer<typeof boardOfStudiesSchema>;

export const boardOfStudiesConfig: CrudConfig<BoardOfStudies> = {
  tableName: 'board_of_studies',
  entityName: 'board of studies',
  keyFields: ['id'],
  allowedFields: [
    'dept', 'description', 'document_url', 'academic_year', 'status'
  ],
  // Use a type assertion to convince TypeScript that our schema is compatible
  zodSchema: boardOfStudiesSchema as unknown as z.ZodType<BoardOfStudies>,
  departmentScoped: true,
  moduleType: MODULE_TYPES.BOARD_OF_STUDIES,
  requiresApproval: true,
  fieldMappings: {}
};

/**
 * Syllabus Documents Configuration
 */
import { SyllabusType, getSyllabusTypes } from '@/utils/syllabus-utils';

export const syllabusDocumentSchema = z.object({
  dept: z.string().min(1).max(50),
  type: z.string().refine((val) => ['btech', 'mtech', 'soc', 'mba', 'syllabus'].includes(val), {
    message: "Invalid syllabus type"
  }),
  description: z.string().min(10),
  document_url: z.string().url().optional(),
  academic_year: z.string().max(16),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
});

export type SyllabusDocument = z.infer<typeof syllabusDocumentSchema>;

export const syllabusDocumentConfig: CrudConfig<SyllabusDocument> = {
  tableName: 'syllabus_documents',
  entityName: 'syllabus document',
  keyFields: ['id'],
  allowedFields: [
    'dept', 'type', 'description', 'document_url', 'academic_year', 'status'
  ],
  zodSchema: syllabusDocumentSchema as unknown as z.ZodType<SyllabusDocument>,
  departmentScoped: true,
  moduleType: MODULE_TYPES.SYLLABUS_DOCUMENTS,
  requiresApproval: true,
  fieldMappings: {}
};

// Export the configuration map for all entities
export const entityConfigMap = {
  faculty_profiles: facultyProfileConfig,
  events: eventConfig,
  announcements: announcementConfig,
  gallery: galleryConfig,
  achievements: achievementConfig,
  board_of_studies: boardOfStudiesConfig,
  syllabus_documents: syllabusDocumentConfig
  // Add more entity configurations as needed
};
