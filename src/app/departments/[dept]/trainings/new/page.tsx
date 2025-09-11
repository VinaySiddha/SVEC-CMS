"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { TrainingForm } from "@/components/trainings/TrainingForm";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NewTrainingPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";
  const router = useRouter();

  const goBack = () => {
    router.push(`/departments/${deptId}/trainings`);
  };

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/trainings`);
  };

  return (
    <div className="container max-w-3xl py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={goBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Trainings
      </Button>
      
      <PageHeader>
        <PageHeaderHeading>Add New Training</PageHeaderHeading>
        <PageHeaderDescription>
          Record a new professional development or training course
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <TrainingForm 
          deptId={deptId} 
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
