"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ACHIEVEMENT_TYPES, type AchievementType } from '@/utils/faculty-achievements-utils';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from '@/components/LoadingSpinner';
import { Check, X, FileText, Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: number;
  dept: string;
  type: AchievementType;
  title: string;
  description: string;
  proof_url: string | null;
  approved: boolean;
  created_at?: string;
  updated_at?: string;
}

interface Department {
  id: string;
  name: string;
}

export default function AchievementsList({ isAdmin = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deptParam = searchParams ? searchParams.get('dept') : null;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filters, setFilters] = useState({
    dept: deptParam || '',
    type: '',
  });

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const timestamp = new Date().getTime();
        const cacheBuster = `?_t=${timestamp}`;
        const response = await fetch(`/api/departments${cacheBuster}`);
        if (!response.ok) throw new Error('Failed to fetch departments');
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError('Failed to load departments');
      }
    };

    fetchDepartments();
  }, []);

  // Fetch achievements with filters
  useEffect(() => {
    const fetchAchievements = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url = '/api/faculty-achievements?';
        
        if (filters.dept) {
          url += `dept=${encodeURIComponent(filters.dept)}&`;
        }
        
        if (filters.type) {
          url += `type=${encodeURIComponent(filters.type)}&`;
        }

        // If not admin, only show approved achievements
        if (!isAdmin) {
          url += 'approved=true&';
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch achievements: ${response.statusText}`);
        }
        
        const data = await response.json();
        setAchievements(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load achievements');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [filters, isAdmin]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      const response = await fetch(`/api/faculty-achievements/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete achievement');
      }

      // Remove from state
      setAchievements(prev => prev.filter(item => item.id !== id));
      toast.success('Achievement deleted successfully');
    } catch (err: any) {
      toast.error(err.message || 'Error deleting achievement');
    }
  };

  const handleToggleApproval = async (achievement: Achievement) => {
    try {
      const formData = new FormData();
      formData.append('dept', achievement.dept);
      formData.append('type', achievement.type);
      formData.append('title', achievement.title);
      formData.append('description', achievement.description);
      formData.append('approved', String(!achievement.approved));

      const response = await fetch(`/api/faculty-achievements/${achievement.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update approval status');
      }

      // Update state
      setAchievements(prev => 
        prev.map(item => 
          item.id === achievement.id ? { ...item, approved: !item.approved } : item
        )
      );

      toast.success(
        achievement.approved 
          ? 'Achievement unapproved successfully' 
          : 'Achievement approved successfully'
      );
    } catch (err: any) {
      toast.error(err.message || 'Error updating approval status');
    }
  };

  const getDepartmentName = (deptId: string) => {
    const department = departments.find(d => d.id === deptId);
    return department ? department.name : deptId;
  };

  const renderAdminActions = (achievement: Achievement) => {
    if (!isAdmin) return null;
    
    return (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleToggleApproval(achievement)}
          title={achievement.approved ? "Unapprove" : "Approve"}
        >
          {achievement.approved ? <X size={16} /> : <Check size={16} />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/administration/edit-faculty-achievement/${achievement.id}`)}
          title="Edit"
        >
          <Edit size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(achievement.id)}
          title="Delete"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    );
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Faculty Achievements</h2>
          <Button onClick={() => router.push('/administration/add-faculty-achievement')}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Achievement
          </Button>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>
            {isAdmin ? 'Manage Faculty Achievements' : 'Faculty Achievements'}
          </CardTitle>
          
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Select
              value={filters.dept}
              onValueChange={(value: string) => handleFilterChange('dept', value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={filters.type}
              onValueChange={(value: string) => handleFilterChange('type', value)}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Achievement Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Achievement Types</SelectItem>
                {ACHIEVEMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No achievements found with the selected filters.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Department</TableHead>
                  {isAdmin && <TableHead>Status</TableHead>}
                  <TableHead>Proof</TableHead>
                  {isAdmin && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {achievements.map((achievement) => (
                  <TableRow key={achievement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {achievement.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{achievement.type}</Badge>
                    </TableCell>
                    <TableCell>{getDepartmentName(achievement.dept)}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        {achievement.approved ? (
                          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">
                            Approved
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                    )}
                    <TableCell>
                      {achievement.proof_url && (
                        <a 
                          href={achievement.proof_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline"
                        >
                          <FileText size={16} className="mr-1" />
                          View
                        </a>
                      )}
                    </TableCell>
                    {isAdmin && (
                      <TableCell className="text-right">
                        {renderAdminActions(achievement)}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
