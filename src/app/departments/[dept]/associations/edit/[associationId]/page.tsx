"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { AssociationForm } from "@/components/associations/AssociationForm";
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

export default function EditAssociationPage() {
  const params = useParams<{ deptId: string; associationId: string }>();
  const deptId = params?.deptId || "";
  const associationId = params?.associationId || "";
  const router = useRouter();
  
  const [association, setAssociation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the association data
    const fetchAssociation = async () => {
      try {
        const response = await fetch(
          `/api/departments/${deptId}/associations/${associationId}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch association");
        }
        
        const data = await response.json();
        setAssociation(data.association);
      } catch (error: any) {
        setError(error.message || "Failed to load association");
        toast.error("Could not load association data");
      } finally {
        setLoading(false);
      }
    };

    if (deptId && associationId) {
      fetchAssociation();
    } else {
      setLoading(false);
      setError("Invalid department or association ID");
    }
  }, [deptId, associationId]);

  const goBack = () => {
    router.push(`/departments/${deptId}/associations`);
  };

  const handleSuccess = () => {
    router.push(`/departments/${deptId}/associations`);
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !association) {
    return (
      <div className="container max-w-4xl py-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={goBack}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Associations
        </Button>
        
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p className="text-gray-500">{error || "Association not found"}</p>
          <Button className="mt-4" onClick={goBack}>
            Return to Associations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={goBack}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Associations
      </Button>
      
      <PageHeader>
        <PageHeaderHeading>Edit Association</PageHeaderHeading>
        <PageHeaderDescription>
          Update details for {association.name}
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="my-6" />
      
      <div className="mt-8">
        <AssociationForm 
          deptId={deptId} 
          initialData={association}
          isEdit={true}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
