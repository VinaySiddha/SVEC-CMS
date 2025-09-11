import { z } from 'zod';

// Define module metadata types
export interface ModuleFieldSchema {
  name: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'file' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  accepts?: string[]; // For file type, e.g., ['pdf', 'jpg', 'png']
}

export interface ModuleSchema {
  id: string;
  name: string;
  label: string;
  description?: string;
  icon?: string;
  fields: ModuleFieldSchema[];
  permissions: {
    create: string[];
    read: string[];
    update: string[];
    delete: string[];
  };
}

// Define available modules and their schemas
const moduleSchemas: Record<string, ModuleSchema> = {
  faculty_profiles: {
    id: 'faculty_profiles',
    name: 'faculty_profiles',
    label: 'Faculty Profiles',
    description: 'Manage faculty profiles for the department',
    icon: 'users',
    fields: [
      {
        name: 'name',
        type: 'text',
        label: 'Name',
        required: true,
      },
      {
        name: 'designation',
        type: 'text',
        label: 'Designation',
        required: true,
      },
      {
        name: 'qualification',
        type: 'text',
        label: 'Qualification',
        required: true,
      },
      {
        name: 'experience',
        type: 'number',
        label: 'Experience (years)',
        required: true,
      },
      {
        name: 'specializations',
        type: 'text',
        label: 'Specializations',
        required: true,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
      },
      {
        name: 'photo',
        type: 'file',
        label: 'Photo',
        required: true,
        accepts: ['jpg', 'png'],
      },
      {
        name: 'cv',
        type: 'file',
        label: 'CV/Resume',
        accepts: ['pdf'],
      },
    ],
    permissions: {
      create: ['dept_admin', 'hod', 'admin'],
      read: ['dept_admin', 'hod', 'faculty', 'admin', 'public'],
      update: ['dept_admin', 'hod', 'admin'],
      delete: ['hod', 'admin'],
    },
  },
  events: {
    id: 'events',
    name: 'events',
    label: 'Events',
    description: 'Manage department events',
    icon: 'calendar',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Event Title',
        required: true,
      },
      {
        name: 'start_date',
        type: 'date',
        label: 'Start Date',
        required: true,
      },
      {
        name: 'end_date',
        type: 'date',
        label: 'End Date',
        required: true,
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        required: true,
      },
      {
        name: 'venue',
        type: 'text',
        label: 'Venue',
        required: true,
      },
      {
        name: 'coordinator',
        type: 'text',
        label: 'Coordinator',
        required: true,
      },
      {
        name: 'poster',
        type: 'file',
        label: 'Event Poster',
        accepts: ['jpg', 'png'],
      },
      {
        name: 'document',
        type: 'file',
        label: 'Additional Documents',
        accepts: ['pdf'],
      },
    ],
    permissions: {
      create: ['dept_admin', 'hod', 'admin'],
      read: ['dept_admin', 'hod', 'faculty', 'admin', 'public'],
      update: ['dept_admin', 'hod', 'admin'],
      delete: ['hod', 'admin'],
    },
  },
  gallery_images: {
    id: 'gallery_images',
    name: 'gallery_images',
    label: 'Gallery',
    description: 'Manage department gallery images',
    icon: 'image',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'caption',
        type: 'text',
        label: 'Caption',
        required: true,
      },
      {
        name: 'image',
        type: 'file',
        label: 'Image',
        required: true,
        accepts: ['jpg', 'png'],
      },
    ],
    permissions: {
      create: ['dept_admin', 'hod', 'admin'],
      read: ['dept_admin', 'hod', 'faculty', 'admin', 'public'],
      update: ['dept_admin', 'hod', 'admin'],
      delete: ['hod', 'admin'],
    },
  },
  resources: {
    id: 'resources',
    name: 'resources',
    label: 'Library Resources',
    description: 'Manage department library resources',
    icon: 'book',
    fields: [
      {
        name: 'resource_type',
        type: 'select',
        label: 'Resource Type',
        required: true,
        options: [
          { value: 'Book', label: 'Book' },
          { value: 'Journal', label: 'Journal' },
          { value: 'Magazine', label: 'Magazine' },
          { value: 'QuestionBank', label: 'Question Bank' },
          { value: 'Other', label: 'Other' },
        ],
      },
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'author',
        type: 'text',
        label: 'Author',
        required: true,
      },
      {
        name: 'year',
        type: 'number',
        label: 'Year',
        required: true,
      },
      {
        name: 'inventory_no',
        type: 'text',
        label: 'Inventory Number',
        required: true,
      },
      {
        name: 'file',
        type: 'file',
        label: 'File',
        accepts: ['pdf'],
      },
    ],
    permissions: {
      create: ['dept_admin', 'hod', 'admin'],
      read: ['dept_admin', 'hod', 'faculty', 'admin', 'students'],
      update: ['dept_admin', 'hod', 'admin'],
      delete: ['hod', 'admin'],
    },
  },
  handbooks: {
    id: 'handbooks',
    name: 'handbooks',
    label: 'Handbooks',
    description: 'Manage department handbooks',
    icon: 'book-open',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',
        required: true,
      },
      {
        name: 'edition',
        type: 'text',
        label: 'Edition',
        required: true,
      },
      {
        name: 'document',
        type: 'file',
        label: 'Document',
        required: true,
        accepts: ['pdf'],
      },
    ],
    permissions: {
      create: ['dept_admin', 'hod', 'admin'],
      read: ['dept_admin', 'hod', 'faculty', 'admin', 'students'],
      update: ['dept_admin', 'hod', 'admin'],
      delete: ['hod', 'admin'],
    },
  },
};

/**
 * Get modules that a department has access to based on permissions
 * @param dept The department code
 * @param role The user role
 * @returns List of modules with their schemas
 */
export function getModulesForDept(dept: string, role: string = 'dept_admin'): ModuleSchema[] {
  // In a real system, you might have a different mapping of modules for each department
  // For this implementation, all departments have access to all modules
  
  // Department-specific module restrictions (example)
  const deptModuleRestrictions: Record<string, string[]> = {
    // Restrict certain modules for specific departments if needed
    // 'dept_code': ['module_id_to_restrict'],
  };
  
  return Object.values(moduleSchemas).filter(module => {
    // Check if the role has read permission for the module
    const hasPermission = module.permissions.read.includes(role) || 
                          module.permissions.read.includes('public');
    
    // Check if the department is restricted from this module
    const isRestricted = deptModuleRestrictions[dept]?.includes(module.id) || false;
    
    return hasPermission && !isRestricted;
  });
}

/**
 * Get a specific module schema
 * @param moduleId The module ID
 * @returns The module schema or null if not found
 */
export function getModuleSchema(moduleId: string): ModuleSchema | null {
  return moduleSchemas[moduleId] || null;
}

/**
 * Create a Zod schema from a module schema for validation
 * @param moduleId The module ID
 * @returns A Zod schema for validating module data
 */
export function createZodSchemaForModule(moduleId: string): z.ZodObject<any> {
  const moduleSchema = getModuleSchema(moduleId);
  if (!moduleSchema) {
    throw new Error(`Module ${moduleId} not found`);
  }

  const schemaShape: Record<string, z.ZodType<any>> = {};

  moduleSchema.fields.forEach(field => {
    if (field.type === 'text' || field.type === 'textarea') {
      if (field.required) {
        schemaShape[field.name] = z.string().min(1, `${field.label} is required`);
      } else {
        schemaShape[field.name] = z.string().optional();
      }
    }
    else if (field.type === 'number') {
      let schema = z.number();
      if (field.validation?.min !== undefined) {
        schema = schema.min(field.validation.min);
      }
      if (field.validation?.max !== undefined) {
        schema = schema.max(field.validation.max);
      }
      if (field.required) {
        schemaShape[field.name] = schema;
      } else {
        schemaShape[field.name] = schema.optional();
      }
    }
    else if (field.type === 'email') {
      if (field.required) {
        schemaShape[field.name] = z.string().email(`Invalid ${field.label} format`);
      } else {
        schemaShape[field.name] = z.string().email(`Invalid ${field.label} format`).optional();
      }
    }
    else if (field.type === 'date') {
      if (field.required) {
        schemaShape[field.name] = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, `Invalid ${field.label} format`);
      } else {
        schemaShape[field.name] = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, `Invalid ${field.label} format`).optional();
      }
    }
    else if (field.type === 'select') {
      const options = field.options?.map(opt => opt.value) || [];
      if (field.required) {
        schemaShape[field.name] = z.enum(options as [string, ...string[]]);
      } else {
        schemaShape[field.name] = z.enum(options as [string, ...string[]]).optional();
      }
    }
    else if (field.type === 'file') {
      // File validation happens separately when processing the form
      if (field.required) {
        schemaShape[field.name] = z.string().min(1, `${field.label} is required`);
      } else {
        schemaShape[field.name] = z.string().optional();
      }
    }
  });

  // Always require department
  schemaShape.dept = z.string().min(1, 'Department is required');

  return z.object(schemaShape);
}
