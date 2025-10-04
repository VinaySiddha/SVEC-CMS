'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  BrainCircuit
} from 'lucide-react';

// Comprehensive department modules configuration based on existing table structure
const DEPARTMENT_MODULES = {
  // Computer Science & AI (CSE-AI)
  'cse-ai': [
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
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'cai_faculty'
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
      key: 'training-activities', 
      name: 'Training Activities', 
      icon: GraduationCap, 
      description: 'Training programs and workshops',
      table: 'cai_training_activities'
    },
    { 
      key: 'workshops', 
      name: 'Workshops', 
      icon: Settings, 
      description: 'Educational workshops',
      table: 'cai_workshops'
    }
  ],

  // Electronics & Communication Engineering (ECE)
  ece: [
    { 
      key: 'board-of-studies', 
      name: 'Board of Studies', 
      icon: BookOpen, 
      description: 'Academic board meetings and decisions',
      table: 'ece_board_of_studies'
    },
    { 
      key: 'clubs', 
      name: 'Clubs', 
      icon: Users, 
      description: 'Student clubs and organizations',
      table: 'ece_clubs'
    },
    { 
      key: 'extracurricular-activities', 
      name: 'Extra-Curricular Activities', 
      icon: Activity, 
      description: 'Student activities and events',
      table: 'ece_extracurricular_activities'
    },
    { 
      key: 'faculty-achievements', 
      name: 'Faculty Achievements', 
      icon: Award, 
      description: 'Faculty awards and recognitions',
      table: 'ece_faculty_achievements'
    },
    { 
      key: 'faculty-data', 
      name: 'Faculty Data', 
      icon: Users, 
      description: 'Faculty profiles and information',
      table: 'ece_faculty_data'
    },
    { 
      key: 'faculty-innovations', 
      name: 'Faculty Innovations', 
      icon: Settings, 
      description: 'Faculty research and innovations',
      table: 'ece_faculty_innovations'
    },
    { 
      key: 'fdp', 
      name: 'Faculty Development Programs', 
      icon: GraduationCap, 
      description: 'Professional development programs',
      table: 'ece_fdp'
    },
    { 
      key: 'handbooks', 
      name: 'Handbooks', 
      icon: BookOpen, 
      description: 'Academic handbooks and guides',
      table: 'ece_handbooks'
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
      key: 'ntfaculty', 
      name: 'Non-Teaching Faculty', 
      icon: Users, 
      description: 'Non-teaching staff members',
      table: 'ece_ntfaculty'
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
      key: 'scholarships-toppers', 
      name: 'Scholarships & Toppers', 
      icon: Award, 
      description: 'Student achievements and scholarships',
      table: 'ece_scholarships_toppers'
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
      table: 'ece_technicalAssociation_trainingActivities'
    },
    { 
      key: 'workshops', 
      name: 'Workshops', 
      icon: Settings, 
      description: 'Educational workshops',
      table: 'ece_worshops_gl'
    }
  ],

  // Civil Engineering
  civil: [
    { 
      key: 'board-of-studies', 
      name: 'Board of Studies', 
      icon: BookOpen, 
      description: 'Academic board meetings and decisions',
      table: 'bos_civil_meeting_minutes'
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
      key: 'newsletters', 
      name: 'Newsletters', 
      icon: FileText, 
      description: 'Department publications',
      table: 'civil_newsletters'
    },
    { 
      key: 'physical-facilities', 
      name: 'Physical Facilities', 
      icon: Building2, 
      description: 'Infrastructure and equipment',
      table: 'civil_physical_facilities'
    },
    { 
      key: 'staff', 
      name: 'Staff', 
      icon: Users, 
      description: 'Faculty and staff members',
      table: 'civil_staff'
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
      key: 'workshops', 
      name: 'Workshops', 
      icon: Settings, 
      description: 'Educational workshops',
      table: 'civil_workshops'
    }
  ],

  // Mechanical Engineering
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

  // Computer Science Engineering
  cse: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'cse_faculty'
    },
    { 
      key: 'placements', 
      name: 'Placements', 
      icon: Users, 
      description: 'Student placement records',
      table: 'cse_placements'
    },
    { 
      key: 'workshops', 
      name: 'Workshops', 
      icon: Settings, 
      description: 'Educational workshops',
      table: 'cse_workshops'
    }
  ],

  // Electrical & Electronics Engineering
  eee: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'eee_faculty'
    },
    { 
      key: 'placements', 
      name: 'Placements', 
      icon: Users, 
      description: 'Student placement records',
      table: 'eee_placements'
    },
    { 
      key: 'workshops', 
      name: 'Workshops', 
      icon: Settings, 
      description: 'Educational workshops',
      table: 'eee_workshops'
    }
  ],

  // Master of Business Administration
  mba: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'mba_faculty'
    },
    { 
      key: 'placements', 
      name: 'Placements', 
      icon: Users, 
      description: 'Student placement records',
      table: 'mba_placements'
    }
  ],

  // Basic Sciences & Humanities
  bsh: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'bsh_faculty'
    }
  ],

  // Computer Science & Technology
  cst: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'cst_faculty'
    }
  ],

  // Electronics & Communication Technology
  ect: [
    { 
      key: 'faculty', 
      name: 'Faculty', 
      icon: Users, 
      description: 'Faculty members and profiles',
      table: 'ect_faculty'
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
  { key: 'cse-ai', name: 'Computer Science & AI', color: 'bg-blue-500', icon: BrainCircuit },
  { key: 'ece', name: 'Electronics & Communication', color: 'bg-green-500', icon: Zap },
  { key: 'civil', name: 'Civil Engineering', color: 'bg-orange-500', icon: Building2 },
  { key: 'mech', name: 'Mechanical Engineering', color: 'bg-red-500', icon: Hammer },
  { key: 'cse', name: 'Computer Science', color: 'bg-purple-500', icon: Cpu },
  { key: 'eee', name: 'Electrical & Electronics', color: 'bg-yellow-500', icon: Zap },
  { key: 'mba', name: 'Business Administration', color: 'bg-indigo-500', icon: Briefcase },
  { key: 'bsh', name: 'Basic Sciences & Humanities', color: 'bg-pink-500', icon: BookOpen },
  { key: 'cst', name: 'Computer Science & Technology', color: 'bg-teal-500', icon: Settings },
  { key: 'ect', name: 'Electronics & Communication Tech', color: 'bg-cyan-500', icon: Activity },
  { key: 'aiml', name: 'AI & Machine Learning', color: 'bg-violet-500', icon: BrainCircuit },
  { key: 'cse-ds', name: 'Computer Science & Data Science', color: 'bg-emerald-500', icon: Activity }
];

interface ModuleData {
  id: number;
  [key: string]: any;
}

export default function SuperAdminDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('cse-ai');
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

  // Debug state changes
  useEffect(() => {
    console.log('showCreateModal changed to:', showCreateModal);
    console.log('editingItem changed to:', editingItem);
  }, [showCreateModal, editingItem]);

  // Get current department modules
  const currentModules = DEPARTMENT_MODULES[selectedDepartment as keyof typeof DEPARTMENT_MODULES] || [];

  // Filter modules based on search
  const filteredModules = currentModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load module data
  const loadModuleData = async (tableName: string, page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/tables/${tableName}?page=${page}&limit=50`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && result.data.records) {
          setModuleData(result.data.records);
          setTotalRecords(result.data.total || result.data.records.length);
          setTotalPages(Math.ceil((result.data.total || result.data.records.length) / 50));
          setCurrentPage(page);
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
    } catch (error) {
      console.error('Error loading module data:', error);
      setModuleData([]);
      setTotalRecords(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };  // Handle module selection
  const handleModuleSelect = (moduleKey: string) => {
    setSelectedModule(moduleKey);
    setCurrentPage(1);
    const module = currentModules.find(m => m.key === moduleKey);
    if (module) {
      loadModuleData(module.table, 1);
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
    console.log('Edit clicked for item:', item);
    alert(`Edit clicked for item: ${item.id} - ${item.title || item.name || 'Untitled'}`);
    setEditingItem(item);
    setShowCreateModal(true);
    console.log('Modal should open, showCreateModal:', true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const module = currentModules.find(m => m.key === selectedModule);
    if (!module) return;

    try {
      const response = await fetch(`/api/admin/tables/${module.table}/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadModuleData(module.table, currentPage);
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
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

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setEditingItem(null);
        loadModuleData(module.table, currentPage);
      } else {
        const errorData = await response.json();
        alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item');
    }
  };

  if (selectedModule) {
    const module = currentModules.find(m => m.key === selectedModule);
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
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {totalRecords} total records
                </Badge>
                <Button 
                  onClick={() => {
                    console.log('Test modal button clicked');
                    setShowCreateModal(true);
                  }}
                  variant="outline"
                  size="sm"
                >
                  Test Modal
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
                          <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">ID</th>
                          <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Title</th>
                          <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Date</th>
                          <th className="text-left p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Status</th>
                          <th className="text-right p-4 font-bold text-gray-700 uppercase text-xs tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(moduleData) && moduleData.map((item, index) => (
                          <tr 
                            key={item.id} 
                            className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 ${
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                            }`}
                          >
                            <td className="p-4 text-gray-600 font-mono text-sm">#{item.id}</td>
                            <td className="p-4 font-semibold text-gray-800">
                              {item.title || item.name || item.description || 'Untitled'}
                            </td>
                            <td className="p-4 text-gray-600">
                              {item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}
                            </td>
                            <td className="p-4">
                              <Badge 
                                variant="secondary" 
                                className="bg-green-100 text-green-700 border-green-200"
                              >
                                Active
                              </Badge>
                            </td>
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
                        ))}
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
                              className={`w-8 h-8 p-0 ${
                                currentPage === page 
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
        </div>
      </div>
    );
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
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isSelected 
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

        {/* Modules Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card 
                  key={module.key}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden"
                  onClick={() => handleModuleSelect(module.key)}
                >
                  <CardContent className="p-6 relative">
                    {/* Background gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-gray-500 font-medium">Active</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {module.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {module.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-gray-100 text-gray-600 border-gray-200 px-2 py-1"
                        >
                          {module.table}
                        </Badge>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              {filteredModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <div 
                    key={module.key}
                    className={`flex items-center p-6 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group ${
                      index !== filteredModules.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                    onClick={() => handleModuleSelect(module.key)}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                        {module.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500 font-medium">Active</span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-gray-100 text-gray-600 border-gray-200 px-3 py-1"
                      >
                        {module.table}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {filteredModules.length === 0 && (
          <Card className="text-center py-16 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
            <CardContent>
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">No modules found</h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Try adjusting your search term or select a different department to explore available modules.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
  );
}

// Simple form component for editing
function EditForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: ModuleData | null; 
  onSave: (data: any) => void; 
  onCancel: () => void; 
}) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (item) {
      // Initialize form with existing data
      setFormData({ ...item });
    } else {
      // Initialize empty form
      setFormData({});
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Get editable fields (exclude id, created_at, updated_at)
  const getEditableFields = () => {
    if (!item && Object.keys(formData).length === 0) {
      // For new items, show common fields
      return ['title', 'description', 'content'];
    }
    
    // For existing items, show all fields except system fields
    return Object.keys(item || formData).filter(key => 
      !['id', 'created_at', 'updated_at'].includes(key)
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {getEditableFields().map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field} className="capitalize">
            {field.split('_').join(' ')}
          </Label>
          {field.includes('description') || field.includes('content') ? (
            <Textarea
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field.split('_').join(' ')}`}
              rows={3}
            />
          ) : (
            <Input
              id={field}
              value={formData[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              placeholder={`Enter ${field.split('_').join(' ')}`}
            />
          )}
        </div>
      ))}
      
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {item ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
}