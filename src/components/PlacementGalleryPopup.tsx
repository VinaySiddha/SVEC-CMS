'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  file_url?: string;
  posted_date: string;
}

interface PlacementGalleryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlacementGalleryPopup({ isOpen, onClose }: PlacementGalleryPopupProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Set mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch images from API
  useEffect(() => {
    if (!isOpen) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const timestamp = new Date().getTime();
        const cacheBuster = `&_t=${timestamp}`;
        const response = await fetch(`/api/placement/noticeboard?category=Images${cacheBuster}`);
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          // Filter only items with file_url (actual images)
          const imageData = result.data
            .filter((item: any) => item.file_url)
            .sort((a: any, b: any) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());
          setImages(imageData);
          setCurrentIndex(0);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [isOpen]);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || images.length === 0 || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [autoPlay, images.length, isOpen]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  // Don't render if not open
  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        .gallery-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        .gallery-modal {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
        {/* Backdrop */}
        <div
          className="gallery-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup Container */}
        <div
          className="gallery-modal relative w-full max-w-4xl mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
          style={{
            zIndex: 9999,
          }}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Close gallery"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Slider */}
        {isLoading ? (
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60 text-sm">Loading images...</p>
            </div>
          </div>
        ) : images.length === 0 ? (
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
            <p className="text-white/60 text-lg">No placement images available</p>
          </div>
        ) : (
          <>
            {/* Main Image Container */}
            <div className="relative aspect-video overflow-hidden bg-black group">
              {/* Images */}
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: index === currentIndex ? 1 : 0,
                    visibility: index === currentIndex ? 'visible' : 'hidden',
                  }}
                >
                  {/* Image */}
                  <img
                    src={`/uploads/placement-noticeboard/${image.file_url}`}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop';
                    }}
                  />

                  {/* Image Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                      <p className="text-white/70 text-sm mt-1">
                        {new Date(image.posted_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 hover:bg-primary/80"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 hover:bg-primary/80"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium hover:bg-black/70 transition-colors duration-300"
              >
                {autoPlay ? '⏸ Pause' : '▶ Play'}
              </button>
            </div>

            {/* Thumbnails/Indicators */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: index === currentIndex ? '#4338ca' : '#ffffff20',
                      opacity: index === currentIndex ? 1 : 0.6,
                    }}
                  >
                    <img
                      src={`/uploads/placement-noticeboard/${image.file_url}`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop';
                      }}
                    />

                    {/* Selection Indicator */}
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="bg-black px-6 py-4 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                  aria-label={`Go to image ${index + 1}`}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: index === currentIndex ? '24px' : '8px',
                      backgroundColor: index === currentIndex ? '#4338ca' : '#ffffff40',
                    }}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
