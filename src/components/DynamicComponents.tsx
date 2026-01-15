"use client";
/**
 * Dynamic imports for heavy components to reduce initial bundle size
 * This improves First Contentful Paint (FCP) and Time to Interactive (TTI)
 */

import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

// Fallback loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <LoadingSpinner size="large" text="Loading..." />
  </div>
);

// Small loading fallback for smaller components
const SmallLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <LoadingSpinner size="small" />
  </div>
);

/**
 * Dynamically import FloatingChatWidgets (only loads when needed)
 * This component is not critical for initial page load
 */
export const DynamicFloatingChatWidgets = dynamic(
  () => import('./FloatingChatWidgets'),
  {
    ssr: false, // Don't render on server (only client-side)
    loading: () => null, // No loading state needed for chat widget
  }
);

/**
 * Dynamically import heavy chart/graph components
 * Charts are typically heavy with visualization libraries
 */
export const DynamicChart = dynamic(
  () => import('recharts').then((mod) => mod),
  {
    ssr: false,
    loading: LoadingFallback,
  }
);

/**
 * Dynamically import image galleries or carousels
 * These can be heavy with multiple images
 */
export const DynamicImageGallery = dynamic(
  () => import('./ui/ImageGallery').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import admin components (only for admin users)
 * No need to load these for regular users
 */
export const DynamicAdminPanel = dynamic(
  () => import('./admin/AdminPanel').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import PDF viewer (heavy library)
 */
export const DynamicPDFViewer = dynamic(
  () => import('./ui/PDFViewer').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import video players (heavy with codecs)
 */
export const DynamicVideoPlayer = dynamic(
  () => import('./ui/VideoPlayer').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import rich text editors (very heavy)
 */
export const DynamicRichTextEditor = dynamic(
  () => import('./ui/RichTextEditor').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import modal dialogs with heavy content
 */
export const DynamicModal = dynamic(
  () => import('./ui/Modal').catch(() => import('./LoadingSpinner')),
  {
    loading: SmallLoadingFallback,
    ssr: false,
  }
);

/**
 * Dynamically import data tables (can be heavy with large datasets)
 */
export const DynamicDataTable = dynamic(
  () => import('./ui/DataTable').catch(() => import('./LoadingSpinner')),
  {
    loading: LoadingFallback,
    ssr: true, // Keep SSR for better SEO
  }
);

/**
 * Dynamically import calendar components (date-fns is heavy)
 */
export const DynamicCalendar = dynamic(
  () => import('./ui/Calendar').catch(() => import('./LoadingSpinner')),
  {
    loading: SmallLoadingFallback,
    ssr: false,
  }
);

/**
 * Export helper function to create dynamic components on-demand
 */
export function createDynamicComponent<T = any>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options?: {
    ssr?: boolean;
    loading?: React.ComponentType;
  }
) {
  return dynamic(importFn, {
    ssr: options?.ssr ?? false,
    loading: options?.loading ?? LoadingFallback,
  });
}

// Example usage:
// const DynamicMyComponent = createDynamicComponent(
//   () => import('./MyHeavyComponent'),
//   { ssr: false }
// );
