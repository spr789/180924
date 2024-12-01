import { AxiosResponse } from 'axios';
import { ApiClient } from '../client';
import { Performance } from './performance';
import { ErrorHandler } from './error-handler';
import { ResponseHandler } from './response-handler';

/**
 * Setup response interceptor for API client
 */
export function setupResponseInterceptor(client: ApiClient) {
  return {
    onFulfilled: (response: AxiosResponse) => {
      // End performance measurement
      const requestId = response.config.headers['X-Request-ID'];
      if (requestId) {
        Performance.endMeasure(`request-${requestId}`);
      }

      // Add response metadata
      response.data = {
        ...response.data,
        timestamp: new Date().toISOString(),
        requestId,
      };

      return ResponseHandler.formatSuccess(response.data, response.status);
    },

    onRejected: async (error: any) => {
      // Handle token refresh
      if (error.response?.status === 401 && client.getToken()?.refresh) {
        try {
          const newToken = await client.refreshToken();
          error.config.headers.Authorization = `Bearer ${newToken.access}`;
          return client.request(error.config);
        } catch (refreshError) {
          client.clearToken();
          return Promise.reject(ErrorHandler.handleError(refreshError));
        }
      }

      return Promise.reject(ErrorHandler.handleError(error));
    },
  };
}