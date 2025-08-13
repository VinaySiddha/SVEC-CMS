"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Start page transition when pathname changes
    setIsVisible(false);

    // Show content and stop loading after transition
    const timer = setTimeout(() => {
      setLoading(false); // Stop global loading
      setIsVisible(true);
    }, 250); // Very quick transition

    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return (
    <>
      {/* Page Content */}
      <div
        className={`transition-all duration-250 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-1 scale-99'
          }`}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes ultra-quick-fade-in {
          from {
            opacity: 0;
            transform: translateY(4px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes ultra-quick-fade-out {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-4px) scale(1.01);
          }
        }

        .animate-ultra-quick-fade-in {
          animation: ultra-quick-fade-in 0.25s ease-out;
        }

        .animate-ultra-quick-fade-out {
          animation: ultra-quick-fade-out 0.15s ease-in;
        }

        .scale-99 {
          transform: scale(0.99);
        }
      `}</style>
    </>
  );
};

export default PageTransition;
