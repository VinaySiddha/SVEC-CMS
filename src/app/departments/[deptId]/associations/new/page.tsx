"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { AssociationForm } from "@/components/associations/AssociationForm";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function NewAssociationPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";
  const router = useRouter();

  const goBack = () => {
    router.push(`/departments/${deptId}/associations`);
  };

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/associations`);
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
        Back to Associations
      </Button>
      
      <PageHeader>
        <PageHeaderHeading>Add New Association</PageHeaderHeading>
        <PageHeaderDescription>
          Create a new student association or club for your department
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <AssociationForm 
          deptId={deptId} 
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
