"use client";

import React from "react";
import { useParams } from "next/navigation";
import { EventsList } from "@/components/events/EventsList";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";

export default function DepartmentEventsPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";

  return (
    <div className="container py-6">
      <PageHeader>
        <PageHeaderHeading>Department Events</PageHeaderHeading>
        <PageHeaderDescription>
          Manage cultural, sports, and community events for your department
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <EventsList deptId={deptId} isAdmin={true} />
      </div>
    </div>
  );
}
