"use client";

import React from "react";
import { HackathonsList } from "@/components/hackathons/HackathonsList";

interface HackathonsDeptPageProps {
  params: {
    deptId: string;
  };
}

export default function HackathonsDeptPage({ params }: HackathonsDeptPageProps) {
  const { deptId } = params;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Department Hackathons</h1>
      <HackathonsList deptId={deptId} allowAddNew={false} isAdmin={false} />
    </div>
  );
}
