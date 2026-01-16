"use client";
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const { setLoading, setLoadingText } = useLoading();
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    let cancelled = false;

    const currentPath = pathname?.split("?")[0].split("#")[0] ?? "";
    const previousPath = localStorage.getItem('previousPath') || '';


    // Navigation detection
    if (currentPath === previousPath) {
      // Same path, handle first load
      if (isFirstRunRef.current) {
        setLoadingText('Loading...');
        setLoading(true);
        const startedAt = Date.now();

        const finishLoading = () => {
          const elapsed = Date.now() - startedAt;
          const remaining = Math.max(0, 500 - elapsed);
          setTimeout(() => {
            if (cancelled) return;
            setLoading(false);
            setIsVisible(true);
          }, remaining);
        };

        if (typeof document !== 'undefined' && document.readyState === 'complete') {
          finishLoading();
        } else {
          window.addEventListener('load', finishLoading, { once: true });
        }

        isFirstRunRef.current = false;
        return () => {
          cancelled = true;
          window.removeEventListener('load', finishLoading);
        };
      }

      // For subsequent same-path loads
      setIsVisible(true);
      setLoading(false);
      return;
    }

    // Route change detected
    isFirstRunRef.current = false;
    localStorage.setItem('previousPath', currentPath);

    setLoadingText('Loading page...');
    setLoading(true);
    setIsVisible(false);

    const waitForPaint = () => new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const waitForLCPOrTimeout = () => new Promise<void>((resolve) => {
      let finished = false;
      const timeoutId = setTimeout(() => {
        if (!finished) {
          finished = true;
          resolve();
        }
      }, 1200);

      try {
        if (typeof PerformanceObserver !== 'undefined') {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries() as any[];
            const newest = entries[entries.length - 1];
            if (newest && typeof newest.startTime === 'number') {
              if (newest.startTime >= performance.now() - performance.timing.navigationStart) {
                if (!finished) {
                  finished = true;
                  clearTimeout(timeoutId);
                  resolve();
                }
              }
            }
          });
          observer.observe({ type: 'largest-contentful-paint', buffered: true } as any);
        }
      } catch {
        // Ignore
      }
    });

    (async () => {
      const minDelay = new Promise<void>((r) => setTimeout(r, 500));
      await Promise.all([waitForPaint(), minDelay, waitForLCPOrTimeout()]);

      if (cancelled) return;
      setIsVisible(true);
      requestAnimationFrame(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, setLoading, setLoadingText]);

  return (
    <>
      {/* Optional overlay, e.g., a spinner */}
      {/* <div className={`fixed inset-0 bg-white z-50 ${isLoading ? 'block' : 'hidden'}`}>Loading...</div> */}

      {/* Page Content */}
      <div
        className={`transition-all duration-75 ease-out ${isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-1 scale-99'
          }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;