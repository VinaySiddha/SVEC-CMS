'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, Users, BookOpen, Award, Calendar, Building, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/AuthContext';
import { toast } from 'sonner';

// Import forms (we'll create these)
import { DepartmentInfoForm } from '@/components/forms/DepartmentInfoForm';
import { FacultyForm } from '@/components/forms/FacultyForm';
import { LaboratoryForm } from '@/components/forms/LaboratoryForm';
import { FacultyAchievementForm } from '@/components/forms/FacultyAchievementForm';
import { StudentAchievementForm } from '@/components/forms/StudentAchievementForm';
import { WorkshopForm } from '@/components/forms/WorkshopForm';
import { PlacementForm } from '@/components/forms/PlacementForm';

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

export default function DepartmentDataManagement() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const dept = params.dept as string;
  
  const [activeTab, setActiveTab] = useState('department-info');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<string>('');
  const [editData, setEditData] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Check if user has permission to access this department
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth/login');
      return;
    }

    // Check if user has permission for this department
    if (user.role !== 'admin' && user.department !== dept) {
      router.push('/unauthorized');
      return;
    }
  }, [user, isAuthenticated, dept, router]);

  // Fetch department data
  useEffect(() => {
    if (user && dept) {
      fetchDepartmentData();
    }
  }, [user, dept]);

  const fetchDepartmentData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // Fetch all department data in parallel
      const [
        facultyResponse,
        labsResponse,
        facultyAchievementsResponse,
        studentAchievementsResponse,
        workshopsResponse
      ] = await Promise.all([
        fetch(`/api/departments/${dept}/faculty`, { headers }),
        fetch(`/api/departments/${dept}/labs`, { headers }),
        fetch(`/api/departments/${dept}/faculty-achievements`, { headers }),
        fetch(`/api/departments/${dept}/student-achievements`, { headers }),
        fetch(`/api/departments/${dept}/workshops`, { headers })
      ]);

      const results = await Promise.all([
        facultyResponse.ok ? facultyResponse.json() : { faculty: [] },
        labsResponse.ok ? labsResponse.json() : { labs: [] },
        facultyAchievementsResponse.ok ? facultyAchievementsResponse.json() : { achievements: [] },
        studentAchievementsResponse.ok ? studentAchievementsResponse.json() : { achievements: [] },
        workshopsResponse.ok ? workshopsResponse.json() : { workshops: [] }
      ]);

      setData({
        faculty: results[0].faculty || [],
        labs: results[1].labs || [],
        facultyAchievements: results[2].achievements || [],
        studentAchievements: results[3].achievements || [],
        workshops: results[4].workshops || []
      });

    } catch (error) {
      console.error('Error fetching department data:', error);
      toast.error('Failed to fetch department data');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      setLoading(true);
      
      // Map form types to API endpoints
      const apiEndpoints: { [key: string]: string } = {
        'faculty': 'faculty',
        'laboratory': 'labs',
        'faculty-achievement': 'faculty-achievements',
        'student-achievement': 'student-achievements',
        'workshop': 'workshops'
      };
      
      const endpoint = editData 
        ? `/api/departments/${dept}/${apiEndpoints[formType]}/${editData.id}`
        : `/api/departments/${dept}/${apiEndpoints[formType]}`;
      
      const method = editData ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editData ? 'Updated successfully' : 'Created successfully');
        setShowForm(false);
        setEditData(null);
        fetchDepartmentData();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`/api/departments/${dept}/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        toast.success('Deleted successfully');
        fetchDepartmentData();
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item');
    }
  };

  const openForm = (type: string, data?: any) => {
    setFormType(type);
    setEditData(data || null);
    setShowForm(true);
  };

  // Filter and search faculty
  const filteredFaculty = data.faculty ? data.faculty.filter((faculty: any) => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.qualification.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDesignation = filterDesignation === 'all' || faculty.designation === filterDesignation;
    
    return matchesSearch && matchesDesignation;
  }).sort((a: any, b: any) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'designation') return a.designation.localeCompare(b.designation);
    if (sortBy === 'experience') return (b.experience_years || 0) - (a.experience_years || 0);
    return 0;
  }) : [];

  const renderFormContent = () => {
    const commonProps = {
      initialData: editData,
      onSubmit: handleFormSubmit,
      isLoading: loading,
      departmentCode: dept,
      onSuccess: () => {
        setShowForm(false);
        setEditData(null);
      },
      onCancel: () => {
        setShowForm(false);
        setEditData(null);
      }
    };

    switch (formType) {
      case 'department-info':
        return <DepartmentInfoForm {...commonProps} />;
      case 'faculty':
        return <FacultyForm {...commonProps} />;
      case 'laboratories':
        return <LaboratoryForm {...commonProps} />;
      case 'faculty-achievements':
        return <FacultyAchievementForm {...commonProps} />;
      case 'student-achievements':
        return <StudentAchievementForm {...commonProps} />;
      case 'workshops':
        return <WorkshopForm {...commonProps} />;
      case 'placements':
        return <PlacementForm {...commonProps} />;
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    const action = editData ? 'Edit' : 'Add';
    switch (formType) {
      case 'department-info':
        return `${action} Department Information`;
      case 'faculty':
        return `${action} Faculty Member`;
      case 'laboratories':
        return `${action} Laboratory`;
      case 'faculty-achievements':
        return `${action} Faculty Achievement`;
      case 'student-achievements':
        return `${action} Student Achievement`;
      case 'workshops':
        return `${action} Workshop/Training Program`;
      case 'placements':
        return `${action} Placement Record`;
      default:
        return `${action} Item`;
    }
  };

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading department data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{dept.toUpperCase()} Department</h1>
          <p className="text-muted-foreground">Manage your department's information and data</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Logged in as</p>
          <p className="font-semibold">{user.username} ({user.role})</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="department-info" className="text-xs">
            <Building className="w-4 h-4 mr-1" />
            Dept Info
          </TabsTrigger>
          <TabsTrigger value="faculty" className="text-xs">
            <Users className="w-4 h-4 mr-1" />
            Faculty
          </TabsTrigger>
          <TabsTrigger value="laboratories" className="text-xs">
            <BookOpen className="w-4 h-4 mr-1" />
            Labs
          </TabsTrigger>
          <TabsTrigger value="faculty-achievements" className="text-xs">
            <Award className="w-4 h-4 mr-1" />
            Faculty Achievements
          </TabsTrigger>
          <TabsTrigger value="student-achievements" className="text-xs">
            <Award className="w-4 h-4 mr-1" />
            Student Achievements
          </TabsTrigger>
          <TabsTrigger value="workshops" className="text-xs">
            <Calendar className="w-4 h-4 mr-1" />
            Workshops
          </TabsTrigger>
          <TabsTrigger value="placements" className="text-xs">
            <Users className="w-4 h-4 mr-1" />
            Placements
          </TabsTrigger>
        </TabsList>

        {/* Department Information Tab */}
        <TabsContent value="department-info" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Department Information</CardTitle>
                  <CardDescription>Manage basic department details and information</CardDescription>
                </div>
                <Button onClick={() => openForm('department-info', data.departmentInfo)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Update Info
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.departmentInfo ? (
                <div className="grid gap-4">
                  <div>
                    <h3 className="font-semibold">Department Name</h3>
                    <p className="text-muted-foreground">{data.departmentInfo.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Head of Department</h3>
                    <p className="text-muted-foreground">{data.departmentInfo.hod_name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Established</h3>
                    <p className="text-muted-foreground">{data.departmentInfo.established_year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Vision</h3>
                    <p className="text-muted-foreground">{data.departmentInfo.vision}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Mission</h3>
                    <p className="text-muted-foreground">{data.departmentInfo.mission}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No department information available. Click "Update Info" to add details.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Tab */}
        <TabsContent value="faculty" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Faculty Members</CardTitle>
                  <CardDescription>Manage faculty information and profiles</CardDescription>
                </div>
                <Button onClick={() => openForm('faculty')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Faculty
                </Button>
              </div>
              
              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search faculty by name, email, or qualification..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={filterDesignation} onValueChange={setFilterDesignation}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Designations</SelectItem>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                      <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                      <SelectItem value="HOD">Head of Department</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="designation">Designation</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredFaculty && filteredFaculty.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing {filteredFaculty.length} of {data.faculty?.length || 0} faculty members
                  </div>
                  {filteredFaculty.map((faculty: any) => (
                    <div key={faculty.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {faculty.profile_url && (
                            <img 
                              src={faculty.profile_url} 
                              alt={faculty.name}
                              className="w-12 h-12 rounded-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder-avatar.png';
                              }}
                            />
                          )}
                          <div>
                            <h3 className="font-semibold text-lg">{faculty.name}</h3>
                            <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p><span className="font-medium">Qualification:</span> {faculty.qualification}</p>
                          {faculty.email && <p><span className="font-medium">Email:</span> {faculty.email}</p>}
                          {faculty.specialization && <p><span className="font-medium">Specialization:</span> {faculty.specialization}</p>}
                          {faculty.experience_years && <p><span className="font-medium">Experience:</span> {faculty.experience_years} years</p>}
                        </div>
                        {faculty.status && (
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              faculty.status === 'approved' ? 'bg-green-100 text-green-800' :
                              faculty.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {faculty.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('faculty', faculty)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('faculty', faculty.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : data.faculty && data.faculty.length > 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No faculty members match your search criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setFilterDesignation('all');
                    }}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground">No faculty members added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs will be similar... */}
        
        {/* Laboratories Tab */}
        <TabsContent value="laboratories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Laboratories</CardTitle>
                  <CardDescription>Manage laboratory information and equipment</CardDescription>
                </div>
                <Button onClick={() => openForm('laboratory')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Laboratory
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.labs && data.labs.length > 0 ? (
                <div className="space-y-4">
                  {data.labs.map((lab: any) => (
                    <div key={lab.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-semibold">{lab.lab_name}</h3>
                        <p className="text-sm text-muted-foreground">Area: {lab.lab_area || 'N/A'} sq ft</p>
                        <p className="text-sm text-muted-foreground">Equipment: {lab.equipment_count || 0} items</p>
                        {lab.description && (
                          <p className="text-sm text-muted-foreground mt-1">{lab.description}</p>
                        )}
                        {lab.status && (
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              lab.status === 'approved' ? 'bg-green-100 text-green-800' :
                              lab.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {lab.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('laboratory', lab)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('labs', lab.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No laboratories added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faculty Achievements Tab */}
        <TabsContent value="faculty-achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Faculty Achievements</CardTitle>
                  <CardDescription>Manage faculty awards, publications, and recognition</CardDescription>
                </div>
                <Button onClick={() => openForm('faculty-achievement')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.facultyAchievements && data.facultyAchievements.length > 0 ? (
                <div className="space-y-4">
                  {data.facultyAchievements.map((achievement: any) => (
                    <div key={achievement.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">Faculty: {achievement.faculty_name}</p>
                        <p className="text-sm text-muted-foreground">Date: {achievement.achievement_date}</p>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        )}
                        {achievement.status && (
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              achievement.status === 'approved' ? 'bg-green-100 text-green-800' :
                              achievement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {achievement.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('faculty-achievement', achievement)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('faculty-achievements', achievement.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No faculty achievements added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Achievements Tab */}
        <TabsContent value="student-achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Student Achievements</CardTitle>
                  <CardDescription>Manage student awards, competitions, and recognition</CardDescription>
                </div>
                <Button onClick={() => openForm('student-achievement')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.studentAchievements && data.studentAchievements.length > 0 ? (
                <div className="space-y-4">
                  {data.studentAchievements.map((achievement: any) => (
                    <div key={achievement.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">Student: {achievement.student_name}</p>
                        <p className="text-sm text-muted-foreground">Date: {achievement.achievement_date}</p>
                        {achievement.description && (
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        )}
                        {achievement.status && (
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              achievement.status === 'approved' ? 'bg-green-100 text-green-800' :
                              achievement.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {achievement.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('student-achievement', achievement)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('student-achievements', achievement.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No student achievements added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workshops Tab */}
        <TabsContent value="workshops" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Workshops & Training Programs</CardTitle>
                  <CardDescription>Manage workshops, seminars, and training programs</CardDescription>
                </div>
                <Button onClick={() => openForm('workshop')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Workshop
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.workshops && data.workshops.length > 0 ? (
                <div className="space-y-4">
                  {data.workshops.map((workshop: any) => (
                    <div key={workshop.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-semibold">{workshop.title}</h3>
                        <p className="text-sm text-muted-foreground">Duration: {workshop.duration || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Start Date: {workshop.start_date}</p>
                        {workshop.end_date && (
                          <p className="text-sm text-muted-foreground">End Date: {workshop.end_date}</p>
                        )}
                        {workshop.description && (
                          <p className="text-sm text-muted-foreground mt-1">{workshop.description}</p>
                        )}
                        {workshop.status && (
                          <div className="mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                              workshop.status === 'approved' ? 'bg-green-100 text-green-800' :
                              workshop.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {workshop.status}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('workshop', workshop)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('workshops', workshop.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No workshops added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placements Tab */}
        <TabsContent value="placements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Placement Records</CardTitle>
                  <CardDescription>Manage student placement information</CardDescription>
                </div>
                <Button onClick={() => openForm('placements')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Placement
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {data.placements && data.placements.length > 0 ? (
                <div className="space-y-4">
                  {data.placements.map((placement: any) => (
                    <div key={placement.id} className="flex justify-between items-center p-4 border rounded">
                      <div>
                        <h3 className="font-semibold">{placement.student_name}</h3>
                        <p className="text-sm text-muted-foreground">Company: {placement.company_name}</p>
                        <p className="text-sm text-muted-foreground">Package: ₹{placement.package_lpa} LPA</p>
                        <p className="text-sm text-muted-foreground">Year: {placement.academic_year}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openForm('placements', placement)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete('placements', placement.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No placement records added yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
      </Tabs>

      {/* Form Dialog */}
      <FormDialog
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title={getFormTitle()}
      >
        {renderFormContent()}
      </FormDialog>
    </div>
  );
}
