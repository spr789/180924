import axios from 'axios';
import { API_BASE_URL, DEFAULT_HEADERS } from './config';
import { ApiResponse, ApiError } from './types/responses';
import { ResponseHandler } from './utils/response-handler';
import { setupRequestInterceptor } from './utils/request-interceptor';
import { setupResponseInterceptor } from './utils/response-interceptor';

export class ApiClient {
  private static instance: ApiClient;
  private token: { access: string; refresh: string } | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this.token = JSON.parse(token);
      }
    }

    // Setup axios interceptors
    setupRequestInterceptor(this);
    setupResponseInterceptor(this);
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  getToken() {
    return this.token;
  }

  setToken(token: { access: string; refresh: string }) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', JSON.stringify(token));
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  async refreshToken(): Promise<{ access: string; refresh: string }> {
    if (!this.token?.refresh) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
        refresh: this.token.refresh,
      });

      const newToken = {
        access: response.data.access,
        refresh: this.token.refresh, // Keep existing refresh token
      };

      this.setToken(newToken);
      return newToken;
    } catch (error) {
      this.clearToken();
      throw error;
    }
  }

  private async request<T>(
    method: string,
    endpoint: string,
    config: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        headers: DEFAULT_HEADERS,
        ...config,
      });

      return response.data;
    } catch (error) {
      return ResponseHandler.handleError(error);
    }
  }

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