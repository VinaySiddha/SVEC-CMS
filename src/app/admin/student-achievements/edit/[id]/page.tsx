"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StudentAchievementForm from "@/components/student-achievements/StudentAchievementForm";
import { getStudentAchievementById, StudentAchievement } from "@/utils/student-achievements-utils";

export default function EditStudentAchievementPage() {
  const params = useParams();
  const router = useRouter();
  const [achievement, setAchievement] = useState<StudentAchievement | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        if (!params || !params.id) {
          throw new Error("Achievement ID not provided");
        }
        
        const id = params.id as string;
        const achievementData = await getStudentAchievementById(id);
        setAchievement(achievementData);
      } catch (err: any) {
        console.error("Error fetching student achievement:", err);
        setError(err.message || "Failed to load student achievement");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAchievement();
  }, [params]);
  
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievement data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          <h3 className="text-lg font-medium">Error</h3>
          <p>{error}</p>
          <button 
            onClick={() => router.push("/admin/student-achievements")}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Return to Student Achievements
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Student Achievement</h1>
        <p className="text-gray-500">Update student achievement details</p>
      </div>
      
      {achievement && <StudentAchievementForm achievement={achievement} isEdit={true} />}
    </div>
  );
}
