"use client";
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

export const useMultipleScrollAnimations = (count: number, options: UseScrollAnimationOptions = {}) => {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
              if (options.triggerOnce !== false) {
                observer.unobserve(ref);
              }
            } else if (options.triggerOnce === false) {
              setVisibleItems(prev => {
                const newState = [...prev];
                newState[index] = false;
                return newState;
              });
            }
          },
          {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
          }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [count, options.threshold, options.rootMargin, options.triggerOnce]);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };

  return { setRef, visibleItems };
};
