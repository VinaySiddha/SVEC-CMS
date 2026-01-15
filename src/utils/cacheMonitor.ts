// Cache Monitoring and Analytics Utility
// Track cache hit rates and performance metrics

interface CacheMetrics {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  hitRate: number;
  averageLoadTime: number;
  savedBandwidth: number;
}

class CacheMonitor {
  private metrics: CacheMetrics = {
    totalRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    hitRate: 0,
    averageLoadTime: 0,
    savedBandwidth: 0,
  };

  private loadTimes: number[] = [];

  /**
   * Record a cache hit
   */
  recordHit(loadTimeMs: number, dataSizeBytes: number = 0) {
    this.metrics.totalRequests++;
    this.metrics.cacheHits++;
    this.metrics.savedBandwidth += dataSizeBytes;
    this.loadTimes.push(loadTimeMs);
    this.updateMetrics();
  }

  /**
   * Record a cache miss
   */
  recordMiss(loadTimeMs: number) {
    this.metrics.totalRequests++;
    this.metrics.cacheMisses++;
    this.loadTimes.push(loadTimeMs);
    this.updateMetrics();
  }

  /**
   * Update derived metrics
   */
  private updateMetrics() {
    if (this.metrics.totalRequests > 0) {
      this.metrics.hitRate =
        (this.metrics.cacheHits / this.metrics.totalRequests) * 100;
      this.metrics.averageLoadTime =
        this.loadTimes.reduce((a, b) => a + b, 0) / this.loadTimes.length;
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  /**
   * Get formatted report
   */
  getReport(): string {
    const metrics = this.getMetrics();
    return `
╔════════════════════════════════════════╗
║       CACHE PERFORMANCE REPORT         ║
╠════════════════════════════════════════╣
║ Total Requests:      ${String(metrics.totalRequests).padEnd(15)} ║
║ Cache Hits:          ${String(metrics.cacheHits).padEnd(15)} ║
║ Cache Misses:        ${String(metrics.cacheMisses).padEnd(15)} ║
║ Hit Rate:            ${String(metrics.hitRate.toFixed(1) + '%').padEnd(14)} ║
║ Avg Load Time:       ${String(metrics.averageLoadTime.toFixed(0) + 'ms').padEnd(13)} ║
║ Bandwidth Saved:     ${this.formatBytes(metrics.savedBandwidth).padEnd(12)} ║
╚════════════════════════════════════════╝
    `;
  }

  /**
   * Format bytes to human readable
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Reset metrics
   */
  reset() {
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      hitRate: 0,
      averageLoadTime: 0,
      savedBandwidth: 0,
    };
    this.loadTimes = [];
  }

  /**
   * Log report to console
   */
  logReport() {
    console.log(this.getReport());
  }
}

export const cacheMonitor = new CacheMonitor();

/**
 * Performance timing utility
 */
export const performanceTiming = {
  /**
   * Measure time to fetch and cache
   */
  measureFetch: async <T>(
    fetchFn: () => Promise<T>,
    onComplete?: (loadTimeMs: number, isCache: boolean) => void
  ): Promise<T> => {
    const start = performance.now();
    const result = await fetchFn();
    const end = performance.now();
    const loadTime = end - start;

    onComplete?.(loadTime, loadTime < 100); // Assume cache if < 100ms

    return result;
  },

  /**
   * Get Web Vitals metrics
   */
  getWebVitals: () => {
    return {
      // First Contentful Paint
      fcp: performance.getEntriesByName('first-contentful-paint')[0],
      // Largest Contentful Paint
      lcp: performance.getEntriesByType('largest-contentful-paint').pop(),
      // First Input Delay
      fid: performance.getEntriesByType('first-input')[0],
      // Cumulative Layout Shift
      cls: performance.getEntriesByType('layout-shift'),
    };
  },

  /**
   * Log navigation timing
   */
  logNavigationTiming: () => {
    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (timing) {
      console.group('Navigation Timing');
      console.log(`DNS Lookup: ${timing.domainLookupEnd - timing.domainLookupStart}ms`);
      console.log(`TCP Connection: ${timing.connectEnd - timing.connectStart}ms`);
      console.log(`Request Time: ${timing.responseStart - timing.requestStart}ms`);
      console.log(`Response Time: ${timing.responseEnd - timing.responseStart}ms`);
      console.log(`DOM Interactive: ${timing.domInteractive - timing.fetchStart}ms`);
      console.log(`DOM Content Loaded: ${timing.domContentLoadedEventEnd - timing.fetchStart}ms`);
      console.log(`Page Load Complete: ${timing.loadEventEnd - timing.fetchStart}ms`);
      console.groupEnd();
    }
  },
};

/**
 * Export window global for console debugging
 */
if (typeof window !== 'undefined') {
  (window as any).cacheMonitor = cacheMonitor;
  (window as any).performanceTiming = performanceTiming;
  console.log('💾 Cache Monitor available globally. Use: cacheMonitor.logReport()');
}
