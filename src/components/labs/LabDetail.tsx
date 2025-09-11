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

interface LabDetailProps {
  labId: string;
  isAdmin?: boolean;
}

export function LabDetail({ labId, isAdmin = false }: LabDetailProps) {
  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/departments/labs/${labId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lab details');
        }
        
        const data = await response.json();
        setLab(data.lab);
        
        // Set first image as active if available
        if (data.lab.image_url && data.lab.image_url.length > 0) {
          setActiveImage(data.lab.image_url[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch lab details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [labId]);
  
  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }
  
  if (!lab) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-5 rounded text-center">
        Lab not found.
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{lab.lab_name}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(lab.status)}`}>
            {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">Department: {lab.dept}</p>
        
        {/* Images Gallery */}
        {lab.image_url && lab.image_url.length > 0 && (
          <div className="mb-8">
            <div className="mb-4">
              <img 
                src={`/uploads/${activeImage || lab.image_url[0]}`}
                alt={lab.lab_name}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                onError={(e) => {
                  // If image fails to load, show a placeholder
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Lab+Image';
                }}
              />
            </div>
            
            {lab.image_url.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {lab.image_url.map((imgUrl, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`cursor-pointer h-16 w-16 flex-shrink-0 rounded overflow-hidden border-2 ${activeImage === imgUrl ? 'border-blue-500' : 'border-transparent'}`}
                  >
                    <img 
                      src={`/uploads/${imgUrl}`}
                      alt={`${lab.lab_name} - Image ${idx + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show a placeholder
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Image';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Lab Usage */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Usage</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {lab.usage ? (
              <p className="text-gray-700 whitespace-pre-wrap">{lab.usage}</p>
            ) : (
              <p className="text-gray-500 italic">No usage information available.</p>
            )}
          </div>
        </div>
        
        {/* Lab Configurations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Configurations</h2>
          {lab.configurations && lab.configurations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-3 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                      System
                    </th>
                    <th className="py-3 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                      Quantity
                    </th>
                    <th className="py-3 px-4 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lab.configurations.map((config, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-4 text-gray-800">{config.system}</td>
                      <td className="py-3 px-4 text-gray-800">{config.quantity}</td>
                      <td className="py-3 px-4 text-gray-600">{config.details || '-'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-3 px-4 text-gray-800 font-medium">Total Systems</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {lab.configurations.reduce((total, config) => total + config.quantity, 0)}
                    </td>
                    <td className="py-3 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 italic">No configuration information available.</p>
          )}
        </div>
        
        {/* Admin Actions */}
        {isAdmin && (
          <div className="mt-6 flex justify-end space-x-4">
            <Link 
              href="/labs"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back to Labs
            </Link>
            <Link 
              href={`/admin/labs/edit/${labId}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Edit Lab
            </Link>
          </div>
        )}
        
        {/* Back Link for non-admin users */}
        {!isAdmin && (
          <div className="mt-6">
            <Link 
              href="/labs"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Labs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
