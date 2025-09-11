export type ResourceType = 'Book' | 'Journal' | 'Magazine' | 'QuestionBank' | 'Other';

export interface LibraryResource {
  id: string;
  dept: string;
  resource_type: ResourceType;
  title: string;
  author: string;
  year: number;
  inventory_no: string;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}
