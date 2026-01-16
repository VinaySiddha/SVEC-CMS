"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { EventForm } from "@/components/events/EventForm";
import { toast } from "react-hot-toast";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EditEventPage() {
  const params = useParams<{ deptId: string; eventId: string }>();
  const deptId = params?.deptId || "";
  const eventId = params?.eventId || "";
  const router = useRouter();
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the event data
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `/api/departments/${deptId}/events/${eventId}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }
        
        const data = await response.json();
        setEvent(data.event);
      } catch (error: any) {
        setError(error.message || "Failed to load event");
        toast.error("Could not load event data");
      } finally {
        setLoading(false);
      }
    };

    if (deptId && eventId) {
      fetchEvent();
    } else {
      setLoading(false);
      setError("Invalid department or event ID");
    }
  }, [deptId, eventId]);

  const goBack = () => {
    router.push(`/departments/${deptId}/events`);
  };

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/events`);
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container max-w-4xl py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={goBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
        
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-500">{error || "Event not found"}</p>
          <Button className="mt-4" onClick={goBack}>
            Return to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={goBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>
      
      <PageHeader>
        <PageHeaderHeading>Edit Event</PageHeaderHeading>
        <PageHeaderDescription>
          Update details for {event.title}
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <EventForm 
          deptId={deptId} 
          event={event}
          isEdit={true}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
