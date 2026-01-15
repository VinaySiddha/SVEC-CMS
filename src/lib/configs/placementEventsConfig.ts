/**
 * Dynamic Fields Configuration for Placement Events Module
 * This file defines the structure and validation rules for event fields
 */

export interface DynamicField {
  name: string;
  label: string;
  type: 'text' | 'url' | 'file' | 'textarea' | 'email' | 'number' | 'date';
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    allowedFileTypes?: string[];
  };
  fileConfig?: {
    folder: string;
    maxSize: number; // in bytes
    acceptedFormats: string[];
  };
}

export interface DynamicFieldsConfig {
  moduleName: string;
  tableName: string;
  apiEndpoint: string;
  fields: DynamicField[];
}

/**
 * Configuration for Placement Events Module
 */
export const PLACEMENT_EVENTS_CONFIG: DynamicFieldsConfig = {
  moduleName: 'Placement Events',
  tableName: 'placement_events',
  apiEndpoint: '/api/placement/events',
  fields: [
    {
      name: 'title',
      label: 'Event Title',
      type: 'text',
      required: true,
      placeholder: 'e.g., TCS Recruitment Drive',
      validation: {
        minLength: 3,
        maxLength: 255
      }
    },
    {
      name: 'circular_url',
      label: 'Circular (PDF)',
      type: 'file',
      required: false,
      placeholder: 'Upload circular PDF',
      fileConfig: {
        folder: 'placement_events/circular',
        maxSize: 5 * 1024 * 1024, // 5MB
        acceptedFormats: ['application/pdf']
      }
    },
    {
      name: 'link',
      label: 'External Link',
      type: 'url',
      required: false,
      placeholder: 'e.g., https://company.com/careers',
      validation: {
        pattern: /^(https?:\/\/)?.+\..+/
      }
    },
    {
      name: 'guidelines_url',
      label: 'Guidelines (PDF)',
      type: 'file',
      required: false,
      placeholder: 'Upload guidelines PDF',
      fileConfig: {
        folder: 'placement_events/guidelines',
        maxSize: 5 * 1024 * 1024, // 5MB
        acceptedFormats: ['application/pdf']
      }
    }
  ]
};

/**
 * Validate a field value against its configuration
 */
export function validateField(field: DynamicField, value: any): { valid: boolean; error?: string } {
  // Check if required
  if (field.required && !value) {
    return { valid: false, error: `${field.label} is required` };
  }

  if (!value) {
    return { valid: true };
  }

  // Validate based on type
  switch (field.type) {
    case 'text':
    case 'textarea':
      if (field.validation?.minLength && value.length < field.validation.minLength) {
        return { valid: false, error: `${field.label} must be at least ${field.validation.minLength} characters` };
      }
      if (field.validation?.maxLength && value.length > field.validation.maxLength) {
        return { valid: false, error: `${field.label} must not exceed ${field.validation.maxLength} characters` };
      }
      break;

    case 'url':
      if (field.validation?.pattern && !field.validation.pattern.test(value)) {
        return { valid: false, error: `${field.label} is not a valid URL` };
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, error: `${field.label} is not a valid email` };
      }
      break;

    case 'number':
      if (isNaN(value)) {
        return { valid: false, error: `${field.label} must be a number` };
      }
      break;

    case 'date':
      if (isNaN(new Date(value).getTime())) {
        return { valid: false, error: `${field.label} is not a valid date` };
      }
      break;

    case 'file':
      if (field.fileConfig) {
        if (value instanceof File) {
          if (value.size > field.fileConfig.maxSize) {
            return { valid: false, error: `${field.label} must be smaller than ${field.fileConfig.maxSize / 1024 / 1024}MB` };
          }
          if (!field.fileConfig.acceptedFormats.includes(value.type)) {
            return { valid: false, error: `${field.label} must be in one of these formats: ${field.fileConfig.acceptedFormats.join(', ')}` };
          }
        }
      }
      break;
  }

  return { valid: true };
}

/**
 * Get all fields from configuration
 */
export function getFields(): DynamicField[] {
  return PLACEMENT_EVENTS_CONFIG.fields;
}

/**
 * Get a specific field by name
 */
export function getField(fieldName: string): DynamicField | undefined {
  return PLACEMENT_EVENTS_CONFIG.fields.find(f => f.name === fieldName);
}

/**
 * Get required fields
 */
export function getRequiredFields(): DynamicField[] {
  return PLACEMENT_EVENTS_CONFIG.fields.filter(f => f.required);
}

/**
 * Get file upload fields
 */
export function getFileFields(): DynamicField[] {
  return PLACEMENT_EVENTS_CONFIG.fields.filter(f => f.type === 'file');
}
