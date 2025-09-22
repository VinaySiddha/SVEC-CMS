"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkshopForm from "@/components/workshops/WorkshopForm";
import { getWorkshopById, Workshop } from "@/utils/workshops-utils";

export default function EditWorkshopPage() {
  const params = useParams();
  const router = useRouter();
  const [workshop, setWorkshop] = useState<Workshop | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        if (!params || !params.id) {
          throw new Error("Workshop ID not provided");
        }
        
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const workshopData = await getWorkshopById(id);
        setWorkshop(workshopData);
      } catch (err: any) {
        console.error("Error fetching workshop:", err);
        setError(err.message || "Failed to load workshop");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkshop();
  }, [params]);
  
  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading workshop data...</p>
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
            onClick={() => router.push("/admin/workshops")}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Return to Workshops
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Workshop</h1>
        <p className="text-gray-500">Update workshop details</p>
      </div>
      
      {workshop && <WorkshopForm workshop={workshop} isEdit={true} />}
    </div>
  );
}
