"use client";

import React from "react";
import { ResourcesList } from "@/components/resources/ResourcesList";

interface ResourcesDeptPageProps {
  params: {
    deptId: string;
  };
}

export default function ResourcesDeptPage({ params }: ResourcesDeptPageProps) {
  const { deptId } = params;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Academic Resources</h1>
      <ResourcesList deptId={deptId} allowAddNew={false} isAdmin={false} />
    </div>
  );
}
