"use client";

import { useEffect, useState } from "react";
import WorkshopsList from "@/components/workshops/WorkshopsList";

export default function WorkshopsAdmin() {
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
        <h1 className="text-2xl font-bold">Manage Workshops</h1>
        <p className="text-gray-500">Add, edit, and view workshops</p>
      </div>
      
      <WorkshopsList showAddButton={true} />
    </div>
  );
}
