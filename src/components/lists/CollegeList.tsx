"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import LoadingSpinner from "../LoadingSpinner";
import { Search, MoreHorizontal, Edit, Trash2, Eye, MapPin, Users, GraduationCap, Building } from 'lucide-react';
import { toast } from "sonner";

interface College {
  id: number;
  name: string;
  short_name?: string;
  code: string;
  type: string;
  affiliation?: string;
  university?: string;
  accreditation?: string;
  naac_grade: string;
  nirf_ranking?: number;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  principal_name?: string;
  established_year?: number;
  autonomous: boolean;
  coed: string;
  total_students: number;
  total_faculty: number;
  total_departments: number;
  campus_area?: number;
  status: string;
  logo_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface CollegeListProps {
  onEdit: (college: College) => void;
  refreshTrigger: number;
}

export default function CollegeList({ onEdit, refreshTrigger }: CollegeListProps) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('Active');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchColleges = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: statusFilter
      });

      if (search.trim()) {
        params.append('search', search.trim());
      }
      if (typeFilter && typeFilter !== 'All') {
        params.append('type', typeFilter);
      }
      if (stateFilter && stateFilter !== 'All') {
        params.append('state', stateFilter);
      }

      const response = await fetch(`/api/colleges?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch colleges');
      }

      const result = await response.json();
      setColleges(result.data || []);
      setPagination(result.pagination || pagination);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      toast.error('Failed to fetch colleges');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, [pagination.page, search, typeFilter, statusFilter, stateFilter, refreshTrigger]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pagination.page !== 1) {
        setPagination(prev => ({ ...prev, page: 1 }));
      } else {
        fetchColleges();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (college: College) => {
    setCollegeToDelete(college);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!collegeToDelete) return;

    try {
      const response = await fetch(`/api/colleges/${collegeToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete college');
      }

      toast.success('College deleted successfully');
      setDeleteDialogOpen(false);
      setCollegeToDelete(null);
      fetchColleges();
    } catch (error) {
      console.error('Error deleting college:', error);
      toast.error('Failed to delete college');
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'affiliated': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'autonomous': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getNaacBadgeColor = (grade: string) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800';
    if (grade.includes('B')) return 'bg-yellow-100 text-yellow-800';
    if (grade.includes('C')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatEstablished = (year?: number) => {
    if (!year) return 'N/A';
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    return `${year} (${age} years)`;
  };

  // Get unique values for filters
  const uniqueTypes = [...new Set(colleges.map(c => c.type))].filter(Boolean) as string[];
  const uniqueStates = [...new Set(colleges.map(c => c.state))].filter(Boolean) as string[];

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <LoadingSpinner />
          <span className="ml-2">Loading colleges...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Colleges ({pagination.total})
            </CardTitle>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search colleges..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Affiliated">Affiliated</SelectItem>
                  <SelectItem value="Autonomous">Autonomous</SelectItem>
                </SelectContent>
              </Select>

              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All States</SelectItem>
                  {uniqueStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {colleges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No colleges found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <>
              {/* College Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {colleges.map((college) => (
                  <Card key={college.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {college.logo_url ? (
                              <img 
                                src={college.logo_url} 
                                alt={`${college.name} logo`}
                                className="w-8 h-8 rounded object-cover"
                              />
                            ) : (
                              <Building className="h-8 w-8 text-gray-400" />
                            )}
                            <h3 className="font-semibold text-lg truncate" title={college.name}>
                              {college.short_name || college.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2" title={college.name}>
                            {college.name}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {college.code}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {college.type}
                            </Badge>
                            <Badge className={`text-xs ${getStatusBadgeColor(college.status)}`}>
                              {college.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEdit(college)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(college)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Location */}
                        {(college.city || college.state) && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{[college.city, college.state].filter(Boolean).join(', ')}</span>
                          </div>
                        )}

                        {/* Statistics */}
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-blue-600">
                              <Users className="h-4 w-4" />
                              <span className="font-medium">{college.total_students || 0}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Students</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-green-600">
                              <GraduationCap className="h-4 w-4" />
                              <span className="font-medium">{college.total_faculty || 0}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Faculty</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-purple-600">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{college.total_departments || 0}</span>
                            </div>
                            <p className="text-gray-500 text-xs">Departments</p>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-2 text-sm text-gray-600">
                          {college.university && (
                            <div>
                              <span className="font-medium">University:</span> {college.university}
                            </div>
                          )}
                          {college.naac_grade !== 'Not Accredited' && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">NAAC:</span>
                              <Badge className={`text-xs ${getNaacBadgeColor(college.naac_grade)}`}>
                                {college.naac_grade}
                              </Badge>
                            </div>
                          )}
                          {college.nirf_ranking && (
                            <div>
                              <span className="font-medium">NIRF Rank:</span> #{college.nirf_ranking}
                            </div>
                          )}
                          {college.established_year && (
                            <div>
                              <span className="font-medium">Established:</span> {formatEstablished(college.established_year)}
                            </div>
                          )}
                        </div>

                        {/* Contact */}
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex flex-wrap gap-2 text-xs">
                            {college.email && (
                              <a 
                                href={`mailto:${college.email}`}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                {college.email}
                              </a>
                            )}
                            {college.website && (
                              <a 
                                href={college.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} colleges
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === pagination.totalPages || 
                          Math.abs(page - pagination.page) <= 1
                        )
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 text-gray-400">...</span>
                            )}
                            <Button
                              variant={pagination.page === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPagination(prev => ({ ...prev, page }))}
                            >
                              {page}
                            </Button>
                          </React.Fragment>
                        ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete College</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{collegeToDelete?.name}"? This action cannot be undone and will also remove all associated departments and facilities.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}