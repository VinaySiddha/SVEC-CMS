"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TrainingForm } from "@/components/trainings/TrainingForm";
import { toast } from "react-hot-toast";

// UI Components
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page-header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function EditTrainingPage() {
  const params = useParams<{ deptId: string; trainingId: string }>();
  const deptId = params?.deptId || "";
  const trainingId = params?.trainingId || "";
  const router = useRouter();
  
  const [training, setTraining] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the training data
    const fetchTraining = async () => {
      try {
        const response = await fetch(
          `/api/departments/${deptId}/trainings/${trainingId}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch training");
        }
        
        const data = await response.json();
        setTraining(data.training);
      } catch (error: any) {
        console.error("Error fetching training:", error);
        setError(error.message || "Failed to load training");
        toast.error("Could not load training data");
      } finally {
        setLoading(false);
      }
    };

    if (deptId && trainingId) {
      fetchTraining();
    } else {
      setLoading(false);
      setError("Invalid department or training ID");
    }
  }, [deptId, trainingId]);

  const goBack = () => {
    router.push(`/departments/${deptId}/trainings`);
  };

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/trainings`);
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !training) {
    return (
      <div className="container max-w-3xl py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={goBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Trainings
        </Button>
        
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-500">{error || "Training not found"}</p>
          <Button className="mt-4" onClick={goBack}>
            Return to Trainings
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={goBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Trainings
      </Button>
      
      <PageHeader>
        <PageHeaderHeading>Edit Training</PageHeaderHeading>
        <PageHeaderDescription>
          Update details for {training.title}
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <TrainingForm 
          deptId={deptId} 
          initialData={training}
          isEdit={true}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
