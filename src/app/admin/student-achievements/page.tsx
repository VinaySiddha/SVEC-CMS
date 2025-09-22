"use client";

import { useEffect, useState } from "react";
import StudentAchievementsList from "@/components/student-achievements/StudentAchievementsList";

export default function StudentAchievementsAdmin() {
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
        <h1 className="text-2xl font-bold">Manage Student Achievements</h1>
        <p className="text-gray-500">Add, edit, and view student achievements</p>
      </div>
      
      <StudentAchievementsList showAddButton={true} />
    </div>
  );
}
