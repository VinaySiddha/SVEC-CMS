"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CollegeForm from '@/components/forms/CollegeForm';
import CollegeList from '@/components/lists/CollegeList';
import { Plus, Building, ArrowLeft } from 'lucide-react';

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
  fax?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  principal_name?: string;
  principal_email?: string;
  principal_phone?: string;
  established_year?: number;
  autonomous: boolean;
  coed: string;
  total_students: number;
  total_faculty: number;
  total_departments: number;
  campus_area?: number;
  hostel_capacity?: number;
  library_books?: number;
  status: string;
  logo_url?: string;
  description?: string;
  vision?: string;
  mission?: string;
  created_at: string;
  updated_at: string;
}

export default function CollegesPage() {
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddCollege = () => {
    setSelectedCollege(null);
    setCurrentView('add');
  };

  const handleEditCollege = (college: College) => {
    setSelectedCollege(college);
    setCurrentView('edit');
  };

  const handleSuccess = () => {
    setCurrentView('list');
    setSelectedCollege(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedCollege(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {currentView === 'list' ? (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Building className="h-8 w-8 text-blue-600" />
                  College Management
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage college information, track institutions, and maintain educational records.
                </p>
              </div>
              <Button onClick={handleAddCollege} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add College
              </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Colleges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    Loading...
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Active Colleges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    Loading...
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Engineering Colleges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    Loading...
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    NAAC Accredited
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    Loading...
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* College List */}
            <CollegeList 
              onEdit={handleEditCollege}
              refreshTrigger={refreshTrigger}
            />
          </>
        ) : (
          <>
            {/* Form Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to List
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentView === 'add' ? 'Add New College' : 'Edit College'}
              </h1>
            </div>

            {/* College Form */}
            <CollegeForm
              college={selectedCollege as any}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </>
        )}
      </div>
    </div>
  );
}