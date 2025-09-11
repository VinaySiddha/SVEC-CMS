"use client";

import { Classroom } from '@/utils/classroom-utils';

interface ClassroomCardProps {
  classroom: Classroom;
}

export function ClassroomCard({ classroom }: ClassroomCardProps) {
  // Format capacity
  const formatCapacity = (capacity: number | null) => {
    if (!capacity) return 'N/A';
    return `${capacity} seats`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      {classroom.document_url ? (
        <div className="h-48 bg-gray-200">
          <img
            src={`/uploads/${classroom.document_url}`}
            alt={classroom.description}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show a placeholder
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Classroom';
            }}
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {classroom.dept}
        </div>
        <h3 className="mt-1 text-lg font-medium">
          {classroom.description}
        </h3>
        <div className="mt-2 flex items-center">
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="ml-2 text-gray-700">
            {formatCapacity(classroom.seating_capacity)}
          </span>
        </div>
        {classroom.projector && (
          <div className="mt-2 flex items-center">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="ml-2 text-gray-700">
              Has Projector
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
