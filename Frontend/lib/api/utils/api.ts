import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG, HTTP_STATUS } from '../config/config'; // Adjust path as necessary

// Create an Axios instance using API_CONFIG
export const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`); // Updated to use `set` for `InternalAxiosHeaders`
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle errors, including token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest?._retry &&
      typeof window !== 'undefined'
    ) {
      originalRequest._retry = true; // Prevent retry loops
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { token } = response.data;

          localStorage.setItem('token', token);
          originalRequest.headers.set('Authorization', `Bearer ${token}`); // Use `set` for updated headers
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.clear();
          window.location.href = '/login'; // Redirect to login
        }
      } else {
        localStorage.clear();
        window.location.href = '/login'; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);
