"use client";
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  size?: 'small' | 'medium' | 'large';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  size = 'large' 
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingSpinner size={size} />
    </div>
  );
};

export default LoadingOverlay;
