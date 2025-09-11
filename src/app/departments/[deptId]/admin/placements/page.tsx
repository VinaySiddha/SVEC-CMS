"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlacementForm from '@/components/placements/PlacementForm';
import PlacementGalleryForm from '@/components/placements/PlacementGalleryForm';
import PlacementsList from '@/components/placements/PlacementsList';
import PlacementGallery from '@/components/placements/PlacementGallery';

interface PlacementsAdminPageProps {
  params: {
    deptId: string;
  };
}

export default function PlacementsAdminPage({ params }: PlacementsAdminPageProps) {
  const { deptId } = params;
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Manage Department Placements</h1>
      
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="stats">Placement Statistics</TabsTrigger>
          <TabsTrigger value="gallery">Placement Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Add Placement Statistics</h2>
              <PlacementForm deptId={deptId} onSuccess={handleRefresh} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Statistics</h2>
              <PlacementsList 
                key={`placement-list-${refreshKey}`}
                deptId={deptId} 
                isAdmin={true}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gallery" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Add Gallery Image</h2>
              <PlacementGalleryForm deptId={deptId} onSuccess={handleRefresh} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Preview Gallery</h2>
              <PlacementGallery 
                key={`gallery-${refreshKey}`}
                deptId={deptId} 
                isAdmin={true}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
