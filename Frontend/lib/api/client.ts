import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleApiError } from './utils/errors'; // Adjust path
import { storage } from './utils/storage';       // Adjust path
import { ApiResponse } from '../types/responses'; // Adjust path

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor
client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = storage.get('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(handleApiError(error))
);

// Response Interceptor
client.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = storage.get('refreshToken');
        const { data } = await client.post('/auth/refresh', { refreshToken });

        storage.set('token', data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;

        return client(originalRequest);
      } catch (refreshError) {
        storage.remove('token');
        storage.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(handleApiError(refreshError));
      }
    }

    return Promise.reject(handleApiError(error));
  }
);

// High-level API methods
export const ApiClient = {
  get: async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    return client.get(url, { params }).then((res) => res.data);
  },

  post: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return client.post(url, data).then((res) => res.data);
  },

  put: async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return client.put(url, data).then((res) => res.data);
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    return client.delete(url).then((res) => res.data);
  },
};

export default client;
