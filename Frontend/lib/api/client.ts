import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config/config'; // Adjusted import path
import { ApiResponse } from './types/responses';
import { ErrorHandler } from './utils/error-handler';
import { ResponseHandler } from './utils/response-handler';

/**
 * Core API client implementation
 * Handles all HTTP requests with proper error handling and response formatting
 */
class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        ...API_CONFIG.headers, // Using headers from API_CONFIG
      },
    });

    this.setupInterceptors();
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
      async (config) => {
        config.headers['X-Request-ID'] = crypto.randomUUID();
        return config;
      },
      (error) => Promise.reject(ErrorHandler.handleError(error))
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        const formattedData = ResponseHandler.formatSuccess(
          response.data,
          response.status as 200 // Type assertion to 200
        );
        return { ...response, data: formattedData, timestamp: new Date().toISOString() }; // Added timestamp
      },
      (error) => Promise.reject(ErrorHandler.handleError(error))
    );
  }

  /**
   * Make HTTP request
   */
  async request<T>(
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
      return { ...response, timestamp: new Date().toISOString() };
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

// Export the class
export {
  ApiClient
};
