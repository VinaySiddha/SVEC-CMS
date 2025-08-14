"use client";
import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoader: React.FC = () => {
  const { isLoading, loadingText } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-100">
      {/* Quick loading indicator */}
      <div className="relative z-10 animate-in fade-in duration-100">
        <LoadingSpinner
          variant="quick"
          size="lg"
          text={loadingText}
          className="animate-in fade-in duration-150"
        />
      </div>
    </div>
  );
};

export default GlobalLoader;
