"use client";

import { useEffect, useState } from "react";
import WorkshopForm from "@/components/workshops/WorkshopForm";

export default function AddWorkshopPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add Workshop</h1>
        <p className="text-gray-500">Create a new workshop entry</p>
      </div>
      
      <WorkshopForm />
    </div>
  );
}
