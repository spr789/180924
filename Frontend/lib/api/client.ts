import { API_BASE_URL, DEFAULT_HEADERS } from './config';
import { ApiError } from './types';

// Define an interface for the expected response type
interface AuthResponse {
  token: {
    access: string;
    refresh: string;
  };
  // ... other properties if needed
}

export class ApiClient {
  private static instance: ApiClient;
  private token: { access: string; refresh: string } | null = null;

  private constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const parsedToken = JSON.parse(token);
        this.token = { access: String(parsedToken.access), refresh: String(parsedToken.refresh) };
      }
    }
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setToken(token: { access: string; refresh: string }) {
    this.token = { access: String(token.access), refresh: String(token.refresh) };
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', JSON.stringify(this.token));
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): { access: string; refresh: string } | null {
    return this.token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { ...DEFAULT_HEADERS };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token.access}`;
    }
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = {
        message: data.message || 'An error occurred',
        status: response.status,
        errors: data.errors || {}, // Default to an empty object if errors are undefined
      };
      throw error;
    }

    return data;
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T extends AuthResponse>(endpoint: string, data?: unknown): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await this.handleResponse<T>(response);
      
      // Log only access and refresh messages
      if (responseData && responseData.token) {
        console.log('Access Token:', responseData.token.access);
        console.log('Refresh Token:', responseData.token.refresh);
      }

      return responseData;
    } catch (error) {
      console.error('Error during POST request:', { endpoint, data, error });
      throw error; // Re-throw the error after logging
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }
}