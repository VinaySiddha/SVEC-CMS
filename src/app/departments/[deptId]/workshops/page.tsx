"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WorkshopsList from "@/components/workshops/WorkshopsList";

export default function DepartmentWorkshopsPage() {
  const params = useParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="p-6">Loading...</div>;
  }

  const departmentId = params?.deptId ? 
    (Array.isArray(params.deptId) ? params.deptId[0] : params.deptId) : "";

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Workshops & FDPs</h1>
        <p className="text-gray-500">Workshops, FDPs, and training programs conducted by the department</p>
      </div>
      
      <WorkshopsList departmentFilter={departmentId} />
    </div>
  );
}
