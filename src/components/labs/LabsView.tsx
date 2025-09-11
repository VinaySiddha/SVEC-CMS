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

interface LabsViewProps {
  departmentFilter?: string;
  isAdmin?: boolean;
  limit?: number;
}

export function LabsView({ 
  departmentFilter,
  isAdmin = false,
  limit
}: LabsViewProps) {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);



  // Fetch labs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '/api/departments/labs';
        const params = new URLSearchParams();
        
        if (departmentFilter) {
          params.append('dept', departmentFilter);
        }
        
        if (limit) {
          params.append('limit', limit.toString());
        }
        
        const queryString = params.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch labs');
        }
        
        const data = await response.json();
        setLabs(data.labs || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch labs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentFilter, limit]);

  // Handle lab deletion
  const handleDelete = async (id: string) => {
    // Show confirmation dialog
    if (!window.confirm('Are you sure you want to delete this lab? This action cannot be undone.')) {
      return;
    }
    
    setDeleteId(id);
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/labs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete lab');
      }
      
      // Remove the deleted lab from the state
      setLabs(labs.filter(lab => lab.id !== id));
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

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

  if (labs.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-5 rounded text-center">
        No labs found.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div 
            key={lab.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Lab Image */}
            <div className="h-48 relative overflow-hidden">
              {lab.image_url && lab.image_url.length > 0 ? (
                <img
                  src={`/uploads/${lab.image_url[0]}`}
                  alt={lab.lab_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image fails to load, show a placeholder
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Lab+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">No Image Available</span>
                </div>
              )}
              
              {/* Status Badge */}
              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(lab.status)}`}>
                {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
              </span>
            </div>
            
            {/* Lab Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{lab.lab_name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                Department: {lab.dept}
              </p>
              
              {/* Configuration Summary */}
              {lab.configurations && lab.configurations.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Equipment:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {lab.configurations.slice(0, 3).map((config, idx) => (
                      <li key={idx}>
                        {config.system} ({config.quantity})
                      </li>
                    ))}
                    {lab.configurations.length > 3 && (
                      <li className="text-blue-600">
                        {lab.configurations.length - 3} more...
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {/* Usage Preview */}
              {lab.usage && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {lab.usage}
                </p>
              )}
              
              {/* Actions */}
              <div className="flex justify-between items-center mt-2">
                <Link 
                  href={`/labs/${lab.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </Link>
                
                {isAdmin && (
                  <div className="flex space-x-2">
                    <Link 
                      href={`/admin/labs/edit/${lab.id}`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(lab.id)}
                      disabled={isDeleting && deleteId === lab.id}
                      className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      {isDeleting && deleteId === lab.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
