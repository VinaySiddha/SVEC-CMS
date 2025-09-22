"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourcesList } from "@/components/resources/ResourcesList";
import { ResourceForm } from "@/components/resources/ResourceForm";
import { Resource } from "@/types/resources";

export default function ResourcesPage() {
  const params = useParams();
  const deptId = params?.deptId as string || "all";
  const [activeTab, setActiveTab] = useState<string>("view");
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  const handleCreateNew = () => {
    setEditingResource(null);
    setActiveTab("create");
  };
  
  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setActiveTab("create");
  };
  
  const handleFormSuccess = () => {
    setActiveTab("view");
    setEditingResource(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Academic Resources Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="view">View Resources</TabsTrigger>
          <TabsTrigger value="create">
            {editingResource ? "Edit Resource" : "Create Resource"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button onClick={handleCreateNew}>
              Create New Resource
            </Button>
          </div>
          <ResourcesList 
            deptId={deptId} 
            allowAddNew={true}
            isAdmin={true}
            onEditResource={handleEdit}
          />
        </TabsContent>

        <TabsContent value="create">
          <ResourceForm 
            deptId={deptId} 
            existingResource={editingResource}
            onSuccess={handleFormSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
