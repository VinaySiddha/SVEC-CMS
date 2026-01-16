/**
 * Performance Test Script for Department Components
 * Run this in the browser console to measure performance improvements
 */

// Performance measurement utilities
class PerformanceMonitor {
  private measurements: { [key: string]: number[] } = {};
  private observers: PerformanceObserver[] = [];

  startMeasurement(name: string) {
    performance.mark(`${name}-start`);
  }

  endMeasurement(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name, 'measure').pop();
    if (measure) {
      if (!this.measurements[name]) {
        this.measurements[name] = [];
      }
      this.measurements[name].push(measure.duration);
    }
  }

  getAverageDuration(name: string): number {
    const durations = this.measurements[name];
    if (!durations || durations.length === 0) return 0;
    return durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  }

  clearMeasurements() {
    this.measurements = {};
    performance.clearMarks();
    performance.clearMeasures();
  }

  // Monitor Core Web Vitals
  observeWebVitals() {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(lcpObserver);

    // First Input Delay (FID) - measure in lab with simulated input
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.push(fidObserver);

    // Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(clsObserver);
  }

  generateReport() {
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Department switching performance test
class DepartmentPerformanceTest {
  private monitor = new PerformanceMonitor();
  private testResults: { [test: string]: any } = {};

  async testTabSwitching(iterations = 10) {
    const tabs = ['Department', 'Vision', 'Mission', 'PEOs', 'POs', 'PSOs', 'COs', 'SalientFeatures'];
    
    for (let i = 0; i < iterations; i++) {
      for (const tab of tabs) {
        this.monitor.startMeasurement('tab-switch');
        
        // Simulate tab click
        const tabButton = document.querySelector(`button[data-tab="${tab}"]`) as HTMLButtonElement;
        if (tabButton) {
          tabButton.click();
          
          // Wait for tab content to render
          await new Promise(resolve => {
            const observer = new MutationObserver(() => {
              observer.disconnect();
              resolve(void 0);
            });
            observer.observe(document.body, { childList: true, subtree: true });
            
            // Fallback timeout
            setTimeout(resolve, 100);
          });
        }
        
        this.monitor.endMeasurement('tab-switch');
        
        // Small delay between clicks
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    const avgTabSwitch = this.monitor.getAverageDuration('tab-switch');
    this.testResults.tabSwitching = {
      averageTime: avgTabSwitch,
      iterations: iterations * tabs.length,
      classification: avgTabSwitch < 16 ? 'Excellent' : avgTabSwitch < 50 ? 'Good' : 'Needs Improvement'
    };
  }

  async testComponentRenderTime() {
    this.monitor.startMeasurement('component-render');
    
    // Force re-render by changing props
    const departmentComponent = document.querySelector('[data-testid="department-component"]');
    if (departmentComponent) {
      // Trigger a re-render
      departmentComponent.dispatchEvent(new CustomEvent('forceUpdate'));
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.monitor.endMeasurement('component-render');
    
    const renderTime = this.monitor.getAverageDuration('component-render');
    this.testResults.componentRender = {
      averageTime: renderTime,
      classification: renderTime < 100 ? 'Excellent' : renderTime < 200 ? 'Good' : 'Needs Improvement'
    };
  }

  measureBundleSize() {
    // Count the number of script tags (rough bundle size indicator)
    const scriptTags = document.querySelectorAll('script[src]');
    const totalScripts = scriptTags.length;
    
    // Check for lazy-loaded chunks
    const chunkScripts = Array.from(scriptTags).filter(script => {
      const scriptElement = script as HTMLScriptElement;
      return scriptElement.src.includes('chunk') || scriptElement.src.includes('lazy');
    });
    
    this.testResults.bundleAnalysis = {
      totalScripts,
      lazyChunks: chunkScripts.length,
      lazyLoadingEnabled: chunkScripts.length > 0
    };
  }

  async runFullTest() {
    this.monitor.observeWebVitals();
    
    await this.testTabSwitching(5);
    await this.testComponentRenderTime();
    this.measureBundleSize();
    
    this.monitor.generateReport();
    
    // Overall performance score
    const scores = [
      this.testResults.tabSwitching?.classification === 'Excellent' ? 100 : 
      this.testResults.tabSwitching?.classification === 'Good' ? 80 : 50,
      
      this.testResults.componentRender?.classification === 'Excellent' ? 100 : 
      this.testResults.componentRender?.classification === 'Good' ? 80 : 50,
      
      this.testResults.bundleAnalysis?.lazyLoadingEnabled ? 100 : 50
    ];
    
    const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    this.monitor.cleanup();
    return this.testResults;
  }
}

// Performance comparison between old and new implementations
class PerformanceComparison {
  static compareMethods() {
  }
}

// Make testing tools available globally
(window as any).DepartmentPerformanceTest = DepartmentPerformanceTest;
(window as any).PerformanceComparison = PerformanceComparison;

export { DepartmentPerformanceTest, PerformanceComparison };