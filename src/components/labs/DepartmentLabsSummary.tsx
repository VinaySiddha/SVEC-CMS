"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Configuration {
  system: string;
  quantity: number;
  details?: string;
}

interface Lab {
  id: string;
  dept: string;
  lab_name: string;
  configurations: Configuration[];
  usage: string | null;
  status: string;
  image_url: string[];
}

interface DepartmentLabsSummaryProps {
  departmentId: string;
}

export function DepartmentLabsSummary({ departmentId }: DepartmentLabsSummaryProps) {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch(`/api/departments/labs?dept=${departmentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch labs');
        }
        
        const data = await response.json();
        setLabs((data.labs || []).slice(0, 3)); // Show only up to 3 labs in the summary
      } catch (err: any) {
        setError(err.message || 'Failed to load labs');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLabs();
  }, [departmentId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
        {error}
      </div>
    );
  }
  
  if (labs.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-gray-600">No computer labs available for this department.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-semibold mb-4">Computer Labs</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {labs.map(lab => (
          <div key={lab.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
            <div className="h-32 overflow-hidden">
              {lab.image_url && lab.image_url.length > 0 ? (
                <img 
                  src={`/uploads/${lab.image_url[0]}`} 
                  alt={lab.lab_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x150?text=Lab';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h4 className="font-medium text-gray-800 mb-1">{lab.lab_name}</h4>
              {lab.configurations && (
                <p className="text-sm text-gray-600">
                  {lab.configurations.reduce((total, config) => total + config.quantity, 0)} Systems
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-right">
        <Link 
          href={`/departments/${departmentId}/labs`}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View All Labs →
        </Link>
      </div>
    </div>
  );
}
