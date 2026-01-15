"use client";
import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoader: React.FC = () => {
  const { isLoading, loadingText } = useLoading();

  return (
    <div
      className={`fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-150 ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isLoading}
    >
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
