"use client";

import React from "react";
import { useParams } from "next/navigation";
import { AssociationsList } from "@/components/associations/AssociationsList";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";

export default function AssociationsPage() {
  const params = useParams<{ deptId: string }>();
  const deptId = params?.deptId || "";

  return (
    <div className="container max-w-7xl py-6">
      <PageHeader>
        <PageHeaderHeading>Associations & Clubs</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage student associations and clubs for this department
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <AssociationsList 
          deptId={deptId} 
          isAdmin={true} 
          allowAddNew={true} 
        />
      </div>
    </div>
  );
}
