"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsList } from "@/components/events/EventsList";
import { EventForm } from "@/components/events/EventForm";
import { Event } from "@/types/events";

export default function EventsPage() {
  const params = useParams();
  const deptId = params?.deptId as string || "all";
  const [activeTab, setActiveTab] = useState<string>("view");
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const handleCreateNew = () => {
    setEditingEvent(null);
    setActiveTab("create");
  };
  
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setActiveTab("create");
  };
  
  const handleFormSuccess = () => {
    setActiveTab("view");
    setEditingEvent(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="view">View Events</TabsTrigger>
          <TabsTrigger value="create">
            {editingEvent ? "Edit Event" : "Create Event"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="view" className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button onClick={handleCreateNew}>
              Create New Event
            </Button>
          </div>
          <EventsList 
            deptId={deptId} 
            allowAddNew={true}
            isAdmin={true}
            onEditEvent={handleEdit}
          />
        </TabsContent>

        <TabsContent value="create">
          <EventForm 
            deptId={deptId} 
            existingEvent={editingEvent}
            onSuccess={handleFormSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
