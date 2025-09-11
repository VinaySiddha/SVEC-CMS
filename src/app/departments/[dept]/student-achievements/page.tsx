"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import StudentAchievementsList from "@/components/student-achievements/StudentAchievementsList";

export default function DepartmentStudentAchievementsPage() {
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
        <h1 className="text-2xl font-bold">Student Achievements</h1>
        <p className="text-gray-500">Internships, certifications, research projects, and other achievements of our students</p>
      </div>
      
      <StudentAchievementsList departmentFilter={departmentId} />
    </div>
  );
}
