// Client-side constants to avoid importing server modules

export const DEPARTMENTS = {
  'cse': 'Computer Science and Engineering',
  'ece': 'Electronics and Communication Engineering',
  'eee': 'Electrical and Electronics Engineering',
  'mech': 'Mechanical Engineering',
  'civil': 'Civil Engineering',
  'aiml': 'Artificial Intelligence and Machine Learning',
  'ds': 'Data Science',
  'mba': 'Master of Business Administration',
  'bsh': 'Basic Sciences and Humanities'
} as const;

export type DepartmentCode = keyof typeof DEPARTMENTS;
