import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config';
import { ApiResponse } from './types/responses';
import { ErrorHandler } from './utils/error-handler';
import { ResponseHandler } from './utils/response-handler';

/**
 * Core API client implementation
 * Handles all HTTP requests with proper error handling and response formatting
 */
export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private token: { access: string; refresh: string } | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.defaultHeaders,
    });

    this.setupInterceptors();
    this.loadToken();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.token?.access) {
          config.headers.Authorization = `Bearer ${this.token.access}`;
        }
        config.headers['X-Request-ID'] = crypto.randomUUID();
        return config;
      },
      (error) => Promise.reject(ErrorHandler.handleError(error))
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => ResponseHandler.formatSuccess(response.data, response.status),
      async (error) => {
        if (error.response?.status === 401 && this.token?.refresh) {
          try {
            await this.refreshToken();
            return this.axiosInstance(error.config);
          } catch (refreshError) {
            this.clearToken();
            return Promise.reject(ErrorHandler.handleError(refreshError));
          }
        }
        return Promise.reject(ErrorHandler.handleError(error));
      }
    );
  }

  /**
   * Load token from storage
   */
  private loadToken(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = JSON.parse(token);
      }
    }
  }

  /**
   * Set authentication token
   */
  setToken(token: { access: string; refresh: string }): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', JSON.stringify(token));
    }
  }

  /**
   * Clear authentication token
   */
  clearToken(): void {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ access: string; refresh: string }> {
    if (!this.token?.refresh) {
      throw new Error('No refresh token available');
    }

    const response = await this.axiosInstance.post('/auth/refresh/', {
      refresh: this.token.refresh,
    });

    const newToken = {
      access: response.data.access,
      refresh: this.token.refresh,
    };

    this.setToken(newToken);
    return newToken;
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    method: string,
    endpoint: string,
    config: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance({
        method,
        url: endpoint,
        ...config,
      });
      return response;
    } catch (error) {
      return Promise.reject(ErrorHandler.handleError(error));
    }
  }

  // HTTP method implementations
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { data });
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { data });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { data });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }
}