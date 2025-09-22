"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HackathonsList } from "@/components/hackathons/HackathonsList";
import { HackathonForm } from "@/components/hackathons/HackathonForm";
import { Hackathon } from "@/types/hackathons";

export default function HackathonsPage() {
  const params = useParams();
  const deptId = params?.deptId as string || "all";
  const [activeTab, setActiveTab] = useState<string>("view");
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  
  const handleCreateNew = () => {
    setEditingHackathon(null);
    setActiveTab("create");
  };
  
  const handleEdit = (hackathon: Hackathon) => {
    setEditingHackathon(hackathon);
    setActiveTab("create");
  };
  
  const handleFormSuccess = () => {
    setActiveTab("view");
    setEditingHackathon(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hackathons Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="view">View Hackathons</TabsTrigger>
          <TabsTrigger value="create">
            {editingHackathon ? "Edit Hackathon" : "Create Hackathon"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button onClick={handleCreateNew}>
              Create New Hackathon
            </Button>
          </div>
          <HackathonsList 
            deptId={deptId} 
            allowAddNew={true}
            isAdmin={true}
            onEditHackathon={handleEdit}
          />
        </TabsContent>

        <TabsContent value="create">
          <HackathonForm 
            deptId={deptId} 
            existingHackathon={editingHackathon}
            onSuccess={handleFormSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
