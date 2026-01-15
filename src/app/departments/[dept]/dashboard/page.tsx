'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { fetchWithErrorHandling, safeJsonParse } from '@/utils/api-helpers';
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
  LogOut,
  User,
  Home,
  RotateCw,
  Image,
  TrendingUp,
  Zap,
  Microscope
} from 'lucide-react';
import { BackButton } from '@/components/ui/BackButton';

// Department-specific modules configuration
const DEPARTMENT_MODULES: Record<string, Array<{
  key: string;
  name: string;
  icon: any;
  description: string;
  table: string;
}>> = {
  'cse-ai': [
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'cai_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'cai_bos_minutes' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'cai_department_overview' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'cai_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'cai_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'cai_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'cai_faculty_development' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'cai_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Hackathon event gallery images', table: 'cai_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'cai_handbooks' },
    { key: 'merit-scholarships', name: 'Merit Scholarships', icon: Award, description: 'Student scholarship programs', table: 'cai_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'cai_mous' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'cai_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'cai_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'cai_placements' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'cai_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'cai_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'cai_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'cai_technical_faculty' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'cai_workshops' },
  ],

  'cds': [
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'ds_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'ds_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'ds_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'ds_department_overview' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'ds_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'ds_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'ds_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'ds_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'ds_faculty_development' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'ds_hackathons' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'ds_handbooks' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'ds_industry_programs' },
    { key: 'merit-scholarships', name: 'Merit Scholarships', icon: Award, description: 'Student scholarship programs', table: 'ds_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'ds_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'ds_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'ds_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'ds_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'ds_placements' },
    { key: 'sahaya-events', name: 'Sahaya Events', icon: Activity, description: 'Sahaya community events', table: 'ds_sahaya_events' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'ds_scud_activities' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'ds_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'ds_syllabus' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'ds_technical_faculty' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training programs and workshops', table: 'ds_training_activities' }
  ],
  'aiml': [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Academic achievement records', table: 'aiml_academictoppers' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'aiml_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'aiml_bos_minutes' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'aiml_department_overview' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'aiml_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'aiml_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'aiml_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'aiml_faculty_development' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'aiml_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Hackathon event gallery images', table: 'aiml_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'aiml_handbooks' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'aiml_mous' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'aiml_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'aiml_placements' },
    { key: 'staff', name: 'Staff', icon: Users, description: 'Department staff members', table: 'aiml_staff' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'aiml_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'aiml_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'aiml_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'aiml_technical_faculty' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'aiml_workshops' },
  ],

  'cse-ds': [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Academic achievement records', table: 'ds_academictoppers' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'ds_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'ds_bos_minutes' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'ds_department_overview' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'ds_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'ds_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'ds_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'ds_faculty_development' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'ds_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Hackathon event gallery images', table: 'ds_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'ds_handbooks' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'ds_mous' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'ds_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'ds_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'ds_placements' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'ds_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'ds_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'ds_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'ds_technical_faculty' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'ds_workshops' },
  ],
  //'mba': [
  //{ key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'mba_bos_members' },
  //{ key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'mba_bos_minutes' },
  //{ key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'mba_department_overview' },
  //{ key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'mba_extra_curricular' },
  //  { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'mba_faculty' },
  //    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'mba_faculty_achievements' },
  //  { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'mba_faculty_development' },
  //{ key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'mba_handbooks' },
  //{ key: 'eac-activities', name: 'EAC Activities', icon: Briefcase, description: 'Industry collaboration programs', table: 'mba_eac_activities' },
  //{ key: 'merit-scholarships', name: 'Merit Scholarships', icon: Award, description: 'Student scholarship programs', table: 'mba_merit_scholarships' },
  //{ key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'mba_mous' },
  //{ key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'mba_newsletters' },
  //{ key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'mba_non_teaching_faculty' },
  //{ key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'mba_physical_facilities' },
  //{ key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'mba_placements' },
  //{ key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'mba_student_achievements' },
  //{ key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'mba_syllabus' },
  //{ key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Gallery Images', table: 'mba_hackathons_gallery' },
  //

  //],
  'ece': [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Academic toppers and scholarships', table: 'ece_academictoppers' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'ece_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'ece_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'ece_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'HOD and department information', table: 'ece_department_overview' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'ece_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'ece_extracurricular_activities' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'ece_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'ece_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Professional development programs', table: 'ece_faculty_development_programs' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'ece_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Image, description: 'Event photo galleries', table: 'ece_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'ece_handbooks' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'ece_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'ece_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Faculty', icon: Users, description: 'Non-teaching staff members', table: 'ece_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'ece_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'ece_placements' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'ece_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'ece_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'ece_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'ece_technical_faculty' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'ece_worshops_gl' },
  ],
  'civil': [
    { key: 'bos-members', name: 'BOS Members', icon: FileText, description: 'Board of Studies members', table: 'civil_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'civil_bos_minutes' },
    { key: 'consultancy', name: 'Consultancy', icon: Briefcase, description: 'Consultancy services', table: 'civil_consultancy' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'civil_extracurricular_activities' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'civil_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'civil_facultyachievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: Briefcase, description: 'Faculty development programs', table: 'civil_faculty_development' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Hackathon event gallery images', table: 'civil_hackathons_gallery' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'civil_industry_programs' },
    { key: 'mous', name: 'MOUs', icon: Briefcase, description: 'Memorandums of Understanding', table: 'civil_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'civil_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Faculty', icon: Users, description: 'Non-teaching staff members', table: 'civil_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'civil_physical_facilities' },
    { key: 'research-projects', name: 'Research Projects', icon: Settings, description: 'Research projects and initiatives', table: 'civil_research_projects' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'civil_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'civil_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'civil_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'civil_technical_faculty' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'civil_department_library' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'civil_workshops' },
  ],
  'mech': [
    { key: 'bos-members', name: 'BOS Members', icon: FileText, description: 'Board of Studies members', table: 'mech_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'mech_bos_minutes' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'mech_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'mech_facultyachievements' },
    { key: 'faculty-methods', name: 'Faculty T&L Methods', icon: Settings, description: 'Teaching and learning methods', table: 'mech_facultyTLmethods' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Briefcase, description: 'Hackathon event gallery images', table: 'mech_hackathons_gallery' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'mech_industry_programs' },
    { key: 'laboratories', name: 'Laboratories', icon: Building2, description: 'Laboratory facilities', table: 'mech_laboratories' },
    { key: 'library', name: 'Library', icon: BookOpen, description: 'Library resources', table: 'mech_library' },
    { key: 'magazines', name: 'Magazines', icon: FileText, description: 'Department magazines', table: 'mech_magazines' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'mech_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'mech_newsletters' },
    { key: 'non-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Faculty members and profiles', table: 'mech_non_teaching_faculty' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'mech_placements' },
    { key: 'project-research', name: 'Project Research', icon: Settings, description: 'Research projects', table: 'mech_project_research' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'mech_studentachievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'mech_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional associations', table: 'mech_technicalassociation' },
    { key: 'technical-faculty', name: 'Technical Staff', icon: Users, description: 'Technical staff members', table: 'mech_technical_faculty' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'mech_workshops' },
  ],
  'cse': [
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'cse_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'cse_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'cse_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'cse_department_overview' },
    { key: 'eapcet-toppers', name: 'EAPCET Toppers', icon: Award, description: 'EAPCET exam toppers', table: 'cse_eapcet_toppers' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'cse_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'cse_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'cse_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'cse_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'cse_faculty_development' },
    { key: 'gate', name: 'GATE', icon: Award, description: 'GATE exam records and details', table: 'cse_gate' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'cse_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Image, description: 'Gallery of hackathon events', table: 'cse_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'cse_handbooks' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'cse_industry_programs' },
    { key: 'merit-scholarships', name: 'Academic Toppers', icon: Award, description: 'Student scholarship programs', table: 'cse_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'cse_mous' },
    { key: 'newsletters', name: 'Newletters', icon: FileText, description: 'Department publications', table: 'cse_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'cse_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'cse_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'cse_placements' },
    { key: 'roll-of-honour', name: 'Roll of Honour', icon: Award, description: 'Roll of Honour records and details', table: 'cse_roll_of_honour' },
    { key: 'sahaya-events', name: 'Sahaya Events', icon: Activity, description: 'Sahaya community events', table: 'cse_sahaya_events' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'cse_scud_activities' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'cse_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'cse_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Briefcase, description: 'technical association programs', table: 'cse_technical_association' },
    { key: 'technical-faculty', name: 'Technical Staff', icon: Users, description: 'Technical staff members', table: 'cse_technical_faculty' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training programs and workshops', table: 'cse_training_activities' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops and training', table: 'cse_workshops' },
  ],
  'cst': [
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'cst_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'cst_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'cst_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'cst_department_overview' },
    { key: 'eapcet-toppers', name: 'EAPCET Toppers', icon: Award, description: 'EAPCET exam toppers', table: 'cst_eapcet_toppers' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'cst_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'cst_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'cst_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'cst_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'cst_faculty_development' },
    { key: 'gate', name: 'GATE', icon: Award, description: 'GATE exam records and details', table: 'cst_gate' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'cst_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Image, description: 'Gallery of hackathon events', table: 'cst_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'cst_handbooks' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'cst_industry_programs' },
    { key: 'merit-scholarships', name: 'Academic Toppers', icon: Award, description: 'Student scholarship programs', table: 'cst_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'cst_mous' },
    { key: 'newsletters', name: 'Newletters', icon: FileText, description: 'Department publications', table: 'cst_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'cst_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'cst_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'cst_placements' },
    { key: 'roll-of-honour', name: 'Roll of Honour', icon: Award, description: 'Roll of Honour records and details', table: 'cst_roll_of_honour' },
    { key: 'sahaya-events', name: 'Sahaya Events', icon: Activity, description: 'Sahaya community events', table: 'cst_sahaya_events' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'cst_scud_activities' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'cst_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'cst_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Briefcase, description: 'technical association programs', table: 'cst_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'cst_technical_faculty' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training programs and workshops', table: 'cst_training_activities' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops and training', table: 'cst_workshops' },
  ],
  'eee': [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Academic toppers and scholarship recipients', table: 'eee_scholarships_toppers' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'eee_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'eee_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'eee_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'eee_department_overview' },
    { key: 'departmental-activities', name: 'Departmental Activities', icon: Activity, description: 'Department organized activities', table: 'eee_departmental_activities' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'eee_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Extra-curricular activities', table: 'eee_extracurricular_activities' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'eee_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'eee_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Professional development programs', table: 'eee_faculty_development' },
    { key: 'faculty-innovations', name: 'Faculty Innovations', icon: Zap, description: 'Teaching learning innovations by faculty', table: 'eee_faculty_innovations' },
    { key: 'green-initiatives', name: 'Green Initiatives', icon: Activity, description: 'Environmental initiatives and activities', table: 'eee_green_initiatives' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Hackathon events and competitions', table: 'eee_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Image, description: 'Hackathon event photos', table: 'eee_hackathons_gallery' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandum of Understanding', table: 'eee_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'eee_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Faculty', icon: Users, description: 'Non-teaching staff members', table: 'eee_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'eee_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'eee_placements' },
    { key: 'research-center', name: 'Research Center', icon: Microscope, description: 'Research publications and activities', table: 'eee_research_verticles' },
    { key: 'roll-of-honour', name: 'Roll of Honour', icon: Award, description: 'Distinguished students and achievements', table: 'eee_roll_of_honour' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'eee_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'eee_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional technical associations', table: 'eee_technical_association' },
    { key: 'technical-handbooks', name: 'Technical Handbooks', icon: BookOpen, description: 'Technical magazines, handbooks and course materials', table: 'eee_technical_handbooks' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'eee_workshops' },
  ],
  'ds': [
    { key: 'academic-toppers', name: 'Academic Toppers', icon: Award, description: 'Academic toppers and scholarship recipients', table: 'ds_academictoppers' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'ds_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'ds_bos_minutes' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'ds_department_overview' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'ds_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Extra-curricular activities', table: 'ds_extracurricular_activities' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'ds_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'ds_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Professional development programs', table: 'ds_faculty_development' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Hackathon events and competitions', table: 'ds_hackathons' },
    { key: 'hackathons-gallery', name: 'Hackathons Gallery', icon: Image, description: 'Hackathon event photos', table: 'ds_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'ds_handbooks' },
    { key: 'merit-scholarships', name: 'Merit Scholarships', icon: Award, description: 'Student scholarship programs', table: 'ds_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandum of Understanding', table: 'ds_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'ds_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'ds_non_teaching_staff' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'ds_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'ds_placements' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'ds_scud_activities' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'ds_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'ds_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Settings, description: 'Professional technical associations', table: 'ds_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'ds_technical_faculty' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training and skill development', table: 'ds_training_activities' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops', table: 'ds_workshops' }
  ],
  'bsh': [
    { key: 'activities', name: 'Activities', icon: Activity, description: 'Department activities', table: 'bsh_activities' },
    { key: 'board-of-studies', name: 'Board of Studies', icon: BookOpen, description: 'Academic board meetings and decisions', table: 'bsh_board_of_studies' },
    { key: 'department-documents', name: 'Department Documents', icon: FileText, description: 'Important department documents', table: 'bsh_department_documents' },
    { key: 'department-profile', name: 'Department Profile', icon: Building2, description: 'Department profile and information', table: 'bsh_department_profile' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'bsh_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'bsh_faculty_achievements' },
    { key: 'faculty-paper-presentations', name: 'Faculty Paper Presentations', icon: FileText, description: 'Faculty research presentations', table: 'bsh_faculty_paper_presentations' },
    { key: 'fdps', name: 'FDPs/Guest Lectures', icon: GraduationCap, description: 'Faculty Development Programs and Guest Lectures', table: 'bsh_fdps' },
    { key: 'laboratories', name: 'Laboratories', icon: Building2, description: 'Laboratory facilities', table: 'bsh_laboratories' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'non_teaching_bsh_faculty' },
    { key: 'photogallery', name: 'Photo Gallery', icon: Grid3X3, description: 'Department photo gallery and events', table: 'bsh_photogallery' },
    { key: 'results', name: 'Results', icon: Award, description: 'Academic results', table: 'bsh_results' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'bsh_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'bsh_syllabus' },
  ],
  'ect': [
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'ect_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'ect_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and books', table: 'ect_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'ect_department_overview' },
    { key: 'eresources', name: 'E-Resources', icon: Globe, description: 'Digital learning resources', table: 'ect_eresources' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'ect_extra_curricular' },
    { key: 'faculty', name: 'Faculty', icon: Users, description: 'Faculty members and profiles', table: 'ect_faculty' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'ect_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'ect_faculty_development' },
    { key: 'gate', name: 'GATE', icon: Award, description: 'GATE exam records and details', table: 'ect_gate' },
    { key: 'hackathons', name: 'Hackathons', icon: Briefcase, description: 'Coding competitions and events', table: 'ect_hackathons' },
    { key: 'hackathons-gallery', name: 'Gallery', icon: Image, description: 'Gallery of hackathon events', table: 'ect_hackathons_gallery' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'ect_handbooks' },
    { key: 'industry-programs', name: 'Industry Programs', icon: Briefcase, description: 'Industry collaboration programs', table: 'ect_industry_programs' },
    { key: 'merit-scholarships', name: 'Academic Toppers', icon: Award, description: 'Student scholarship programs', table: 'ect_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'ect_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'ect_newsletters' },
    { key: 'non-teaching-faculty', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'ect_non_teaching_faculty' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'ect_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'ect_placements' },
    { key: 'roll-of-honour', name: 'Roll of Honour', icon: Award, description: 'Roll of Honour records and details', table: 'ect_roll_of_honour' },
    { key: 'sahaya-events', name: 'Sahaya Events', icon: Activity, description: 'Sahaya community events', table: 'ect_sahaya_events' },
    { key: 'scud-activities', name: 'SCUD Activities', icon: Activity, description: 'SCUD club activities', table: 'ect_scud_activities' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'ect_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'ect_syllabus' },
    { key: 'technical-association', name: 'Technical Association', icon: Briefcase, description: 'Technical association programs', table: 'ect_technical_association' },
    { key: 'technical-faculty', name: 'Technical Faculty', icon: Users, description: 'Technical staff members', table: 'ect_technical_faculty' },
    { key: 'training-activities', name: 'Training Activities', icon: GraduationCap, description: 'Training programs and workshops', table: 'ect_training_activities' },
    { key: 'workshops', name: 'Workshops', icon: Settings, description: 'Educational workshops and training', table: 'ect_workshops' },
  ],

  'mba': [
    { key: 'board-of-studies', name: 'Board of Studies', icon: Users, description: 'Board of Studies information', table: 'mba_board_of_studies' },
    { key: 'bos-members', name: 'BOS Members', icon: Users, description: 'Board of Studies members', table: 'mba_bos_members' },
    { key: 'bos-minutes', name: 'BOS Minutes', icon: FileText, description: 'Board of Studies meeting minutes', table: 'mba_bos_minutes' },
    { key: 'department-library', name: 'Department Library', icon: BookOpen, description: 'Library resources and information', table: 'mba_department_library' },
    { key: 'department-overview', name: 'Department Overview', icon: Building2, description: 'Department overview and information', table: 'mba_department_overview' },
    { key: 'extra-curricular', name: 'Extra-Curricular', icon: Activity, description: 'Student activities and events', table: 'mba_extra_curricular' },
    { key: 'faculty-achievements', name: 'Faculty Achievements', icon: Award, description: 'Faculty awards and recognitions', table: 'mba_faculty_achievements' },
    { key: 'faculty-development', name: 'Faculty Development', icon: GraduationCap, description: 'Faculty development programs', table: 'mba_faculty_development' },
    { key: 'faculty-profiles', name: 'Faculty Profiles', icon: Users, description: 'Faculty members and profiles', table: 'mba_faculty' },
    { key: 'handbooks', name: 'Handbooks', icon: BookOpen, description: 'Academic handbooks and guides', table: 'mba_handbooks' },
    { key: 'merit-scholarships', name: 'Merit Scholarships', icon: Award, description: 'Student scholarship programs', table: 'mba_merit_scholarships' },
    { key: 'mous', name: 'MOUs', icon: FileText, description: 'Memorandums of Understanding', table: 'mba_mous' },
    { key: 'newsletters', name: 'Newsletters', icon: FileText, description: 'Department publications', table: 'mba_newsletters' },
    { key: 'non-teaching-staff', name: 'Non-Teaching Staff', icon: Users, description: 'Non-teaching staff members', table: 'mba_non_teaching_staff' },
    { key: 'physical-facilities', name: 'Physical Facilities', icon: Building2, description: 'Infrastructure and equipment', table: 'mba_physical_facilities' },
    { key: 'placements', name: 'Placements', icon: Users, description: 'Student placement records', table: 'mba_placements' },
    { key: 'student-achievements', name: 'Student Achievements', icon: Award, description: 'Student awards and recognitions', table: 'mba_student_achievements' },
    { key: 'syllabus', name: 'Syllabus', icon: BookOpen, description: 'Course curriculum and syllabus', table: 'mba_syllabus' },
    { key: 'workshops', name: 'Workshops', icon: Activity, description: 'Workshops, seminars and guest lectures', table: 'mba_workshops' },
  ],
};

const DEPARTMENT_NAMES: Record<string, string> = {
  'cse-ai': 'Computer Science & AI',
  'ece': 'Electronics & Communication Engineering',
  'civil': 'Civil Engineering',
  'mech': 'Mechanical Engineering',
  'cse': 'Computer Science Engineering',
  'cst': 'Computer Science & Technology',
  'eee': 'Electrical & Electronics Engineering',
  'mba': 'Business Administration',
  'bsh': 'Basic Sciences & Humanities',
  'ect': 'Electronics & Communication Technology',
  'aiml': 'AI & Machine Learning',
  'cse-ds': 'Computer Science & Data Science'
};

interface ModuleData {
  id: number;
  [key: string]: any;
}

interface DepartmentDashboardProps {
  params: Promise<{ dept: string }>;
}

export default function DepartmentDashboard({ params }: DepartmentDashboardProps) {
  const [dept, setDept] = useState<string>('');
  const { user, logout, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleData, setModuleData] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ModuleData | null>(null);
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  // Cache for frequently accessed data
  const [dataCache, setDataCache] = useState<Record<string, { data: ModuleData[], timestamp: number }>>({});
  const [structureCache, setStructureCache] = useState<Record<string, { columns: any[], timestamp: number }>>({});
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Research Center Multi-Table State
  const [selectedResearchTable, setSelectedResearchTable] = useState<string>('eee_research_verticles');
  const [researchTableOptions] = useState([
    { value: 'eee_research_verticles', label: 'Research Verticles' },
    { value: 'eee_research_supervisor', label: 'Research Supervisor' },
    { value: 'eee_journal_publications', label: 'Journal Publications' },
    { value: 'eee_conference_publications', label: 'Conference Publications' },
    { value: 'eee_patents', label: 'Patents' },
    { value: 'eee_book_publications', label: 'Book Publications' },
    { value: 'eee_career_advancements', label: 'Career Advancements' },
    { value: 'eee_interaction_outside_world', label: 'Interaction with Outside World' }
  ]);

  // Student Achievements Multi-Table State
  const [selectedStudentAchievementTable, setSelectedStudentAchievementTable] = useState<string>('roll-of-honour');
  
  // Faculty Achievements Multi-Table State
  const [selectedFacultyAchievementTable, setSelectedFacultyAchievementTable] = useState<string>('awards');
  
  const studentAchievementTableOptions = useMemo(() => {
    // Add EEE-specific options
    if (dept === 'eee') {
      return [
        { value: 'roll-of-honour', label: 'Roll Of Honour' },
      { value: 'placement', label: 'Placement' },
      { value: 'higher-studies', label: 'Higher Studies' },
      { value: 'competitive-examinations', label: 'Competitive Examinations' },
      { value: 'course-certifications', label: 'Course Certifications' },
      { value: 'internship', label: 'Internship' },
        { value: 'student-achievements-pdf', label: 'Student List PDF', tableName: 'eee_student_achievements_pdf' },
        { value: 'student-achievements-placement', label: 'Placement, Higher Studies & Entrepreneurship', tableName: 'eee_student_achievements_placement' },
        { value: 'student-achievements-internships', label: 'Internships/Certificates/Workshop', tableName: 'eee_student_achievements_internships' },
        
        { value: 'workshops-soc', label: 'Workshops/SOC', tableName: 'eee_workshops_soc' },
        { value: 'crt', label: 'CRT', tableName: 'eee_crt' },
        { value: 'projects', label: 'Projects', tableName: 'eee_projects' },
        { value: 'csp', label: 'CSP', tableName: 'eee_csp' },
      ];
    }

    // Add ECE-specific options
    if (dept === 'ece') {
      return [
        { value: 'gre', label: 'GRE/TOFEL/IELTS/DULINGO', tableName: 'ece_gre' },
        { value: 'gate', label: 'Gate', tableName: 'ece_gate' },
        { value: 'awards', label: 'Awards', tableName: 'ece_awards' },
        
        { value: 'research-projects', label: 'Student Research Projects', tableName: 'ece_research_projects' },
        { value: 'nptel', label: 'NPTEL/Other Certifications', tableName: 'ece_nptel' },
        { value: 'projects', label: 'Publications', tableName: 'ece_projects' },
        { value: 'csp', label: 'CSP', tableName: 'ece_csp' },
        { value: 'icet', label: 'ICET/PGCET', tableName: 'ece_icet' },
        { value: 'internships', label: 'Workshops/Internships', tableName: 'ece_workshops_internships' },
      ];
    }

    // ECT and other departments use the standard table names
    return [];
  }, [dept]);

  const facultyAchievementTableOptions = useMemo(() => {
    // ECE-specific faculty achievement categories
    if (dept === 'ece') {
      return [
        { value: 'awards', label: 'Awards', tableName: 'ece_faculty_awards' },
        { value: 'faculty-achievement', label: 'Faculty Achievements', tableName: 'ece_faculty_achievements' },
        { value: 'publications', label: 'Book Publications', tableName: 'ece_faculty_publications' },
        { value: 'memberships', label: 'Memberships', tableName: 'ece_faculty_memberships' },
        { value: 'promotions-incentives', label: 'Faculty Promotions/Incentives', tableName: 'ece_faculty_promotions_incentives' },
    
      ];
    }
    
    // Default for other departments
    return [
      { value: 'awards', label: 'Awards and Recognition', tableName: `${dept}_faculty_achievements` },
      { value: 'memberships', label: 'Memberships', tableName: `${dept}_faculty_memberships` },
      { value: 'training-development', label: 'Training and Development', tableName: `${dept}_faculty_training` }
    ];
  }, [dept]);

  // Auto-refresh state
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds default
  const [autoRefreshIntervalId, setAutoRefreshIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [nextRefreshTime, setNextRefreshTime] = useState<number | null>(null);

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setDept(resolvedParams.dept);
    };
    resolveParams();
  }, [params]);

  // Check authentication and department access
  useEffect(() => {
    // Don't run checks while auth is still loading OR dept is not yet resolved
    if (authLoading || !dept) {
      console.log('Auth or dept still loading, skipping checks. authLoading:', authLoading, 'dept:', dept);
      return;
    }

    // CRITICAL: Check if token exists in localStorage
    const checkToken = localStorage.getItem('authToken');
    console.log('🔍 Dashboard Auth Check:', {
      user: user?.username,
      dept,
      tokenExists: !!checkToken,
      tokenLength: checkToken?.length || 0
    });

    if (!user) {
      console.log('No user found after auth completed, redirecting to login');
      router.push('/auth/login?message=Session expired, please login again');
      return;
    }

    console.log('User authenticated:', user.username, 'Role:', user.role, 'User Dept:', user.department, 'Requested Dept:', dept);

    // Check if user has access to this department
    if (user.role !== 'super_admin' && user.role !== 'admin' && user.department !== dept) {
      console.log('Access denied - User dept:', user.department, 'Requested dept:', dept);
      toast.error('You do not have access to this department');
      router.push('/auth/login?message=Access denied');
      return;
    }

    console.log('✅ Department access granted for:', dept);
  }, [user, dept, router, authLoading]);

  // Auto-refresh mechanism
  useEffect(() => {
    // Only set up auto-refresh if enabled and module is selected
    if (!autoRefreshEnabled || !selectedModule) {
      // Clean up interval if auto-refresh is disabled
      if (autoRefreshIntervalId) {
        clearInterval(autoRefreshIntervalId);
        setAutoRefreshIntervalId(null);
      }
      setNextRefreshTime(null);
      return;
    }

    // Set initial next refresh time
    setNextRefreshTime(Date.now() + refreshInterval);

    // Create interval
    const intervalId = setInterval(() => {
      if (selectedModule) {
        // Reload data from API, force refresh to bypass cache
        loadModuleData(selectedModule, currentPage, true);
        setNextRefreshTime(Date.now() + refreshInterval);
      }
    }, refreshInterval);

    setAutoRefreshIntervalId(intervalId);

    // Cleanup on unmount or when settings change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefreshEnabled, selectedModule, refreshInterval, currentPage]);

  // Show loading while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading while params are being resolved
  if (!user || !dept) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Get current department modules
  const currentModules = DEPARTMENT_MODULES[dept] || [];
  const departmentName = DEPARTMENT_NAMES[dept] || dept.toUpperCase();

  // Filter modules based on search
  const filteredModules = currentModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optimized module data loading with caching
  const loadModuleData = async (moduleKey: string, page: number = 1, forceRefresh: boolean = false, tableOverride?: string) => {
    // Validate parameters early to avoid sending malformed requests to the API
    if (!dept) {
      console.error('[loadModuleData] Missing department param:', dept, 'moduleKey:', moduleKey);
      toast.error('Invalid department specified');
      setLoading(false);
      return;
    }

    if (!moduleKey) {
      console.error('[loadModuleData] Missing moduleKey for department:', dept);
      toast.error('Invalid module selected');
      setLoading(false);
      return;
    }

    // Ensure the selected module exists for this department
    const moduleExists = (currentModules || []).some(m => m.key === moduleKey);
    if (!moduleExists) {
      console.error(`[loadModuleData] Module "${moduleKey}" is not valid for department "${dept}"`);
      toast.error('Invalid department or module');
      setLoading(false);
      return;
    }

    const cacheKey = `${dept}-${moduleKey}-${page}`;
    const cached = dataCache[cacheKey];

    // Check cache first (skip if forceRefresh is true)
    if (!forceRefresh && cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      setModuleData(cached.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    const authToken = localStorage.getItem('authToken');

    // CRITICAL DEBUG: Check if token exists
    if (!authToken) {
      console.error('🚨 CRITICAL: No auth token found in localStorage!');
      console.error('🚨 All localStorage keys:', Object.keys(localStorage));
      console.error('🚨 This will cause 401 errors!');
      toast.error('Authentication error: Please login again');
      router.push('/auth/login?message=Session expired');
      return;
    }

    console.log('🔍 Loading module data - Auth token check:', {
      hasToken: true,
      tokenPreview: authToken.substring(0, 30) + '...',
      tokenLength: authToken.length,
      module: moduleKey,
      dept,
      page
    });

    // Only include Authorization header when a valid token exists to avoid sending 'Bearer null'
    const headers: Record<string, string> = {};
    headers['Authorization'] = `Bearer ${authToken}`;
    console.log('✅ Authorization header set:', headers['Authorization'].substring(0, 50) + '...');

    try {
      // Determine which table to use for multi-table modules
      let tableParam: string;
      let structureTableParam: string;

      if (moduleKey === 'research-center') {
        tableParam = tableOverride || selectedResearchTable;
        structureTableParam = tableParam;
      } else if (moduleKey === 'student-achievements') {
        // For student-achievements, use the selected achievement table key (e.g., 'roll-of-honour')
        tableParam = tableOverride || selectedStudentAchievementTable;
        structureTableParam = tableParam;
      } else if (moduleKey === 'faculty-achievements') {
        // For faculty-achievements, use the selected achievement table key
        tableParam = tableOverride || selectedFacultyAchievementTable;
        structureTableParam = tableParam;
      } else {
        tableParam = '';
        structureTableParam = '';
      }

      // Use Promise.allSettled for parallel requests
      const [structureResult, dataResult] = await Promise.allSettled([
        // Structure request with caching (skip cache if forceRefresh)
        (async () => {
          const structureCacheKey = `${dept}-${moduleKey}-${structureTableParam}-structure`;
          const cachedStructure = structureCache[structureCacheKey];

          if (!forceRefresh && cachedStructure && Date.now() - cachedStructure.timestamp < CACHE_DURATION) {
            return { fields: cachedStructure.columns };
          }

          // For multi-table modules, include the selected table parameter
          let structureUrl: string;
          if (moduleKey === 'research-center') {
            structureUrl = `/api/admin/departments/${dept}/${moduleKey}/structure?table=${structureTableParam}`;
          } else if (moduleKey === 'student-achievements') {
            structureUrl = `/api/admin/departments/${dept}/${moduleKey}/structure?table=${structureTableParam}`;
          } else if (moduleKey === 'faculty-achievements') {
            // For faculty-achievements, pass the config key directly
            structureUrl = `/api/admin/departments/${dept}/${moduleKey}/structure?table=${structureTableParam}`;
          } else {
            structureUrl = dept === 'cst'
              ? `/api/admin/departments/cst/${moduleKey}/structure`
              : `/api/admin/departments/${dept}/${moduleKey}/structure`;
          }

          const result = await fetchWithErrorHandling(structureUrl, { headers });

          // Cache structure
          setStructureCache(prev => ({
            ...prev,
            [structureCacheKey]: { columns: result.fields || [], timestamp: Date.now() }
          }));

          return result;
        })(),

        // Data request - for multi-table modules, fetch from the selected table
        // Data request with caching (reduced limit to 100 for better performance)
        fetchWithErrorHandling(
          moduleKey === 'research-center'
            ? `/api/admin/departments/${dept}/${moduleKey}?page=${page}&limit=100&table=${tableParam}&_t=${Date.now()}`
            : moduleKey === 'student-achievements'
              ? `/api/admin/departments/${dept}/${moduleKey}?page=${page}&limit=100&table=${tableParam}&_t=${Date.now()}`
              : moduleKey === 'faculty-achievements'
                ? `/api/admin/departments/${dept}/${moduleKey}?page=${page}&limit=100&table=${tableParam}&_t=${Date.now()}`
                : dept === 'cst'
                  ? `/api/admin/departments/cst/${moduleKey}?page=${page}&limit=100&_t=${Date.now()}`
                  : `/api/admin/departments/${dept}/${moduleKey}?page=${page}&limit=100&_t=${Date.now()}`,
          { headers }
        )
      ]);

      // Handle structure result
      if (structureResult.status === 'fulfilled') {
        setTableColumns(structureResult.value.fields || []);
      } else {
        console.warn('Failed to load table structure:', structureResult.reason);
        setTableColumns([]);
      }

      // Handle data result
      if (dataResult.status === 'fulfilled' && dataResult.value.success && dataResult.value.data) {
        const data = dataResult.value.data.records || [];
        setModuleData(data);
        setTotalRecords(dataResult.value.data.total || 0);
        setTotalPages(dataResult.value.data.totalPages || 1);
        setCurrentPage(page);

        // Cache the data
        setDataCache(prev => ({
          ...prev,
          [cacheKey]: { data, timestamp: Date.now() }
        }));
      } else {
        setModuleData([]);
        setTotalRecords(0);
        setTotalPages(1);
        if (dataResult.status === 'rejected') {
          console.error('Data fetch failed:', dataResult.reason);
        } else {
          toast.error('No data found for this module');
        }
      }
    } catch (error) {
      console.error('Error loading module data:', error);
      setModuleData([]);
      setTotalRecords(0);
      setTotalPages(1);
      if (error instanceof Error) {
        toast.error(`Failed to load data: ${error.message}`);
      } else {
        toast.error('Failed to load module data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle module selection
  const handleModuleSelect = (moduleKey: string) => {
    console.log('📱 Module selected:', moduleKey);
    console.log('📱 Current auth token exists:', !!localStorage.getItem('authToken'));
    setSelectedModule(moduleKey);
    setCurrentPage(1);
    loadModuleData(moduleKey, 1);
  };

  // CRUD Operations
  const handleCreate = () => {
    setEditingItem(null);
    setShowCreateModal(true);
  };

  const handleEdit = (item: ModuleData) => {
    setEditingItem(item);
    setShowCreateModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item? This will also delete any associated files.')) return;

    // Find the item to be deleted to get file URL
    const itemToDelete = moduleData.find(item => item.id === id);

    try {
      const authToken = localStorage.getItem('authToken');

      // For CST department, files are automatically deleted by the new API
      // For other departments, delete associated files manually
      if (dept !== 'cst' && itemToDelete) {
        // Include both snake_case and camelCase field names for different database schemas
        const fileFields = [
          // Snake case (traditional)
          'file_url', 'document_url', 'profile_url', 'image_url', 'pdf_url', 'link_url',
          // Camel case (BSH tables)
          'fileUrl', 'imageUrl', 'url',
          // Other variations
          'certificateUrl', 'reportUrl', 'galleryUrl', 'documentUrl'
        ];

        for (const field of fileFields) {
          if (itemToDelete[field]) {
            try {
              await fetchWithErrorHandling(`/api/admin/departments/${dept}/${selectedModule}/delete-file`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                },
                body: JSON.stringify({ fileUrl: itemToDelete[field] })
              });
            } catch (fileError) {
              console.warn('Could not delete file:', itemToDelete[field], fileError);
            }
          }
        }
      }

      // Build URL with table parameter for multi-table modules
      let deleteUrl = dept === 'cst'
        ? `/api/admin/departments/cst/${selectedModule}?id=${id}`
        : `/api/admin/departments/${dept}/${selectedModule}?id=${id}`;
      
      if (selectedModule === 'research-center' && selectedResearchTable) {
        deleteUrl += `&table=${selectedResearchTable}`;
      } else if (selectedModule === 'student-achievements' && selectedStudentAchievementTable) {
        deleteUrl += `&table=${selectedStudentAchievementTable}`;
      } else if (selectedModule === 'faculty-achievements' && selectedFacultyAchievementTable) {
        deleteUrl += `&table=${selectedFacultyAchievementTable}`;
      }

      const result = await fetchWithErrorHandling(deleteUrl, {
          method: 'DELETE',
          headers: {
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
          }
        }
      );

      if (result.success) {
        toast.success('Record and associated files deleted successfully');

        // Clear ALL cache to force complete refresh from server
        setDataCache({});
        setStructureCache({});

        // Trigger cross-tab auto-update notification
        localStorage.setItem('admin_data_updated', JSON.stringify({
          timestamp: Date.now(),
          department: dept,
          module: selectedModule,
          action: 'delete',
          updatedAt: new Date().toISOString()
        }));

        // Immediately reload fresh data from server (no cache)
        if (selectedModule) {
          // If this was the last item on the page and we're not on page 1, go to previous page
          if (moduleData.length === 1 && currentPage > 1) {
            loadModuleData(selectedModule, currentPage - 1, true);
          } else {
            loadModuleData(selectedModule, currentPage, true);
          }
        }
      } else {
        toast.error(result.error || 'Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      if (error instanceof Error) {
        toast.error(`Delete failed: ${error.message}`);
      } else {
        toast.error('Error deleting item');
      }
    }
  }; const handleSave = async (data: any) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const method = editingItem ? 'PUT' : 'POST';

      // Build URL with table parameter for multi-table modules
      let url: string;
      let tableParam = '';

      if (selectedModule === 'research-center' && selectedResearchTable) {
        tableParam = `table=${selectedResearchTable}`;
      } else if (selectedModule === 'student-achievements' && selectedStudentAchievementTable) {
        tableParam = `table=${selectedStudentAchievementTable}`;
      } else if (selectedModule === 'faculty-achievements' && selectedFacultyAchievementTable) {
        tableParam = `table=${selectedFacultyAchievementTable}`;
      }

      if (tableParam) {
        url = editingItem
          ? (dept === 'cst'
            ? `/api/admin/departments/cst/${selectedModule}?id=${editingItem.id}&${tableParam}`
            : `/api/admin/departments/${dept}/${selectedModule}?id=${editingItem.id}&${tableParam}`)
          : (dept === 'cst'
            ? `/api/admin/departments/cst/${selectedModule}?${tableParam}`
            : `/api/admin/departments/${dept}/${selectedModule}?${tableParam}`);
      } else {
        url = editingItem
          ? (dept === 'cst'
            ? `/api/admin/departments/cst/${selectedModule}?id=${editingItem.id}`
            : `/api/admin/departments/${dept}/${selectedModule}?id=${editingItem.id}`)
          : (dept === 'cst'
            ? `/api/admin/departments/cst/${selectedModule}`
            : `/api/admin/departments/${dept}/${selectedModule}`);
      }

      // Check if the table has a 'dept' column before including it
      const hasDeptColumn = tableColumns.some(field => field.Field === 'dept');

      // Conditionally include dept field only if the table has that column
      const saveData = hasDeptColumn
        ? { ...data, dept: dept } // Add dept if table has the column
        : { ...data }; // Don't add dept if table doesn't have the column

      const result = await fetchWithErrorHandling(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
        },
        body: JSON.stringify(saveData)
      });

      if (result.success) {
        setShowCreateModal(false);
        setEditingItem(null);
        toast.success(editingItem ? 'Record updated successfully' : 'Record created successfully');

        // Trigger cross-tab auto-update notification
        localStorage.setItem('admin_data_updated', JSON.stringify({
          timestamp: Date.now(),
          department: dept,
          module: selectedModule,
          action: editingItem ? 'update' : 'create',
          updatedAt: new Date().toISOString()
        }));

        if (selectedModule) {
          // Clear ALL cache to force complete refresh
          setDataCache({});
          setStructureCache({});
          // Reload data from page 1 to show the new/updated record with force refresh
          loadModuleData(selectedModule, 1, true);
        }
      } else {
        toast.error(`Failed to save: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      if (error instanceof Error) {
        toast.error(`Save failed: ${error.message}`);
      } else {
        toast.error('Error saving item');
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // If module is selected, show module detail view
  if (selectedModule) {
    const module = currentModules.find(m => m.key === selectedModule);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedModule(null)}
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium border border-blue-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  ← Previous Page
                </Button>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <Button
                  variant="ghost"
                  onClick={() => router.push('/')}
                  className="text-gray-600 hover:text-blue-600 px-2 py-1 h-auto"
                >
                  Home
                </Button>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                  {departmentName}
                </Badge>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <span className="font-medium text-gray-700">{module?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    {module?.icon && <module.icon className="w-8 h-8 text-blue-600" />}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{module?.name}</h1>
                  </div>
                  <p className="text-gray-600 text-lg">{module?.description}</p>

                  {/* Research Center Table Selector */}
                  {selectedModule === 'research-center' && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Research Category:
                      </label>
                      <select
                        value={selectedResearchTable}
                        onChange={(e) => {
                          const newTable = e.target.value;
                          setSelectedResearchTable(newTable);
                          setCurrentPage(1);
                          // Pass the new table value directly to avoid state delay
                          loadModuleData(selectedModule, 1, true, newTable);
                        }}
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg text-sm font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
                      >
                        {researchTableOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-gray-600">
                        Switch between different research data tables
                      </p>
                    </div>
                  )}

                  {/* Student Achievements Table Selector */}
                  {selectedModule === 'student-achievements' && (dept === 'eee' || dept === 'ece') && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Achievement Category:
                      </label>
                      <select
                        value={selectedStudentAchievementTable}
                        onChange={(e) => {
                          const newTable = e.target.value;
                          setSelectedStudentAchievementTable(newTable);
                          setCurrentPage(1);
                          // Pass the new table value directly to avoid state delay
                          loadModuleData(selectedModule, 1, true, newTable);
                        }}
                        size={13}
                        className="w-full px-4 py-2 border border-green-300 rounded-lg text-sm font-medium focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white shadow-sm hover:border-green-400 transition-colors overflow-y-auto max-h-96"
                      >
                        {studentAchievementTableOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-gray-600">
                        Switch between different student achievement categories
                      </p>
                    </div>
                  )}

                  {/* Faculty Achievements Table Selector */}
                  {selectedModule === 'faculty-achievements' && (dept === 'ece') && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="w-5 h-5 text-red-600" />
                        <h4 className="text-lg font-bold text-gray-800">Faculty awards and recognitions</h4>
                      </div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Achievement Category:
                      </label>
                      <div className="space-y-2">
                        {facultyAchievementTableOptions.map((option) => (
                          <div
                            key={option.value}
                            onClick={() => {
                              setSelectedFacultyAchievementTable(option.value);
                              setCurrentPage(1);
                              console.log(`[Faculty Achievements] Switching to: ${option.label}`);
                              // Load data for the selected table - pass only the config key as tableOverride
                              loadModuleData(selectedModule, 1, true, option.value);
                            }}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                              selectedFacultyAchievementTable === option.value
                                ? 'bg-red-600 text-white border-red-600 shadow-lg'
                                : 'bg-white text-gray-700 border-red-200 hover:bg-red-50 hover:border-red-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{option.label}</span>
                              <ChevronRight className={`w-5 h-5 transition-transform ${
                                selectedFacultyAchievementTable === option.value ? 'rotate-90' : ''
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-gray-600">
                        Switch between different faculty achievement categories
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <Badge variant="secondary" className="px-4 py-2 bg-gray-100 text-gray-700 font-medium">
                      {totalRecords} {totalRecords === 1 ? 'record' : 'records'}
                    </Badge>
                  </div>
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Record
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Data Records
                  </CardTitle>
                  <p className="text-gray-600">Manage and organize your {module?.name.toLowerCase()} data</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {moduleData.length} {moduleData.length === 1 ? 'entry' : 'entries'} loaded
                  </Badge>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search records..."
                      className="w-64 pl-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-lg"
                    />
                  </div>
                  {/* Auto-refresh controls */}
                  <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                    <Button
                      onClick={() => {
                        if (selectedModule) {
                          setDataCache({});
                          setStructureCache({});
                          loadModuleData(selectedModule, currentPage, true); // Force refresh
                          toast.success('Data refreshed successfully');
                        }
                      }}
                      variant="outline"
                      size="sm"
                      title="Refresh data now"
                      disabled={loading}
                    >
                      <RotateCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button
                      onClick={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                      variant={autoRefreshEnabled ? "default" : "outline"}
                      size="sm"
                      className={autoRefreshEnabled ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                      title="Toggle auto-refresh"
                    >
                      <RotateCw className={`w-4 h-4 mr-2 ${autoRefreshEnabled ? 'animate-spin' : ''}`} />
                      {autoRefreshEnabled ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
                    </Button>
                    {autoRefreshEnabled && (
                      <>
                        <select
                          value={refreshInterval}
                          onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-blue-300 focus:ring-1 focus:ring-blue-200"
                        >
                          <option value={5000}>5s</option>
                          <option value={10000}>10s</option>
                          <option value={30000}>30s</option>
                          <option value={60000}>1m</option>
                          <option value={300000}>5m</option>
                        </select>
                        {nextRefreshTime && (
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                            Next: {Math.ceil((nextRefreshTime - Date.now()) / 1000)}s
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading data...</p>
                </div>
              ) : moduleData.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">No records found</h3>
                  <p className="text-gray-600 mb-8">Get started by adding your first record.</p>
                  <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Record
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        {/* Dynamic columns based on table structure */}
                        {tableColumns.length > 0 ? (
                          tableColumns
                            .filter(col => {
                              const fieldName = (col.Field || col.name || '').toString();
                              const hiddenFields = ['id', 'created_at', 'updated_at', 'deleted_at', 'data', 'resources', 'services', 'description', 'content', 'faculty_incharge', 'activities', 'order_number', 'profile_url', 'profileUrl', 'file_url', 'url', 'year', 'link', 'image_url'];
                              // Only hide fields that END with _url, _file, _path, _link
                              const isPathLike = /_(url|file|path|link|document)$/i.test(fieldName);
                              return !hiddenFields.includes(fieldName) && !isPathLike;
                            })
                            .slice(0, 6) // Limit to 6 columns for better display
                            .map((col, idx) => {
                              const fieldName = col.Field || col.name || 'unknown';
                              // Use label if available from configured fields, otherwise format field name
                              const displayName = col.label || (typeof fieldName === 'string'
                                ? fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                : 'Column');
                              return (
                                <th key={`${fieldName}-${idx}`} className="text-left p-4">
                                  {displayName}
                                </th>
                              );
                            })
                        ) : (
                          // Fallback headers when no table structure is available
                          <>
                            <th className="text-left p-4">ID</th>
                            <th className="text-left p-4">Title</th>
                            <th className="text-left p-4">Date</th>
                          </>
                        )}
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleData.map((item) => {
                        const displayColumns = tableColumns.length > 0
                          ? tableColumns
                            .filter(col => {
                              const fieldName = (col.Field || col.name || '').toString();
                              const hiddenFields = ['id', 'created_at', 'updated_at', 'deleted_at', 'order_number', 'profile_url', 'profileUrl', 'file_url', 'url', 'year', 'link', 'content', 'image_url'];
                              // Hide fields ending with _url, _file, _path, _link
                              const isPathLike = /_(url|file|path|link|document)$/i.test(fieldName);
                              return !hiddenFields.includes(fieldName) && !isPathLike;
                            })
                            .slice(0, 6)
                          : [{ Field: 'id', Type: 'int' }, { Field: 'title', Type: 'varchar' }, { Field: 'created_at', Type: 'datetime' }];

                        return (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            {displayColumns.map((col, colIdx) => {
                              const fieldName = col.Field || col.name || '';
                              const value = item[fieldName];

                              // Skip rendering if value is an object or array (JSON fields)
                              if (value && typeof value === 'object') {
                                return <td key={`${fieldName}-${colIdx}`} className="p-4"><span className="text-gray-400">-</span></td>;
                              }

                              let displayValue = value || '-';

                              // Check if field name ends with url/file/path/link (more specific check)
                              const isPathLike = typeof value === 'string' && /_(url|file|path|link|document)$/i.test(fieldName);

                              // Format different data types
                              if (fieldName === 'id') {
                                displayValue = `#${value}`;
                              } else if (
                                (col.Type || '').includes('date') ||
                                (col.Type || '').includes('time') ||
                                fieldName.toLowerCase().includes('date') ||
                                fieldName.toLowerCase().includes('_at')
                              ) {
                                displayValue = value ? new Date(value).toLocaleDateString() : '-';
                              } else if ((col.Type || '').includes('text') && value && value.length > 100) {
                                displayValue = value.substring(0, 100) + '...';
                              }

                              return (
                                <td key={`${fieldName}-${colIdx}`} className="p-4">
                                  {fieldName === 'id' ? (
                                    <span className="font-mono text-sm">{displayValue}</span>
                                  ) : isPathLike ? (
                                    value ? (
                                      <a
                                        href={typeof value === 'string' ? value : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                      >
                                        View
                                      </a>
                                    ) : (
                                      <span className="text-gray-500">-</span>
                                    )
                                  ) : fieldName.includes('title') || fieldName.includes('name') ? (
                                    <span className="font-semibold">{displayValue}</span>
                                  ) : (
                                    <span className="text-gray-600">{displayValue}</span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="p-4">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEdit(item)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDelete(item.id)}
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
              )}
            </CardContent>
          </Card>
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit' : 'Create'} {module?.name}
              </DialogTitle>
            </DialogHeader>
            <EditForm
              item={editingItem}
              onSave={handleSave}
              onCancel={() => setShowCreateModal(false)}
              dept={dept}
              selectedModule={selectedModule}
              selectedResearchTable={selectedResearchTable}
              selectedStudentAchievementTable={selectedStudentAchievementTable}
              selectedFacultyAchievementTable={selectedFacultyAchievementTable}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/')}
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 border border-blue-200 font-medium"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.history.back()}
                  className="flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  ← Previous Page
                </Button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{departmentName}</h1>
                    <p className="text-lg text-gray-600">Department Dashboard</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-gray-700">Welcome back, <span className="font-semibold">{user?.username}</span>!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Role:</span>
                <Badge className="capitalize bg-blue-100 text-blue-800">{user?.role}</Badge>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Department</p>
                  <p className="text-2xl font-bold text-gray-800">{departmentName}</p>
                  <p className="text-xs text-blue-600">Active Status</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Available Modules</p>
                  <p className="text-2xl font-bold text-gray-800">{currentModules.length}</p>
                  <p className="text-xs text-green-600">Ready to use</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Access Level</p>
                  <p className="text-2xl font-bold text-gray-800 capitalize">{user?.role}</p>
                  <p className="text-xs text-purple-600">Permissions enabled</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 border-b border-gray-200/50 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Grid3X3 className="w-6 h-6 text-blue-600" />
                  Department Modules
                </CardTitle>
                <CardDescription className="text-lg">Access and manage your department's content modules</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {filteredModules.length} modules available
                </Badge>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 pl-10 border-gray-200 focus:border-blue-300 focus:ring-blue-200 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <Card
                    key={module.key}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl overflow-hidden"
                    onClick={() => handleModuleSelect(module.key)}
                  >
                    <CardContent className="p-6 h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">{module.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-3">{module.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 rounded-full">
                            {module.table}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>


            {filteredModules.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">No modules found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search term or check back later.</p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="hover:bg-blue-50 hover:border-blue-200"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dynamic Form component for editing
function EditForm({
  item,
  onSave,
  onCancel,
  dept,
  selectedModule,
  selectedResearchTable,
  selectedStudentAchievementTable,
  selectedFacultyAchievementTable
}: {
  item: ModuleData | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  dept: string;
  selectedModule: string;
  selectedResearchTable?: string;
  selectedStudentAchievementTable?: string;
  selectedFacultyAchievementTable?: string;
}) {
  const [formData, setFormData] = useState<any>({});
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const [uploadingFields, setUploadingFields] = useState<Record<string, boolean>>({});
  const [laboratoryOptions, setLaboratoryOptions] = useState<Array<{ value: string; label: string }>>([]);

  useEffect(() => {
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({});
    }
    fetchTableStructure();
    // Fetch laboratory options for physical-facilities module
    if (selectedModule === 'physical-facilities' && dept === 'cst') {
      fetchLaboratoryOptions();
    }
  }, [item, dept, selectedModule, selectedResearchTable, selectedStudentAchievementTable, selectedFacultyAchievementTable]); // Added all table selectors

  const fetchLaboratoryOptions = async () => {
    try {
      const response = await fetch('/api/cst/cst-laboratories');
      if (response.ok) {
        const options = await response.json();
        setLaboratoryOptions(options);
        console.log('[EditForm] Laboratory options loaded:', options);
      } else {
        console.error('Failed to fetch laboratory options');
      }
    } catch (error) {
      console.error('Error fetching laboratory options:', error);
    }
  };

  const fetchTableStructure = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      // Add cache-busting parameter to ensure fresh data
      const cacheBuster = Date.now();

      // Build URL with table parameter for multi-table modules
      let structureUrl = `/api/admin/departments/${dept}/${selectedModule}/structure?t=${cacheBuster}`;
      if (selectedModule === 'research-center' && selectedResearchTable) {
        structureUrl += `&table=${selectedResearchTable}`;
        console.log(`[fetchTableStructure] Research Center: Loading fields for ${selectedResearchTable}`);
      } else if (selectedModule === 'student-achievements' && selectedStudentAchievementTable) {
        structureUrl += `&table=${selectedStudentAchievementTable}`;
        console.log(`[fetchTableStructure] Student Achievements: Loading fields for ${selectedStudentAchievementTable}`);
      } else if (selectedModule === 'faculty-achievements' && selectedFacultyAchievementTable) {
        structureUrl += `&table=${selectedFacultyAchievementTable}`;
        console.log(`[fetchTableStructure] Faculty Achievements: Loading fields for ${selectedFacultyAchievementTable}`);
      }

      const result = await fetchWithErrorHandling(structureUrl, {
        headers: {
          ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
          'Cache-Control': 'no-cache'
        }
      });

      console.log('[fetchTableStructure] API Response:', result);

      // Check if we have configured fields (from module-fields.ts)
      if (result.source === 'config' && result.fields) {
        // Convert configured fields to the format expected by the form
        const configFields = result.fields.map((field: any) => ({
          Field: field.name,
          Type: field.type,
          Null: field.required ? 'NO' : 'YES',
          fieldConfig: field // Store the full field config for additional properties
        }));
        console.log('[fetchTableStructure] Mapped config fields:', configFields);
        setTableFields(configFields);
      } else {
        console.log('[fetchTableStructure] Using fallback database schema');
        // Use database schema fields as fallback
        setTableFields(result.fields || []);
      }
    } catch (error) {
      console.error('Error fetching table structure:', error);
      // Fallback to default fields if API fails
      setTableFields([
        { Field: 'title', Type: 'varchar(255)', Null: 'YES' },
        { Field: 'description', Type: 'text', Null: 'YES' },
        { Field: 'content', Type: 'text', Null: 'YES' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalFormData = { ...formData };

    // Handle file uploads for each selected file
    for (const [fieldName, file] of Object.entries(selectedFiles)) {
      setUploadingFields(prev => ({ ...prev, [fieldName]: true }));
      try {
        const authToken = localStorage.getItem('authToken');
        const fileFormData = new FormData();
        fileFormData.append('file', file);

        // For edit mode, include existing file URL for this specific field
        if (item && item[fieldName]) {
          fileFormData.append('existingUrl', item[fieldName]);
          fileFormData.append('overwriteExisting', 'true'); // Signal to override
        }

        // Add record ID for tracking file associations
        if (item && item.id) {
          fileFormData.append('recordId', item.id.toString());
        }

        // Use CST-specific endpoint for CST, generic endpoint for others
        const uploadUrl = dept === 'cst'
          ? `/api/admin/departments/cst/${selectedModule}/upload`
          : `/api/admin/departments/${dept}/${selectedModule}/upload`;

        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
          },
          body: fileFormData
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const uploadResult = await uploadResponse.json();

        // Update the specific field with the uploaded file URL
        finalFormData[fieldName] = uploadResult.data.url;

        const uploadSizeKB = uploadResult.data.size;
        const uploadSizeMB = (uploadSizeKB / 1024).toFixed(2);

        if (item && item.id) {
          toast.success('📝 File Updated Successfully!', {
            description: `${fieldName} file overridden successfully (${uploadSizeKB}KB / ${uploadSizeMB}MB)`,
            duration: 4000
          });
        } else {
          toast.success('🎉 Upload Successful!', {
            description: `${fieldName} file uploaded successfully (${uploadSizeKB}KB / ${uploadSizeMB}MB)`,
            duration: 4000
          });
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : `Upload failed for ${fieldName}`);
        setUploadingFields(prev => ({ ...prev, [fieldName]: false }));
        return;
      } finally {
        setUploadingFields(prev => ({ ...prev, [fieldName]: false }));
      }
    }

    // Exclude fields that shouldn't be saved to database (e.g., display-only fields)
    const fieldsToExclude = ['laboratory_gallery']; // These are reference/display fields only
    const dataToSave = Object.keys(finalFormData)
      .filter(key => !fieldsToExclude.includes(key))
      .filter(key => {
        // Filter out empty values (empty strings, null, undefined)
        const value = finalFormData[key];
        return value !== '' && value !== null && value !== undefined;
      })
      .reduce((obj, key) => {
        obj[key] = finalFormData[key];
        return obj;
      }, {} as Record<string, any>);

    // Check if we have any data to save
    if (Object.keys(dataToSave).length === 0) {
      toast.error('Please fill in at least one field before saving');
      return;
    }

    console.log('[EditForm.handleSubmit] Data being saved:', {
      fieldCount: Object.keys(dataToSave).length,
      data: dataToSave,
      fields: Object.keys(dataToSave)
    });

    onSave(dataToSave);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSizeKB = Math.round(file.size / 1024);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);

      // Validate file type (expanded to support more file types)
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error('⚠️ Invalid File Type', {
          description: 'Please select a valid file. Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX',
          duration: 5000
        });
        e.target.value = '';
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('🚨 File Too Large!', {
          description: `File size (${fileSizeMB}MB) exceeds the 5MB limit. Please compress or select a smaller file.`,
          duration: 8000
        });
        e.target.value = '';
        return;
      }

      // Show warning for files larger than 3MB
      if (file.size > 3 * 1024 * 1024) {
        toast.warning('⚠️ Large File Warning', {
          description: `File size is ${fileSizeMB}MB. Consider compressing for faster upload.`,
          duration: 4000
        });
      }

      setSelectedFiles(prev => ({ ...prev, [fieldName]: file }));
      console.log(`📎 Selected file for ${fieldName}: ${file.name} (${fileSizeKB}KB)`);

      toast.success('📎 File Selected!', {
        description: `${file.name} (${fileSizeKB}KB) ready for upload to ${fieldName}`,
        duration: 3000
      });
    } else {
      setSelectedFiles(prev => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }
  };



  const getInputType = (fieldType: string, fieldName: string) => {
    // Add null/undefined check
    if (!fieldType) return 'text';

    const type = fieldType.toLowerCase();
    const name = fieldName.toLowerCase();

    if (name.includes('email')) return 'email';
    if (name.includes('phone') || name.includes('mobile')) return 'tel';
    if (name.includes('url') || name.includes('link')) return 'url';
    // For MOUs module, treat date fields as textfields since they're stored as varchar
    if (selectedModule === 'mous' && name.includes('date')) return 'text-date';
    if (name.includes('date')) return 'date';
    if (name.includes('time')) return 'time';
    if (type.includes('int') || type.includes('decimal') || type.includes('float')) return 'number';
    if (type.includes('text') || type.includes('longtext')) return 'textarea';
    if (type.includes('json')) return 'textarea';

    return 'text';
  };

  const getEditableFields = () => {
    if (tableFields.length > 0) {
      return tableFields.filter(field =>
        !['id', 'dept', 'created_at', 'updated_at', 'deleted_at', 'minutes_url', 'agenda'].includes(field.Field)
      );
    }

    // Fallback for when table structure isn't available
    if (item && Object.keys(item).length > 0) {
      return Object.keys(item)
        .filter(key => !['id', 'dept', 'created_at', 'updated_at', 'deleted_at', 'minutes_url', 'agenda'].includes(key))
        .map(field => ({ Field: field, Type: 'varchar(255)', Null: 'YES' }));
    }

    return [
      { Field: 'title', Type: 'varchar(255)', Null: 'YES' },
      { Field: 'description', Type: 'text', Null: 'YES' }
    ];
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Loading form...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      {getEditableFields().map((field, index) => {
        const fieldName = field.Field || 'field';
        const inputType = getInputType(field.Type, fieldName);
        const isRequired = field.Null === 'NO';

        // Use configured label if available, otherwise format field name
        const displayName = field.fieldConfig?.label ||
          (fieldName || '').split('_').map((word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');

        // Use configured placeholder if available
        const placeholder = field.fieldConfig?.placeholder || `Enter ${displayName.toLowerCase()}`;

        if (fieldName === 'type') {
          console.log(`[EditForm] Rendering field "${fieldName}":`, {
            fieldConfig: field.fieldConfig,
            hasType: !!field.fieldConfig?.type,
            type: field.fieldConfig?.type,
            hasOptions: !!field.fieldConfig?.options,
            options: field.fieldConfig?.options
          });
        }

        return (
          <div key={`${fieldName}-${index}`} className="space-y-2">
            <Label htmlFor={fieldName} className="flex items-center gap-1">
              {displayName}
              {isRequired && <span className="text-red-500">*</span>}
            </Label>

            {/* Select field with options from field configuration */}
            {field.fieldConfig?.type === 'select' && field.fieldConfig?.options ? (
              <select
                id={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={isRequired}
              >
                <option value="">Select an option</option>
                {field.fieldConfig.options.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.fieldConfig?.type === 'file' ? (
              // File upload based on field configuration
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-sm">File Upload Guidelines</span>
                  </div>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <p>• <span className="font-medium">Maximum size: 5MB</span> - Warning shown at 3MB, rejected above 5MB</p>
                    <p>• Supported formats: {field.fieldConfig?.accept || 'PDF, JPG, PNG, DOC, DOCX, XLS, XLSX'}</p>
                    <p>• Best practices: Compress large files before upload for faster processing</p>
                    <p>• Files are stored securely in: /uploads/{dept}/{selectedModule}/</p>
                  </div>
                </div>
                <Input
                  id={`${fieldName}-upload`}
                  type="file"
                  accept={field.fieldConfig?.accept || '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx'}
                  onChange={(e) => handleFileChange(e, fieldName)}
                  className="cursor-pointer"
                  required={isRequired && !formData[fieldName]}
                />
                {formData[fieldName] && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium mb-1">📎 Current file:</p>
                    <a
                      href={formData[fieldName]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline break-all"
                    >
                      {formData[fieldName]}
                    </a>
                  </div>
                )}
                {selectedFiles[fieldName] && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="text-xs text-green-700 font-medium mb-1">✅ New file ready for {displayName}:</p>
                    <p className="text-xs text-green-600">{selectedFiles[fieldName].name} ({Math.round(selectedFiles[fieldName].size / 1024)}KB)</p>
                  </div>
                )}
              </div>
            ) : fieldName === 'laboratory_gallery' && selectedModule === 'physical-facilities' ? (
              <select
                id={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={isRequired}
              >
                <option value="">Select a laboratory</option>
                {laboratoryOptions.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : fieldName === 'gallery' && (selectedModule === 'hackathons' || selectedModule === 'hackathons-gallery') ? (
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-sm">Gallery Images</span>
                  </div>
                  <div className="text-xs text-blue-700 space-y-1">
                    <p>• Upload images (Max: 350KB each) or enter URLs manually</p>
                    <p>• Accepted formats: JPG, PNG, GIF, WEBP</p>
                    <p>• Multiple images will be comma-separated</p>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center space-y-2">
                    <svg className="w-8 h-8 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <label htmlFor={`${fieldName}-upload`} className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-500">Upload images</span>
                        <input
                          id={`${fieldName}-upload`}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          multiple
                          onChange={async (e) => {
                            const files = Array.from(e.target.files || []);
                            const maxSize = 350 * 1024; // 350KB in bytes
                            let successCount = 0;
                            let totalFiles = files.length;

                            if (totalFiles === 0) return;

                            console.log(`Starting upload of ${totalFiles} files for gallery`);

                            for (const file of files) {
                              if (file.size > maxSize) {
                                alert(`File "${file.name}" is too large. Maximum size is 350KB (${Math.round(file.size / 1024)}KB).`);
                                continue;
                              }

                              const formDataFile = new FormData();
                              formDataFile.append('file', file);
                              formDataFile.append('dept', dept);
                              formDataFile.append('module', selectedModule);
                              formDataFile.append('gallery', 'true'); // Indicate this is a gallery upload

                              // For replacing existing image, pass the old URL
                              if (selectedModule === 'hackathons-gallery' && formData[fieldName]) {
                                formDataFile.append('existingUrl', formData[fieldName]);
                              }

                              try {
                                const authToken = localStorage.getItem('authToken');
                                const response = await fetch(`/api/admin/departments/${dept}/${selectedModule}/upload`, {
                                  method: 'POST',
                                  headers: {
                                    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                                  },
                                  body: formDataFile,
                                });

                                if (response.ok) {
                                  const result = await response.json();

                                  if (selectedModule === 'hackathons-gallery') {
                                    // For hackathons-gallery, replace the single image (no duplicates)
                                    handleChange(fieldName, result.data.url);
                                  } else {
                                    // For regular hackathons, append to comma-separated string
                                    const currentGallery = formData[fieldName] || '';
                                    const newGallery = currentGallery
                                      ? `${currentGallery}, ${result.data.url}`
                                      : result.data.url;
                                    handleChange(fieldName, newGallery);
                                  }

                                  successCount++;
                                  console.log(`Successfully uploaded ${file.name} to gallery (${successCount}/${totalFiles})`);
                                } else {
                                  const errorResult = await response.json();
                                  alert(`Failed to upload ${file.name}: ${errorResult.error || 'Unknown error'}`);
                                }
                              } catch (error) {
                                console.error('Upload error:', error);
                                alert(`Error uploading ${file.name}: ${(error as any)?.message || 'Network error'}`);
                              }
                            }

                            if (successCount > 0) {
                              alert(`Successfully uploaded ${successCount} of ${totalFiles} images to gallery!`);
                            }

                            // Reset the file input
                            e.target.value = '';
                          }}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-400">Max 350KB per image</p>
                  </div>
                </div>

                {/* Manual URL Input */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Or enter URLs manually:
                  </label>
                  <Textarea
                    id={fieldName}
                    value={formData[fieldName] || ''}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    rows={3}
                    required={isRequired}
                    className="text-sm"
                  />
                </div>

                {/* Preview Section */}
                {formData[fieldName] && (
                  <div className="bg-gray-50 border rounded-lg p-3">
                    {selectedModule === 'hackathons-gallery' ? (
                      // Single image preview for hackathons-gallery
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Gallery Image Preview (350x240px):</p>
                        <div className="relative group inline-block">
                          <img
                            src={formData[fieldName].trim()}
                            alt="Gallery image"
                            className="w-[350px] h-[240px] object-cover rounded border"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                            }}
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              const imageUrl = formData[fieldName].trim();

                              // Delete image file from server
                              if (imageUrl && item?.id) {
                                try {
                                  const authToken = localStorage.getItem('authToken');
                                  await fetchWithErrorHandling(
                                    `/api/admin/departments/${dept}/${selectedModule}/delete-file`,
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
                                      },
                                      body: JSON.stringify({
                                        fileUrl: imageUrl,
                                        id: item.id
                                      })
                                    }
                                  );
                                } catch (error) {
                                  console.warn('Could not delete image file:', error);
                                }
                              }

                              // Clear form field
                              handleChange(fieldName, '');
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-xs text-gray-600 mt-2">
                          <span className="font-mono">{formData[fieldName].trim()}</span>
                        </div>
                      </div>
                    ) : (
                      // Multiple images preview for regular hackathons
                      <div>
                        <p className="text-xs font-medium text-gray-700 mb-2">Gallery Preview ({formData[fieldName].split(',').length} images - 350x240px each):</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                          {formData[fieldName].split(',').map((url: any, index: number) => (
                            <div key={index} className="relative group">
                              <img
                                src={url.trim()}
                                alt={`Gallery image ${index + 1}`}
                                className="w-[350px] h-[240px] object-cover rounded border"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                                }}
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  const imageUrl = url.trim();

                                  // Delete image file from server
                                  if (imageUrl && item?.id) {
                                    try {
                                      const authToken = localStorage.getItem('authToken');
                                      await fetchWithErrorHandling(
                                        `/api/admin/departments/${dept}/${selectedModule}/delete-file`,
                                        {
                                          method: 'POST',
                                          headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${authToken}`
                                          },
                                          body: JSON.stringify({
                                            fileUrl: imageUrl,
                                            id: item?.id
                                          })
                                        }
                                      );
                                    } catch (error) {
                                      console.warn('Could not delete image file:', error);
                                    }
                                  }

                                  // Remove from form
                                  const urls = formData[fieldName].split(',').filter((_: string, i: number) => i !== index);
                                  handleChange(fieldName, urls.join(','));
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                              >
                                ×
                              </button>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          {formData[fieldName].split(',').map((url: any, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="w-4 h-4 text-center bg-blue-100 rounded-full text-blue-600 font-mono text-xs">{index + 1}</span>
                              <span className="font-mono text-xs truncate">{url.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : fieldName === 'category' && selectedModule === 'faculty-achievements' ? (
              <select
                id={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={isRequired}
              >
                <option value="">Select a category</option>
                <option value="Journal Publications">Journal Publications</option>
                <option value="Conferences">Conferences</option>
                <option value="Book Publications">Book Publications</option>
                <option value="Certifications">Certifications</option>
                <option value="Patents">Patents</option>
                <option value="Research Supervisors">Research Supervisors</option>
                <option value="Faculty Out-Reach">Faculty Out-Reach</option>
              </select>
            ) : fieldName === 'category' && selectedModule === 'student-achievements' ? (
              <select
                id={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={isRequired}
              >
                <option value="">Select a category</option>
                <option value="Internships">Internships</option>
                <option value="Conference Publications">Conference Publications</option>
                <option value="NPTEL/Other Certifications">NPTEL/Other Certifications</option>
                <option value="Global Certifications">Global Certifications</option>
                <option value="Community Service Project">Community Service Project</option>
                <option value="Student Research Projects">Student Research Projects</option>
              </select>
            ) : inputType === 'textarea' ? (
              <Textarea
                id={fieldName}
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                rows={field.fieldConfig?.rows || 3}
                required={isRequired}
              />
            ) : inputType === 'number' ? (
              <Input
                id={fieldName}
                type="number"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                required={isRequired}
              />
            ) : inputType === 'text-date' ? (
              <Input
                id={fieldName}
                type="text"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder="dd-mm-yyyy"
                required={isRequired}
              />
            ) : inputType === 'date' ? (
              <Input
                id={fieldName}
                type="date"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                required={isRequired}
              />
            ) : inputType === 'time' ? (
              <Input
                id={fieldName}
                type="time"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                required={isRequired}
              />
            ) : inputType === 'email' ? (
              <Input
                id={fieldName}
                type="email"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                required={isRequired}
              />
            ) : inputType === 'tel' ? (
              <Input
                id={fieldName}
                type="tel"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                required={isRequired}
              />
            ) : inputType === 'url' && (
              fieldName.toLowerCase().includes('url') ||
              fieldName.toLowerCase().includes('file') ||
              fieldName.toLowerCase().includes('document') ||
              fieldName.toLowerCase().includes('link')
            ) ? (
              // File upload for all departments with file URL fields
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-yellow-800 mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-sm">File Upload Guidelines</span>
                  </div>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <p>• <span className="font-medium">Maximum size: 5MB</span> - Warning shown at 3MB, rejected above 5MB</p>
                    <p>• Supported formats: PDF, JPG, PNG, DOC, DOCX, XLS, XLSX</p>
                    <p>• Best practices: Compress large files before upload for faster processing</p>
                    <p>• Files are stored securely in: /uploads/{dept}/{selectedModule}/</p>
                  </div>
                </div>
                <Input
                  id={`${fieldName}-upload`}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, fieldName)}
                  className="cursor-pointer"
                />
                {formData[fieldName] && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium mb-1">📎 Current file:</p>
                    <a
                      href={formData[fieldName]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline break-all"
                    >
                      {formData[fieldName]}
                    </a>
                  </div>
                )}
                {selectedFiles[fieldName] && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="text-xs text-green-700 font-medium mb-1">✅ New file ready for {displayName}:</p>
                    <p className="text-xs text-green-600">{selectedFiles[fieldName].name} ({Math.round(selectedFiles[fieldName].size / 1024)}KB)</p>
                  </div>
                )}
              </div>
            ) : inputType === 'url' ? (
              <Input
                id={fieldName}
                type="url"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                required={isRequired}
              />
            ) : (
              <Input
                id={fieldName}
                type="text"
                value={formData[fieldName] || ''}
                onChange={(e) => handleChange(fieldName, e.target.value)}
                placeholder={placeholder}
                required={isRequired}
              />
            )}

            {/* Field description if available */}
            {field.fieldConfig?.description && (
              <p className="text-xs text-gray-500 mt-1">
                {field.fieldConfig.description}
              </p>
            )}
          </div>
        );
      })}

      <DialogFooter className="gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={Object.values(uploadingFields).some(Boolean)}>
          Cancel
        </Button>
        <Button type="submit" disabled={Object.values(uploadingFields).some(Boolean)}>
          {Object.values(uploadingFields).some(Boolean) ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Uploading...
            </div>
          ) : (
            item ? 'Update' : 'Create'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
