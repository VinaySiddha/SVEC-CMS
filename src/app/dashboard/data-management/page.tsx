'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, LogOut, User } from 'lucide-react';
import { DepartmentInfoForm } from '@/components/forms/DepartmentInfoForm';
import { LaboratoryForm } from '@/components/forms/LaboratoryForm';
import { PlacementForm } from '@/components/forms/PlacementForm';
import { FacultyAchievementForm } from '@/components/forms/FacultyAchievementForm';
import { WorkshopForm } from '@/components/forms/WorkshopForm';
import { StudentAchievementForm } from '@/components/forms/StudentAchievementForm';
import { useAuth } from '@/lib/auth/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function FormDialog({ isOpen, onClose, title, children }: FormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default function DataManagementDashboard() {
  const [activeTab, setActiveTab] = useState('department-info');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const openForm = (type: string, data?: any) => {
    setFormType(type);
    setEditData(data || null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormType('');
    setEditData(null);
  };

  const handleFormSuccess = () => {
    toast.success('Data saved successfully');
    closeForm();
    // Refresh data here
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const formTabs = [
    {
      id: 'department-info',
      label: 'Department Info',
      description: 'Manage department information, HOD details, and contact info',
      icon: '🏢',
    },
    {
      id: 'laboratories',
      label: 'Laboratories',
      description: 'Manage lab information, equipment, and software details',
      icon: '🔬',
    },
    {
      id: 'placements',
      label: 'Placements',
      description: 'Manage student placement records and company details',
      icon: '💼',
    },
    {
      id: 'faculty-achievements',
      label: 'Faculty Achievements',
      description: 'Track faculty awards, certifications, and recognitions',
      icon: '🏆',
    },
    {
      id: 'workshops',
      label: 'Workshops',
      description: 'Manage workshop details, schedules, and participants',
      icon: '📚',
    },
    {
      id: 'student-achievements',
      label: 'Student Achievements',
      description: 'Track student awards, competitions, and accomplishments',
      icon: '🎓',
    },
  ];

  const renderForm = () => {
    const props = {
      initialData: editData,
      onSuccess: handleFormSuccess,
      onCancel: closeForm,
    };

    switch (formType) {
      case 'department-info':
        return <DepartmentInfoForm {...props} />;
      case 'laboratories':
        return <LaboratoryForm {...props} />;
      case 'placements':
        return <PlacementForm {...props} />;
      case 'faculty-achievements':
        return <FacultyAchievementForm {...props} />;
      case 'workshops':
        return <WorkshopForm {...props} />;
      case 'student-achievements':
        return <StudentAchievementForm {...props} />;
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    const tab = formTabs.find(t => t.id === formType);
    const action = editData ? 'Edit' : 'Add';
    return `${action} ${tab?.label || 'Record'}`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* User Info Header */}
      <div className="flex justify-between items-center mb-6 p-4 bg-blue-50 rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              Welcome, {user?.username}
            </h2>
            <p className="text-sm text-gray-600">
              {user?.department_name || user?.department} • {user?.role === 'admin' ? 'Administrator' : 'Department User'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Management Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all college data including departments, labs, placements, achievements, and more.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-2">
          {formTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-2 p-4 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <span className="text-2xl">{tab.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {formTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{tab.icon}</span>
                    {tab.label}
                  </CardTitle>
                  <CardDescription>{tab.description}</CardDescription>
                </div>
                <Button onClick={() => openForm(tab.id)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add {tab.label}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Data Table Component would go here */}
                  <div className="border rounded-lg p-8 text-center text-muted-foreground">
                    <p>Data table for {tab.label} will be displayed here.</p>
                    <p className="text-sm mt-2">
                      This would include a list of all records with edit, delete, and view options.
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => openForm(tab.id, { example: 'data' })}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Sample
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Sample
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete Sample
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <FormDialog
        isOpen={showForm}
        onClose={closeForm}
        title={getFormTitle()}
      >
        {renderForm()}
      </FormDialog>
    </div>
  );
}
