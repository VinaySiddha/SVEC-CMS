"use client";
import { useState, useEffect } from 'react';

interface UseAssetLoaderProps {
  imageUrls?: string[];
  videoUrls?: string[];
  minLoadTime?: number;
}

export const useAssetLoader = ({
  imageUrls = [],
  videoUrls = [],
  minLoadTime = 10000
}: UseAssetLoaderProps = {}) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const totalAssets = imageUrls.length + videoUrls.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      const newProgress = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 100;
      setProgress(newProgress);
      
      if (loadedAssets >= totalAssets) {
        setAssetsLoaded(true);
      }
    };

    // If no assets to load, mark as complete immediately
    if (totalAssets === 0) {
      setAssetsLoaded(true);
      setProgress(100);
    }

    // Load images
    const imagePromises = imageUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedAssets++;
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          loadedAssets++;
          updateProgress();
          resolve(); // Don't reject, just continue
        };
        img.src = url;
      });
    });

    // Load videos
    const videoPromises = videoUrls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const video = document.createElement('video');
        video.onloadeddata = () => {
          loadedAssets++;
          updateProgress();
          resolve();
        };
        video.onerror = () => {
          loadedAssets++;
          updateProgress();
          resolve(); // Don't reject, just continue
        };
        video.src = url;
        video.load();
      });
    });

    // Wait for all assets and minimum time
    Promise.all([...imagePromises, ...videoPromises]).then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);
      
      setTimeout(() => {
        setLoadingComplete(true);
      }, remainingTime);
    });

  }, [imageUrls, videoUrls, minLoadTime]);

  return {
    assetsLoaded,
    progress,
    loadingComplete
  };
};

// Hook to get all images and videos from the current page
export const usePageAssets = () => {
  const [pageAssets, setPageAssets] = useState<{
    images: string[];
    videos: string[];
  }>({ images: [], videos: [] });

  useEffect(() => {
    const collectAssets = () => {
      const images: string[] = [];
      const videos: string[] = [];

      // Collect all img elements
      document.querySelectorAll('img').forEach((img) => {
        if (img.src) images.push(img.src);
      });

      // Collect all video elements
      document.querySelectorAll('video').forEach((video) => {
        if (video.src) videos.push(video.src);
      });

      // Collect background images
      const elements = document.querySelectorAll('*');
      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        if (bgImage && bgImage !== 'none') {
          const urls = bgImage.match(/url\((.*?)\)/g);
          if (urls) {
            urls.forEach((url) => {
              const cleanUrl = url.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
              if (cleanUrl) images.push(cleanUrl);
            });
          }
        }
      });

      setPageAssets({ images: [...new Set(images)], videos: [...new Set(videos)] });
    };

    // Initial collection
    collectAssets();

    // Re-collect after DOM changes
    const observer = new MutationObserver(collectAssets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return pageAssets;
};