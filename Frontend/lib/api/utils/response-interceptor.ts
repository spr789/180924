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
      console.log('Response received:', response);

      // End performance measurement
      const requestId = response.config.headers['X-Request-ID'];
      if (requestId) {
        console.log(`Ending performance measurement for request ID: ${requestId}`);
        Performance.endMeasure(`request-${requestId}`);
      }

      // Add response metadata
      console.log('Adding response metadata');
      response.data = {
        ...response.data,
        timestamp: new Date().toISOString(),
        requestId,
      };

      console.log('Formatting response data');
      return ResponseHandler.formatSuccess(response.data, response.status as 200);
    },

    onRejected: async (error: any) => {
      console.log('Response error encountered:', error);

      // Handle token refresh
      if (error.response?.status === 401 && client.getToken()?.refresh) {
        console.log('401 error detected, attempting token refresh');
        try {
          const newToken = await client.refreshToken();
          console.log('Token refreshed successfully');
          error.config.headers.Authorization = `Bearer ${newToken.access}`;
          console.log('Retrying request with new token');
          return client.request(
            error.config.method || 'GET',
            error.config.url || '',
            error.config
          );
        } catch (refreshError) {
          console.log('Token refresh failed:', refreshError);
          client.clearToken();
          return Promise.reject(ErrorHandler.handleError(refreshError));
        }
      }

      console.log('Handling error without token refresh');
      return Promise.reject(ErrorHandler.handleError(error));
    },
  };
}