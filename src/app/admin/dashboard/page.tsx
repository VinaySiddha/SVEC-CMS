'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { apiGet, apiDelete, apiPost, apiPut } from '@/lib/api';
import { MODULES_FIELD_CONFIG, getModuleFieldConfig } from '@/config/module-fields';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Grid3X3,
  List,
  BookOpen,
  Users,
  Award,
  Settings,
  GraduationCap,
  Building2,
  Globe,
  FileText,
  Activity,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  Filter,
  Download,
  Upload,
  Cpu,
  Zap,
  Hammer,
  BrainCircuit,
  Microscope,
  Image
} from 'lucide-react';
import { describe } from 'node:test';
import { table } from 'console';

// Comprehensive department modules configuration based on existing table structure
const DEPARTMENT_MODULES = {
  // Computer Science & AI (CSE-AI) - SORTED A-Z
  'cse-ai': [
    {
      key: 'academic-toppers',
      name: 'Academic Toppers',
      icon: Award,
      description: 'Academic toppers and scholarship recipients',
      table: 'cai_academictoppers'
    },
    {
      key: 'board-of-studies',
      name: 'Board of Studies',
      icon: BookOpen,
      description: 'Academic board meetings and decisions',
      table: 'cai_board_of_studies'
    },
    {
      key: 'contact',
      name: 'Contact Information',
      icon: Globe,
      description: 'Department contact details',
      table: 'cai_contact'
    },
    {
      key: 'department-info',
      name: 'Department Info',
      icon: Building2,
      description: 'Basic department information',
      table: 'cai_department_info'
    },
    {
      key: 'department-library',
      name: 'Department Library',
      icon: BookOpen,
      description: 'Library resources and books',
      table: 'cai_department_library'
    },
    {
      key: 'eresources',
      name: 'E-Resources',
      icon: Globe,
      description: 'Digital learning resources',
      table: 'cai_eresources'
    },
    {
      key: 'extra-curricular',
      name: 'Extra-Curricular',
      icon: Activity,
      description: 'Student activities and events',
      table: 'cai_extra_curricular'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'faculty_profiles'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'cai_faculty_achievements'
    },
    {
      key: 'faculty-development-programs',
      name: 'Faculty Development',
      icon: GraduationCap,
      description: 'Professional development programs',
      table: 'cai_faculty_development_programs'
    },
    {
      key: 'hackathons',
      name: 'Hackathons',
      icon: Briefcase,
      description: 'Coding competitions and events',
      table: 'cai_hackathons'
    },
    {
      key: 'handbooks',
      name: 'Handbooks',
      icon: BookOpen,
      description: 'Academic handbooks and guides',
      table: 'cai_handbooks'
    },
    {
      key: 'merit-scholarships',
      name: 'Merit Scholarships',
      icon: Award,
      description: 'Student scholarship programs',
      table: 'cai_merit_scholarships'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'cai_newsletters'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'cai_physical_facilities'
    },
    {
      key: 'placement-batches',
      name: 'Placement Batches',
      icon: Users,
      description: 'Student placement records',
      table: 'cai_placement_batches'
    },
    {
      key: 'placement-gallery',
      name: 'Placement Gallery',
      icon: Users,
      description: 'Placement success stories',
      table: 'cai_placement_gallery'
    },
    {
      key: 'staff',
      name: 'Staff',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'cai_staff'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'cai_student_achievements'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional associations',
      table: 'cai_technical_association'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'cai_workshops'
    }
  ],

  // Electronics & Communication Engineering (ECE) - SORTED A-Z WITH SORTED TABLE OPTIONS
  ece: [
    {
      key: 'academic-toppers',
      name: 'Academic Toppers',
      icon: Award,
      description: 'Academic toppers and scholarships',
      table: 'ece_academictoppers'
    },
    {
      key: 'bos-members',
      name: 'BOS Members',
      icon: Users,
      description: 'Board of Studies members',
      table: 'ece_bos_members'
    },
    {
      key: 'bos-minutes',
      name: 'BOS Minutes',
      icon: FileText,
      description: 'Board of Studies meeting minutes',
      table: 'ece_bos_minutes'
    },
    {
      key: 'department-library',
      name: 'Department Library',
      icon: BookOpen,
      description: 'Library resources and books',
      table: 'ece_department_library'
    },
    {
      key: 'department-overview',
      name: 'Department Overview',
      icon: Building2,
      description: 'HOD and department information',
      table: 'ece_department_overview'
    },
    {
      key: 'eresources',
      name: 'E-Resources',
      icon: Globe,
      description: 'Digital learning resources',
      table: 'ece_eresources'
    },
    {
      key: 'extra-curricular',
      name: 'Extra-Curricular',
      icon: Activity,
      description: 'Student activities and events',
      table: 'ece_extracurricular_activities'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'ece_faculty'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards, publications, and recognitions',
      table: 'ece_faculty_achievements',
      tableOptions: [
        { value: 'awards', label: 'Awards & Recognition', tableName: 'ece_faculty_awards' },
        { value: 'certifications', label: 'Certifications', tableName: 'ece_faculty_certifications' },
        { value: 'fdp', label: 'FDP Attended/Conducted', tableName: 'ece_faculty_fdp' },
        { value: 'patents', label: 'Patents', tableName: 'ece_faculty_patents' },
        { value: 'publications', label: 'Publications', tableName: 'ece_faculty_publications' },
        { value: 'research-projects', label: 'Research Projects', tableName: 'ece_faculty_research_projects' },
        { value: 'roll-of-honour', label: 'Roll of Honour', tableName: 'ece_faculty_roll_of_honour' },
      ]
    },
    {
      key: 'faculty-development',
      name: 'Faculty Development',
      icon: GraduationCap,
      description: 'Professional development programs',
      table: 'ece_faculty_development_programs'
    },
    {
      key: 'faculty-tl-innovations',
      name: 'Faculty TL Innovations',
      icon: Zap,
      describetion: 'Teaching learning innovations by faculty',
      table: 'eee_faculty_tl_innovations'
    },
    {
      key: 'hackathons',
      name: 'Hackathons',
      icon: Briefcase,
      description: 'Coding competitions and events',
      table: 'ece_hackathons'
    },
    {
      key: 'hackathons-gallery',
      name: 'Hackathons Gallery',
      icon: Image,
      description: 'Event photo galleries',
      table: 'ece_hackathons_gallery'
    },
    {
      key: 'handbooks',
      name: 'Handbooks',
      icon: BookOpen,
      description: 'Academic handbooks and guides',
      table: 'ece_handbooks'
    },
    {
      key: 'industry-programs',
      name: 'Industry Programs',
      icon: Briefcase,
      description: 'Industry collaboration programs',
      table: 'ece_industry_programs'
    },
    {
      key: 'mous',
      name: 'MOUs',
      icon: FileText,
      description: 'Memorandums of Understanding',
      table: 'ece_mous'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'ece_newsletters'
    },
    {
      key: 'non-teaching-faculty',
      name: 'Non-Teaching Faculty',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'ece_non_teaching_faculty'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'ece_physical_facilities'
    },
    {
      key: 'placements',
      name: 'Placements',
      icon: Users,
      description: 'Student placement records',
      table: 'ece_placements'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'ece_student_achievements',
      tableOptions: [
        { value: 'awards', label: 'Awards', tableName: 'ece_awards' },
        { value: 'community-service', label: 'Community Service', tableName: 'ece_csp' },
        { value: 'gate-gre', label: 'GATE/GRE', tableNames: ['ece_gate', 'ece_gre', 'ece_icet'] },
        { value: 'nptel-other-certifications', label: 'NPTEL/Other Certifications', tableName: 'ece_nptel' },
        { value: 'projects', label: 'Projects', tableName: 'ece_projects' },
        { value: 'publications', label: 'Publications', tableName: 'ece_publications' },
        { value: 'roll-of-honour', label: 'Roll of Honour', tableName: 'ece_roll_of_honour' },
        { value: 'student-research-projects', label: 'Student Research Projects', tableName: 'ece_research_projects' },
        { value: 'workshops-internships-seminars-webinars', label: 'Workshops, Internships, Seminars & Webinars', tableName: 'ece_workshops_internships' },
      ]
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'ece_syllabus'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional associations',
      table: 'ece_technical_association'
    },
    {
      key: 'technical-faculty',
      name: 'Technical Faculty',
      icon: Users,
      description: 'Technical staff members',
      table: 'ece_technical_faculty'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'ece_worshops_gl'
    }
  ],


  // Electronics & Communication Technology (ECT) - SORTED A-Z (29 MODULES)
  ect: [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Student scholarship programs', table: 'department_data' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'department_profile' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'department_data' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'department_data' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'faculty_profiles' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'faculty_development' },
    { key: 'gate', name: 'GATE', icon: Award, description: 'GATE exam records and details', table: 'department_data' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'department_data' },
    { key: 'hackathons-gallery', name: 'Hackathons Gallery', icon: Image, description: 'Gallery of hackathon events', table: 'department_data' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'handbooks' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'department_data' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Faculty', icon: Users, description: 'Non-teaching staff members', table: 'faculty_profiles' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'placements' },
    { key: 'roll-of-honour', name: 'Roll of Honour', icon: Award, description: 'Roll of Honour records', table: 'department_data' },
    { key: 'sahaya-events', name: 'Sahaya Events', icon: Activity, description: 'Sahaya community events', table: 'department_data' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'department_data' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Briefcase, description: 'Technical association programs', table: 'technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'faculty_profiles' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training programs and workshops', table: 'training_activities' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops and training', table: 'workshops' },
  ],

  // Civil Engineering - SORTED A-Z
  civil: [
    {
      key: 'board-of-studies',
      name: 'Board of Studies',
      icon: BookOpen,
      description: 'Academic board meetings and decisions',
      table: 'board_of_studies'
    },
    {
      key: 'bos-members',
      name: 'BOS Members',
      icon: Users,
      description: 'Board of Studies members',
      table: 'civil_bos_members'
    },
    {
      key: 'bos-minutes',
      name: 'BOS Minutes',
      icon: FileText,
      description: 'Board of Studies meeting minutes',
      table: 'civil_bos_minutes'
    },
    {
      key: 'consultancy',
      name: 'Consultancy',
      icon: Briefcase,
      description: 'Consultancy services and projects',
      table: 'civil_consultancy'
    },
    {
      key: 'extra-curricular-activities',
      name: 'Extra-Curricular Activities',
      icon: Activity,
      description: 'Student activities and events',
      table: 'civil_extra_curricular_activities'
    },
    {
      key: 'industry-programs',
      name: 'Industry Programs',
      icon: Briefcase,
      description: 'Industry collaboration programs',
      table: 'civil_industry_programs'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'civil_newsletters'
    },
    {
      key: 'non-teaching-faculty',
      name: 'Non-Teaching Faculty',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'civil_non_teaching_faculty'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'civil_physical_facilities'
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'civil_syllabus'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional associations',
      table: 'civil_technical_association'
    },
    {
      key: 'technical-faculty',
      name: 'Technical Faculty',
      icon: Users,
      description: 'Technical staff members',
      table: 'civil_technical_faculty'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'civil_workshops'
    }
  ],

  // Mechanical Engineering - SORTED A-Z
  mech: [
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'mech_faculty'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'mech_facultyachievements'
    },
    {
      key: 'faculty-tl-methods',
      name: 'Faculty Teaching Methods',
      icon: GraduationCap,
      description: 'Teaching learning methodologies',
      table: 'mech_facultyTLmethods'
    },
    {
      key: 'laboratories',
      name: 'Laboratories',
      icon: Building2,
      description: 'Lab facilities and equipment',
      table: 'mech_laboratories'
    },
    {
      key: 'library',
      name: 'Library',
      icon: BookOpen,
      description: 'Library resources and books',
      table: 'mech_library'
    },
    {
      key: 'magazines',
      name: 'Magazines',
      icon: FileText,
      description: 'Department magazines and publications',
      table: 'mech_magazines'
    },
    {
      key: 'mous',
      name: 'MOUs',
      icon: FileText,
      description: 'Memorandums of Understanding',
      table: 'mech_mous'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department newsletters',
      table: 'mech_newsletters'
    },
    {
      key: 'placements',
      name: 'Placements',
      icon: Users,
      description: 'Student placement records',
      table: 'mech_placements'
    },
    {
      key: 'project-research',
      name: 'Project Research',
      icon: Settings,
      description: 'Research projects and activities',
      table: 'mech_project_research'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'mech_studentachievements'
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'mech_syllabus'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional associations',
      table: 'mech_technicalassociation'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'mech_workshops'
    }
  ],

  // Computer Science Engineering - SORTED A-Z
  'cse': [
    {
      key: 'board-of-studies',
      name: 'Board of Studies',
      icon: BookOpen,
      description: 'Academic board meetings and decisions',
      table: 'board_of_studies'
    },
    {
      key: 'contact',
      name: 'Contact Information',
      icon: Globe,
      description: 'Department contact details',
      table: 'cai_contact'
    },
    {
      key: 'department-info',
      name: 'Department Info',
      icon: Building2,
      description: 'Basic department information',
      table: 'cai_department_info'
    },
    {
      key: 'department-library',
      name: 'Department Library',
      icon: BookOpen,
      description: 'Library resources and books',
      table: 'cse_department_library'
    },
    {
      key: 'eapcet-toppers',
      name: 'EAPCET Toppers',
      icon: Award,
      description: 'EAPCET exam toppers and rankers',
      table: 'cse_eapcet_toppers'
    },
    {
      key: 'eresources',
      name: 'E-Resources',
      icon: Globe,
      description: 'Digital learning resources',
      table: 'cse_eresources'
    },
    {
      key: 'extra-curricular',
      name: 'Extra-Curricular',
      icon: Activity,
      description: 'Student activities and events',
      table: 'cai_extra_curricular'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'faculty_profiles'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'cse_faculty_achievements'
    },
    {
      key: 'faculty-development-programs',
      name: 'Faculty Development',
      icon: GraduationCap,
      description: 'Professional development programs',
      table: 'cai_faculty_development_programs'
    },
    {
      key: 'hackathons',
      name: 'Hackathons',
      icon: Briefcase,
      description: 'Coding competitions and events',
      table: 'cai_hackathons'
    },
    {
      key: 'handbooks',
      name: 'Handbooks',
      icon: BookOpen,
      description: 'Academic handbooks and guides',
      table: 'cai_handbooks'
    },
    {
      key: 'merit-scholarships',
      name: 'Merit Scholarships',
      icon: Award,
      description: 'Student scholarship programs',
      table: 'cai_merit_scholarships'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'cai_newsletters'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'cai_physical_facilities'
    },
    {
      key: 'placement-batches',
      name: 'Placement Batches',
      icon: Users,
      description: 'Student placement records',
      table: 'cai_placement_batches'
    },
    {
      key: 'placement-gallery',
      name: 'Placement Gallery',
      icon: Users,
      description: 'Placement success stories',
      table: 'cai_placement_gallery'
    },
    {
      key: 'staff',
      name: 'Staff',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'cai_staff'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'cai_student_achievements'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional associations',
      table: 'cai_technical_association'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'workshops'
    }
  ],


  // Electrical & Electronics Engineering - SORTED A-Z
  eee: [
    {
      key: 'activity-coordinators',
      name: 'Activity Coordinators',
      icon: Users,
      description: 'Activity coordinators and organizers',
      table: 'eee_activity_coordinators'
    },
    {
      key: 'activity-events',
      name: 'Activity Events',
      icon: Activity,
      description: 'Department activity events',
      table: 'eee_activity_events'
    },
    {
      key: 'activity-gallery',
      name: 'Activity Gallery',
      icon: Image,
      description: 'Activity photos and gallery',
      table: 'eee_activity_gallery'
    },
    {
      key: 'bos-members',
      name: 'BOS Members',
      icon: Users,
      description: 'Board of Studies members',
      table: 'eee_bos_members'
    },
    {
      key: 'bos-minutes',
      name: 'BOS Minutes',
      icon: FileText,
      description: 'Board of Studies meeting minutes',
      table: 'eee_bos_minutes'
    },
    {
      key: 'department-overview',
      name: 'Department Overview',
      icon: Building2,
      description: 'Department overview and information',
      table: 'eee_department_overview'
    },
    {
      key: 'eapcet-toppers',
      name: 'EAPCET Toppers',
      icon: Award,
      description: 'EAPCET entrance exam toppers',
      table: 'eee_eapcet_toppers'
    },
    {
      key: 'eresources',
      name: 'E-Resources',
      icon: Globe,
      description: 'Digital learning resources',
      table: 'eee_eresources'
    },
    {
      key: 'extra-curricular',
      name: 'Extra-Curricular',
      icon: Activity,
      description: 'Extra-curricular activities',
      table: 'eee_extracurricular_activities'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'eee_faculty'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'eee_faculty_achievements'
    },
    {
      key: 'faculty-development',
      name: 'Faculty Development',
      icon: GraduationCap,
      description: 'Professional development programs',
      table: 'eee_faculty_development_programs'
    },
    {
      key: 'faculty-innovations',
      name: 'Faculty Innovations',
      icon: Zap,
      description: 'Teaching learning innovations by faculty',
      table: 'eee_faculty_tl_innovations'
    },
    {
      key: 'fdp',
      name: 'FDP',
      icon: GraduationCap,
      description: 'Faculty development programs',
      table: 'eee_faculty_development'
    },
    {
      key: 'gate',
      name: 'GATE',
      icon: Award,
      description: 'GATE exam results and toppers',
      table: 'eee_gate'
    },
    {
      key: 'hackathons',
      name: 'Hackathons',
      icon: Briefcase,
      description: 'Hackathon events and competitions',
      table: 'eee_hackathons'
    },
    {
      key: 'hackathons-gallery',
      name: 'Hackathons Gallery',
      icon: Image,
      description: 'Hackathon event photos',
      table: 'eee_hackathons_gallery'
    },
    {
      key: 'industry-programs',
      name: 'Industry Programs',
      icon: Briefcase,
      description: 'Industry collaboration programs',
      table: 'eee_industry_programs'
    },
    {
      key: 'merit-scholarships',
      name: 'Merit Scholarships',
      icon: Award,
      description: 'Student scholarship programs',
      table: 'eee_merit_scholarships'
    },
    {
      key: 'mous',
      name: 'MOUs',
      icon: FileText,
      description: 'Memorandum of Understanding',
      table: 'eee_mous'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'eee_newsletters'
    },
    {
      key: 'non-teaching-faculty',
      name: 'Non-Teaching Faculty',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'eee_non_teaching_faculty'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'eee_physical_facilities'
    },
    {
      key: 'placements',
      name: 'Placements',
      icon: Users,
      description: 'Student placement records',
      table: 'eee_placements'
    },
    {
      key: 'sahaya-events',
      name: 'Sahaya Events',
      icon: Activity,
      description: 'Sahaya club events and activities',
      table: 'eee_sahaya_events'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'eee_student_achievements'
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'eee_syllabus'
    },
    {
      key: 'technical-association',
      name: 'Technical Association',
      icon: Settings,
      description: 'Professional technical associations',
      table: 'eee_technical_association'
    },
    {
      key: 'technical-faculty',
      name: 'Technical Faculty',
      icon: Users,
      description: 'Technical staff members',
      table: 'eee_technical_faculty'
    },
    {
      key: 'workshops',
      name: 'Workshops',
      icon: Settings,
      description: 'Educational workshops',
      table: 'eee_workshops'
    }
  ],

  // Basic Sciences & Humanities - SORTED A-Z
  bsh: [
    {
      key: 'activities',
      name: 'Activities',
      icon: Activity,
      description: 'Department activities and events',
      table: 'bsh_activities'
    },
    {
      key: 'board-of-studies',
      name: 'Board of Studies',
      icon: BookOpen,
      description: 'Academic board meetings and decisions',
      table: 'bsh_board_of_studies'
    },
    {
      key: 'department-documents',
      name: 'Department Documents',
      icon: FileText,
      description: 'FDPs, workshops, and other documents',
      table: 'bsh_department_documents'
    },
    {
      key: 'department-profile',
      name: 'Department Profile',
      icon: Building2,
      description: 'Department profile and HOD information',
      table: 'bsh_department_profile'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'bsh_faculty'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'bsh_faculty_achievements'
    },
    {
      key: 'faculty-development-programs',
      name: 'Faculty Development Programs',
      icon: GraduationCap,
      description: 'FDP events, workshops, and guest lectures',
      table: 'bsh_fdps'
    },
    {
      key: 'faculty-paper-presentations',
      name: 'Faculty Paper Presentations',
      icon: FileText,
      description: 'Faculty research publications and presentations',
      table: 'bsh_faculty_paper_presentations'
    },
    {
      key: 'laboratories',
      name: 'Laboratories',
      icon: Microscope,
      description: 'Laboratory facilities and resources',
      table: 'bsh_laboratories'
    },
    {
      key: 'non-teaching-faculty',
      name: 'Non-Teaching Faculty',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'bsh_non_teaching_faculty'
    },
    {
      key: 'photo-gallery',
      name: 'Photo Gallery',
      icon: Image,
      description: 'Department photo gallery and events',
      table: 'bsh_photogallery'
    },
    {
      key: 'results',
      name: 'Results',
      icon: Award,
      description: 'Examination results and outcomes',
      table: 'bsh_results'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'bsh_student_achievements'
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'bsh_syllabus'
    }
  ],

  // Computer Science & Technology - SORTED A-Z
  cst: [
    {
      key: 'bos-members',
      name: 'Board of Studies Members',
      icon: Users,
      description: 'Board of studies committee members',
      table: 'cst_bos_members'
    },
    {
      key: 'bos-minutes',
      name: 'BOS Meeting Minutes',
      icon: FileText,
      description: 'Board of studies meeting records',
      table: 'cst_bos_minutes'
    },
    {
      key: 'department-library',
      name: 'Department Library',
      icon: BookOpen,
      description: 'Library resources and books',
      table: 'cst_department_library'
    },
    {
      key: 'department-overview',
      name: 'Department Overview',
      icon: Building2,
      description: 'Department profile and information',
      table: 'cst_department_overview'
    },
    {
      key: 'eresources',
      name: 'E-Resources',
      icon: Globe,
      description: 'Digital learning resources',
      table: 'cst_eresources'
    },
    {
      key: 'extra-curricular',
      name: 'Extra-Curricular Activities',
      icon: Activity,
      description: 'Student activities and events',
      table: 'cst_extra_curricular'
    },
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'cst_faculty'
    },
    {
      key: 'faculty-achievements',
      name: 'Faculty Achievements',
      icon: Award,
      description: 'Faculty awards and recognitions',
      table: 'cst_faculty_achievements'
    },
    {
      key: 'faculty-development',
      name: 'Faculty Development Programs',
      icon: GraduationCap,
      description: 'Professional development programs',
      table: 'cst_faculty_development'
    },
    {
      key: 'hackathons',
      name: 'Hackathons',
      icon: Cpu,
      description: 'Coding competitions and events',
      table: 'cst_hackathons'
    },
    {
      key: 'handbooks',
      name: 'Academic Handbooks',
      icon: BookOpen,
      description: 'Academic handbooks and guides',
      table: 'cst_handbooks'
    },
    {
      key: 'industry-programs',
      name: 'Industry Programs',
      icon: Briefcase,
      description: 'Industry collaboration programs',
      table: 'cst_industry_programs'
    },
    {
      key: 'merit-scholarships',
      name: 'Merit Scholarships',
      icon: Award,
      description: 'Student scholarship programs',
      table: 'cst_merit_scholarships'
    },
    {
      key: 'mous',
      name: 'MOUs',
      icon: FileText,
      description: 'Memorandums of Understanding',
      table: 'cst_mous'
    },
    {
      key: 'newsletters',
      name: 'Newsletters',
      icon: FileText,
      description: 'Department publications',
      table: 'cst_newsletters'
    },
    {
      key: 'non-teaching-faculty',
      name: 'Non-Teaching Faculty',
      icon: Users,
      description: 'Non-teaching staff members',
      table: 'cst_non_teaching_faculty'
    },
    {
      key: 'physical-facilities',
      name: 'Physical Facilities',
      icon: Building2,
      description: 'Infrastructure and equipment',
      table: 'cst_physical_facilities'
    },
    {
      key: 'placements',
      name: 'Placements',
      icon: Users,
      description: 'Student placement records',
      table: 'cst_placements'
    },
    {
      key: 'sahaya-events',
      name: 'Sahaya Events',
      icon: Activity,
      description: 'Social service events',
      table: 'cst_sahaya_events'
    },
    {
      key: 'scud-activities',
      name: 'SCUD Activities',
      icon: Activity,
      description: 'Technical association activities',
      table: 'cst_scud_activities'
    },
    {
      key: 'student-achievements',
      name: 'Student Achievements',
      icon: Award,
      description: 'Student awards and recognitions',
      table: 'cst_student_achievements'
    },
    {
      key: 'syllabus',
      name: 'Syllabus',
      icon: BookOpen,
      description: 'Course curriculum and syllabus',
      table: 'cst_syllabus'
    },
    {
      key: 'technical-faculty',
      name: 'Technical Faculty',
      icon: Users,
      description: 'Technical staff members',
      table: 'cst_technical_faculty'
    }
  ],

  // AI & Machine Learning
  aiml: [
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'aiml_faculty'
    }
  ],

  // Computer Science & Data Science
  'cse-ds': [
    {
      key: 'faculty',
      name: 'Faculty',
      icon: Users,
      description: 'Faculty members and profiles',
      table: 'cse_ds_faculty'
    }
  ]
};

// Department list with correct names
const DEPARTMENTS = [
  { key: 'cse-ai', name: 'Computer Science & AI', color: 'bg-blue-500', gradientBg: 'from-blue-50 to-cyan-100', icon: BrainCircuit },
  { key: 'ece', name: 'Electronics & Communication', color: 'bg-green-500', gradientBg: 'from-green-50 to-emerald-100', icon: Zap },
  { key: 'civil', name: 'Civil Engineeringss', color: 'bg-orange-500', gradientBg: 'from-orange-50 to-amber-100', icon: Building2 },
  { key: 'mech', name: 'Mechanical Engineering', color: 'bg-red-500', gradientBg: 'from-red-50 to-rose-100', icon: Hammer },
  { key: 'cse', name: 'Computer Science', color: 'bg-purple-500', gradientBg: 'from-purple-50 to-indigo-100', icon: Cpu },
  { key: 'eee', name: 'Electrical & Electronics', color: 'bg-yellow-500', gradientBg: 'from-yellow-50 to-orange-100', icon: Zap },
  { key: 'bsh', name: 'Basic Sciences & Humanities', color: 'bg-pink-500', gradientBg: 'from-pink-50 to-rose-100', icon: BookOpen },
  { key: 'cst', name: 'Computer Science & Technology', color: 'bg-teal-500', gradientBg: 'from-teal-50 to-cyan-100', icon: Settings },
  { key: 'ect', name: 'Electronics & Communication Tech', color: 'bg-cyan-500', gradientBg: 'from-cyan-50 to-blue-100', icon: Activity },
  { key: 'aiml', name: 'AI & Machine Learning', color: 'bg-violet-500', gradientBg: 'from-violet-50 to-purple-100', icon: BrainCircuit },
  { key: 'cse-ds', name: 'Computer Science & Data Science', color: 'bg-emerald-500', gradientBg: 'from-emerald-50 to-green-100', icon: Activity }
];

interface ModuleData {
  id: number;
  [key: string]: any;
}

export default function SuperAdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('cse-ai');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ModuleData | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [nextRefreshCountdown, setNextRefreshCountdown] = useState(30);
  const [tableColumns, setTableColumns] = useState<any[]>([]);

  // Get current department modules (moved before useEffects that depend on it)
  const currentModules = DEPARTMENT_MODULES[selectedDepartment as keyof typeof DEPARTMENT_MODULES] || [];

  // Debug state changes
  useEffect(() => {
  }, [showCreateModal, editingItem]);

  // Auto-refresh module data every 30 seconds when a module is selected
  useEffect(() => {
    if (!selectedModule) return;

    const refreshInterval = setInterval(() => {
      const module = currentModules.find(m => m.key === selectedModule);
      if (module) {
        loadModuleData(module.table, currentPage);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
  }, [selectedModule, currentPage, currentModules]);

  // Countdown timer for next refresh
  useEffect(() => {
    if (!selectedModule) return;

    const countdownInterval = setInterval(() => {
      setNextRefreshCountdown(prev => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [selectedModule]);

  // Filter modules based on search
  const filteredModules = currentModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (module.description && module.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Load module data
  // Helper function to get actual table name from option value
  const getTableNameFromOption = (optionValue: string, moduleTableOptions?: any[]) => {
    if (!moduleTableOptions) return optionValue;
    const option = moduleTableOptions.find(opt => opt.value === optionValue);
    return option?.tableName || optionValue;
  };

  const loadModuleData = async (tableName: string, page: number = 1, isMultiTable: boolean = false, tableOverride?: string) => {
    setLoading(true);
    try {
      // For multi-table modules, use the department-specific endpoint
      if (isMultiTable && tableOverride) {
        const [structureResponse, dataResponse] = await Promise.all([
          apiGet(`/api/admin/departments/${selectedDepartment}/${selectedModule}/structure?table=${tableOverride}`),
          apiGet(`/api/admin/departments/${selectedDepartment}/${selectedModule}?page=${page}&limit=50&table=${tableOverride}`)
        ]);

        // Handle structure response
        if (structureResponse.ok) {
          const structureResult = await structureResponse.json();
          if (structureResult.success && structureResult.fields) {
            setTableColumns(structureResult.fields);
          }
        }

        // Handle data response
        if (dataResponse.ok) {
          const result = await dataResponse.json();
          if (result.success && result.data && result.data.records) {
            setModuleData(result.data.records);
            setTotalRecords(result.data.total || result.data.records.length);
            setTotalPages(Math.ceil((result.data.total || result.data.records.length) / 50));
            setCurrentPage(page);
            setLastRefreshTime(new Date());
            setNextRefreshCountdown(30);
          } else {
            setModuleData([]);
            setTotalRecords(0);
            setTotalPages(1);
          }
        } else {
          setModuleData([]);
          setTotalRecords(0);
          setTotalPages(1);
        }
      } else {
        // For single-table modules, use the direct table endpoint
        const [structureResponse, dataResponse] = await Promise.all([
          apiGet(`/api/admin/departments/${selectedDepartment}/${selectedModule}/structure`),
          apiGet(`/api/admin/tables/${tableName}?page=${page}&limit=50`)
        ]);

        // Handle structure response
        if (structureResponse.ok) {
          const structureResult = await structureResponse.json();
          if (structureResult.success && structureResult.fields) {
            setTableColumns(structureResult.fields);
          }
        }

        // Handle data response
        if (dataResponse.ok) {
          const result = await dataResponse.json();
          if (result.success && result.data && result.data.records) {
            setModuleData(result.data.records);
            setTotalRecords(result.data.total || result.data.records.length);
            setTotalPages(Math.ceil((result.data.total || result.data.records.length) / 50));
            setCurrentPage(page);
            setLastRefreshTime(new Date());
            setNextRefreshCountdown(30);
          } else {
            setModuleData([]);
            setTotalRecords(0);
            setTotalPages(1);
          }
        } else {
          setModuleData([]);
          setTotalRecords(0);
          setTotalPages(1);
        }
      }
    } catch (error) {
      setModuleData([]);
      setTotalRecords(0);
      setTotalPages(1);
      setTableColumns([]);
    } finally {
      setLoading(false);
    }
  };  // Handle module selection
  const handleModuleSelect = (moduleKey: string) => {
    setSelectedModule(moduleKey);
    setCurrentPage(1);
    const module = currentModules.find(m => m.key === moduleKey);
    if (module) {
      // Initialize selectedTable for multi-table modules
      const moduleWithOptions = module as any;
      if (moduleWithOptions.tableOptions && moduleWithOptions.tableOptions.length > 0) {
        const firstTableName = getTableNameFromOption(moduleWithOptions.tableOptions[0].value, moduleWithOptions.tableOptions);
        setSelectedTable(moduleWithOptions.tableOptions[0].value);
        loadModuleData(module.table, 1, true, firstTableName);
      } else {
        setSelectedTable('');
        loadModuleData(module.table, 1);
      }
    }
  };

  // Handle department change
  const handleDepartmentChange = (deptKey: string) => {
    setSelectedDepartment(deptKey);
    setSelectedModule(null);
    setModuleData([]);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalRecords(0);
  };

  // CRUD Operations
  const handleCreate = () => {
    setEditingItem(null);
    setShowCreateModal(true);
  };

  const handleEdit = (item: ModuleData) => {
    alert(`Edit clicked for item: ${item.id} - ${item.title || item.name || 'Untitled'}`);
    setEditingItem(item);
    setShowCreateModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    const module = currentModules.find(m => m.key === selectedModule);
    if (!module) return;

    try {
      const response = await apiDelete(`/api/admin/tables/${module.table}/${id}`);

      if (response.ok) {
        loadModuleData(module.table, currentPage);
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      alert('Error deleting item');
    }
  };

  const handleSave = async (data: any) => {
    const module = currentModules.find(m => m.key === selectedModule);
    if (!module) return;

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem
        ? `/api/admin/tables/${module.table}/${editingItem.id}`
        : `/api/admin/tables/${module.table}`;

      let response;

      // Check if data is FormData (has file)
      if (data instanceof FormData) {
        response = await fetch(url, {
          method: method,
          body: data,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
          }
        });
      } else {
        // Regular JSON request
        response = editingItem
          ? await apiPut(url, data)
          : await apiPost(url, data);
      }

      if (response.ok) {
        setShowCreateModal(false);
        setEditingItem(null);
        loadModuleData(module.table, currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Error saving item');
    }
  };

  // Simple form component for editing - defined inside main component
  function EditForm({
    item,
    onSave,
    onCancel,
    department,
    module
  }: {
    item: ModuleData | null;
    onSave: (data: any) => void;
    onCancel: () => void;
    department: string;
    module: string;
  }) {
    const [formData, setFormData] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileField, setSelectedFileField] = useState<string | null>(null);

    // Get field configuration for this module
    const moduleConfig = department && module ? getModuleFieldConfig(department, module) : null;
    const fields = moduleConfig?.fields || [];

    useEffect(() => {
      if (item) {
        setFormData({ ...item });
      } else {
        // Initialize empty form
        setFormData({});
      }
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Pass both formData and selectedFile to onSave
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => {
        // Skip file field names in the initial append (they'll be added separately with the actual file)
        if (formData[key] !== null && formData[key] !== undefined && key !== selectedFileField) {
          formDataObj.append(key, String(formData[key]));
        }
      });
      if (selectedFile && selectedFileField) {
        // Append the actual file object with the correct field name
        formDataObj.append(selectedFileField, selectedFile);
      }
      onSave(formDataObj);
    };

    const handleChange = (field: string, value: any) => {
      setFormData((prev: any) => ({
        ...prev,
        [field]: value
      }));
    };

    const handleFileChange = (field: string, file: File) => {
      // Get the field config to check accepted file types
      const fieldConfig = fields.find(f => f.name === field);
      const acceptedTypes = (fieldConfig as any)?.accept || '';

      // Validate file type based on accept attribute
      if (acceptedTypes) {
        const acceptedExtensions = acceptedTypes.split(',').map((ext: string) => ext.trim().toLowerCase());
        const fileName = file.name.toLowerCase();
        const fileExtension = '.' + fileName.split('.').pop();
        const fileMimeType = file.type.toLowerCase();

        // Check if file extension or MIME type matches
        const isValidExtension = acceptedExtensions.some((ext: string) =>
          ext.startsWith('.') ? fileName.endsWith(ext) : fileName.includes(ext)
        );
        const isValidMimeType = acceptedExtensions.some((ext: string) =>
          !ext.startsWith('.') && fileMimeType.includes(ext)
        );

        // Also check MIME type for wildcard patterns like image/*
        const isValidMimeWildcard = acceptedExtensions.some((ext: string) => {
          if (ext === 'image/*') return fileMimeType.startsWith('image/');
          if (ext === 'video/*') return fileMimeType.startsWith('video/');
          if (ext === 'audio/*') return fileMimeType.startsWith('audio/');
          if (ext === 'application/pdf') return fileMimeType === 'application/pdf';
          return false;
        });

        if (!isValidExtension && !isValidMimeType && !isValidMimeWildcard) {
          alert(`Invalid file type. Please upload a file with format: ${acceptedTypes}\nYou selected: ${fileExtension} (${file.type})`);
          return;
        }
      }

      // Validate file size (max 5MB for general files, 1MB default)
      const maxSizeInMB = (fieldConfig as any)?.maxSize || 1;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        alert(`File size exceeds ${maxSizeInMB}MB limit. Please choose a smaller file.`);
        return;
      }

      setFormData((prev: any) => ({
        ...prev,
        [field]: file.name
      }));
      setSelectedFile(file);
      setSelectedFileField(field);  // Track which field this file is for
    };

    // Use dynamic fields from config if available, otherwise fall back to basic fields
    const getDisplayFields = () => {
      if (fields.length > 0) {
        return fields;
      }

      // Fallback: show all fields except system fields
      return Object.keys(item || formData)
        .filter(key => !['id', 'created_at', 'updated_at', 'dept', 'department'].includes(key))
        .map(key => ({
          name: key,
          label: key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          type: key.includes('description') || key.includes('content') ? 'textarea' : 'text',
          required: false,
          size: 'full' as const
        }));
    };

    const displayFields = getDisplayFields();

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayFields.map((field: any) => {
            const value = formData[field.name] || '';
            const fieldSize = field.size === 'half' ? 'md:col-span-1' : 'md:col-span-2';

            if (field.type === 'textarea') {
              return (
                <div key={field.name} className={`space-y-2 ${fieldSize}`}>
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Textarea
                    id={field.name}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={(field as any).placeholder || `Enter ${field.label.toLowerCase()}`}
                    rows={3}
                    required={field.required}
                    className="resize-none"
                  />
                </div>
              );
            } else if (field.type === 'date') {
              return (
                <div key={field.name} className={`space-y-2 ${fieldSize}`}>
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type="date"
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  />
                </div>
              );
            } else if (field.type === 'select' && (field as any).options) {
              return (
                <div key={field.name} className={`space-y-2 ${fieldSize}`}>
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <select
                    id={field.name}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {(field as any).options.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else if (field.type === 'file') {
              return (
                <div key={field.name} className={`space-y-2 ${fieldSize}`}>
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={field.name}
                      type="file"
                      onChange={(e) => e.target.files && handleFileChange(field.name, e.target.files[0])}
                      accept={(field as any).accept}
                      required={field.required && !value}
                      className="flex-1"
                    />
                    {value && <span className="text-sm text-gray-600">{value}</span>}
                  </div>
                  {(field as any).description && <p className="text-xs text-gray-500">{(field as any).description}</p>}
                </div>
              );
            } else {
              return (
                <div key={field.name} className={`space-y-2 ${fieldSize}`}>
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type || 'text'}
                    value={value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={(field as any).placeholder || `Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                  {(field as any).description && <p className="text-xs text-gray-500">{(field as any).description}</p>}
                </div>
              );
            }
          })}
        </div>

        <DialogFooter className="gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {item ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    );
  }

  if (selectedModule) {
    const module = currentModules.find(m => m.key === selectedModule);
    const showNameColumn = module?.key === 'faculty' || module?.table === 'faculty_profiles';
    const department = DEPARTMENTS.find(d => d.key === selectedDepartment);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedModule(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Back to Modules
              </Button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Badge className={`${department?.color} text-white`}>
                {department?.name}
              </Badge>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-800">{module?.name}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{module?.name} Management</h1>
                <p className="text-gray-600 mt-1">{module?.description}</p>
                {lastRefreshTime && (
                  <p className="text-sm text-gray-500 mt-2">
                    Last refreshed: {lastRefreshTime.toLocaleTimeString()} | Next refresh in: {nextRefreshCountdown}s
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {totalRecords} total records
                </Badge>
                <Button
                  onClick={() => {
                    const module = currentModules.find(m => m.key === selectedModule);
                    if (module) {
                      loadModuleData(module.table, currentPage);
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                  Refresh
                </Button>
                <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      Records ({Array.isArray(moduleData) ? moduleData.length : 0})
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Manage your data records</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {/* Multi-Table Module Selector */}
            {(module as any)?.tableOptions && (module as any).tableOptions.length > 0 && module && (
              <div className={`border-b border-gray-200 px-6 py-4 bg-gradient-to-r ${department?.gradientBg || 'from-blue-50 to-purple-50'}`}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select {module?.name} Category:
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => {
                    const optionValue = e.target.value;
                    const tableName = getTableNameFromOption(optionValue, (module as any).tableOptions);
                    setSelectedTable(optionValue);
                    setCurrentPage(1);
                    // Reload data with new table
                    loadModuleData(module?.table, 1, true, tableName);
                  }}
                  className="w-full sm:w-96 px-4 py-2 border border-purple-300 rounded-lg text-sm font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white shadow-sm hover:border-purple-400 transition-colors"
                >
                  {(module as any).tableOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-600">
                  Switch between different {module?.name.toLowerCase()} categories
                </p>
              </div>
            )}
            <CardContent>
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Loading data...</h3>
                  <p className="text-gray-600">Please wait while we fetch your records</p>
                </div>
              ) : !Array.isArray(moduleData) || moduleData.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">No records found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Get started by adding your first record to this module.
                  </p>
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Record
                  </Button>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full border-collapse bg-white">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                          {tableColumns.length > 0 ? (
                            tableColumns
                              .filter(col => {
                                const fieldName = (col.Field || col.name || '').toString();
                                const hiddenFields = ['created_at', 'updated_at', 'deleted_at'];
                                return !hiddenFields.includes(fieldName);
                              })
                              .slice(0, 6)
                              .map((col) => {
                                const fieldName = (col.Field || col.name || '').toString();
                                const displayName = fieldName
                                  .split('_')
                                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(' ');
                                return (
                                  <th key={fieldName} className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">
                                    {displayName}
                                  </th>
                                );
                              })
                          ) : (
                            <>
                              <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">ID</th>
                              <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Title</th>
                              <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Date</th>
                            </>
                          )}
                          <th className="text-right p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(moduleData) && moduleData.map((item, index) => {
                          const displayColumns = tableColumns.length > 0
                            ? tableColumns
                              .filter(col => {
                                const fieldName = (col.Field || col.name || '').toString();
                                const hiddenFields = ['created_at', 'updated_at', 'deleted_at'];
                                return !hiddenFields.includes(fieldName);
                              })
                              .slice(0, 6)
                              .map(col => (col.Field || col.name || '').toString())
                            : ['id', 'title', 'created_at'];

                          return (
                            <tr
                              key={item.id}
                              className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                }`}
                            >
                              {displayColumns.map((fieldName) => {
                                const value = item[fieldName];
                                let displayValue = value;

                                // Format the display value
                                if (value === null || value === undefined) {
                                  displayValue = '—';
                                } else if (typeof value === 'boolean') {
                                  displayValue = value ? '✓' : '✗';
                                } else if (fieldName.includes('date') || fieldName.includes('time')) {
                                  displayValue = value ? new Date(value).toLocaleDateString() : '—';
                                } else if (typeof value === 'string' && value.length > 50) {
                                  displayValue = value.substring(0, 50) + '...';
                                } else if (typeof value === 'object') {
                                  displayValue = JSON.stringify(value).substring(0, 50) + '...';
                                }

                                return (
                                  <td key={fieldName} className={`p-4 ${fieldName === 'id' ? 'text-gray-600 font-mono text-sm' : fieldName === 'title' || fieldName === 'name' ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>
                                    {fieldName === 'id' && typeof displayValue !== 'string' ? `#${displayValue}` : displayValue}
                                  </td>
                                );
                              })}
                              <td className="p-4">
                                <div className="flex items-center justify-end gap-1">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEdit(item)}
                                    className="h-8 w-8 p-0 hover:bg-yellow-100 hover:text-yellow-600"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDelete(item.id)}
                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-lg">
                      <div className="flex items-center text-sm text-gray-700">
                        <span className="font-medium">
                          Showing {((currentPage - 1) * 50) + 1} to {Math.min(currentPage * 50, totalRecords)} of {totalRecords} entries
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:bg-white hover:border-blue-500 disabled:opacity-50"
                          onClick={() => {
                            const module = currentModules.find(m => m.key === selectedModule);
                            if (module && currentPage > 1) {
                              loadModuleData(module.table, currentPage - 1);
                            }
                          }}
                          disabled={currentPage <= 1}
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>

                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                              page = i + 1;
                            } else if (currentPage <= 3) {
                              page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              page = totalPages - 4 + i;
                            } else {
                              page = currentPage - 2 + i;
                            }

                            return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  const module = currentModules.find(m => m.key === selectedModule);
                                  if (module) {
                                    loadModuleData(module.table, page);
                                  }
                                }}
                                className={`w-8 h-8 p-0 ${currentPage === page
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0'
                                  : 'border-gray-300 hover:bg-white hover:border-blue-500'
                                  }`}
                              >
                                {page}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:bg-white hover:border-blue-500 disabled:opacity-50"
                          onClick={() => {
                            const module = currentModules.find(m => m.key === selectedModule);
                            if (module && currentPage < totalPages) {
                              loadModuleData(module.table, currentPage + 1);
                            }
                          }}
                          disabled={currentPage >= totalPages}
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Edit/Create Modal Dialog */}
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {editingItem ? 'Edit Record' : 'Create New Record'}
                </DialogTitle>
              </DialogHeader>
              <EditForm
                item={editingItem}
                onSave={handleSave}
                onCancel={() => {
                  setShowCreateModal(false);
                  setEditingItem(null);
                }}
                department={selectedDepartment}
                module={selectedModule || ''}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );  // End of selectedModule view
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-3xl backdrop-blur-xl"></div>

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Super Admin Dashboard
                  </h1>
                  <p className="text-gray-600 font-medium">Manage all department modules and content across the CMS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Departments</p>
                <p className="text-3xl font-bold">{DEPARTMENTS.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Modules</p>
                <p className="text-3xl font-bold">
                  {Object.values(DEPARTMENT_MODULES).reduce((acc, modules) => acc + modules.length, 0)}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Records</p>
                <p className="text-3xl font-bold">{totalRecords || '0'}</p>
              </div>
              <Activity className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">System Status</p>
                <p className="text-lg font-bold">Online</p>
              </div>
              <Zap className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Selector */}
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">Select Department</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Choose a department to manage its modules</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-100 text-blue-700 border-blue-200">
              {DEPARTMENTS.filter(d => d.key === selectedDepartment)[0]?.name || 'No Selection'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {DEPARTMENTS.map((dept) => {
              const IconComponent = dept.icon;
              const isSelected = selectedDepartment === dept.key;
              return (
                <Card
                  key={dept.key}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${isSelected
                    ? 'ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
                    : 'hover:shadow-lg hover:bg-gray-50 border-gray-200'
                    }`}
                  onClick={() => handleDepartmentChange(dept.key)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 ${isSelected ? 'bg-gradient-to-br from-blue-500 to-blue-600' : dept.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className={`font-semibold text-sm leading-tight mb-3 ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
                      {dept.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <Badge
                        variant={isSelected ? "default" : "secondary"}
                        className="text-xs px-3 py-1"
                      >
                        {currentModules.length} modules
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search and View Controls */}
      <div className="mb-8">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search modules across departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-72 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="px-4 py-2 text-sm bg-blue-50 text-blue-700 border-blue-200">
                    <FileText className="w-4 h-4 mr-2" />
                    {filteredModules.length} modules found
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <Grid3X3 className="w-4 h-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  >
                    <List className="w-4 h-4 mr-2" />
                    List
                  </Button>
                </div>

                <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit/Create Modal Dialog */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingItem ? 'Edit Record' : 'Create New Record'}
            </DialogTitle>
          </DialogHeader>
          <EditForm
            item={editingItem}
            onSave={handleSave}
            onCancel={() => {
              setShowCreateModal(false);
              setEditingItem(null);
            }}
            department={selectedDepartment}
            module={selectedModule || ''}
          />
        </DialogContent>
      </Dialog>
    </div>

  );
}