import { AxiosRequestConfig } from 'axios';
import { ApiClient } from '../client';
import { setItem, getItem, removeItem, clearStorage } from '../utils/storage';
import { Performance } from './performance';

/**
 * Setup request interceptor for API client
 */
export function setupRequestInterceptor(client: ApiClient) {
  return {
    onFulfilled: (config: AxiosRequestConfig) => {
      // Add request ID and timestamp
      const requestId = crypto.randomUUID();
      config.headers = {
        ...config.headers,
        'X-Request-ID': requestId,
        'X-Request-Time': new Date().toISOString(),
      };

      // Add auth token if available
      const token = getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Start performance measurement
      Performance.startMeasure(`request-${requestId}`);

      return config;
    },

    onRejected: (error: any) => {
      console.error('[Request Error]', error);
      return Promise.reject(error);
    },
  };
}