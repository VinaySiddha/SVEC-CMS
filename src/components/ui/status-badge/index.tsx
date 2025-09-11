'use client';

import React from 'react';

type StatusType = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const baseStyles = "px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    approved: "bg-green-100 text-green-800 border border-green-200",
    rejected: "bg-red-100 text-red-800 border border-red-200"
  };
  
  const statusText = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected"
  };
  
  return (
    <span className={`${baseStyles} ${statusStyles[status]} ${className}`}>
      {statusText[status]}
    </span>
  );
};

export default StatusBadge;
