"use client";

import { OrganizedEventForm } from '@/components/organized-events';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { OrganizedEvent } from '@/utils/organized-events-utils';

export default function AdminEditOrganizedEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Array.isArray(params?.id) ? params.id[0] : (params?.id || '');
  
  const [departments, setDepartments] = useState<{id: string; name: string}[]>([]);
  const [event, setEvent] = useState<OrganizedEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchDepartmentsAndEvent = async () => {
      try {
        // Fetch departments
        const deptsResponse = await fetch('/api/departments');
        if (!deptsResponse.ok) {
          throw new Error('Failed to fetch departments');
        }
        
        const deptsData = await deptsResponse.json();
        setDepartments(deptsData);
        
        // Fetch event data
        const eventResponse = await fetch(`/api/organized-events/${eventId}`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event data');
        }
        
        const eventData = await eventResponse.json();
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (eventId) {
      fetchDepartmentsAndEvent();
    } else {
      setLoading(false);
    }
  }, [eventId]);
  
  const handleSuccess = () => {
    router.push('/admin/organized-events');
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load the event record. It may have been deleted or you don't have permission to view it.
        </div>
        <button 
          className="mt-4 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Edit Organized Event
        </h1>
        <p className="text-gray-600 max-w-3xl mb-4">
          Update details of the organized event record.
        </p>
        
        <button 
          className="mb-6 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
          onClick={handleCancel}
        >
          &larr; Back to Events Dashboard
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <OrganizedEventForm 
          departments={departments}
          initialData={event}
          isEdit={true}
          onSuccess={handleSuccess} 
        />
      </div>
    </div>
  );
}
