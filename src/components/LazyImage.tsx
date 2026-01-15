import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/placeholder-image.svg',
  onLoad,
  onError,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      setIsLoading(false);
      return;
    }

    // Create intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = new Image();
            
            img.onload = () => {
              setImageSrc(src);
              setIsLoading(false);
              setError(false);
              onLoad?.();
              observer.unobserve(entry.target);
            };

            img.onerror = () => {
              setImageSrc(placeholder);
              setError(true);
              setIsLoading(false);
              onError?.();
              observer.unobserve(entry.target);
            };

            img.src = src;
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    const imgElement = document.getElementById(`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (imgElement) {
      observer.observe(imgElement);
    }

    return () => {
      if (imgElement) {
        observer.unobserve(imgElement);
      }
    };
  }, [src, placeholder, onLoad, onError]);

  return (
    <img
      id={`lazy-img-${src.replace(/[^a-zA-Z0-9]/g, '')}`}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoading ? 'animate-pulse' : ''} ${
        error ? 'grayscale' : ''
      }`}
      loading="lazy"
    />
  );
};

export default LazyImage;
