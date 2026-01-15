/**
 * Faculty Research Modules - Type Definitions
 * Defines all types for research-related modules
 */

export enum ModuleType {
  RESEARCH_VERTICALS = 'research_verticals',
  RESEARCH_SUPERVISORS = 'research_supervisors',
  JOURNAL_PUBLICATIONS = 'journal_publications',
  CONFERENCE_PUBLICATIONS = 'conference_publications',
  PATENTS = 'patents',
  BOOK_PUBLICATIONS = 'book_publications',
  CAREER_ADVANCEMENTS = 'career_advancements',
  INTERACTION_OUTSIDE_WORLD = 'interaction_outside_world',
}

export const MODULE_LABELS: Record<ModuleType, string> = {
  [ModuleType.RESEARCH_VERTICALS]: 'Research Verticals',
  [ModuleType.RESEARCH_SUPERVISORS]: 'Research Supervisor',
  [ModuleType.JOURNAL_PUBLICATIONS]: 'Journal Publications',
  [ModuleType.CONFERENCE_PUBLICATIONS]: 'Conference Publications',
  [ModuleType.PATENTS]: 'Patents',
  [ModuleType.BOOK_PUBLICATIONS]: 'Book Publications',
  [ModuleType.CAREER_ADVANCEMENTS]: 'Career Advancements',
  [ModuleType.INTERACTION_OUTSIDE_WORLD]: 'Interaction with Outside World',
};

// 1. RESEARCH VERTICALS
export interface ResearchVertical {
  id: number;
  faculty_id: number;
  vertical_name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  areas?: ResearchVerticalArea[];
}

export interface ResearchVerticalArea {
  id: number;
  vertical_id: number;
  area_name: string;
  faculty_members?: string[];
}

export interface ResearchVerticalFormData {
  vertical_name: string;
  description?: string;
  areas?: { area_name: string; faculty_members?: string }[];
}

// 2. RESEARCH SUPERVISORS
export interface ResearchSupervisor {
  id: number;
  supervisor_id: number;
  scholar_id?: number;
  scholar_name: string;
  status: 'On Going' | 'Completed';
  proof_document?: string;
  start_date?: string;
  completion_date?: string;
}

export interface ResearchSupervisorFormData {
  scholar_name: string;
  status: 'On Going' | 'Completed';
  proof_document?: File;
  start_date?: string;
  completion_date?: string;
}

// 3. JOURNAL PUBLICATIONS
export interface JournalPublication {
  id: number;
  faculty_id: number;
  journal_name: string;
  paper_title: string;
  publication_year?: number;
  volume_number?: string;
  issue_number?: string;
  page_numbers?: string;
  doi?: string;
  impact_factor?: number;
  proof_document?: string;
}

export interface JournalPublicationFormData {
  journal_name: string;
  paper_title: string;
  publication_year?: number;
  volume_number?: string;
  issue_number?: string;
  page_numbers?: string;
  doi?: string;
  impact_factor?: number;
  proof_document?: File;
}

// 4. CONFERENCE PUBLICATIONS
export interface ConferencePublication {
  id: number;
  faculty_id: number;
  faculty_names: string[];
  paper_title: string;
  conference_name: string;
  conference_location?: string;
  publication_year?: number;
  isbn_issn?: string;
  proof_document?: string;
}

export interface ConferencePublicationFormData {
  faculty_names: string[];
  paper_title: string;
  conference_name: string;
  conference_location?: string;
  publication_year?: number;
  isbn_issn?: string;
  proof_document?: File;
}

// 5. PATENTS
export interface Patent {
  id: number;
  faculty_id: number;
  inventor_names: string[];
  patent_title: string;
  patent_number?: string;
  application_number?: string;
  filing_date?: string;
  publication_date?: string;
  status: 'Applied' | 'Published' | 'Granted';
  proof_document?: string;
}

export interface PatentFormData {
  inventor_names: string[];
  patent_title: string;
  patent_number?: string;
  application_number?: string;
  filing_date?: string;
  publication_date?: string;
  status: 'Applied' | 'Published' | 'Granted';
  proof_document?: File;
}

// 6. BOOK PUBLICATIONS
export interface BookPublication {
  id: number;
  faculty_id: number;
  book_title: string;
  authors: string[];
  publication_year?: number;
  publisher_name?: string;
  isbn_number?: string;
  proof_document?: string;
}

export interface BookPublicationFormData {
  book_title: string;
  authors: string[];
  publication_year?: number;
  publisher_name?: string;
  isbn_number?: string;
  proof_document?: File;
}

// 7. CAREER ADVANCEMENTS
export interface CareerAdvancement {
  id: number;
  faculty_id: number;
  institute_name: string;
  degree_pursuing: string;
  joining_date: string;
  completion_date?: string;
  degree_status: 'Pursuing' | 'Completed';
  proof_document?: string;
}

export interface CareerAdvancementFormData {
  institute_name: string;
  degree_pursuing: string;
  joining_date: string;
  completion_date?: string;
  degree_status: 'Pursuing' | 'Completed';
  proof_document?: File;
}

// 8. INTERACTION WITH OUTSIDE WORLD
export type InteractionType = 'Seminar' | 'Workshop' | 'Industrial Visit' | 'Guest Lecture' | 'Collaboration' | 'Conference' | 'Other';

export interface InteractionOutsideWorld {
  id: number;
  faculty_id: number;
  interaction_type: InteractionType;
  title: string;
  description?: string;
  organization_name?: string;
  interaction_date?: string;
  location?: string;
  participants_count?: number;
  proof_document?: string;
}

export interface InteractionOutsideWorldFormData {
  interaction_type: InteractionType;
  title: string;
  description?: string;
  organization_name?: string;
  interaction_date?: string;
  location?: string;
  participants_count?: number;
  proof_document?: File;
}

// COMBINED TYPES
export type ModuleData =
  | ResearchVertical
  | ResearchSupervisor
  | JournalPublication
  | ConferencePublication
  | Patent
  | BookPublication
  | CareerAdvancement
  | InteractionOutsideWorld;

export type ModuleFormData =
  | ResearchVerticalFormData
  | ResearchSupervisorFormData
  | JournalPublicationFormData
  | ConferencePublicationFormData
  | PatentFormData
  | BookPublicationFormData
  | CareerAdvancementFormData
  | InteractionOutsideWorldFormData;

export interface FacultyModuleSelection {
  id: number;
  faculty_id: number;
  selected_modules: ModuleType[];
  last_updated: string;
}
