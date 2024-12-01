/**
 * Performance monitoring and optimization utilities
 */
export class Performance {
  private static metrics: Record<string, number> = {};

  /**
   * Start timing a performance metric
   */
  static startMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  }

  /**
   * End timing and record a performance metric
   */
  static endMeasure(name: string): number | undefined {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const entries = performance.getEntriesByName(name);
      const duration = entries[entries.length - 1]?.duration;
      
      this.metrics[name] = duration;
      return duration;
    }
  }

  /**
   * Track web vitals metrics
   */
  static trackWebVitals(): void {
    if (typeof window !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const metric = {
              name: entry.name,
              value: entry.value,
              rating: this.getRating(entry.name, entry.value),
            };
            this.logMetric(metric);
          });
        });

        observer.observe({ 
          entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
        });
      } catch (error) {
        console.error('Error tracking web vitals:', error);
      }
    }
  }

  private static getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      'LCP': [2500, 4000],
      'FID': [100, 300],
      'CLS': [0.1, 0.25],
    };

    const metricThresholds = thresholds[metric as keyof typeof thresholds];
    if (!metricThresholds) return 'poor';

    if (value <= metricThresholds[0]) return 'good';
    if (value <= metricThresholds[1]) return 'needs-improvement';
    return 'poor';
  }

  private static logMetric(metric: any): void {
    // Implement metric logging/reporting
    console.log('[Performance Metric]', metric);
  }
}