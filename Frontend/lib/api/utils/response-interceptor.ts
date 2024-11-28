import axios from 'axios';
import { ApiClient } from '../client';
import { ResponseHandler } from './response-handler';

export const setupResponseInterceptor = (client: ApiClient) => {
  axios.interceptors.response.use(
    (response) => {
      // Add response metadata
      response.data.timestamp = new Date().toISOString();
      response.data.requestId = response.config.headers['X-Request-ID'];

      return ResponseHandler.formatSuccess(response.data, response.status);
    },
    async (error) => {
      // Handle token refresh
      if (error.response?.status === 401 && client.getToken()?.refresh) {
        try {
          const newToken = await client.refreshToken();
          error.config.headers.Authorization = `Bearer ${newToken.access}`;
          return axios.request(error.config);
        } catch (refreshError) {
          client.clearToken();
          return Promise.reject(ResponseHandler.formatError(error));
        }
      }

      return Promise.reject(ResponseHandler.formatError(error));
    }
  );
};
