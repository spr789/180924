import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from './config/config'; // Adjusted import path
import { ApiResponse } from './types/responses';
import { ErrorHandler } from './utils/error-handler';
import { ResponseHandler } from './utils/response-handler';
import { getItem, setItem, removeItem } from './utils/storage'; // Import storage utilities

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
        const token = this.getTokenFromStorage();
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
            const config = error.config;
            config.headers.Authorization = `Bearer ${newToken.access}`;
            return this.axiosInstance(config);
          } catch (refreshError) {
            this.clearTokenFromStorage();
            return Promise.reject(ErrorHandler.handleError(refreshError));
          }
        }
        return Promise.reject(ErrorHandler.handleError(error));
      }
    );
  }

  /**
   * Fetch token from localStorage or session
   */
  private getTokenFromStorage(): { access: string; refresh: string } | null {
    return getItem<{ access: string; refresh: string }>('ct'); // Use storage utility
  }

  /**
   * Store token in localStorage
   */
  private setTokenInStorage(token: { access: string; refresh: string }): void {
    console.log("Setting token in storage:", token); // Log the token being set
    setItem('ct', token); // Use storage utility
    const decoded = this.decodeJwt(token.access);
    if (decoded?.exp) {
      const expiryTime = decoded.exp * 1000;
      localStorage.setItem('ct_expiry', expiryTime.toString());
    }
  }

  /**
   * Clear token from localStorage
   */
  private clearTokenFromStorage(): void {
    removeItem('ct'); // Use storage utility
    localStorage.removeItem('ct_expiry');
  }

  /**
   * Decode JWT token to extract payload
   */
  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<{ access: string; refresh: string }> {
    const token = this.getTokenFromStorage();
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
    this.setTokenInStorage(newToken);
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

  getToken(): { access: string; refresh: string } | null {
    return getItem<{ access: string; refresh: string }>('ct');
  }

  clearToken(): void {
    removeItem('ct');
  }
}

// Move token utilities before the export statement


// Export both the class and token utilities
export {
  ApiClient
};
