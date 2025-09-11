"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScholarshipForm from '@/components/scholarships/ScholarshipForm';
import ScholarshipsList from '@/components/scholarships/ScholarshipsList';

interface ScholarshipsAdminPageProps {
  params: {
    deptId: string;
  };
}

export default function ScholarshipsAdminPage({ params }: ScholarshipsAdminPageProps) {
  const { deptId } = params;
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Manage Department Scholarships</h1>
      
      <Tabs defaultValue="add">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add New Scholarship</TabsTrigger>
          <TabsTrigger value="view">View Scholarships</TabsTrigger>
        </TabsList>
        
        <TabsContent value="add" className="mt-6">
          <ScholarshipForm
            deptId={deptId}
            onSuccess={handleRefresh}
          />
        </TabsContent>
        
        <TabsContent value="view" className="mt-6">
          <ScholarshipsList
            key={refreshKey}
            deptId={deptId}
            isAdmin={true}
            onRefresh={handleRefresh}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
