import { analytics } from './analytics';

export const performance = {
  mark(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
      analytics.track({
        type: 'performance_mark',
        properties: { name, timestamp: Date.now() },
      });
    }
  },

  measure(name: string, startMark: string, endMark: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const entries = window.performance.getEntriesByName(name);
        const duration = entries[entries.length - 1]?.duration;

        analytics.track({
          type: 'performance_measure',
          properties: { name, duration, startMark, endMark },
        });
      } catch (error) {
        console.error('Performance measurement error:', error);
      }
    }
  },

  trackWebVitals(): void {
    if (typeof window !== 'undefined') {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            analytics.track({
              type: 'web_vital',
              properties: {
                name: entry.name,
                value: entry.value,
                rating: this.getRating(entry.name, entry.value),
              },
            });
          });
        });

        observer.observe({
          entryTypes: [
            'largest-contentful-paint',
            'first-input',
            'layout-shift',
          ],
        });
      } catch (error) {
        console.error('Error tracking web vitals:', error);
      }
    }
  },

  getRating(
    metric: string,
    value: number
  ): 'good' | 'needs-improvement' | 'poor' {
    const thresholds = {
      LCP: [2500, 4000],
      FID: [100, 300],
      CLS: [0.1, 0.25],
    };

    const metricThresholds = thresholds[metric as keyof typeof thresholds];
    if (!metricThresholds) return 'poor';

    if (value <= metricThresholds[0]) return 'good';
    if (value <= metricThresholds[1]) return 'needs-improvement';
    return 'poor';
  },

  clearMarks(): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks();
    }
  },

  clearMeasures(): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMeasures();
    }
  },
};
