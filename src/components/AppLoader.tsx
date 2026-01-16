"use client";
import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen';

interface AppLoaderProps {
  children: React.ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowContent, setShouldShowContent] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const loadingCompleteRef = useRef(false);

  const handleLoadingComplete = () => {
    if (loadingCompleteRef.current) return; // Prevent multiple calls
    loadingCompleteRef.current = true;
    
    setIsLoading(false);
    
    // Ensure content is fully rendered before showing
    setTimeout(() => {
      setIsContentReady(true);
      setTimeout(() => {
        setShouldShowContent(true);
      }, 100);
    }, 200);
  };

  // Additional checks to ensure page is ready
  useEffect(() => {
    if (!isLoading && isContentReady) {
      // Ensure all images are loaded
      const images = Array.from(document.querySelectorAll('img'));
      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = () => resolve(undefined);
          img.onerror = () => resolve(undefined);
        });
      });

      Promise.all(imagePromises).then(() => {
        // Force scroll to top
        window.scrollTo(0, 0);
        document.body.style.overflow = 'unset';
      });
    }
  }, [isLoading, isContentReady]);

  // Prevent scrolling and interactions while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.pointerEvents = 'none';
    } else {
      document.body.style.pointerEvents = 'unset';
      if (shouldShowContent) {
        document.body.style.overflow = 'unset';
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.pointerEvents = 'unset';
    };
  }, [isLoading, shouldShowContent]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <div 
        className={`transition-all duration-700 ease-out ${
          shouldShowContent 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ 
          visibility: shouldShowContent ? 'visible' : 'hidden',
          pointerEvents: shouldShowContent ? 'auto' : 'none'
        }}
      >
        {children}
      </div>
      
      {/* Ensure page accessibility after loading */}
      {shouldShowContent && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Ensure focus and accessibility
              document.body.tabIndex = -1;
              document.body.focus();
              document.body.removeAttribute('tabindex');
              
              // Announce to screen readers that content is ready
              const announcement = document.createElement('div');
              announcement.setAttribute('aria-live', 'polite');
              announcement.setAttribute('aria-atomic', 'true');
              announcement.style.position = 'absolute';
              announcement.style.left = '-10000px';
              announcement.textContent = 'Page content loaded and ready';
              document.body.appendChild(announcement);
              setTimeout(() => document.body.removeChild(announcement), 1000);
            `,
          }}
        />
      )}
    </>
  );
};

export default AppLoader;