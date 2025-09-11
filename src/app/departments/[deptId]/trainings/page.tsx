"use client";

import React from "react";
import { useParams } from "next/navigation";
import TrainingsList from "@/components/trainings/TrainingsList";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";

export default function TrainingsPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";

  return (
    <div className="container max-w-7xl py-6">
      <PageHeader>
        <PageHeaderHeading>Professional Trainings</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage professional development and training courses
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <TrainingsList 
          deptId={deptId} 
          isAdmin={true} 
          allowAddNew={true} 
        />
      </div>
    </div>
  );
}
