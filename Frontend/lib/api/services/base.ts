import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/lib/api/utils/storage';
import { handleApiError } from '@/lib/api/utils/error-handler';

export class BaseService {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Set up request and response interceptors
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for adding token
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = storage.get('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(handleApiError(error))
    );

    // Response interceptor to handle refresh tokens and error responses
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = storage.get('refreshToken');
            const response = await this.client.post('/auth/refresh', { refreshToken });
            const { token } = response.data;
            storage.set('token', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.client(originalRequest);
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
  }

  // Common API request handler
  protected async request<T>(method: string, url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> {
    try {
      const response = await this.client({
        method,
        url,
        ...config,
      });
      return response;
    } catch (error) {
      return Promise.reject(handleApiError(error));
    }
  }
}
