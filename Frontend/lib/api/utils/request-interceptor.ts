import axios, { AxiosRequestConfig } from 'axios';
import { ApiClient } from '../client';

export const setupRequestInterceptor = (client: ApiClient) => {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Add request ID
      config.headers = {
        ...config.headers,
        'X-Request-ID': crypto.randomUUID(),
      };

      // Add authorization if token exists
      const token = client.getToken();
      if (token?.access) {
        config.headers.Authorization = `Bearer ${token.access}`;
      }

      // Add timestamp
      config.headers['X-Request-Time'] = new Date().toISOString();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};