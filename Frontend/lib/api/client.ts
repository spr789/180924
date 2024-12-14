import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config/config'; // Adjusted import path
import { ApiResponse } from './types/responses';
import { ErrorHandler } from './utils/error-handler';
import { ResponseHandler } from './utils/response-handler';
import { getToken } from './services/auth'; // Import token utilities



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
        const token = getToken();
        console.log('Current token:', token); // Log the current token
        if (token?.access) {
          config.headers.Authorization = `Bearer ${token.access}`;
        }
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
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const newToken = await this.refreshToken();
            console.log('New token:', newToken);
            const config = error.config;
            config.headers.Authorization = `Bearer ${newToken.access}`;
            return this.axiosInstance(config);
          } catch (refreshError) {
            return Promise.reject(ErrorHandler.handleError(refreshError));
          }
        }
        return Promise.reject(ErrorHandler.handleError(error));
      }
    );
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ access: string; refresh: string }> {
    const token = getToken();
    console.log('Refreshing token with:', token); // Log the token being used for refresh
    if (!token?.refresh) {
      throw new Error('No refresh token available');
    }

    const response = await this.axiosInstance.post('/auth/refresh/', {
      refresh: token.refresh,
    });

    const newToken = {
      access: response.data.access,
      refresh: token.refresh,
    };
    console.log('Newly obtained token:', newToken); // Log the newly obtained token
    return newToken;
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
