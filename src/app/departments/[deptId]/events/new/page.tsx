"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { EventForm } from "@/components/events/EventForm";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NewEventPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";
  const router = useRouter();

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/events`);
  };

  const goBack = () => {
    router.push(`/departments/${deptId}/events`);
  };

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
        <PageHeaderHeading>Add New Event</PageHeaderHeading>
        <PageHeaderDescription>
          Create a new event for your department
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <EventForm deptId={deptId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
