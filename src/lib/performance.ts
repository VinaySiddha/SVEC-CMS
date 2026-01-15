/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom performance metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

/**
 * Get rating for Core Web Vitals metrics
 */
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  switch (name) {
    case 'CLS': // Cumulative Layout Shift
      if (value <= 0.1) return 'good';
      if (value <= 0.25) return 'needs-improvement';
      return 'poor';

    case 'FID': // First Input Delay
    case 'INP': // Interaction to Next Paint
      if (value <= 100) return 'good';
      if (value <= 300) return 'needs-improvement';
      return 'poor';

    case 'LCP': // Largest Contentful Paint
      if (value <= 2500) return 'good';
      if (value <= 4000) return 'needs-improvement';
      return 'poor';

    case 'FCP': // First Contentful Paint
      if (value <= 1800) return 'good';
      if (value <= 3000) return 'needs-improvement';
      return 'poor';

    case 'TTFB': // Time to First Byte
      if (value <= 800) return 'good';
      if (value <= 1800) return 'needs-improvement';
      return 'poor';

    default:
      return 'good';
  }
}

/**
 * Report performance metrics
 * Can be extended to send to analytics services
 */
export function reportMetric(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_rating: metric.rating,
        metric_delta: Math.round(metric.delta || 0),
      });
    }

    // Can also send to custom analytics endpoint
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   body: JSON.stringify(metric),
    //   headers: { 'Content-Type': 'application/json' },
    // }).catch(() => {});
  }
}

/**
 * Initialize Web Vitals monitoring
 * Call this in your root layout or _app
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Use the web-vitals library if available, otherwise use Performance API
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS((metric) => {
      reportMetric({
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value),
        delta: metric.delta,
      });
    });

    onFID((metric) => {
      reportMetric({
        name: 'FID',
        value: metric.value,
        rating: getRating('FID', metric.value),
        delta: metric.delta,
      });
    });

    onFCP((metric) => {
      reportMetric({
        name: 'FCP',
        value: metric.value,
        rating: getRating('FCP', metric.value),
        delta: metric.delta,
      });
    });

    onLCP((metric) => {
      reportMetric({
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value),
        delta: metric.delta,
      });
    });

    onTTFB((metric) => {
      reportMetric({
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value),
        delta: metric.delta,
      });
    });

    onINP((metric) => {
      reportMetric({
        name: 'INP',
        value: metric.value,
        rating: getRating('INP', metric.value),
        delta: metric.delta,
      });
    });
  }).catch(() => {
    // Fallback: Use basic Performance API
    if ('PerformanceObserver' in window) {
      // Monitor LCP
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          reportMetric({
            name: 'LCP',
            value: lastEntry.renderTime || lastEntry.loadTime,
            rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation failed:', e);
      }

      // Monitor FCP
      try {
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              reportMetric({
                name: 'FCP',
                value: entry.startTime,
                rating: getRating('FCP', entry.startTime),
              });
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observation failed:', e);
      }
    }
  });

  // Monitor page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      reportMetric({
        name: 'PageLoad',
        value: pageLoadTime,
        rating: pageLoadTime < 3000 ? 'good' : pageLoadTime < 5000 ? 'needs-improvement' : 'poor',
      });
    }
  });
}

/**
 * Measure custom performance timing
 */
export function measurePerformance(markName: string, startMark?: string) {
  if (typeof window === 'undefined' || !performance.mark) return;

  try {
    if (startMark) {
      performance.measure(markName, startMark);
      const measure = performance.getEntriesByName(markName)[0];
      if (measure) {
        reportMetric({
          name: markName,
          value: measure.duration,
          rating: measure.duration < 100 ? 'good' : measure.duration < 300 ? 'needs-improvement' : 'poor',
        });
      }
    } else {
      performance.mark(markName);
    }
  } catch (e) {
    console.warn('Performance measurement failed:', e);
  }
}

/**
 * Monitor resource loading performance
 */
export function monitorResources() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    const slowResources = resources.filter((resource) => resource.duration > 1000);

    if (slowResources.length > 0) {
      console.warn('Slow resources detected:', slowResources.map((r) => ({
        name: r.name,
        duration: r.duration,
        type: r.initiatorType,
      })));
    }

    // Group resources by type
    const resourcesByType = resources.reduce((acc, resource) => {
      const type = resource.initiatorType;
      if (!acc[type]) acc[type] = [];
      acc[type].push(resource);
      return acc;
    }, {} as Record<string, PerformanceResourceTiming[]>);

    // Log resource summary
    if (process.env.NODE_ENV === 'development') {
      console.log('Resource Performance Summary:', {
        total: resources.length,
        byType: Object.entries(resourcesByType).map(([type, items]) => ({
          type,
          count: items.length,
          totalSize: items.reduce((sum, item) => sum + (item.transferSize || 0), 0),
          avgDuration: items.reduce((sum, item) => sum + item.duration, 0) / items.length,
        })),
      });
    }
  });
}
