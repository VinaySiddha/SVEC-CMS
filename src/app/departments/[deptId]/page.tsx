'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FacultyProfileForm } from '@/components/forms/FacultyProfileForm';
import { FacultyProfilesList } from '@/components/lists/FacultyProfilesList';
import { ModuleSchema } from '@/lib/module-schemas';
import { FacultyProfile } from '@/pages/api/faculty-profiles';
import { LucideIcon, Users, Calendar, Image, BookOpen, Scroll } from 'lucide-react';

interface ModuleTabProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  pendingCount?: number;
}

const ModuleTab = ({ icon: Icon, label, isActive, onClick, pendingCount = 0 }: ModuleTabProps) => (
  <div
    className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md transition-colors ${
      isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center">
      <Icon className="h-5 w-5 mr-2" />
      <span>{label}</span>
    </div>
    {pendingCount > 0 && (
      <span className={`px-2 py-0.5 text-xs rounded-full ${
        isActive ? 'bg-white text-primary' : 'bg-primary text-white'
      }`}>
        {pendingCount}
      </span>
    )}
  </div>
);

export default function DepartmentDashboard() {
  const params = useParams();
  const deptId = (params?.deptId as string) || '';
  
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [modules, setModules] = useState<ModuleSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedFacultyProfile, setSelectedFacultyProfile] = useState<FacultyProfile | null>(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  // Fetch available modules for this department
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/modules/meta?dept=${deptId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        
        const data = await response.json();
        setModules(data.modules);
        
        // Set first module as active if there are any modules
        if (data.modules.length > 0) {
          setActiveModule(data.modules[0].id);
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchModules();
  }, [deptId]);

  // Get icon component for module
  const getModuleIcon = (iconName?: string): LucideIcon => {
    switch (iconName) {
      case 'users':
        return Users;
      case 'calendar':
        return Calendar;
      case 'image':
        return Image;
      case 'book':
        return BookOpen;
      case 'book-open':
        return Scroll;
      default:
        return Users;
    }
  };

  // Handle view faculty profile
  const handleViewFacultyProfile = (profile: FacultyProfile) => {
    setSelectedFacultyProfile(profile);
    setShowViewDialog(true);
  };

  // Handle edit faculty profile
  const handleEditFacultyProfile = (profile: FacultyProfile) => {
    setSelectedFacultyProfile(profile);
    setShowAddDialog(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-50 p-4 border-r">
        <h2 className="font-semibold text-lg mb-4">
          {deptId.toUpperCase()} Department Dashboard
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <nav className="space-y-1">
            {modules.map((module) => (
              <ModuleTab
                key={module.id}
                icon={getModuleIcon(module.icon)}
                label={module.label}
                isActive={activeModule === module.id}
                onClick={() => setActiveModule(module.id)}
                pendingCount={(module as any).pendingCount}
              />
            ))}
          </nav>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          {activeModule && (
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {modules.find((m) => m.id === activeModule)?.label}
              </h1>
              <Button onClick={() => setShowAddDialog(true)}>
                Add New
              </Button>
            </div>
          )}
          
          {/* Content based on selected module */}
          {activeModule === 'faculty_profiles' && (
            <FacultyProfilesList 
              dept={deptId} 
              onEdit={handleEditFacultyProfile}
              onView={handleViewFacultyProfile}
            />
          )}
          
          {/* Other module content would be conditionally rendered here */}
          {activeModule && !['faculty_profiles'].includes(activeModule) && (
            <div className="text-center py-12">
              <h3 className="font-medium text-lg mb-2">Module Under Development</h3>
              <p className="text-gray-500">
                This module is still being developed and will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Faculty Profile Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedFacultyProfile ? 'Edit Faculty Profile' : 'Add New Faculty Profile'}
            </DialogTitle>
          </DialogHeader>
          <FacultyProfileForm
            dept={deptId}
            initialData={selectedFacultyProfile || undefined}
            onSuccess={() => {
              setShowAddDialog(false);
              setSelectedFacultyProfile(null);
            }}
            onCancel={() => {
              setShowAddDialog(false);
              setSelectedFacultyProfile(null);
            }}
          />
        </DialogContent>
      </Dialog>
      
      {/* View Faculty Profile Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Faculty Profile</DialogTitle>
          </DialogHeader>
          {selectedFacultyProfile && (
            <div className="grid gap-4">
              <div className="flex justify-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden">
                  {selectedFacultyProfile.photo ? (
                    <img
                      src={selectedFacultyProfile.photo}
                      alt={selectedFacultyProfile.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                      <span className="text-gray-500">No Photo</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-semibold">Name:</div>
                <div>{selectedFacultyProfile.name}</div>
                
                <div className="font-semibold">Designation:</div>
                <div>{selectedFacultyProfile.designation}</div>
                
                <div className="font-semibold">Qualification:</div>
                <div>{selectedFacultyProfile.qualification}</div>
                
                <div className="font-semibold">Experience:</div>
                <div>{selectedFacultyProfile.experience} years</div>
                
                <div className="font-semibold">Specializations:</div>
                <div>{selectedFacultyProfile.specializations}</div>
                
                <div className="font-semibold">Email:</div>
                <div>{selectedFacultyProfile.email}</div>
                
                <div className="font-semibold">Status:</div>
                <div>
                  {selectedFacultyProfile.status === 'approved'
                    ? 'Approved'
                    : selectedFacultyProfile.status === 'rejected'
                    ? 'Rejected'
                    : 'Pending Approval'}
                </div>
              </div>
              
              {selectedFacultyProfile.cv && (
                <div>
                  <a
                    href={selectedFacultyProfile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    <Scroll className="h-4 w-4 mr-2" />
                    View CV/Resume
                  </a>
                </div>
              )}
              
              <Button
                variant="outline"
                onClick={() => setShowViewDialog(false)}
                className="w-full"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
