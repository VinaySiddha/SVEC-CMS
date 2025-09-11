"use client";

import { useEffect, useState } from "react";
import StudentAchievementForm from "@/components/student-achievements/StudentAchievementForm";

export default function AddStudentAchievementPage() {
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
        <h1 className="text-2xl font-bold">Add Student Achievement</h1>
        <p className="text-gray-500">Create a new student achievement entry</p>
      </div>
      
      <StudentAchievementForm />
    </div>
  );
}
